import { EventScreen } from '@blagost/mobile/screens/event/event.screen';
import { LectorScreen } from '@blagost/mobile/screens/lector';
import { ScheduleScreen } from '@blagost/mobile/screens/schedule';
import { ScheduleTabStackParamList } from '@blagost/mobile/shared/interfaces';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<ScheduleTabStackParamList>();

export const ScheduleNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Event"
        component={EventScreen}
        options={{
          headerBackTitle: 'Назад',
          headerTitle: 'Мероприятие',
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name="Lector"
        component={LectorScreen}
        options={{
          headerBackTitle: 'Назад',
          headerTitle: 'Преподаватель',
          contentStyle: { backgroundColor: 'white' },
        }}
      />
    </Stack.Navigator>
  );
};
