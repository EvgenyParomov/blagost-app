import { Dto } from '@blagost/api';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { LectorService } from './lector.service';

@Controller('lector')
export class LectorController {
  constructor(private lectorService: LectorService) {}

  @Get()
  async getLectors(): Promise<Dto.LectorPartialDto[]> {
    return this.lectorService.getLectorsList();
  }

  @Get(':id')
  async getLectorById(@Param('id') id: LectorId): Promise<Dto.LectorDto> {
    return this.lectorService.getLectorById(id);
  }

  @Post()
  async upsertLector(@Body() body: Dto.UpsertLectorDto) {
    return this.lectorService.upsertLector(body);
  }

  @Get(':id')
  async deleteLector(@Param('id') id: LectorId) {
    throw new NotFoundException();
  }
}
