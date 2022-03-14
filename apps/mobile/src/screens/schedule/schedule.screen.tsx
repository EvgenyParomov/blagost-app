import { useState } from 'react';

import { DaySelect } from '@blagost/mobile/widgets/day-select';
import {
  ScheduleType,
  ScheduleTypeSelect,
} from '@blagost/mobile/widgets/schedule-type-select';
import { DayMainEvents } from '@blagost/mobile/widgets/day-main-events';
import { DayExtraEvents } from '@blagost/mobile/widgets/day-extra-events';
import { useDayEvents } from '@blagost/mobile/entities/day';
import { RootTabScreenProps } from '@blagost/mobile/shared/interfaces';

import { ScheduleLayout } from './ui/shcedule-layout';
import { useQuery } from 'react-query';

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
