import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Box,
} from '@mui/material';
import { DateTime } from 'luxon';
import { ReactNode } from 'react';

type Props = {
  name: string;
  start: DateTime;
  end: DateTime;
  timezone: string;
  onClick: () => void;
  actions: ReactNode;
};
export function FestivalCard({
  onClick,
  end,
  start,
  name,
  actions,
  timezone,
}: Props) {
  return (
    <Card sx={{ maxWidth: 345, mx: 2 }}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Box display="grid" gridTemplateColumns="auto 1fr" gap="10px">
            <Typography variant="body2" color="text.secondary">
              Дата начала:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {start.toFormat('dd.MM.yyyy')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Дата конца:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {end.toFormat('dd.MM.yyyy')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Часовой пояс:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {timezone}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>{actions}</CardActions>
    </Card>
  );
}
