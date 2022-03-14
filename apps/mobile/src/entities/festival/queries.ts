import { Dto, createUseQuery, getRes } from '@blagost/api';

export const festivalBaseKey = 'festival';
export const currentFestivalKey = () => [festivalBaseKey, 'current'];

export const useCurrentFestival = createUseQuery({
  key: currentFestivalKey,
  fetcher: (api) => api.get<Dto.CurrentFestivalDto>('/festival').then(getRes),
});
