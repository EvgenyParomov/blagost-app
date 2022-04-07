import { Text, StyledProps } from 'native-base';
import { ReactNode } from 'react';

type Props = {
  sx?: StyledProps;
  children?: ReactNode;
};

export const EventNameText = ({ sx, children }: Props) => {
  return (
    <Text
      numberOfLines={1}
      ellipsizeMode="tail"
      fontWeight="600"
      fontSize="md"
      {...sx}
    >
      {children}
    </Text>
  );
};
