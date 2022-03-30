import { LinkDto } from './link.dto';

export type LectorPartialDto = {
  id: LectorId;
  fullName: string;
  avatar?: FileName;
};

export type LectorDto = {
  id: LectorId;
  fullName: string;
  description?: string;
  avatar?: FileName;
  photos: FileName[];
  video?: FileName;
  links: LinkDto[];
  events: PartialEvent[];
};

export type UpsertLectorDto = {
  id: LectorId;
  fullName: string;
  description?: string;
  avatar?: FileName;
  video?: FileName;
  photos: FileName[];
  links: LinkId[];
};

type PartialEvent = {
  id: EventId;
  name: string;
  dateTimeDescription?: string;
};
