import { Box, StyledProps } from 'native-base';
import { ReactNode } from 'react';

type Props = {
  sx?: StyledProps;
  children?: ReactNode;
};

export const ListRow = ({ sx, children }: Props) => {
  return (
    <Box
      bg="white"
      borderBottomWidth="1"
      borderTopWidth="1"
      borderColor="gray.200"
      px="4"
      {...sx}
    >
      {children}
    </Box>
  );
};
