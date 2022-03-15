import { createUseQuery, getRes, Dto } from '@blagost/api';

export const festivalBaseKey = 'festival';
export const allFestivalsKey = () => [festivalBaseKey, 'all'];
export const festivalByIdKey = (id: FestivalId) => [
  festivalBaseKey,
  'byId',
  id,
];

export const useFestivalsQuery = createUseQuery({
  key: allFestivalsKey,
  fetcher: (api) =>
    api.get<Dto.PartialFestival[]>('/festival/all').then(getRes),
});

export const useFestivalByIdQuery = createUseQuery({
  key: festivalByIdKey,
  fetcher: (api, id) =>
    api.get<Dto.FestivalDto>(`/festival/${id}`).then(getRes),
});
