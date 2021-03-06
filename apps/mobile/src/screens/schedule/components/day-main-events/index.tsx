import { useDayEvents } from '@blagost/mobile/entities/day';
import { VStack } from 'native-base';
import React from 'react';
import { useQuery } from 'react-query';
import { TimeSectionItem } from '../../view/time-section-row';
import { Duration } from 'luxon';
import { EventListItem, EventsList } from '@blagost/mobile/entities/event';

type Props = {
  dayId?: DayId;
  onEventClick: (id: EventId) => void;
};
export const DayMainEvents = ({ dayId, onEventClick }: Props) => {
  const timeSections = useDayTimeSections(dayId) ?? [];

  return (
    <VStack space="3">
      {timeSections.map((timeSection) => (
        <TimeSectionItem
          key={timeSection.id}
          startTime={timeSection.startTime}
          endTime={timeSection.endTime}
          title={timeSection.name}
          type={timeSection.type}
        >
          <EventsList>
            {timeSection.events.map((event) => (
              <EventListItem
                key={event.id}
                name={event.name}
                lectors={event.lectors}
                place={event.place}
                onPress={() => onEventClick(event.id)}
              />
            ))}
          </EventsList>
        </TimeSectionItem>
      ))}
    </VStack>
  );
};

function useDayTimeSections(dayId?: DayId) {
  const { data } = useQuery({
    ...useDayEvents(dayId),
    select: (data) =>
      data?.timeSections.map((t) => ({
        ...t,
        startTime: Duration.fromISOTime(t.startTime),
        endTime: Duration.fromISOTime(t.endTime),
      })),
  });

  return data;
}
