import { Dto } from '@blagost/api';
import { EventEntity, TimeSectionEntity } from '@blagost/server/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
    @InjectRepository(TimeSectionEntity)
    private timeSectionRepository: Repository<TimeSectionEntity>
  ) {}

  async findAll({
    notInTimeSection,
  }: Dto.EventFiltersDto): Promise<Dto.PartialEventDto[]> {
    const where = {};

    if (notInTimeSection) {
      const timeSection = await this.timeSectionRepository.findOne({
        where: { id: notInTimeSection },
        relations: ['events'],
      });
      Object.assign(where, {
        id: Not(In(timeSection?.events.map((e) => e.id) ?? [])),
      });
    }

    const events = await this.eventRepository.find({
      relations: ['lectors', 'place'],
      where,
    });

    return events.map((event) => ({
      ...event,
      place: event.place ? event.place.name : undefined,
      lectors: event.lectors.map((l) => l.fullName),
    }));
  }

  findOne(id: EventId) {
    return this.eventRepository.findOneOrFail({
      where: {
        id,
      },
      relations: ['lectors', 'place'],
    });
  }

  upsert(createDto: Dto.UpsertDto) {
    return this.eventRepository.upsert(
      {
        id: createDto.id,
        name: createDto.name,
        lectors: createDto.lectors.map((id) => ({ id })),
        place: createDto.place ? { id: createDto.place } : undefined,
      },
      ['id']
    );
  }

  remove(id: EventId) {
    return this.eventRepository.delete(id);
  }
}
