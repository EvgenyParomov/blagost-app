import { Dto, createUseQueryOptional, getRes } from '@blagost/api';

export const dayBaseKey = 'day';
export const dayByIdKey = (id?: DayId) => [dayBaseKey, 'byId', id];

export const useDayByIdQuery = createUseQueryOptional({
  key: dayByIdKey,
  fetcher: (api, id) => api.get<Dto.DayDto>(`schedule/day/${id}`).then(getRes),
});
