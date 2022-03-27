import { Duration } from 'luxon';
import { Text, StyledProps } from 'native-base';

type Props = {
  sx?: StyledProps;
  startTime: Duration;
  endTime?: Duration;
  active?: boolean;
};

export const TimeText = ({ active = false, sx, endTime, startTime }: Props) => {
  return (
    <Text fontSize="md" bold={active} {...sx}>
      {startTime.toFormat('hh:mm')}{' '}
      {!!endTime && `- ${endTime.toFormat('hh:mm')}`}
    </Text>
  );
};
