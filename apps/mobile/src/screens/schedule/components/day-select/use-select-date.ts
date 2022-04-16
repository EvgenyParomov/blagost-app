import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { DateTime } from 'luxon';
import { useCurrentFestival } from '@blagost/mobile/entities/festival';

export const useSelectDate = (
  currentDayId?: DayId,
  setCurrentDayId?: (id?: DayId) => void
) => {
  const { days = [] } = useFestivalDays();
  const minimumDate: DateTime | undefined = days[0]?.date;
  const maximumDate: DateTime | undefined = days[days.length - 1]?.date;

  const currentDayIndex = days.findIndex((day) => day.id === currentDayId);
  const currentDay = days[currentDayIndex];
  const previousDay = days[currentDayIndex - 1];
  const nextDay = days[currentDayIndex + 1];

  const disableNextDay = !nextDay;
  const disablePrevDay = !previousDay;

  const selectNextDay = () => {
    if (nextDay) {
      setCurrentDayId?.(nextDay.id);
    }
  };

  const selectPrevDay = () => {
    if (previousDay) {
      setCurrentDayId?.(previousDay.id);
    }
  };

  const selectDay = (date: Date) => {
    const todayDay = days.find((day) =>
      DateTime.fromJSDate(date).hasSame(day.date, 'day')
    );
    if (todayDay) {
      setCurrentDayId?.(todayDay.id);
    }
  };

  useEffect(() => {
    if (!currentDayId && days.length > 0) {
      const todayDay = days.find((day) =>
        DateTime.local().hasSame(day.date, 'day')
      );
      if (todayDay) {
        setCurrentDayId?.(todayDay.id);
      } else {
        setCurrentDayId?.(days[0].id);
      }
    }
  }, [days, currentDayId]);

  return {
    selectPrevDay,
    selectNextDay,
    selectDay,
    disablePrevDay,
    disableNextDay,
    currentDay,
    maximumDate,
    minimumDate,
  };
};

const useFestivalDays = () => {
  const { data: days, isLoading } = useQuery({
    ...useCurrentFestival(),
    select: (data) => {
      console.log(data);
      return data.days.map((day) => ({
        id: day.id,
        date: DateTime.fromISO(day.dateISO, { locale: data.timezone }),
      }));
    },
  });

  return {
    isLoading,
    days,
  };
};
