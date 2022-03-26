import { createUseQueryOptional, Dto, getRes } from '@blagost/api';
import { stringify } from 'qs';

export const eventBaseKey = 'day';
export const eventsListKey = (query: Dto.EventFiltersDto) => [
  eventBaseKey,
  'byTimeSection',
  query,
];

export const useEventsList = createUseQueryOptional({
  key: eventsListKey,
  fetcher: (api, query) =>
    api.get<Dto.PartialEventDto[]>(`/event?${stringify(query)}`).then(getRes),
});
