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
import { ClearService } from './clear.service';
import { FileService } from './file.service';
import { RelationService } from './relation.service';

@Controller()
export class AppController {
  constructor(
    private fileService: FileService,
    private relationService: RelationService,
    private clearService: ClearService
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 20))
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return await this.fileService.addFiles(files);
  }

  @Get('clear')
  clear() {
    this.clearService.deleteFileWithNoRelations();
  }

  @Get('files')
  getFiles() {
    return this.fileService.getFiles();
  }

  @Get('files/:fileName')
  getFile(@Param('fileName') fileName: FileName): Promise<Dto.FileDto> {
    return this.fileService.getFile(fileName);
  }

  @Delete('files/:fileName')
  deleteFile(@Param('fileName') fileName: FileName) {
    return this.fileService.deleteFile(fileName);
  }

  @Post('relations')
  updateEntityRelations(
    @Body() { files, entityId }: Dto.UpdateEntityRelations
  ) {
    return this.relationService.updateFileRelations(entityId, files);
  }

  @Delete('relations')
  deleteEntityRelations(@Query('entityId') entityId: Id) {
    return this.relationService.deleteEntityRelations(entityId);
  }
}
