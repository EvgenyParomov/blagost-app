import { useEventById } from '@blagost/mobile/entities/event';
import { Overlay } from '@blagost/mobile/shared/ui/overlay';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'native-base';
import React from 'react';
import { useQuery } from 'react-query';
import { EventTitle } from './view/event-title';
import { useGetFileUrl } from '@blagost/mobile/shared/lib/settings';
import { EventInfo } from './view/event-info';
import { ScreenScope } from '@blagost/mobile/shared/interfaces';
import { EventMoreInfo } from './view/event-more-info';

export const EventScreen = () => {
  const { id, scope } = useParams();
  const eventQuery = useEventQuery(id);
  const { goToLector } = useRedirectrs(scope);

  if (eventQuery.isLoading) return <Overlay />;
  const event = eventQuery.data;
  if (!event) return null;

  return (
    <ScrollView flex="1">
      <EventTitle sx={{ mt: '6' }} name={event.name} />
      <EventInfo sx={{ mt: '6' }} {...event} onLectorPress={goToLector} />
      <EventMoreInfo {...event} sx={{ mt: '6', pb: '16' }} />
    </ScrollView>
  );
};

function useParams() {
  const {
    params: { id, scope },
  } = useRoute<RouteProp<{ Event: { id: EventId; scope: ScreenScope } }>>();

  return {
    id,
    scope,
  };
}

function useRedirectrs(scope: ScreenScope) {
  const navigation = useNavigation<any>();
  return {
    goToLector: (id: LectorId) => navigation.push('Lector', { scope, id }),
  };
}

function useEventQuery(id: EventId) {
  const getUrl = useGetFileUrl();

  return useQuery({
    ...useEventById(id),
    select: (data) => ({
      ...data,
      lectors: data?.lectors?.map((l) => ({ ...l, avatar: getUrl(l.avatar) })),
      participants: data?.participants?.map((p) => ({
        ...p,
        avatar: getUrl(p.avatar),
      })),
      video: getUrl(data?.video),
      photos: data?.photos.map((photo) => getUrl(photo)),
      place: data?.place
        ? {
            ...data.place,
            mapPhoto: getUrl(data?.place?.mapPhoto),
          }
        : undefined,
    }),
  });
}
