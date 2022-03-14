import { useDayEvents } from '@blagost/mobile/entities/day';
import { EventItemWithTime } from '@blagost/mobile/entities/event';
import { VStack } from 'native-base';
import React from 'react';
import { useQuery } from 'react-query';

type Props = {
  dayId?: DayId;
};
export const DayExtraEvents = ({ dayId }: Props) => {
  const additionalTimes = useDayAdditionalTimes(dayId);
  return (
    <VStack space="1">
      {additionalTimes?.map((time) => (
        <EventItemWithTime
          startTime={time.startTime}
          endTime={time.endTime}
          name={time.event.name}
          place={time.event.place}
          lectors={time.event.lectors}
        />
      ))}
    </VStack>
  );
};

function useDayAdditionalTimes(dayId?: DayId) {
  const { data } = useQuery({
    ...useDayEvents(dayId),
    select: (data) => data?.additionalTimes,
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
