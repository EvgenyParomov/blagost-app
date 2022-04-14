import { useDayEvents } from '@blagost/mobile/entities/day';
import { Duration } from 'luxon';
import { VStack } from 'native-base';
import React from 'react';
import { useQuery } from 'react-query';
import { EventListItem } from '../../../../entities/event/view/event-list-item';
import { ListRow } from '../../view/list-row';

type Props = {
  dayId?: DayId;
  onEventClick: (id: EventId) => void;
};
export const DayExtraEvents = ({ dayId, onEventClick }: Props) => {
  const additionalTimes = useDayAdditionalTimes(dayId);
  return (
    <VStack space="2">
      {additionalTimes?.map((time) => (
        <ListRow sx={{ py: 4 }}>
          <EventListItem
            startTime={time.startTime}
            endTime={time.endTime}
            name={time.event.name}
            place={time.event.place}
            lectors={time.event.lectors}
            onPress={() => onEventClick(time.event.id)}
          />
        </ListRow>
      ))}
    </VStack>
  );
};

function useDayAdditionalTimes(dayId?: DayId) {
  const { data } = useQuery({
    ...useDayEvents(dayId),
    select: (data) =>
      data?.additionalTimes?.map((t) => ({
        ...t,
        startTime: Duration.fromISOTime(t.startTime),
        endTime: t.endTime ? Duration.fromISOTime(t.endTime) : undefined,
      })),
  });

  return data;
}
/*
<EventItemWithTime
  startTime="06:00"
  name="Женский марафон"
  place="Море"
/>
<EventItemWithTime
  startTime="10:00"
  endTime="11:00"
  name="Раздача мороженного"
  place="У столовой"
/>
<EventItemWithTime
  startTime="18:00"
  endTime="19:00"
  name="Киртан"
  place="Кинотеатр"
  lector="Все вместе"
/>
 */
