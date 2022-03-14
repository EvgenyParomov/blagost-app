import React from 'react';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Box, NativeBaseProvider } from 'native-base';

import { Navigation } from './navigation';
import { AppQueryClientProvider } from './providers/app-query-client-provider';
import { AppApiProvider } from './providers/app-api-provider';
import { ComposeProviders } from '@blagost/react-std';

export const App = () => {
  const colorScheme = useColorScheme();

  return (
    <NativeBaseProvider>
      <ComposeProviders
        providers={[<AppQueryClientProvider />, <AppApiProvider />]}
      >
        <Box bg="cyan.500"></Box>
        <Navigation colorScheme={colorScheme} />
      </ComposeProviders>
      <StatusBar style="light" />
    </NativeBaseProvider>
  );
};
