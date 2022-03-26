import { Dto } from '@blagost/api';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DayService } from './day.service';
import { TimeSectionService } from './time-section.service';

@Controller('schedule')
export class ScheduleController {
  constructor(
    private dayService: DayService,
    private timeSectionService: TimeSectionService
  ) {}

  @Get('day/:dayId')
  getDay(@Param('dayId') dayId: DayId): Promise<Dto.DayDto> {
    return this.dayService.getById(dayId);
  }

  @Post('time-section')
  upsertTimeSection(@Body() body: Dto.UpsertTimeSectionDto) {
    return this.timeSectionService.upsert(body);
  }

  @Delete('time-section/:id')
  remove(@Param('id') id: TimeSectionId) {
    return this.timeSectionService.delete(id);
  }

  @Patch('time-section/:id/add-event/:eventId')
  addEvent(@Param('id') id: TimeSectionId, @Param('eventId') eventId: EventId) {
    return this.timeSectionService.addEvent(id, eventId);
  }
}
