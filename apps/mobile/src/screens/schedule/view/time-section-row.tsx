import { FontAwesome } from '@expo/vector-icons';
import React, { ReactNode, useState } from 'react';
import { HStack, Icon, Pressable, Text } from 'native-base';

import { Collapsed } from '@blagost/mobile/shared/ui';
import { Duration } from 'luxon';
import { ListRow } from './list-row';
import { TimeText } from '../../../shared/ui/time-text';
import { TimeSectionTitleText } from './texts/time-section-title-text';

type Props = {
  startTime: Duration;
  endTime: Duration;
  title: string;
  children?: ReactNode;
  type: TimeSectionType;
};
export const TimeSectionItem = ({
  title,
  endTime,
  startTime,
  children,
  type,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((s) => !s);
  };

  return (
    <ListRow
      sx={{
        pb: '3',
      }}
    >
      <Pressable
        pt="4"
        pb={type === 'one' ? 0 : 1}
        mb={type === 'one' ? -2 : 0}
        onPress={handleToggle}
      >
        <HStack space="2" alignItems="center">
          <TimeText
            active={type === 'empty'}
            startTime={startTime}
            endTime={endTime}
          />
          <TimeSectionTitleText active={type === 'empty'}>
            {title}
          </TimeSectionTitleText>
          {type === 'many' && (
            <Icon
              ml="auto"
              flexShrink="0"
              name={isOpen ? 'angle-up' : 'angle-down'}
              color="gray.300"
              size="5"
              as={FontAwesome}
            />
          )}
        </HStack>
      </Pressable>
      {type === 'many' && <Collapsed isOpen={isOpen}>{children}</Collapsed>}
      {type === 'one' && children}
    </ListRow>
  );
};
