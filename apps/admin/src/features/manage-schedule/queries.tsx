import { dayByIdKey } from '@blagost/admin/entities/day';
import { eventsListKey } from '@blagost/admin/entities/event';
import { createUseMutation, Dto } from '@blagost/api';

export const useUpsertTimeSectionMutation = createUseMutation({
  fetcher: (api, params: Dto.UpsertTimeSectionDto) =>
    api.post('schedule/time-section', params),
  invalidateKeys: [({ dayId }) => dayByIdKey(dayId)],
});

export const useDeleteTimeSectionMutation = createUseMutation({
  fetcher: (api, params: { dayId: DayId; timeSectionId: TimeSectionId }) =>
    api.delete(`schedule/time-section/${params.timeSectionId}`),
  invalidateKeys: [({ dayId }) => dayByIdKey(dayId)],
});

export const useTimeSectionAddEventMutation = createUseMutation({
  fetcher: (
    api,
    params: { dayId: DayId; timeSectionId: TimeSectionId; eventId: EventId }
  ) =>
    api.patch(
      `schedule/time-section/${params.timeSectionId}/add-event/${params.eventId}`
    ),
  invalidateKeys: [
    (params) => dayByIdKey(params.dayId),
    (params) => eventsListKey({ notInTimeSection: params.timeSectionId }),
  ],
});
