import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FestivalEntity } from '@blagost/server/domain';
import { Dto } from '@blagost/api';

@Injectable()
export class FestivalService {
  constructor(
    @InjectRepository(FestivalEntity)
    private festivalRepository: Repository<FestivalEntity>
  ) {}

  async findNext() {
    return this.festivalRepository
      .createQueryBuilder('festival')
      .leftJoin('festival.days', 'day')
      .addSelect(['day.id', 'day.index'])
      .orderBy('day.index', 'ASC')
      .leftJoinAndSelect('day.festival', 'day_festival')
      .getOne();
  }

  async findAll() {
    return this.festivalRepository.find({});
  }

  async upsertFestival(body: Dto.CreateFestival) {
    return this.festivalRepository.upsert(body, ['id']);
  }

  async deleteFestival(id: FestivalId) {
    return this.festivalRepository.delete(id);
  }
}
