import { EventListItem, EventsList } from '@blagost/mobile/entities/event';
import { useLectorById } from '@blagost/mobile/entities/lector';
import { LectorsTabScreenProps } from '@blagost/mobile/shared/interfaces';
import { useGetFileUrl } from '@blagost/mobile/shared/lib/settings';
import { Overlay } from '@blagost/mobile/shared/ui/overlay';
import { ScrollView } from 'native-base';
import React from 'react';
import { useQuery } from 'react-query';
import { LectorEvent } from './view/lector-event';
import { LectorEvents } from './view/lector-events';
import { LectorLinks } from './view/lector-links';
import { LectorMainInfo } from './view/lector-main-info';
import { LectorPhotos } from './view/lector-photos';
import { LectorVideo } from './view/lector-video';

export const LectorScreen = ({
  route: {
    params: { id },
  },
}: LectorsTabScreenProps<'Lector'>) => {
  const lectorQuery = useLectorQuery(id);

  if (lectorQuery.isLoading) return <Overlay />;

  const lector = lectorQuery.data;

  if (!lector) return null;

  return (
    <ScrollView flex="1" _contentContainerStyle={{ px: '6', py: '10' }}>
      <LectorMainInfo
        fullName={lector.fullName}
        avatarUrl={lector.avatar}
        description={lector.description}
      />
      <LectorEvents sx={{ mt: 5 }}>
        <EventsList>
          {lector.events.map((event) => (
            <LectorEvent {...event} />
          ))}
        </EventsList>
      </LectorEvents>
      {lector.links.length !== 0 && (
        <LectorLinks sx={{ mt: '6' }} links={lector.links} />
      )}
      {lector.video && (
        <LectorVideo sx={{ mt: '10' }} videoUrl={lector.video} />
      )}
      {lector.photos.length !== 0 && (
        <LectorPhotos
          sx={{ ml: '-6', mr: '-6', mt: '10' }}
          photos={lector.photos}
        />
      )}
    </ScrollView>
  );
};

function useLectorQuery(id: LectorId) {
  const getImageUrl = useGetFileUrl();
  return useQuery({
    ...useLectorById(id),
    select: (data) => ({
      ...data,
      avatar: getImageUrl(data.avatar),
      photos: data.photos.map((photo) => getImageUrl<string>(photo)),
      video: getImageUrl(data.video),
    }),
  });
}
