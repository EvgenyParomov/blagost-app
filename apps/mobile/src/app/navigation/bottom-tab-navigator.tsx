import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NewsScreen } from '@blagost/mobile/screens/news/news.screen';
import { ScheduleScreen } from '@blagost/mobile/screens/schedule/schedule.screen';
import { RootTabParamList } from '@blagost/mobile/shared/interfaces';
import { Colors } from '@blagost/mobile/shared/constants';

import { useColorScheme } from 'react-native';
import { LectorsNavigator } from './lectors-navigator';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="ScheduleTab"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme!].tint,
      }}
    >
      <BottomTab.Screen
        name="ScheduleTab"
        component={ScheduleScreen}
        options={{
          header: () => null,
          title: 'Расписание',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar-o" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="LectorsTab"
        component={LectorsNavigator}
        options={{
          header: () => null,
          title: 'Переподаватели',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="slideshare" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="NewsTab"
        component={NewsScreen}
        options={{
          title: 'Новости',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="newspaper-o" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
