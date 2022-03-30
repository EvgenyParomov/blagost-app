import { Dto } from '@blagost/api';
import { LectorEntity } from '@blagost/server/domain';
import { Injectable } from '@nestjs/common';
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
    const lectors = await this.lectorsRepository.find({
      relations: ['avatar'],
    });

    return lectors.map<Dto.LectorPartialDto>((l) => ({
      id: l.id,
      fullName: l.fullName,
      avatar: l.avatar,
    }));
  }

  async getLectorById(id: LectorId): Promise<Dto.LectorDto> {
    const lector = await this.lectorsRepository.findOneOrFail({
      where: {
        id,
      },
      relations: ['events', 'links'],
    });

    return {
      id: lector.id,
      links: lector.links,
      fullName: lector.fullName,
      description: lector.description,
      photos: lector.photos,
      avatar: lector.avatar,
      video: lector.video,
      events: lector.events.map((e) => ({
        id: e.id,
        name: e.name,
        dateTimeDescription: e.dateTimeDescription,
      })),
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

  private filesFromLector(lector: LectorEntity) {
    return;
  }
}
