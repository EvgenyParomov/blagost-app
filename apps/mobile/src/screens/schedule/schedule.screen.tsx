import React, { useState } from 'react';

import { useDayEvents } from '@blagost/mobile/entities/day';
import { RootTabScreenProps } from '@blagost/mobile/shared/interfaces';

import { ScheduleLayout } from './view/shcedule-layout';
import { useQuery } from 'react-query';
import {
  ScheduleType,
  ScheduleTypeSelect,
} from './components/schedule-type-select';
import { DaySelect } from './components/day-select';
import { DayMainEvents } from './components/day-main-events';
import { DayExtraEvents } from './components/day-extra-events';

export function ScheduleScreen({}: RootTabScreenProps<'ScheduleTab'>) {
  const [scheduleType, setScheduleType] = useState(ScheduleType.Main);
  const [currentDayId, setCurrentDayId] = useState<DayId>();
  const isDayEventsLoading = useDayEventsLoading(currentDayId);

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
        <DayMainEvents dayId={currentDayId} />
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
