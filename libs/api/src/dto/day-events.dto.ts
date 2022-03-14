export type DayEventsDto = {
  timeSections: TimeSection[];
  additionalTimes: AdditionalTime[];
};

type TimeSection = {
  id: TimeSectionId;
  startTime: string;
  endTime: string;
  name: string;
  events: EventInfo[];
};
type EventInfo = {
  id: EventId;
  lectors: string[];
  name: string;
  place?: string;
};
type AdditionalTime = {
  id: AdditionalTimeId;
  startTime: string;
  endTime: string;
  event: EventInfo;
};
