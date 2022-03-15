import { DayCard } from '@blagost/admin/entities/day';
import { useFestivalByIdQuery } from '@blagost/admin/entities/festival';
import { useParamId } from '@blagost/admin/lib/use-param-id';
import { Box, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

type Props = {};
export function DayPage({}: Props) {
  const Router = useRouter();
  const festivalId = useParamId<FestivalId>('id');
  const { festival } = useFestival(festivalId);
  return (
    <Box>
      <Typography variant="h1" component="h1">
        {festival?.name}
      </Typography>
      <Box sx={{ mb: 2 }}>
        {festival?.days.map((day) => {
          return (
            <DayCard
              key={day.id}
              date={day.date}
              onClick={() => {
                Router.push(
                  `/festivals/${encodeURIComponent(
                    festivalId
                  )}/day/${encodeURIComponent(day.id)}`
                );
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}

function useFestival(id: FestivalId) {
  const { data, isLoading } = useQuery({
    ...useFestivalByIdQuery(id),
    select: (festival) => {
      return {
        ...festival,
        days: festival.days.map((day) => ({
          id: day.id,
          date: DateTime.fromISO(day.dateISO),
        })),
      };
    },
  });

  return {
    festival: data,
    isLoading,
  };
}
