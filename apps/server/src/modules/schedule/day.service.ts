import { Dto } from '@blagost/api';
import { DayEntity } from '@blagost/server/domain';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Duration } from 'luxon';
import { Repository } from 'typeorm';

@Injectable()
export class DayService {
  constructor(
    @InjectRepository(DayEntity) private dayRepositoriy: Repository<DayEntity>
  ) {}

  async getById(id: DayId): Promise<Dto.DayDto> {
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
      id: day.id,
      dateISO: day.date.toISO(),
      additionalTimes: day.additionalTimes
        .map((time) => {
          return {
            id: time.id,
            startTime: time.startTime,
            endTime: time.endTime,
            event: {
              id: time.event.id,
              name: time.event.name,
              place: time.event.place?.name,
              lectors: time.event.lectors?.map((l) => l?.fullName),
            },
          };
        })
        .sort(this.sortByStartTime),
      timeSections: day.timeSections
        .map((timeSection) => {
          return {
            id: timeSection.id,
            name: timeSection.name,
            endTime: timeSection.endTime,
            startTime: timeSection.startTime,
            type: timeSection.type,
            events: timeSection.events.map((event) => ({
              id: event.id,
              lectors: event.lectors?.map((l) => l?.fullName),
              name: event.name,
              place: event.place?.name,
            })),
          };
        })
        .sort(this.sortByStartTime),
    };
  }

  private sortByStartTime = (
    a: { startTime: string },
    b: { startTime: string }
  ) => {
    const aDur = Duration.fromISOTime(a.startTime);
    const bDur = Duration.fromISOTime(b.startTime);
    return aDur.toMillis() - bDur.toMillis();
  };
}
