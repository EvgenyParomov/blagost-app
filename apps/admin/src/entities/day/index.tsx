import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { DateTime } from 'luxon';

type Props = {
  date: DateTime;
  onClick: () => void;
};
export function DayCard({ onClick, date }: Props) {
  return (
    <Card sx={{ my: 2 }}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {date.toLocaleString({
              month: 'long',
              day: '2-digit',
              weekday: 'long',
            })}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
