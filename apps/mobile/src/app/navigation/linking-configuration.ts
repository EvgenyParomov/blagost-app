import * as Linking from 'expo-linking';
import { LinkingOptions } from '@react-navigation/native';
import { RootTabParamList } from '@blagost/mobile/shared/interfaces';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          ScheduleTab: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          NewsTab: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};

export default linking;
