import React, { ReactNode } from 'react';
import { Dto } from '@blagost/api';
import {
  Box,
  StyledProps,
  Text,
  Link,
  VStack,
  HStack,
  Avatar,
} from 'native-base';

type Lector = {
  id: LectorId;
  fullName: string;
  avatar: string;
};

type Props = {
  sx?: StyledProps;
  dateTimeDescription?: string;
  prepareDescription?: string;
  place?: Dto.PlaceDto;
  lectors?: Lector[];
  participants?: Lector[];
  onLectorPress: (id: LectorId) => void;
};

export const EventInfo = ({
  sx,
  dateTimeDescription,
  place,
  prepareDescription,
  lectors,
  participants,
  onLectorPress,
}: Props) => {
  const renderLector = (lector: Lector) => (
    <HStack space="2" alignItems="center">
      <Avatar size="md" source={{ uri: lector.avatar }} />
      <Box>
        <Text fontSize="lg" mb="-1">
          {lector.fullName}
        </Text>
        <Link
          onPress={() => onLectorPress(lector.id)}
          _text={{ color: 'cyan.500', fontSize: 'md' }}
        >
          Узнать подробнее?
        </Link>
      </Box>
    </HStack>
  );
  return (
    <Box {...sx}>
      {Boolean(lectors?.length) && (
        <InfoItem sx={{ py: '3' }}>
          <Text fontSize="md" mb="1" fontWeight="600">
            {lectors?.length === 1 ? 'Ведущий' : 'Ведущие'}
          </Text>
          <VStack space={'1'}>{lectors?.map(renderLector)}</VStack>
        </InfoItem>
      )}
      {dateTimeDescription && (
        <InfoItem>
          <Text fontSize="md" fontWeight="600">
            Время
          </Text>
          <Text fontSize="md">{dateTimeDescription}</Text>
        </InfoItem>
      )}
      {place && (
        <InfoItem>
          <Text fontSize="md" fontWeight="600">
            Место
          </Text>
          <Text fontSize="md">
            {place?.name}
            <Link pl="2" _text={{ color: 'cyan.500', fontSize: 'md' }}>
              Как добраться?
            </Link>
          </Text>
        </InfoItem>
      )}
      {prepareDescription && (
        <InfoItem>
          <Text fontSize="md" fontWeight="600">
            Как подготовиться
          </Text>
          <Text fontSize="md">{prepareDescription}</Text>
        </InfoItem>
      )}
      {Boolean(participants?.length) && (
        <InfoItem sx={{ py: '3' }}>
          <Text fontSize="md" mb="1" fontWeight="600">
            Учасники
          </Text>
          <VStack space={'2'}>{participants?.map(renderLector)}</VStack>
        </InfoItem>
      )}
    </Box>
  );
};

type InfoItemProps = {
  sx?: StyledProps;
  children?: ReactNode;
};

export const InfoItem = ({ sx, children }: InfoItemProps) => {
  return (
    <Box
      borderColor="gray.300"
      borderTopWidth="1"
      borderBottomWidth="1"
      bg="white"
      py="2"
      px="4"
      mb="-1px"
      {...sx}
    >
      {children}
    </Box>
  );
};
