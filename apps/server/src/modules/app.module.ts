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
} from '@blagost/server/domain';

import { FestivalModule } from './festival/festival.module';
import { DateTime } from 'luxon';
import { EventModule } from './event/event.module';
import { ScheduleModule } from './schedule/schedule.module';

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
    EventModule,
    ScheduleModule,
  ],
})
export class AppModule {
  async onModuleInit() {
    const today = DateTime.local();
    const festival = await FestivalEntity.create({
      id: getStabId(),
      startISO: today.minus({ day: 1 }).toISODate(),
      endISO: today.plus({ day: 1 }).toISODate(),
      name: 'Тестовый фестиваль',
    }).save();

    const lectorEK = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Евгений Койнов',
    }).save();
    const lectorOD = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Ольга Давыденко',
    }).save();
    const lectorAT = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Александр Тимашев',
    }).save();
    const lectorVO = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Виктор Орехов',
    }).save();
    const lectorLG = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Леонид Герасьянов',
    }).save();
    const lectorASH = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Александр Щетинин',
    }).save();
    const lectorSS = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Светлана Симонова',
    }).save();
    const lectorDB = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Дмитрий Бутузов',
    }).save();
    const lectorIK = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Иван Кабанов',
    }).save();
    const lectorSD = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Сергей Дмитриев',
    }).save();
    const lectorOT = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Олег Торсунов',
    }).save();
    const lectorGP = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Глафира Питухова',
    }).save();
    const lectorEP = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Евгений Потапов',
    }).save();

    const placeGZ = await PlaceEntity.create({
      id: getStabId(),
      name: 'Главный зал',
    }).save();
    const placeYS = await PlaceEntity.create({
      id: getStabId(),
      name: 'Сбор у столовой',
    }).save();
    const placeYA = await PlaceEntity.create({
      id: getStabId(),
      name: 'Сбор у администрации',
    }).save();
    const placeZZ = await PlaceEntity.create({
      id: getStabId(),
      name: 'Зал здоровья',
    }).save();
    const placeZG = await PlaceEntity.create({
      id: getStabId(),
      name: 'Зал гармонии',
    }).save();
    const placeTC = await PlaceEntity.create({
      id: getStabId(),
      name: 'Тенисный корт',
    }).save();
    const placeM = await PlaceEntity.create({
      id: getStabId(),
      name: 'Море',
    }).save();
    const placeCT = await PlaceEntity.create({
      id: getStabId(),
      name: 'Кинотеатр',
    }).save();
    const placeZJ = await PlaceEntity.create({
      id: getStabId(),
      name: 'Зал живописи',
    }).save();

    const eventMN = await EventEntity.create({
      id: getStabId(),
      name: 'Утренний настрой',
      lectors: [lectorEK],
      place: placeGZ,
    }).save();
    const eventBDJ = await EventEntity.create({
      id: getStabId(),
      name: 'Бег для женщин',
      lectors: [lectorOD],
      place: placeYS,
    }).save();
    const eventMM = await EventEntity.create({
      id: getStabId(),
      name: 'Мужской марафон',
      lectors: [lectorAT],
      place: placeYA,
    }).save();
    const eventY = await EventEntity.create({
      id: getStabId(),
      name: 'Йога',
      lectors: [lectorVO],
      place: placeZZ,
    }).save();
    const eventOIOP = await EventEntity.create({
      id: getStabId(),
      name: 'Омолаживающие и оздоровительные практики',
      lectors: [lectorLG],
      place: placeGZ,
    }).save();
    const eventXY = await EventEntity.create({
      id: getStabId(),
      name: 'Хатха-йога',
      lectors: [lectorASH],
      place: placeZG,
    }).save();
    const eventDC = await EventEntity.create({
      id: getStabId(),
      name: 'Динамический цигун',
      lectors: [lectorSS],
      place: placeTC,
    }).save();
    const eventVAP = await EventEntity.create({
      id: getStabId(),
      name: '«Ваш астрологический портрет»',
      lectors: [lectorDB, lectorIK],
      place: placeM,
    }).save();
    const eventKRRS = await EventEntity.create({
      id: getStabId(),
      name: '«Как распутать родовые сценарии»',
      lectors: [lectorSD],
      place: placeGZ,
    }).save();
    const eventZBL = await EventEntity.create({
      id: getStabId(),
      name: '«Здоровым быть легко»',
      lectors: [lectorLG],
      place: placeGZ,
    }).save();
    const eventNSZ = await EventEntity.create({
      id: getStabId(),
      name: '«Наука сохранения здоровья»',
      lectors: [lectorOT],
      place: placeGZ,
    }).save();
    const eventYA = await EventEntity.create({
      id: getStabId(),
      name: 'Йога Айенгара',
      lectors: [lectorASH],
      place: placeZG,
    }).save();
    const eventADTT = await EventEntity.create({
      id: getStabId(),
      name: '«Аутентичное движение. Терапия танцем»',
      lectors: [lectorGP],
      place: placeZZ,
    }).save();
    const eventPDD = await EventEntity.create({
      id: getStabId(),
      name: '«Пение: от душевного к духовному»',
      lectors: [lectorEK],
      place: placeCT,
    }).save();
    const eventRKZC = await EventEntity.create({
      id: getStabId(),
      name: 'Рисование «Картина за час»',
      lectors: [lectorEP],
      place: placeZJ,
    }).save();
    const eventYOP = await EventEntity.create({
      id: getStabId(),
      name: 'Японские оздоровительные практики',
      lectors: [lectorAT],
      place: placeM,
    }).save();
    const eventTIPZ = await EventEntity.create({
      id: getStabId(),
      name: 'Теория и практика цигуна',
      lectors: [lectorSS],
      place: placeM,
    }).save();
    const eventIVPO = await EventEntity.create({
      id: getStabId(),
      name: 'Игра-квест «В поисках отношений»',
      lectors: [],
    }).save();

    const [day1, day2] = await DayEntity.find({
      where: {
        festival: {
          id: festival.id,
        },
      },
    });

    if (day2) {
      day2.timeSections = [
        await TimeSectionEntity.create({
          id: getStabId(),
          startTime: '05:45',
          endTime: '06:30',
          events: [eventMN, eventBDJ, eventMM],
        }).save(),
        await TimeSectionEntity.create({
          id: getStabId(),
          startTime: '06:50',
          endTime: '08:30',
          events: [eventY, eventOIOP, eventXY, eventDC, eventYOP, eventVAP],
        }).save(),
        await TimeSectionEntity.create({
          id: getStabId(),
          name: 'Завтрак',
          type: 'empty',
          startTime: '08:30',
          endTime: '09:30',
        }).save(),
        await TimeSectionEntity.create({
          id: getStabId(),
          type: 'one',
          startTime: '9:30',
          endTime: '11:15',
          events: [eventKRRS],
        }).save(),
        await TimeSectionEntity.create({
          id: getStabId(),
          type: 'one',
          startTime: '11:45',
          endTime: '13:30',
          events: [eventZBL],
        }).save(),
        await TimeSectionEntity.create({
          id: getStabId(),
          name: 'Обед',
          type: 'empty',
          startTime: '13:30',
          endTime: '15:00',
        }).save(),
        await TimeSectionEntity.create({
          id: getStabId(),
          type: 'one',
          startTime: '15:00',
          endTime: '16:45',
          events: [eventNSZ],
        }).save(),
        await TimeSectionEntity.create({
          id: getStabId(),
          startTime: '17:15',
          endTime: '18:45',
          events: [eventYA, eventADTT, eventPDD, eventRKZC, eventTIPZ],
        }).save(),
        await TimeSectionEntity.create({
          id: getStabId(),
          type: 'one',
          startTime: '19:30',
          endTime: '21:00',
          events: [eventIVPO],
        }).save(),
        await TimeSectionEntity.create({
          id: getStabId(),
          name: 'Молоко',
          type: 'empty',
          startTime: '20:00',
          endTime: '21:30',
        }).save(),
      ];
      day2.additionalTimes = [
        await AdditionalTimeEntity.create({
          id: getStabId(),
          startTime: '07:00',
          endTime: '08:00',
          event: eventYOP,
        }).save(),
        await AdditionalTimeEntity.create({
          id: getStabId(),
          startTime: '12:00',
          event: eventDC,
        }).save(),
        await AdditionalTimeEntity.create({
          id: getStabId(),
          startTime: '21:00',
          event: eventY,
        }).save(),
      ];
      await day2.save();
    }
    if (day1) {
      day1.timeSections = [
        await TimeSectionEntity.create({
          id: getStabId(),
          name: 'Утро',
          startTime: '07:00',
          endTime: '10:00',
          events: [],
        }).save(),
        await TimeSectionEntity.create({
          id: getStabId(),
          name: 'День',
          startTime: '10:00',
          endTime: '18:00',
          events: [],
        }).save(),
      ];
      day1.additionalTimes = [
        await AdditionalTimeEntity.create({
          id: getStabId(),
          startTime: '07:00',
          endTime: '08:00',
          event: eventYOP,
        }).save(),
        await AdditionalTimeEntity.create({
          id: getStabId(),
          startTime: '12:00',
          event: eventDC,
        }).save(),
        await AdditionalTimeEntity.create({
          id: getStabId(),
          startTime: '21:00',
          event: eventY,
        }).save(),
      ];
      await day1.save();
    }
  }
}
