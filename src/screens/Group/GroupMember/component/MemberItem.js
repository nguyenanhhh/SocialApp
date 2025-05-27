import React from 'react'
import RowComponent from '../../../../components/RowComponent'
import UserRowComponent from '../../../../components/UserRowComponent'
import { API } from '../../../../api'
import Entypo from 'react-native-vector-icons/Entypo'
import { MEMBER_ROLE } from '../../../../utils/Constants'

const MemberDetail = {
  [MEMBER_ROLE.ADMIN]: 'Admin',
  [MEMBER_ROLE.CENSOR]: 'Người kiểm duyệt',
  [MEMBER_ROLE.MEMBER]: 'Thành viên'
}

const MemberItem = ({ item, onOption, onPress }) => {
  const handleShowOption = () => {
    onOption(item)
  }
  const handlePress = () => onPress(item)

  return (
    <>
      <UserRowComponent
        key={item._id}
        name={item.userName}
        textSize={14}
        detail={MemberDetail[item.role]}
        avatar={item.avatar}
        avatarSize={36}
        margin={4}
        onPress={handlePress}
      >
        <RowComponent style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Entypo style={{paddingHorizontal:4, paddingVertical:2}} onPress={handleShowOption} name="dots-three-vertical" size={18} />
        </RowComponent>
      </UserRowComponent>
    </>
  )
}

export default MemberItem
