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
