import { Text, StyledProps } from 'native-base';
import { ReactNode } from 'react';

type Props = {
  sx?: StyledProps;
  children?: ReactNode;
  active?: boolean;
};

export const TimeSectionTitleText = ({
  active = false,
  sx,
  children,
}: Props) => {
  return (
    <Text fontSize="md" bold={active} {...sx}>
      {children}
    </Text>
  );
};
