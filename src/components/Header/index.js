import { View, Text, TextInput, Image } from 'react-native'
import React from 'react'
import RowComponent from '../RowComponent'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SpaceComponent from '../SpaceComponent'
import { OpacityButtton } from '../ButtonComponent'
import { navigate } from '../../store'
const Header = ({ navigation }) => {
  const handleClickConvention = () => {
    navigate('ConventionScreen')
  }

  const handleClickSearch = () => {
    navigation.navigate('SearchScreen')
  }

  return (
    <RowComponent
      alignItems
      style={{
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#3334'
      }}
    >
      <Image
        source={require('../../assets/images/ute_logo.png')}
        style={{ width: 42, height: 42, margin: 0, padding: 0 }}
      />
      <RowComponent>
        <OpacityButtton
          onPress={handleClickSearch}
          children={<Ionicons name="search" size={30} />}
        />
        <SpaceComponent width={24} />
        <OpacityButtton
          padding={2}
          onPress={handleClickConvention}
          children={<AntDesign name="message1" size={24} />}
        />
      </RowComponent>
    </RowComponent>
  )
}

export default Header
