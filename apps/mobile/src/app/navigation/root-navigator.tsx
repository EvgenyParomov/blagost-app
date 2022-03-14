import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NotFoundScreen } from '@blagost/mobile/screens/not-found';
import { RootStackParamList } from '@blagost/mobile/shared/interfaces';

import { BottomTabNavigator } from './bottom-tab-navigator';

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
};
