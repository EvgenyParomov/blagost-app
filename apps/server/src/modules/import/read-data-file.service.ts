import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parseCSV } from './lib/csv-parser';

@Injectable()
export class ReadDataFileService {
  constructor(private configService: ConfigService) {}

  get importDirPath() {
    return this.configService.get('IMPORT_ROOT');
  }

  async readCSVFile(name: string): Promise<string[][]> {
    const file = await readFile(join(this.importDirPath, `${name}.csv`), {
      encoding: 'utf8',
    });
    return parseCSV(file);
  }
}
