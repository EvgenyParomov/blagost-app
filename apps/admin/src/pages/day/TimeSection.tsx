import {
  TimeSection as TimeSectionType,
  timeSectionTypes,
} from '@blagost/admin/entities/day';
import {
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  useDeleteTimeSection,
  useTimeSectionAddEvent,
  useTimeSectionRemoveEvent,
  useUpsertTimeSection,
} from '@blagost/admin/features/manage-schedule';

console.log(timeSectionTypes);
export function TimeSection({
  timeSection,
  dayId,
}: {
  dayId: DayId;
  timeSection: TimeSectionType;
}) {
  const upsertTimeSection = useUpsertTimeSection(dayId, timeSection);
  const deleteTimeSection = useDeleteTimeSection(dayId, timeSection.id);
  const addEvent = useTimeSectionAddEvent(dayId, timeSection.id);
  const removeEvent = useTimeSectionRemoveEvent(dayId, timeSection.id);
  return (
    <Paper elevation={2}>
      <Box px={2} pt={2}>
        <Box display="flex" mb={1}>
          <Typography>
            {timeSection.start.toFormat('HH:mm')} -{' '}
            {timeSection.end.toFormat('HH:mm')}
          </Typography>
          <Typography ml={1} fontWeight="bold">
            {timeSection.name}
          </Typography>
        </Box>
        <Chip label={timeSectionTypes?.[timeSection?.type]} />
      </Box>
      <List>
        {timeSection.events.map((event) => (
          <ListItem
            key={event.id}
            secondaryAction={
              <IconButton
                disabled={removeEvent.isLoading}
                onClick={() => removeEvent.removeEvent(event.id)}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={event.name}
              secondary={`${event.lectors.join(',')} / ${event.place}`}
            />
          </ListItem>
        ))}
      </List>
      <Box p={2} pt={0}>
        <LoadingButton
          onClick={upsertTimeSection.upsert}
          loading={upsertTimeSection.isLoading}
        >
          Изменить
        </LoadingButton>
        <LoadingButton
          loading={deleteTimeSection.isLoading}
          onClick={deleteTimeSection.deleteTimeSection}
        >
          Удалить
        </LoadingButton>
        <LoadingButton loading={addEvent.isLoading} onClick={addEvent.addEvent}>
          Добавить мероприятие
        </LoadingButton>
      </Box>
    </Paper>
  );
}
