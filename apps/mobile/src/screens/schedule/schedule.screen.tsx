import React, { useState } from 'react';

import { useDayEvents } from '@blagost/mobile/entities/day';
import { ScheduleTabScreenProps } from '@blagost/mobile/shared/interfaces';

import { ScheduleLayout } from './view/shcedule-layout';
import { useQuery } from 'react-query';
import {
  ScheduleType,
  ScheduleTypeSelect,
} from './components/schedule-type-select';
import { DaySelect } from './components/day-select';
import { DayMainEvents } from './components/day-main-events';
import { DayExtraEvents } from './components/day-extra-events';

export function ScheduleScreen({
  navigation,
}: ScheduleTabScreenProps<'Schedule'>) {
  const [scheduleType, setScheduleType] = useState(ScheduleType.Main);
  const [currentDayId, setCurrentDayId] = useState<DayId>();
  const isDayEventsLoading = useDayEventsLoading(currentDayId);
  const redirectToEvent = (id: EventId) => navigation.push('Event', { id });

  return (
    <ScheduleLayout
      daySelect={
        <DaySelect
          currentDayId={currentDayId}
          setCurrentDayId={setCurrentDayId}
        />
      }
      scheduleSelect={
        <ScheduleTypeSelect
          setScheduleType={setScheduleType}
          scheduleType={scheduleType}
        />
      }
      isLoading={isDayEventsLoading}
    >
      {scheduleType === ScheduleType.Main && (
        <DayMainEvents
          onEventClick={(id) => navigation.push('Event', { id })}
          dayId={currentDayId}
        />
      )}
      {scheduleType === ScheduleType.Extra && (
        <DayExtraEvents dayId={currentDayId} />
      )}
    </ScheduleLayout>
  );
}

function useDayEventsLoading(dayId?: DayId) {
  const { isLoading } = useQuery({
    ...useDayEvents(dayId),
    select: () => true,
  });
  return isLoading;
}
