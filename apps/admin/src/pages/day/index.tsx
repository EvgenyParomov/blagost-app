import { dayDtoToDay, useDayByIdQuery } from '@blagost/admin/entities/day';
import { useParamId } from '@blagost/admin/lib/use-param-id';
import { Box, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useQuery } from 'react-query';
import { TimeSections } from './TimeSections';
import { AdditionalTimes } from './AdditionalTimes';
import { SelectEventProvider } from '@blagost/admin/entities/event';

type Props = {};
export function DayPage({}: Props) {
  const Router = useRouter();
  const festivalId = useParamId<FestivalId>('id');
  const dayId = useParamId<DayId>('dayId');

  const { day } = useDay(dayId);

  return (
    <SelectEventProvider>
      <Box>
        <Box>
          <NextLink
            href={`/festivals/${encodeURIComponent(festivalId)}`}
            passHref
          >
            <Link>Назад</Link>
          </NextLink>
        </Box>
        <Typography variant="h2" component="h2" mb={5}>
          {day?.date.toLocaleString({
            month: 'long',
            day: '2-digit',
            weekday: 'long',
          })}
        </Typography>
        {day && (
          <TimeSections dayId={day.id} timeSections={day?.timeSections ?? []} />
        )}
        <AdditionalTimes additionalTimes={day?.additionalTimes ?? []} />
      </Box>
    </SelectEventProvider>
  );
}

function useDay(dayId: DayId) {
  const { data, isLoading } = useQuery({
    ...useDayByIdQuery(dayId),
    select: dayDtoToDay,
  });

  return {
    day: data,
    isLoading,
  };
}
