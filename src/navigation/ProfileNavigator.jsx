import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import IntroduceScreen from '~/screens/Profile/IntroduceScreen'
import ListFriendScreen from '~/screens/Friend'

const Tab = createMaterialTopTabNavigator()

function ProfileTopTabNavigator({ userID, children }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="IntroduceScreen" component={IntroduceScreen} />
      <Tab.Screen name="FriendScreen" component={ListFriendScreen} initialParams={{ userID }} />
    </Tab.Navigator>
  )
}

export default ProfileTopTabNavigator
