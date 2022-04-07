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

    const linkBl = await LinkEntity.create({
      label: 'Сайт благости',
      href: 'https://blagostfest.ru/',
    }).save();

    const linkEKY = await LinkEntity.create({
      label: 'Youtube',
      href: 'https://www.youtube.com/user/ekoinov/videos',
    }).save();

    const image1 = '397-89b1b922-134b-4867-8901-c2dfbb12f1a3.png' as FileName;
    const image2 =
      '242 (1)-640e7ec0-78ee-4f9d-aeed-05dca328b73a.jpg' as FileName;
    const image3 = '242-65d7d050-8453-4c06-8f15-fd1fc70a1f59.jpg' as FileName;
    const image4 = '190-d6768cd8-b0de-4d82-a039-71d55f389453.png' as FileName;
    const image5 =
      '241 (1)-916560f1-ff74-482e-a4de-57dd1ac073f4.png' as FileName;

    const video1 =
      'Comp 1_2-f6e3ea87-c9d5-4645-85db-3a2e771f4938.mp4' as FileName;

    const lectorEK = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Евгений Койнов',
      description: `Пение — один из самых простых и действенных лекарств для души, воспользоваться которым может каждый из нас. Однако часто мы не придаем ему значения или же предпочитаем подавлять в себе желание петь.  `,
      avatar: image1,
      video: video1,
      links: [linkBl, linkEKY],
      photos: [image2, image3],
    }).save();
    const lectorOD = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Ольга Давыденко',
      description: `Мы — это то, что мы едим. Ведь выбор продуктов напрямую влияет на наше здоровье. Еда является источником стройматериалов для нашего организма, дает нам энергию и даже влияет на наше настроение. Но знаем ли мы, что такое здоровое питание?`,
      avatar: image5,
    }).save();
    const lectorAT = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Александр Тимашев',
      avatar: image4,
    }).save();
    const lectorVO = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Виктор Орехов',
      avatar: image3,
    }).save();
    const lectorLG = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Леонид Герасьянов',
      avatar: image2,
    }).save();
    const lectorASH = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Александр Щетинин',
      avatar: image1,
    }).save();
    const lectorSS = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Светлана Симонова',
      avatar: image1,
    }).save();
    const lectorDB = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Дмитрий Бутузов',
      avatar: image1,
    }).save();
    const lectorIK = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Иван Кабанов',
      avatar: image1,
    }).save();
    const lectorSD = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Сергей Дмитриев',
      avatar: image1,
    }).save();
    const lectorOT = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Олег Торсунов',
      avatar: image1,
    }).save();
    const lectorGP = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Глафира Питухова',
      avatar: image1,
    }).save();
    const lectorEP = await LectorEntity.create({
      id: getStabId(),
      fullName: 'Евгений Потапов',
      avatar: image1,
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
      participants: [lectorEK],
      place: placeGZ,
    }).save();
    const eventNSZ = await EventEntity.create({
      id: getStabId(),
      name: '«Наука сохранения здоровья»',
      lectors: [lectorOT],
      participants: [lectorEK],
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
      dateTimeDescription: '18,19,20 числа в 16:00',
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
