import { LectorPartialDto } from './lector.dto';
import { PlaceDto } from './place.dto';

export type PartialEventDto = {
  id: EventId;
  lectors: string[];
  name: string;
  place?: string;
};

export type UpsertDto = {
  id: EventId;
  name: string;
  lectors: LectorId[];
  place?: PlaceId;
};

export type EventFiltersDto = {
  notInTimeSection?: TimeSectionId;
};

export type EventDto = {
  id: EventId;
  name: string;
  description?: string;
  prepareDescription?: string;
  dateTimeDescription?: string;
  photos: FileName[];
  video?: FileName;
  lectors?: LectorPartialDto[];
  participants?: LectorPartialDto[];
  place?: PlaceDto;
};
