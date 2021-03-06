import { EventScreen } from '@blagost/mobile/screens/event/event.screen';
import { LectorScreen } from '@blagost/mobile/screens/lector';
import { LectorsScreen } from '@blagost/mobile/screens/lectors';
import { LectorsTabStackParamList } from '@blagost/mobile/shared/interfaces';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<LectorsTabStackParamList>();

export const LectorsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lectors"
        component={LectorsScreen}
        options={{ headerTitle: 'Преподаватели' }}
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
      <Stack.Screen
        name="Event"
        component={EventScreen}
        options={{
          headerBackTitle: 'Назад',
          headerTitle: 'Мероприятие',
          contentStyle: { backgroundColor: 'white' },
        }}
      />
    </Stack.Navigator>
  );
};
