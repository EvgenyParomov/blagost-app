import { useConfirmation } from '@blagost/admin/shared/ui/confirmation';
import { useMutation } from 'react-query';
import { useDeleteTimeSectionMutation } from './queries';

export function useDeleteTimeSection(
  dayId: DayId,
  timeSectionId: TimeSectionId
) {
  const confirmation = useConfirmation();
  const deleteTimeSectionMutation = useMutation({
    ...useDeleteTimeSectionMutation(),
  });

  const deleteTimeSection = async () => {
    await confirmation({
      acceptText: 'Удалить',
      description: 'Вы действительно хотите удалить раздел времени?',
    });

    deleteTimeSectionMutation.mutate({ dayId, timeSectionId });
  };

  return {
    isLoading: deleteTimeSectionMutation.isLoading,
    deleteTimeSection,
  };
}
