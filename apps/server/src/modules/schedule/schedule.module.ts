import { Module } from '@nestjs/common';
import { TimeSectionService } from './time-section.service';
import { DayService } from './day.service';
import { AdditionalTimeService } from './additional-time.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DayEntity,
  TimeSectionEntity,
  AdditionalTimeEntity,
  EventEntity,
} from '@blagost/server/domain';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DayEntity,
      TimeSectionEntity,
      AdditionalTimeEntity,
      EventEntity,
    ]),
  ],
  providers: [DayService, TimeSectionService, AdditionalTimeService],
  controllers: [ScheduleController],
})
export class ScheduleModule {}
