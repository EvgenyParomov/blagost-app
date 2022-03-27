import { Text, StyledProps } from 'native-base';
import { ReactNode } from 'react';

type Props = {
  sx?: StyledProps;
  children?: ReactNode;
};

export const EventPlaceText = ({ sx, children }: Props) => {
  return (
    <Text numberOfLines={1} ellipsizeMode="tail" color="cyan.400" {...sx}>
      {children}
    </Text>
  );
};
