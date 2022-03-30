import { Dto } from '@blagost/api';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FileService {
  constructor(private httpService: HttpService) {}

  async updateEntityRelations(entityId: Id, fileNames: FileName[]) {
    await firstValueFrom(
      this.httpService.post('relations', {
        entityId,
        files: fileNames,
      } as Dto.UpdateEntityRelations)
    );
  }
}
