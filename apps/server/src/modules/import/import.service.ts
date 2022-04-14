import { Injectable } from '@nestjs/common';
import { CellParsers } from './lib/cell-parser';
import { ReadDataFileService } from './read-data-file.service';

export type LectorInfo = {
  fullName: string;
  avatar: FileName;
  description?: string;
  video?: FileName;
  photos: FileName[];
  links?: { label: string; href: string }[];
};
export type EventInfo = {};
export type PlaceInfo = {};
export type TimeSectionInfo = {};
export type AdditionalTimeInfo = {};

@Injectable()
export class ImportService {
  constructor(private dataFileService: ReadDataFileService) {}

  async readTables() {
    return {
      lector: this.parseDataTable(
        await this.dataFileService.readCSVFile('lector'),
        {
          fullName: CellParsers.parseStr,
          avatar: CellParsers.parseBrandString<FileName>(),
          description: CellParsers.parseStrOpt,
          video: CellParsers.parseBrandStringOpt<FileName>(),
          photos: CellParsers.parseBrandStringArray<FileName>(),
          links: CellParsers.parseLinks,
        }
      ),
      event: this.parseDataTable(
        await this.dataFileService.readCSVFile('event'),
        {
          name: CellParsers.parseStr,
          lectors: CellParsers.parseStrArray,
          place: CellParsers.parseStrOpt,
          description: CellParsers.parseStrOpt,
          prepareDescription: CellParsers.parseStrOpt,
          dateTimeDescription: CellParsers.parseStrOpt,
          photos: CellParsers.parseBrandStringArray<FileName>(),
          video: CellParsers.parseBrandStringOpt<FileName>(),
          participants: CellParsers.parseStrArray,
        }
      ),
      place: this.parseDataTable(
        await this.dataFileService.readCSVFile('place'),
        {
          name: CellParsers.parseStr,
          howGetDescription: CellParsers.parseStrOpt,
          mapPhoto: CellParsers.parseBrandStringOpt<FileName>(),
        }
      ),
      timeSection: this.parseDataTable(
        await this.dataFileService.readCSVFile('time-section'),
        {
          date: CellParsers.parseDate,
          sectionName: CellParsers.parseStrOpt,
          startTime: CellParsers.parseTime,
          endTime: CellParsers.parseTime,
          events: CellParsers.parseStrArray,
        }
      ),
      additionalTime: this.parseDataTable(
        await this.dataFileService.readCSVFile('additional-time'),
        {
          date: CellParsers.parseDate,
          startTime: CellParsers.parseTime,
          endTime: CellParsers.parseTime,
          event: CellParsers.parseStr,
        }
      ),
    };
  }

  private parseDataTable<P extends Record<string, any>>(
    dataTable: string[][],
    parser: { [K in keyof P]: (v: string) => P[K] }
  ) {
    const [definitions, _labels, ...dataRows] = dataTable;
    return dataRows.map((dataRow) => {
      return Object.fromEntries(
        definitions.map((d, index) => {
          const definition = d.trim();
          const item = dataRow[index]?.trim() ?? '';
          const p = parser[definition];
          if (!p)
            throw new Error(`Field parcing error. ${definition}, ${item}`);
          return [definition, parser[definition](item)];
        })
      ) as P;
    });
  }
}
