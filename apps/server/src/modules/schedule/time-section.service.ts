import { Dto } from '@blagost/api';
import { EventEntity, TimeSectionEntity } from '@blagost/server/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TimeSectionService {
  constructor(
    @InjectRepository(TimeSectionEntity)
    private timeSectionRepostitory: Repository<TimeSectionEntity>,
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>
  ) {}

  upsert(createTimeSectionDto: Dto.UpsertTimeSectionDto) {
    return this.timeSectionRepostitory.upsert(
      {
        day: { id: createTimeSectionDto.dayId },
        ...createTimeSectionDto,
      },
      ['id']
    );
  }

  delete(timeSectionId: TimeSectionId) {
    return this.timeSectionRepostitory.delete(timeSectionId);
  }

  async addEvent(timeSectionId: TimeSectionId, eventId: EventId) {
    const timeSection = await this.timeSectionRepostitory.findOneOrFail({
      where: { id: timeSectionId },
      relations: ['events'],
    });
    const event = await this.eventRepository.findOneOrFail({
      where: { id: eventId },
    });

    timeSection.events = timeSection.events
      .filter((event) => event.id !== eventId)
      .concat(event);

    return await this.timeSectionRepostitory.save(timeSection);
  }

  async removeEvent(timeSectionId: TimeSectionId, eventId: EventId) {
    const timeSection = await this.timeSectionRepostitory.findOneOrFail({
      where: { id: timeSectionId },
      relations: ['events'],
    });

    timeSection.events = timeSection.events.filter((e) => e.id !== eventId);

    await this.timeSectionRepostitory.save(timeSection);

    return timeSection;
  }
}
