import { Dto } from '@blagost/api';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  upsert(@Body() upsertEventDto: Dto.UpsertDto) {
    return this.eventService.upsert(upsertEventDto);
  }

  @Get()
  findAll(@Query() query: Dto.EventFiltersDto): Promise<Dto.PartialEventDto[]> {
    return this.eventService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: EventId) {
    return this.eventService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: EventId) {
    return this.eventService.remove(id);
  }
}
