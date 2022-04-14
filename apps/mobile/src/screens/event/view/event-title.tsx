import { Box, StyledProps, Text } from 'native-base';

type Props = {
  sx?: StyledProps;
  name: string;
};

export const EventTitle = ({ sx, name }: Props) => {
  return (
    <Box px="4" {...sx}>
      <Text textAlign="center" fontSize="3xl" lineHeight="sm">
        {name}
      </Text>
    </Box>
  );
};
