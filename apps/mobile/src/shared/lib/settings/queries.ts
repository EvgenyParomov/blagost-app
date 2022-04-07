import { Dto, createUseQuery, getRes } from '@blagost/api';
import { useQuery } from 'react-query';

export const settingsBaseKey = 'settings';
export const settingsKey = () => [settingsBaseKey, 'get'];

export const useSettings = createUseQuery({
  key: settingsKey,
  fetcher: (api) => api.get<Dto.MobileSettings>('/settings').then(getRes),
});
