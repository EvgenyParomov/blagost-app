import { FontAwesome } from '@expo/vector-icons';
import { useBooleanState } from '@blagost/react-std';
import { Box, HStack, Icon, Pressable, StyledProps, Text } from 'native-base';
import React, { ReactNode } from 'react';
import { Collapsed } from '@blagost/mobile/shared/ui';

type Props = {
  sx?: StyledProps;
  children?: ReactNode;
};

export const LectorEvents = ({ sx, children }: Props) => {
  const openEvents = useBooleanState(false);
  return (
    <Box px="4" pb="3" bg="white" borderRadius="sm" shadow="1" {...sx}>
      <Pressable pt="4" pb={1} onPress={openEvents.toggle}>
        <HStack space="2" alignItems="center">
          <Text fontSize="md">Мероприятия с преподавателем</Text>
          <Icon
            ml="auto"
            flexShrink="0"
            name={openEvents.is ? 'angle-up' : 'angle-down'}
            color="gray.300"
            size="5"
            as={FontAwesome}
          />
        </HStack>
      </Pressable>
      <Collapsed isOpen={openEvents.is}>{children}</Collapsed>
    </Box>
  );
};
