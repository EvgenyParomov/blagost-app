import { FontAwesome } from '@expo/vector-icons';
import { Duration } from 'luxon';
import { Box, Pressable, Icon } from 'native-base';
import React from 'react';
import { EventLectorsText } from './event-lectors-text';
import { EventNameText } from './event-name-text';
import { EventPlaceText } from './event-place-text';
import { TimeText } from '../../../shared/ui/time-text';

type Props = {
  lectors: string[];
  name: string;
  place?: string;
  startTime?: Duration;
  endTime?: Duration;
};

export const EventListItem = ({
  place,
  name,
  lectors,
  endTime,
  startTime,
}: Props) => {
  return (
    <Pressable
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      _pressed={{
        opacity: 0.6,
      }}
    >
      <Box flexShrink="1">
        {startTime && <TimeText startTime={startTime} endTime={endTime} />}
        <EventNameText>{name}</EventNameText>
        {lectors.length > 0 && (
          <EventLectorsText>{lectors.join(', ')}</EventLectorsText>
        )}
        {place && <EventPlaceText>{place}</EventPlaceText>}
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
