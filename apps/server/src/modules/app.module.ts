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
} from '@blagost/server/domain';

import { FestivalModule } from './festival/festival.module';
import { DayModule } from './day/day.module';
import { DateTime } from 'luxon';

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
    DayModule,
  ],
})
export class AppModule {
  async onModuleInit() {
    const today = DateTime.local();
    const festival = await FestivalEntity.create({
      startISO: today.minus({ day: 1 }).toISODate(),
      endISO: today.plus({ day: 1 }).toISODate(),
      name: 'Тестовый фестиваль',
    }).save();

    const lectorEvgeny = await LectorEntity.create({
      fullName: 'Евгений Паромов',
    }).save();
    const lectorAnna = await LectorEntity.create({
      fullName: 'Анна Паромова',
    }).save();

    const kitchen = await PlaceEntity.create({ name: 'Кухня' }).save();
    const parlor = await PlaceEntity.create({ name: 'Гостинная' }).save();

    const createDiner = await EventEntity.create({
      name: 'Готовить обед',
      lectors: [lectorAnna],
      place: kitchen,
    }).save();

    const createBakeFast = await EventEntity.create({
      name: 'Готовить завтрак',
      lectors: [lectorEvgeny],
      place: kitchen,
    }).save();

    const work = await EventEntity.create({
      name: 'Работать работу',
      lectors: [lectorEvgeny],
      place: parlor,
    }).save();

    const lookBaby = await EventEntity.create({
      name: 'Смотреть за ребёнком',
      lectors: [lectorAnna, lectorEvgeny],
      place: parlor,
    }).save();

    const watchFilm = await EventEntity.create({
      name: 'Просмотр фильмов',
      lectors: [lectorAnna, lectorEvgeny],
      place: parlor,
    }).save();

    const [day1, day2] = await DayEntity.find({
      where: {
        festival: {
          id: festival.id,
        },
      },
    });

    if (day1) {
      day1.timeSections = [
        await TimeSectionEntity.create({
          name: 'Утро',
          startTime: '07:00',
          endTime: '10:00',
          events: [createBakeFast],
        }).save(),
        await TimeSectionEntity.create({
          name: 'День',
          startTime: '10:00',
          endTime: '18:00',
          events: [work, lookBaby],
        }).save(),
      ];
      day1.additionalTimes = [
        await AdditionalTimeEntity.create({
          startTime: '07:00',
          endTime: '08:00',
          event: createBakeFast,
        }).save(),
        await AdditionalTimeEntity.create({
          startTime: '12:00',
          event: work,
        }).save(),
        await AdditionalTimeEntity.create({
          startTime: '21:00',
          event: watchFilm,
        }).save(),
      ];
      await day1.save();
    }
    if (day2) {
      day2.timeSections = [
        await TimeSectionEntity.create({
          name: 'Утро',
          startTime: '07:00',
          endTime: '10:00',
          events: [createBakeFast],
        }).save(),
        await TimeSectionEntity.create({
          name: 'День',
          startTime: '10:00',
          endTime: '18:00',
          events: [work, lookBaby, createDiner],
        }).save(),
      ];
      day2.additionalTimes = [
        await AdditionalTimeEntity.create({
          startTime: '12:00',
          endTime: '13:00',
          event: createDiner,
        }).save(),
        await AdditionalTimeEntity.create({
          startTime: '12:00',
          event: work,
        }).save(),
        await AdditionalTimeEntity.create({
          startTime: '21:00',
          event: watchFilm,
        }).save(),
      ];
      await day2.save();
    }
  }
}
