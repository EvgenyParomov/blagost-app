export type PartialFestival = {
  id: FestivalId;
  name: string;
  startISO: string;
  endISO: string;
  timezone: string;
};

export type CreateFestival = PartialFestival;

export type UpdateFestival = PartialFestival;

export type CurrentFestivalDto = {
  id: FestivalId;
  name: string;
  startISO: string;
  endISO: string;
  timezone: string;
  days: DayInfo[];
};

type DayInfo = {
  id: DayId;
  dateISO: string;
};
