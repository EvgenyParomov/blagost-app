import { AppProps } from 'next/app';
import { EmotionCache } from '@emotion/cache';
import { CssBaseline } from '@mui/material';

import { ComposeProviders } from '@blagost/react-std';
import { ConfirmationProvider } from '@blagost/admin/shared/ui/confirmation';

import { ThemeProvider } from './providers/theme-provider';
import { CssCacheProvider } from './providers/css-cache-provider';
import { AppApiProvider } from './providers/app-api-provider';
import { AppQueryClientProvider } from './providers/app-query-client';
import { AppNavigation } from './ui/app-navigation';
import { FestivalDialogProvider } from '../features/manage-festivals';
import { TimeSectionDialogProvider } from '../features/manage-schedule';

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

export function App({ Component, pageProps, emotionCache }: MyAppProps) {
  return (
    <ComposeProviders
      providers={[
        <CssCacheProvider cache={emotionCache} />,
        <AppApiProvider />,
        <AppQueryClientProvider />,
        <ThemeProvider />,
        <FestivalDialogProvider />,
        <TimeSectionDialogProvider />,
        <ConfirmationProvider />,
      ]}
    >
      <CssBaseline />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <AppNavigation
        links={[
          {
            href: '/festivals',
            text: 'Фестивали',
          },
        ]}
      >
        <Component {...pageProps} />
      </AppNavigation>
    </ComposeProviders>
  );
}
