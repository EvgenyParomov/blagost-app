import { Day } from '@blagost/admin/entities/day';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

export function AdditionalTimes({
  additionalTimes,
}: {
  additionalTimes: Day['additionalTimes'];
}) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography mb={1} variant="h6" component="h6">
        Дополнительные мероприятия
      </Typography>
      <Box mb={1}>
        <Button variant="contained">Добавить мероприятие</Button>
      </Box>
      <Paper elevation={2} sx={{ p: 2 }}>
        <List>
          {additionalTimes.map((additionalTime) => (
            <ListItem
              key={additionalTime.id}
              secondaryAction={
                <>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={
                  <Box display="flex">
                    <Typography>
                      {additionalTime.start.toFormat('HH:mm')}
                      {additionalTime.end ? ' - ' : ''}
                      {additionalTime.end?.toFormat('HH:mm')}
                    </Typography>
                    <Typography ml={1}>{additionalTime.event.name}</Typography>
                  </Box>
                }
                secondary={`
                      ${additionalTime.event.lectors.join(', ')}
                      /
                      ${additionalTime.event.place}
                `}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
