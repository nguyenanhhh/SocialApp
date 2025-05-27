import { ScrollView } from 'react-native'
import React from 'react'
import SpaceComponent from '../../../components/SpaceComponent'
import { navigationRef } from '../../../store'
import { OpacityButtton } from '../../../components/ButtonComponent'

const CustomButton = ({ title, onPress }) => {
  return (
    <OpacityButtton
      title={title}
      borderWidth={1}
      borderColor="#aaa"
      bgColor={'#eee'}
      borderRadius={20}
      padding={4}
      paddingHorizontal={8}
      onPress={onPress}
    />
  )
}

const NavBarComponent = ({ userID, groupID, groupName }) => {
  const onClickGroupIntroduce = () =>
    navigationRef.navigate('GroupIntroduceScreen', { groupID, groupName })
  const onClickGroupUser = () =>
    navigationRef.navigate('GroupUserScreen', { userID, groupID, groupName })
  const onClickGroupMember = () =>
    navigationRef.navigate('GroupMemberScreen', { groupID, groupName })
  const onClickGroupImage = () => navigationRef.navigate('GroupImageScreen', { groupID, groupName })
  const onClickGroupVideo = () => navigationRef.navigate('GroupVideoScreen', { groupID, groupName })

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={{ justifyContent: 'space-around', backgroundColor:'#fff', paddingVertical:8 }}
    >
      <SpaceComponent width={8} />
      <CustomButton title={'Giới thiệu'} onPress={onClickGroupIntroduce} />
      <SpaceComponent width={8} />
      <CustomButton title={'Bạn'} onPress={onClickGroupUser} />
      <SpaceComponent width={8} />
      <CustomButton title={'Thành viên'} onPress={onClickGroupMember} />
      <SpaceComponent width={8} />
      <CustomButton title={'Hình ảnh'} onPress={onClickGroupImage} />
      <SpaceComponent width={8} />
      <CustomButton title={'Video'} onPress={onClickGroupVideo} />
    </ScrollView>
  )
}

export default NavBarComponent
