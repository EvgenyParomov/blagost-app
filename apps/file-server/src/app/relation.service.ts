import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelationEntity } from './entities/relation.entity';

@Injectable()
export class RelationService {
  private readonly logger = new Logger(RelationService.name);
  constructor(
    @InjectRepository(RelationEntity)
    private relationRepository: Repository<RelationEntity>
  ) {}

  async addFileRelations(relations: { fileName: FileName; entityId: Id }[]) {
    const res = await this.relationRepository.save(
      relations.map(({ entityId, fileName }) =>
        this.relationRepository.create({ entityId, fileName })
      )
    );

    res.forEach(({ fileName, entityId }) => {
      this.logger.log(
        `Added relation fileName:${fileName} entityId:${entityId}`
      );
    });

    return res;
  }

  async deleteEntityRelations(entityId: Id) {
    const relations = await this.relationRepository.find({
      where: {
        entityId,
      },
    });

    await this.relationRepository.delete({ entityId });

    relations.forEach(({ entityId, fileName }) => {
      this.logger.log(
        `Deleted relation fileName:${fileName} entityId:${entityId}`
      );
    });

    return relations;
  }

  async deleteFileRelation(fileName: FileName, entityId: Id) {
    const relation = await this.relationRepository.findOne({
      where: {
        fileName,
        entityId,
      },
    });

    await this.relationRepository.delete(relation);

    this.logger.log(
      `Deleted relation fileName:${fileName} entityId:${entityId}`
    );

    return relation;
  }
}
