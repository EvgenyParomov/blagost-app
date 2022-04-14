import { getStabId } from '@blagost/server/shared/uuid';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';

import {
  FestivalEntity,
  EventEntity,
  AdditionalTimeEntity,
  DayEntity,
  TimeSectionEntity,
  LectorEntity,
  PlaceEntity,
  LinkEntity,
} from '@blagost/server/domain';

import { FestivalModule } from './festival/festival.module';
import { DateTime } from 'luxon';
import { EventModule } from './event/event.module';
import { ScheduleModule } from './schedule/schedule.module';
import { LectorModule } from './lector/lector.module';
import { FileModule } from './file/file.module';
import { SettingsModule } from './settings/settings.module';
import { ImportService } from './import/import.service';
import { ImportModule } from './import/import.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          entities: [
            FestivalEntity,
            EventEntity,
            AdditionalTimeEntity,
            DayEntity,
            TimeSectionEntity,
            LectorEntity,
            PlaceEntity,
            LinkEntity,
          ],
          synchronize: true,
          autoLoadEntities: true,
          dropSchema: true,
          ssl: configService.get('DB_SSL')
            ? {
                rejectUnauthorized: false,
              }
            : false,
        };
      },
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    FestivalModule,
    EventModule,
    ScheduleModule,
    LectorModule,
    FileModule,
    SettingsModule,
    ImportModule,
  ],
})
export class AppModule {
  constructor(private importService: ImportService) {}
  async onModuleInit() {
    const tables = await this.importService.readTables();

    const festival = await FestivalEntity.create({
      id: getStabId(),
      startISO: '2022-05-15',
      endISO: '2022-05-28',
      name: 'Тестовый фестиваль',
      timezone: 'UTC+3',
    }).save();

    const festivalDays = await DayEntity.find({
      where: {
        festival,
      },
    });

    const createdLectors = await LectorEntity.save(
      await Promise.all(
        tables.lector.map(
          async ({ avatar, fullName, description, video, links, photos }) => {
            return LectorEntity.create({
              id: getStabId(),
              fullName,
              avatar,
              description,
              video,
              links: await Promise.all(
                links.map(({ label, href }) =>
                  LinkEntity.create({ label, href }).save()
                )
              ),
              photos,
            });
          }
        )
      )
    );

    const createdPlaces = await PlaceEntity.save(
      tables.place.map(({ name, howGetDescription, mapPhoto }) =>
        PlaceEntity.create({
          id: getStabId(),
          name,
          howGetDescription,
          mapPhoto,
        })
      )
    );

    const createdEvents = await EventEntity.save(
      tables.event.map(
        ({
          name,
          description,
          prepareDescription,
          dateTimeDescription,
          photos,
          video,
          place,
          lectors,
          participants,
        }) =>
          EventEntity.create({
            id: getStabId(),
            name,
            description,
            prepareDescription,
            dateTimeDescription,
            photos,
            video,
            place: createdPlaces.find((p) => p.name === place),
            lectors: createdLectors.filter((l) => lectors.includes(l.fullName)),
            participants: createdLectors.filter((l) =>
              participants.includes(l.fullName)
            ),
          })
      )
    );

    await TimeSectionEntity.save(
      tables.timeSection.map(
        ({ date, endTime, events, sectionName, startTime }) =>
          TimeSectionEntity.create({
            id: getStabId(),
            name: sectionName,
            startTime: startTime.toISOTime(),
            endTime: endTime.toISOTime(),
            events: createdEvents.filter((e) => events.includes(e.name)),
            day: festivalDays.find(
              (day) => day.date.toISODate() === date.toISODate()
            ),
            type:
              events.length === 0
                ? 'empty'
                : events.length === 1
                ? 'one'
                : 'many',
          })
      )
    );

    await AdditionalTimeEntity.save(
      tables.additionalTime.map(({ date, endTime, startTime, event }) =>
        AdditionalTimeEntity.create({
          id: getStabId(),
          startTime: startTime.toISOTime(),
          endTime: endTime?.toISOTime(),
          event: createdEvents.find((e) => event === e.name),
          day: festivalDays.find(
            (day) => day.date.toISODate() === date.toISODate()
          ),
        })
      )
    );
  }
}
