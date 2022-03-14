import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DayEntity } from '@blagost/server/domain';
import { Dto } from '@blagost/api';

@Injectable()
export class DayService {
  constructor(
    @InjectRepository(DayEntity) private dayRepositoriy: Repository<DayEntity>
  ) {}

  async getDayMainEvents(id: DayId): Promise<Dto.DayEventsDto> {
    const day = await this.dayRepositoriy.findOne(id, {
      relations: [
        'timeSections',
        'timeSections.events',
        'timeSections.events.lectors',
        'timeSections.events.place',
        'additionalTimes',
        'additionalTimes.event',
        'additionalTimes.event.lectors',
        'additionalTimes.event.place',
      ],
    });

    if (!day) throw new NotFoundException();

    return {
      additionalTimes: day.additionalTimes.map((time) => {
        return {
          id: time.id,
          startTime: time.startTime,
          endTime: time.endTime,
          event: {
            id: time.event.id,
            name: time.event.name,
            place: time.event.place.name,
            lectors: time.event.lectors.map((l) => l.fullName),
          },
        };
      }),
      timeSections: day.timeSections.map((timeSection) => {
        return {
          id: timeSection.id,
          name: timeSection.name,
          endTime: timeSection.endTime,
          startTime: timeSection.startTime,
          events: timeSection.events.map((event) => ({
            id: event.id,
            lectors: event.lectors.map((l) => l.fullName),
            name: event.name,
            place: event.place.name,
          })),
        };
      }),
    };
  }
}
