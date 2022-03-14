import { useDayEvents } from '@blagost/mobile/entities/day';
import { EventListItem, EventsList } from '@blagost/mobile/entities/event';
import { TimeSectionItem } from '@blagost/mobile/entities/time-section';
import { VStack } from 'native-base';
import React from 'react';
import { useQuery } from 'react-query';

type Props = {
  dayId?: DayId;
};
export const DayMainEvents = ({ dayId }: Props) => {
  const timeSections = useDayTimeSections(dayId) ?? [];

  return (
    <VStack space="1">
      {timeSections.map((timeSection) => (
        <TimeSectionItem
          key={timeSection.id}
          startTime={timeSection.startTime}
          endTime={timeSection.endTime}
          title={timeSection.name}
        >
          <EventsList>
            {timeSection.events.map((event) => (
              <EventListItem
                key={event.id}
                name={event.name}
                lectors={event.lectors}
                place={event.place}
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
    select: (data) => data?.timeSections,
  });

  return data;
}
