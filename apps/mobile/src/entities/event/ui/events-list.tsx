import { Box, Divider } from 'native-base';
import { ReactNode, Children } from 'react';
import { StdArray } from '@blagost/std';

type Props = { children: ReactNode };

export const EventsList = ({ children }: Props) => {
  const childrenArray = Children.toArray(children);

  return (
    <Box py="2">
      {StdArray.addElementBetween(childrenArray, () => (
        <Divider my="2" />
      ))}
    </Box>
  );
};
