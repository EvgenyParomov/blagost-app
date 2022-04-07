import { Dimensions } from 'react-native';

export const vw = (num: number) => Dimensions.get('window').width * (num / 100);
export const vh = (num: number) =>
  Dimensions.get('window').height * (num / 100);

export const vmin = (num: number) =>
  Math.min(
    Dimensions.get('window').width * (num / 100),
    Dimensions.get('window').height * (num / 100)
  );
export const vmax = (num: number) =>
  Math.max(
    Dimensions.get('window').width * (num / 100),
    Dimensions.get('window').height * (num / 100)
  );
