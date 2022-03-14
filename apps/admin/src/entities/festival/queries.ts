import { createUseQuery, getRes, Dto } from '@blagost/api';

export const festivalBaseKey = 'festival';
export const allFestivalsKey = () => [festivalBaseKey, 'all'];

export const useFestivalsQuery = createUseQuery({
  key: allFestivalsKey,
  fetcher: (api) =>
    api.get<Dto.PartialFestival[]>('/festival/all').then(getRes),
});
