import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FlatListConvention from '~/screens/convenition/FlatListConvention'
import FlatListFriend from '~/screens/convenition/FlatListFriend'

const Tab = createBottomTabNavigator()

const ConventionDataArray = [
  {
    name: 'FlatListConventionScreen',
    component: FlatListConvention,
    iconName: 'chatbubbles',
    iconSize: 28,
    iconColor: '#ccc'
  },
  {
    name: 'FlatListFriendScreen',
    component: FlatListFriend,
    iconName: 'people-sharp',
    iconSize: 28,
    iconColor: '#ccc'
  }
]

const ConventionNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerTitle: null, headerShown: false, tabBarShowLabel: false }}
    >
      {ConventionDataArray.map((item) => (
        <Tab.Screen
          key={item.name}
          options={{
            tabBarActiveTintColor: '#005AFF',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={item.iconName}
                color={focused ? 'blue' : item.iconColor}
                size={item.iconSize ?? 24}
              />
            )
          }}
          name={item.name}
          component={item.component}
        />
      ))}
    </Tab.Navigator>
  )
}

export default ConventionNavigator
