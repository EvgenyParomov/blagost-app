import { TimeSection } from '@blagost/admin/entities/day';
import { useUpsertTimeSection } from '@blagost/admin/features/manage-schedule';
import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import { TimeSection as TimeSectionComponent } from './TimeSection';

export function TimeSections({
  timeSections,
  dayId,
}: {
  timeSections: TimeSection[];
  dayId: DayId;
}) {
  const upsertTimeSection = useUpsertTimeSection(dayId);
  return (
    <Box sx={{ mb: 2 }}>
      <Typography mb={1} variant="h6" component="h6">
        Основные мероприятия
      </Typography>
      <Box mb={1}>
        <LoadingButton
          loading={upsertTimeSection.isLoading}
          onClick={upsertTimeSection.upsert}
          variant="contained"
        >
          Добавить секцию
        </LoadingButton>
      </Box>
      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
        {timeSections.map((ts) => (
          <TimeSectionComponent dayId={dayId} key={ts.id} timeSection={ts} />
        ))}
      </Box>
    </Box>
  );
}
