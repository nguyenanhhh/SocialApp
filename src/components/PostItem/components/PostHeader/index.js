import { Text, StyleSheet, Modal } from 'react-native'
import React, { useState } from 'react'
import RowComponent from '../../../RowComponent'
import AvatarComponent from '../../../AvatarComponent'
import SpaceComponent from '../../../SpaceComponent'
import ColumnComponent from '../../../ColumnComponent'
import { helper } from '../../../../utils/helpers'
import { API } from '../../../../api'
import Entypo from 'react-native-vector-icons/Entypo'
import PostModal from '../../../../modals/PostModal'
import { SCOPE } from '../../../../utils/Constants'
import { OpacityButtton } from '../../../ButtonComponent'
import { navigate } from '../../../../store'
// {group.scope === SCOPE.PUBLIC ? (
//   <Ionicons name="earth" size={22} />
// ) : (
//   <Entypo name="lock" size={22} />
// )}

const getScopePost = scope => {
  switch (scope) {
    case SCOPE.PUBLIC: return 'Công khai'
    case SCOPE.FRIEND: return 'Bạn bè'
    case SCOPE.PRIVATE: return 'Chỉ mình tôi'
    default: 'công khai'
  }
}
//disable - ẩn dot-tree trong thùng rác
const PostHeader = ({ item, ownerID, groupID, disable }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const handleCloseModal = () => setModalVisible(false)
  const handleShowModal = () => setModalVisible(true)
  const handleToProfile = () => navigate('ProfileScreen', {userID: item.userID, ownerID})

  return (
    <RowComponent style={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <RowComponent alignItems>
        <AvatarComponent onPress={handleToProfile} source={API.getFileUrl(item.avatar)} size={32} />
        <SpaceComponent width={12} />
        <ColumnComponent>
          <OpacityButtton onPress={handleToProfile} left padding={0} title={item.userName} textStyle={styles.userName}  />
          <RowComponent>
            <Text>{helper.DateTimeHelper.displayTimeDescendingFromDate(item.createdAt)}</Text>
            <SpaceComponent width={8} />
            {!groupID && <Text style={{ color: '#a1f' }}>{getScopePost(item.scope)}</Text>}
          </RowComponent>
        </ColumnComponent>
      </RowComponent>
      {ownerID === item.userID && !disable && (
        <Entypo onPress={handleShowModal} name="dots-three-vertical" size={18} />
)}
      <PostModal
        modalVisible={modalVisible}
        ownerID={ownerID}
        postID={item._id}
        ownerPostID={item.userID}
        groupID={groupID}
        onClose={handleCloseModal}
      />
    </RowComponent>
  )
}

export default PostHeader

const styles = StyleSheet.create({
  userName: {
    fontSize: 17,
    fontWeight: '400'
  }
})
