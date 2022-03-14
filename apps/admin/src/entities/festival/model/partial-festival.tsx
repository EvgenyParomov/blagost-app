import { Dto } from '@blagost/api';
import { DateTime } from 'luxon';

export type PartialFestival = {
  id: FestivalId;
  name: string;
  start: DateTime;
  end: DateTime;
  timezone: string;
};

export const dtoToPartialFestival = ({
  id,
  name,
  startISO,
  endISO,
  timezone,
}: Dto.PartialFestival): PartialFestival => ({
  id,
  name,
  timezone,
  start: DateTime.fromISO(startISO),
  end: DateTime.fromISO(endISO),
});

export const partialFestivalToCreateDto = ({
  start,
  end,
  ...rest
}: PartialFestival): Dto.CreateFestival => ({
  ...rest,
  startISO: start.toISODate(),
  endISO: end.toISODate(),
});

export const partialFestivalToUpdateDto = partialFestivalToCreateDto;
