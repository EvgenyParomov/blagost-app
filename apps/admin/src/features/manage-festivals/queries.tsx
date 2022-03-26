import { allFestivalsKey } from '@blagost/admin/entities/festival';
import { createUseMutation, Dto } from '@blagost/api';

export const useCreateFestivalMutation = createUseMutation({
  fetcher: (api, params: Dto.CreateFestival) => api.post('/festival', params),
  invalidateKeys: [allFestivalsKey],
});
export const useUpdateFestivalMutation = createUseMutation({
  fetcher: (api, params: Dto.UpdateFestival) => api.put('/festival', params),
  invalidateKeys: [allFestivalsKey],
});

export const useDeleteFestivalMutation = createUseMutation({
  fetcher: (api, params: { id: FestivalId }) =>
    api.delete(`/festival/${params.id}`),
  invalidateKeys: [allFestivalsKey],
});
