import { ReactNode } from 'react';
import { Box, ScrollView } from 'native-base';

import { Overlay } from '../../../shared/ui/overlay';

type Props = {
  daySelect: ReactNode;
  scheduleSelect: ReactNode;
  children: ReactNode;
  isLoading?: boolean;
};

export function ScheduleLayout({
  children,
  daySelect,
  scheduleSelect,
  isLoading,
}: Props) {
  return (
    <Box flex="1">
      <Box bg="cyan.500" h="6"></Box>
      <Box>{daySelect}</Box>
      <Box>{scheduleSelect}</Box>
      <Box flex="1" style={{ position: 'relative' }}>
        {isLoading && <Overlay />}
        <ScrollView
          flex="1"
          _contentContainerStyle={{
            py: 2,
          }}
        >
          {children}
        </ScrollView>
      </Box>
    </Box>
  );
}
