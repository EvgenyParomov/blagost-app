import { Module } from '@nestjs/common';
import { ImportService } from './import.service';
import { ReadDataFileService } from './read-data-file.service';

@Module({
  providers: [ImportService, ReadDataFileService],
  exports: [ImportService],
})
export class ImportModule {}
