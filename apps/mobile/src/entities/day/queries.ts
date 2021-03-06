import { Dto, createUseQueryOptional, getRes } from '@blagost/api';

export const dayBaseKey = 'day';
export const dayEventsKey = (id?: DayId) => [dayBaseKey, 'events', id];

export const useDayEvents = createUseQueryOptional({
  key: dayEventsKey,
  fetcher: (api, id) => api.get<Dto.DayDto>(`/schedule/day/${id}`).then(getRes),
});
