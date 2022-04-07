import { CreateLinkDto, LinkDto } from './link.dto';

export type LectorPartialDto = {
  id: LectorId;
  fullName: string;
  avatar: FileName;
};

export type LectorDto = {
  id: LectorId;
  fullName: string;
  description?: string;
  avatar: FileName;
  photos: FileName[];
  video?: FileName;
  links: LinkDto[];
  events: LectorEventDto[];
};

export type UpsertLectorDto = {
  id: LectorId;
  fullName: string;
  description?: string;
  avatar: FileName;
  video?: FileName;
  photos: FileName[];
  links: CreateLinkDto[];
};

export type LectorEventDto = {
  id: EventId;
  name: string;
  dateTimeDescription?: string;
  isParticipant?: boolean;
  lectors: string[];
  place: string;
};
