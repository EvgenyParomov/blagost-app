import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
export type ScreenScope = 'lectors' | 'schedule';

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  LectorsTab: undefined;
  ScheduleTab: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type LectorsTabStackParamList = {
  Lectors: undefined;
  Lector: {
    id: LectorId;
  };
  Event: {
    id: EventId;
  };
};

export type LectorsTabScreenProps<
  Screen extends keyof LectorsTabStackParamList
> = CompositeScreenProps<
  NativeStackScreenProps<LectorsTabStackParamList, Screen>,
  RootTabScreenProps<'LectorsTab'>
>;

export type ScheduleTabStackParamList = {
  Schedule: undefined;
  Lector: {
    id: LectorId;
  };
  Event: {
    id: EventId;
  };
};

export type ScheduleTabScreenProps<
  Screen extends keyof ScheduleTabStackParamList
> = CompositeScreenProps<
  NativeStackScreenProps<ScheduleTabStackParamList, Screen>,
  RootTabScreenProps<'ScheduleTab'>
>;
