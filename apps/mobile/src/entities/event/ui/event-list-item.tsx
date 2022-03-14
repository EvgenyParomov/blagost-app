import { Text, Box } from "native-base";

type Props = {
  lectors: string[];
  name: string;
  place?: string;
};

export const EventListItem = ({ place, name, lectors }: Props) => {
  return (
    <Box>
      <Text numberOfLines={1} ellipsizeMode="tail" fontSize="md">
        {name}
      </Text>
      {lectors.map((lector) => (
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
