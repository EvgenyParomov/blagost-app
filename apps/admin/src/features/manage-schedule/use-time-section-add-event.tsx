import { useEventsList, useSelectEvent } from '@blagost/admin/entities/event';
import { useMutation, useQuery } from 'react-query';
import { useTimeSectionAddEventMutation } from './queries';

export function useTimeSectionAddEvent(
  dayId: DayId,
  timeSectionId: TimeSectionId
) {
  const { data: options = [] } = useQuery({
    ...useEventsList({ notInTimeSection: timeSectionId }),
    select: (data) =>
      data.map(({ id, lectors, name }) => ({
        id,
        label: `${name} / ${lectors.join(', ')}`,
      })),
  });

  const addEventMutation = useMutation({
    ...useTimeSectionAddEventMutation(),
  });

  const selectEvent = useSelectEvent();

  const addEvent = async () => {
    const eventId = await selectEvent({
      options,
    });
    addEventMutation.mutate({
      eventId,
      timeSectionId,
      dayId,
    });
  };

  return {
    addEvent,
    isLoading: addEventMutation.isLoading,
  };
}
