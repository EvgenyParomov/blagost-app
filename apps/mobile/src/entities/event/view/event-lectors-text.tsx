import { Text, StyledProps } from 'native-base';
import { ReactNode } from 'react';

type Props = {
  sx?: StyledProps;
  children?: ReactNode;
};

export const EventLectorsText = ({ sx, children }: Props) => {
  return (
    <Text numberOfLines={1} ellipsizeMode="tail" {...sx}>
      {children}
    </Text>
  );
};
