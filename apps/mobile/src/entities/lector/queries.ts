import { Dto, createUseQuery, getRes } from '@blagost/api';

export const lectorBaseKey = 'lector';
export const allLectorsKey = () => [lectorBaseKey, 'all'];
export const lectorByIdKey = (lectorId: LectorId) => [
  lectorBaseKey,
  'byId',
  lectorId,
];

export const useAllLectors = createUseQuery({
  key: allLectorsKey,
  fetcher: (api) => api.get<Dto.LectorPartialDto[]>('/lector').then(getRes),
});

export const useLectorById = createUseQuery({
  key: lectorByIdKey,
  fetcher: (api, id) => api.get<Dto.LectorDto>(`/lector/${id}`).then(getRes),
});
