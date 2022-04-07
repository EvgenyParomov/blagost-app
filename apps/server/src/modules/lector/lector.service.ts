import { Dto } from '@blagost/api';
import { EventEntity, LectorEntity } from '@blagost/server/domain';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compact, uniq } from 'lodash';
import { Repository } from 'typeorm';
import { FileService } from '../file/file.service';

@Injectable()
export class LectorService {
  constructor(
    @InjectRepository(LectorEntity)
    private lectorsRepository: Repository<LectorEntity>,
    private fileService: FileService
  ) {}

  async getLectorsList(): Promise<Dto.LectorPartialDto[]> {
    const lectors = await this.lectorsRepository.find({});

    return lectors.map<Dto.LectorPartialDto>((l) => ({
      id: l.id,
      fullName: l.fullName,
      avatar: l.avatar,
    }));
  }

  async getLectorById(id: LectorId): Promise<Dto.LectorDto> {
    const lector = await this.lectorsRepository.findOne({
      where: {
        id,
      },
      relations: [
        'links',
        'eventsHost',
        'eventsHost.lectors',
        'eventsHost.place',
        'eventsParticipant',
        'eventsParticipant.lectors',
        'eventsParticipant.place',
      ],
    });
    if (!lector) throw new NotFoundException();

    const eventToDto =
      (isParticipant: boolean) =>
      (event: EventEntity): Dto.LectorEventDto => ({
        id: event.id,
        name: event.name,
        dateTimeDescription: event.dateTimeDescription,
        place: event.place.name,
        lectors: event.lectors.map((l) => l.fullName),
        isParticipant,
      });

    return {
      id: lector.id,
      links: lector.links,
      fullName: lector.fullName,
      description: lector.description,
      photos: lector.photos,
      avatar: lector.avatar,
      video: lector.video,
      events: [
        ...lector.eventsHost.map(eventToDto(false)),
        ...lector.eventsParticipant.map(eventToDto(true)),
      ],
    };
  }

  async upsertLector(dto: Dto.UpsertLectorDto) {
    const res = await this.lectorsRepository.upsert(
      {
        ...dto,
        links: dto.links.map((id) => ({ id })),
      },
      ['id']
    );

    const newFiles = uniq(compact([...dto.photos, dto.avatar, dto.video]));

    await this.fileService.updateEntityRelations(dto.id, newFiles);

    return res;
  }

  async deleteLector(id: LectorId) {
    await this.lectorsRepository.delete(id);
    await this.fileService.deleteEntityRelations(id);
  }
}
