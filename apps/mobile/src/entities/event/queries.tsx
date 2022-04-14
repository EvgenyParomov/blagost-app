import { Dto, createUseQuery, getRes } from '@blagost/api';

export const eventBaseKey = 'event';
export const eventByIdKey = (eventId: EventId) => [
  eventBaseKey,
  'byId',
  eventId,
];
export const useEventById = createUseQuery({
  key: eventByIdKey,
  fetcher: (api, id) => api.get<Dto.EventDto>(`/event/${id}`).then(getRes),
});
