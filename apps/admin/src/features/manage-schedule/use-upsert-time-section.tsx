import { TimeSection } from '@blagost/admin/entities/day';
import { useMutation } from 'react-query';
import { useUpsertTimeSectionMutation } from './queries';
import { useGetTimeSectionDto } from './time-section-dialog';

export function useUpsertTimeSection(dayId: DayId, timeSection?: TimeSection) {
  const getTimeSectionDto = useGetTimeSectionDto();
  const upsertMutation = useMutation({
    ...useUpsertTimeSectionMutation(),
  });

  const upsert = async () => {
    const festival = await getTimeSectionDto({
      defaultTimeSection: timeSection,
      dayId,
    });
    upsertMutation.mutateAsync(festival);
  };

  return {
    upsert,
    isLoading: upsertMutation.isLoading,
  };
}
