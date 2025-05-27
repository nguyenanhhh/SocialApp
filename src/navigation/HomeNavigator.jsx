import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '~/screens/home'
import ListFriendScreen from '~/screens/Friend'
import ExtensionScreen from '~/screens/Extension'
import NotificationScreen from '~/screens/Notificaton'
import OwnerProfile from '~/screens/Profile/Owner'
import { iconMap } from '~/utils/iconMap'
import Header from '~/components/Header'

const HomeNavigationDataArray = [
  {
    name: 'HomeScreen',
    component: HomeScreen,
    iconType: 'AntDesign',
    iconName: 'home'
  },
  {
    name: 'ListFriendScreen',
    component: ListFriendScreen,
    iconType: 'Ionicons',
    iconName: 'people-outline'
  },
  {
    name: 'ExtensionScreen',
    component: ExtensionScreen,
    iconType: 'Feather',
    iconName: 'grid'
  },
  {
    name: 'NotificationScreen',
    component: NotificationScreen,
    iconType: 'Ionicons',
    iconName: 'notifications-outline'
  },
  {
    name: 'OwnerProfile',
    component: OwnerProfile,
    iconType: 'AntDesign',
    iconName: 'user'
  }
]

const Tab = createBottomTabNavigator()
const HomeNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => {
          return <Header navigation={navigation} />
        },

        headerBackgroundContainerStyle: { backgroundColor: '#fff' },
        headerBackground: '#fff',
        headerStyle: { backgroundColor: '#fff' },
        headerTitleContainerStyle: { backgroundColor: '#fff' }
      }}
    >
      {HomeNavigationDataArray.map((item) => {
        const Icon = iconMap[item.iconType]
        return (
          <Tab.Screen
            name={item.name}
            component={item.component}
            key={item.name}
            options={{
              tabBarActiveTintColor: '#005AFF',
              tabBarShowLabel: false,
              tabBarIcon: ({focused}) => <Icon name={item.iconName} color={focused ? 'blue' : 'gray'} size={24} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

export default HomeNavigator
