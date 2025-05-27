import { View, Text } from 'react-native'
import React, { useState } from 'react'
import RowComponent from '../../../../components/RowComponent'
import { OpacityButtton } from '../../../../components/ButtonComponent'
import SpaceComponent from '../../../../components/SpaceComponent'
import FlatListPost from '../../../../components/FlatListPost'
import FriendScreen from '../../../Friend'
import NewPostBox from '../../../../components/NewPostBox'


const ProfileBody = ({ navigation, userID, ownerID, avatar }) => {
  const handleClickFriend = () => navigation.navigate('ListFriendScreen', { userID: userID })
  const handleClickImage = () => {navigation.navigate('ProfileImageScreen', {userID, ownerID})}
  const handleClickVideo = () => {navigation.navigate('ProfileVideoScreen', {ownerID, userID})}

  return (
    <View style={{ backgroundColor: '#fff' }}>
      <RowComponent style={{ justifyContent: 'space-around' }}>
       {ownerID === userID && ( <OpacityButtton title={'Bạn bè'} onPress={handleClickFriend} />)}
        <OpacityButtton title={'Ảnh'} onPress={handleClickImage} />
        <OpacityButtton title={'Video'} onPress={handleClickVideo} />
      </RowComponent>
      {ownerID === userID && <NewPostBox navigation={navigation} avatar={avatar} />}
      <SpaceComponent height={8} />

    </View>
  )
}

export default ProfileBody
