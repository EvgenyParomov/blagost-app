import { differenceBy } from 'lodash';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RelationEntity } from './entities/relation.entity';

@Injectable()
export class RelationService {
  private readonly logger = new Logger(RelationService.name);
  constructor(
    @InjectRepository(RelationEntity)
    private relationRepository: Repository<RelationEntity>
  ) {}

  async updateFileRelations(entityId: Id, newFiles: FileName[]) {
    const lastRelations = await this.relationRepository.find({
      where: {
        entityId,
      },
    });

    const newRelations = newFiles.map((fileName) =>
      this.relationRepository.create({ fileName, entityId })
    );

    const toAdd = differenceBy(newRelations, lastRelations, 'fileName');
    const toRemove = differenceBy(lastRelations, newRelations, 'fileName');

    this.logDelete(toRemove);
    await this.relationRepository.remove(toRemove);

    await this.relationRepository.save(toAdd);
    this.logAdd(toAdd);
  }

  async deleteEntityRelations(entityId: Id) {
    const relations = await this.relationRepository.find({
      where: {
        entityId,
      },
    });

    await this.relationRepository.delete({ entityId });

    this.logDelete(relations);

    return relations;
  }

  private logDelete(relations: RelationEntity[]) {
    console.log(relations);
    relations.forEach(({ fileName, entityId }) => {
      this.logger.log(
        `Deleted relation fileName:${fileName} entityId:${entityId}`
      );
    });
  }
  private logAdd(relations: RelationEntity[]) {
    relations.forEach(({ fileName, entityId }) => {
      this.logger.log(
        `Added relation fileName:${fileName} entityId:${entityId}`
      );
    });
  }
}
