import { Dto } from '@blagost/api';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { RelationService } from './relation.service';

@Controller()
export class AppController {
  constructor(
    private fileService: FileService,
    private relationService: RelationService
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 20))
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return await this.fileService.addFiles(files);
  }

  @Get('files/:fileName')
  getFile(@Param('fileName') fileName: FileName): Promise<Dto.FileDto> {
    return this.fileService.getFile(fileName);
  }

  @Delete('files/:fileName')
  deleteFile(@Param('fileName') fileName: FileName) {
    return this.fileService.deleteFile(fileName);
  }

  @Post('relations/add')
  addRelations(@Body() { relations }: Dto.CreateRelationsDto) {
    return this.relationService.addFileRelations(relations);
  }

  @Delete('relations')
  deleteEntityRelations(
    @Query('entityId') entityId: Id,
    @Query() fileName?: FileName
  ) {
    if (fileName) {
      return this.relationService.deleteFileRelation(fileName, entityId);
    }
    return this.relationService.deleteEntityRelations(entityId);
  }
}
