import { ReactNode } from 'react';
import { Overlay } from '@blagost/mobile/shared/ui/overlay';
import { useFetchSettings } from '@blagost/mobile/shared/lib/settings';

type Props = {
  children?: ReactNode;
};

export const AppSettingsProvider = ({ children }: Props) => {
  const { isFetched } = useFetchSettings();

  if (isFetched) {
    return children as JSX.Element;
  } else {
    return <Overlay />;
  }
};
