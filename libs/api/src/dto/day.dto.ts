import { PartialEventDto } from './event.dto';

export type DayDto = {
  id: DayId;
  dateISO: string;
  timeSections: TimeSection[];
  additionalTimes: AdditionalTime[];
};

type TimeSection = {
  id: TimeSectionId;
  startTime: string;
  endTime: string;
  name: string;
  type: TimeSectionType;
  events: PartialEventDto[];
};

type AdditionalTime = {
  id: AdditionalTimeId;
  startTime: string;
  endTime: string;
  event: PartialEventDto;
};

export type UpsertTimeSectionDto = Pick<
  TimeSection,
  'id' | 'startTime' | 'endTime' | 'name' | 'type'
> & { dayId: DayId };
