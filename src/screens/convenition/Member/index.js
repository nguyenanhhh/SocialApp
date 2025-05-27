import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AvatarComponent from '../../../components/AvatarComponent'
import SpaceComponent from '../../../components/SpaceComponent'
import RowComponent from '../../../components/RowComponent'
import { API } from '../../../api'
import GoBackComponent from '../../../components/GoBackComponent'
import { MEMBER_ROLE } from '../../../utils/Constants'
import GoBackIcon from '../../../components/GoBackComponent/GoBackIcon'
import AntDesign from 'react-native-vector-icons/AntDesign'

const MemberScreen = ({ navigation, route }) => {
  const { members, rawMembers, conventionID } = route.params
  const handleClickMember = (userID) => {
    navigation.navigate('ProfileScreen', { userID: userID })
  }

  const handleAddMember = () => {

    const customUids = members.map(item => item._id)
    navigation.navigate('AddMemberScreen', { conventionID, uids: customUids })
  }
  return (
    <View style={{ marginHorizontal: 16 }}>
      {/* <GoBackComponent title={'Thành viên'} /> */}
      <SpaceComponent height={8} />
      <RowComponent style={{borderBottomWidth: 3, borderBottomColor:'#3996', paddingBottom:8}}>
        <GoBackIcon />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Thành viên</Text>
        </View>
        <AntDesign onPress={handleAddMember} name="adduser" size={32} />
      </RowComponent>
      <SpaceComponent height={32} />
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '500',
          fontSize: 18,
          color: 'blue',
          marginBottom: 16
        }}
      >
        Danh sách thành viên
      </Text>
      {members.map((item, index) => (
        <RowComponent alignItems key={index} style={{ marginBottom: 16 }}>
          <AvatarComponent size={48} source={API.getFileUrl(item.avatar)} />
          <SpaceComponent width={16} />
          <RowComponent alignItems onPress={() => handleClickMember(item._id)}>
            <Text style={{ fontWeight: '500', fontSize: 17 }}>{item.userName}</Text>
            <SpaceComponent width={8} />
            {item.role && item.role === MEMBER_ROLE.ADMIN && (
              <Text style={{ color: '#f40' }}>{'Trưởng nhóm'}</Text>
            )}
            {item.role && item.role === MEMBER_ROLE.MEMBER && (
              <Text style={{ color: '#38f' }}>{'Thành viên'}</Text>
            )}
          </RowComponent>
        </RowComponent>
      ))}
    </View>
  )
}

export default MemberScreen
