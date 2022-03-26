import { ReactNode, useState } from 'react';
import { Box, HStack, Text, Pressable } from 'native-base';

import { Collapsed } from '@blagost/mobile/shared/ui';
import { Duration } from 'luxon';

type Props = {
  startTime: string;
  endTime: string;
  title: string;
  children?: ReactNode;
};
export const TimeSectionItem = ({
  title,
  endTime,
  startTime,
  children,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((s) => !s);
  };

  return (
    <Box
      bg="white"
      borderBottomWidth="1"
      borderTopWidth="1"
      borderColor="gray.200"
      px="4"
      pb="2"
    >
      <Pressable pt="3" pb="1" onPress={handleToggle}>
        <HStack space="2" alignItems="center">
          <Text fontSize="lg">
            {Duration.fromISOTime(startTime).toFormat('hh:mm')} -{' '}
            {Duration.fromISOTime(endTime).toFormat('hh:mm')}
          </Text>
          <Text fontSize="md">{title}</Text>
        </HStack>
      </Pressable>
      <Collapsed isOpen={isOpen}>{children}</Collapsed>
    </Box>
  );
};
