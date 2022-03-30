import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';
import { FileService } from './file.service';

@Injectable()
export class ClearService {
  private readonly logger = new Logger(ClearService.name);

  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
    private fileService: FileService
  ) {}

  @Cron('0 2 * * * *')
  async handleClearFiles() {
    this.logger.log('Clear at 02:00 am');
    await this.deleteFileWithNoRelations();
  }

  async deleteFileWithNoRelations() {
    this.logger.log('Start clear no related files');
    const files = await this.fileRepository
      .createQueryBuilder('file')
      .select()
      .leftJoin('file.relations', 'relations')
      .groupBy('file.name')
      .having('COUNT(relations."fileName") = 0')
      .getMany();

    await Promise.all(
      files.map(async ({ name }) => {
        return this.fileService.deleteFile(name);
      })
    );
    this.logger.log('End clear no related files');
  }
}
