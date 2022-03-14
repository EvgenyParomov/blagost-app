import { Controller, Get, Param } from '@nestjs/common';
import { DayService } from './day.service';

@Controller('day')
export class DayController {
  constructor(private dayService: DayService) {}

  @Get(':id/main-events')
  getMainEvent(@Param('id') id: DayId) {
    return this.dayService.getDayMainEvents(id);
  }
}
