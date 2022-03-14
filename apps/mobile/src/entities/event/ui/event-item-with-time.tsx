import { Text, Box, HStack } from "native-base";

type Props = {
  name: string;
  startTime: string;
  endTime?: string;
  place?: string;
  lectors: string[];
};

export const EventItemWithTime = ({
  lectors,
  place,
  endTime,
  startTime,
  name,
}: Props) => {
  return (
    <Box
      bg="white"
      borderBottomWidth="1"
      borderTopWidth="1"
      borderColor="gray.200"
      px="4"
      py="2"
    >
      <HStack space="2" alignItems="center">
        <Text fontSize="lg">
          {startTime} {!!endTime && `- ${endTime}`}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" fontSize="md">
          {name}
        </Text>
      </HStack>
      {lectors?.map((lector) => (
        <Text numberOfLines={1} ellipsizeMode="tail" bold>
          {lector}
        </Text>
      ))}
      {place && (
        <Text numberOfLines={1} ellipsizeMode="tail" color="cyan.400">
          {place}
        </Text>
      )}
    </Box>
  );
};
