import React from 'react';
import { useQuery } from 'react-query';
import { useAllLectors } from '@blagost/mobile/entities/lector';
import { LectorsTabScreenProps } from '@blagost/mobile/shared/interfaces';
import { Overlay } from '@blagost/mobile/shared/ui/overlay';
import { LectorsList, PartialLector } from './view/lectors-list';
import { PartialLectorView as LectorListItem } from './view/lector-list-item';
import { useGetFileUrl } from '@blagost/mobile/shared/lib/settings';

export const LectorsScreen = ({
  navigation,
}: LectorsTabScreenProps<'Lectors'>) => {
  const { data: lectorsList = [], isLoading } = useLectors();

  if (isLoading) return <Overlay />;

  return (
    <LectorsList
      data={lectorsList}
      renderItem={(lector) => (
        <LectorListItem
          id={lector.id}
          fullName={lector.fullName}
          avatarUrl={lector.avatarUrl}
          onPress={() => navigation.push('Lector', { id: lector.id })}
        />
      )}
    />
  );
};

function useLectors() {
  const getImageUrl = useGetFileUrl();
  return useQuery({
    ...useAllLectors(),
    select: (data) =>
      data.map<PartialLector>((lector) => ({
        ...lector,
        avatarUrl: getImageUrl(lector.avatar),
      })),
  });
}
