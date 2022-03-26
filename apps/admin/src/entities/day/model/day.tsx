import { Dto } from '@blagost/api';
import { DateTime, Duration } from 'luxon';

export type Day = {
  id: DayId;
  date: DateTime;
  timeSections: TimeSection[];
  additionalTimes: AdditionalTime[];
};

export type TimeSection = {
  id: TimeSectionId;
  name: string;
  start: DateTime;
  end: DateTime;
  events: EventInfo[];
};
export type AdditionalTime = {
  id: AdditionalTimeId;
  start: DateTime;
  end?: DateTime;
  event: EventInfo;
};
type EventInfo = {
  id: EventId;
  lectors: string[];
  name: string;
  place?: string;
};

export const dayDtoToDay = ({
  id,
  dateISO,
  additionalTimes,
  timeSections,
}: Dto.DayDto): Day => {
  const date = DateTime.fromISO(dateISO);
  return {
    id,
    date,
    timeSections: timeSections.map((t) => ({
      id: t.id,
      name: t.name,
      events: t.events,
      start: date.plus(Duration.fromISOTime(t.startTime)),
      end: date.plus(Duration.fromISOTime(t.endTime)),
      dayId: id,
    })),
    additionalTimes: additionalTimes.map((at) => ({
      id: at.id,
      event: at.event,
      start: date.plus(Duration.fromISOTime(at.startTime)),
      end: at.endTime ? date.plus(Duration.fromISOTime(at.endTime)) : undefined,
      dayId: id,
    })),
  };
};
