import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Dto } from '@blagost/api';
import { FestivalService } from './festival.service';
import { FestivalEntity } from '@blagost/server/domain';

@Controller('festival')
export class FestivalController {
  constructor(private readonly festivalService: FestivalService) {}

  @Get('all')
  async findAll(): Promise<Dto.PartialFestival[]> {
    const festivals = await this.festivalService.findAll();

    return festivals.map((fest) => ({
      id: fest.id,
      name: fest.name,
      endISO: fest.endISO,
      startISO: fest.startISO,
      timezone: fest.timezone,
    }));
  }

  @Get()
  async findNext(): Promise<Dto.FestivalDto> {
    return await this.festivalService.findNext().then(this.festivalEntityToDto);
  }

  @Get(':id')
  async findById(@Param('id') id: FestivalId): Promise<Dto.FestivalDto> {
    return this.festivalService.findById(id).then(this.festivalEntityToDto);
  }

  @Post()
  async createFestival(@Body() body: Dto.CreateFestival) {
    return this.festivalService.upsertFestival(body);
  }

  @Put()
  async updateFestival(@Body() body: Dto.UpdateFestival) {
    return this.festivalService.upsertFestival(body);
  }

  @Delete(':id')
  async deleteFestival(@Param('id') id: FestivalId) {
    return this.festivalService.deleteFestival(id);
  }

  private festivalEntityToDto(festival: FestivalEntity): Dto.FestivalDto {
    return {
      id: festival.id,
      name: festival.name,
      endISO: festival.endISO,
      startISO: festival.startISO,
      timezone: festival.timezone,
      days: festival.days.map((day) => {
        return {
          id: day.id,
          dateISO: day.date.toISODate(),
        };
      }),
    };
  }
}
