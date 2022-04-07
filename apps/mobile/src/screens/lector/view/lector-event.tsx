import { FontAwesome } from '@expo/vector-icons';
import {
  EventLectorsText,
  EventNameText,
  EventPlaceText,
} from '@blagost/mobile/entities/event';
import {
  Badge,
  Box,
  HStack,
  Icon,
  Pressable,
  StyledProps,
  Text,
} from 'native-base';
import React from 'react';

type Props = {
  sx?: StyledProps;
  id: EventId;
  name: string;
  dateTimeDescription?: string;
  isParticipant?: boolean;
  lectors: string[];
  place: string;
  onPress?: () => void;
};

export const LectorEvent = ({
  place,
  name,
  lectors,
  dateTimeDescription,
  isParticipant,
  onPress,
}: Props) => {
  return (
    <Pressable
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      _pressed={{
        opacity: 0.6,
      }}
      onPress={onPress}
    >
      <Box flexShrink="1">
        <EventNameText>{name}</EventNameText>
        {dateTimeDescription && (
          <Text fontSize="sm" color="gray.500">
            {dateTimeDescription}
          </Text>
        )}
        {lectors.length > 0 && (
          <EventLectorsText>{lectors.join(', ')}</EventLectorsText>
        )}
        {place && <EventPlaceText>{place}</EventPlaceText>}
        {isParticipant && (
          <Badge mt="1" mb="2" variant="subtle" alignSelf="flex-start">
            Участник
          </Badge>
        )}
      </Box>
      <Icon
        flexShrink="0"
        name="angle-right"
        color="gray.300"
        size="6"
        as={FontAwesome}
      />
    </Pressable>
  );
};
