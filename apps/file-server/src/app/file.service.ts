import { rm } from 'fs/promises';
import { Dto } from '@blagost/api';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>
  ) {}

  async getFiles() {
    return this.fileRepository.find({
      relations: ['relations'],
    });
  }

  async getFile(fileName: FileName): Promise<Dto.FileDto> {
    return this.fileRepository.findOne({
      where: {
        name: fileName,
      },
      select: ['name', 'mimetype', 'create'],
    });
  }

  async addFiles(files: Express.Multer.File[]) {
    const fileEntities = files.map((file) => {
      return this.fileRepository.create({
        name: file.filename,
        path: file.path,
        mimetype: file.mimetype,
      });
    });
    const res = await this.fileRepository.save(fileEntities);

    res.forEach((f) => {
      this.logger.log(`Added file name:${f.name}`);
    });

    return res;
  }

  async deleteFile(fileName: FileName) {
    const file = await this.fileRepository.findOneOrFail(fileName);

    await rm(file.path);
    await this.fileRepository.remove(file);

    this.logger.log(`Deleted file name:${file.name}`);

    return fileName;
  }
}
