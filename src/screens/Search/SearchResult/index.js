import { View, Text, StyleSheet, ToastAndroid, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchComponent from '../../../components/SearchComponent'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import SearchPostScreen from '../SearchPostScreen'
import SearchUserScreen from '../SearchUserScreen'
import SearchGroupScreen from '../SearchGroupScreen'
import { navigationRef } from '../../../store'
import SearchFileScreen from '../SearchFileScreen'
import RowComponent from '../../../components/RowComponent'
import GoBackIcon from '../../../components/GoBackComponent/GoBackIcon'
import SpaceComponent from '../../../components/SpaceComponent'
import { OpacityButtton } from '../../../components/ButtonComponent'
import Ionicons from 'react-native-vector-icons/Ionicons'
const Tab = createMaterialTopTabNavigator()

const SearchResultScreen = ({ navigation, route }) => {
  const [search, setSearchResult] = useState(route.params.search)

  useEffect(() => {
    setSearchResult(route.params.search)
  }, [])

  const onGoBack = () => navigation.goBack()
  // const updatedOnGoBack = () => navigation.goBack()
  const updatedOnGoBack = () => navigation.navigate('SearchScreen', {search})


  return (
    <View style={{ flex: 1 }}>
      
      <RowComponent onPress={updatedOnGoBack}>
        <GoBackIcon color={'blue'} size={32} onNavigate={onGoBack} />
        <SpaceComponent width={8} />
        <TextInput
        onPress={updatedOnGoBack}
          placeholder={'Nhập nội dung tìm kiếm...'}
          value={search}
          style={{
            flex: 1,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1
          }}
        />
        <SpaceComponent width={16} />
     
          <OpacityButtton width={38} height={32} >
            <Ionicons name="search" size={32} color={'blue'} />
          </OpacityButtton>
      </RowComponent>
      {/* <SearchComponent onSearch={updatedOnGoBack}  title={'Nhập nội dung tìm kiếm...'} value={search} />  */}

      <Tab.Navigator
        style={{ justifyContent: 'center', margin: 0, padding: 0, flex: 1 }}
        screenOptions={{
          tabBarLabelStyle: stypes.tabBarLabelStyle,
          tabBarItemStyle: stypes.tabBarStyle,
          tabBarStyle: stypes.tabBarContainer,
          lazy: true
        }}
        initialRouteName="SearchPostScreen"
        screenListeners={{
          focus: () => navigationRef.setParams({ search: search }),
          blur: () => navigation.un
        }}
      >
        <Tab.Screen
          options={{
            tabBarLabel: 'Bài viết'
          }}
          name="SearchPostScreen"
          component={SearchPostScreen}
          initialParams={{ search }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: 'Người dùng'
          }}
          name="SearchUserScreen"
          component={SearchUserScreen}
          initialParams={{ search }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: 'Nhóm'
          }}
          name="SearchGroupScreen"
          component={SearchGroupScreen}
          initialParams={{ search }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: 'File phương tiện '
          }}
          name="SearchFileScreen"
          component={SearchFileScreen}
          initialParams={{ search }}
        />
      </Tab.Navigator>
    </View>
  )
}

const stypes = StyleSheet.create({
  tabBarStyle: {
    margin: 0,
    paddingTop: 8,
    marginBottom: 8,
    height: 32,
    justifyContent: 'flex-start'
  },
  tabBarLabelStyle: {
    textTransform: 'none'
  },
  tabBarContainer: {}
})

export default SearchResultScreen
