import { useMutation } from 'react-query';
import { useTimeSectionRemoveEventMutation } from './queries';

export function useTimeSectionRemoveEvent(
  dayId: DayId,
  timeSectionId: TimeSectionId
) {
  const removeEventMutation = useMutation({
    ...useTimeSectionRemoveEventMutation(),
  });

  const removeEvent = async (eventId: EventId) => {
    removeEventMutation.mutate({
      eventId,
      timeSectionId,
      dayId,
    });
  };

  return {
    removeEvent,
    isLoading: removeEventMutation.isLoading,
  };
}
