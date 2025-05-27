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

const PostHeader = ({ item, user, ownerID}) => {
  const [modalVisible, setModalVisible] = useState(false)

  const handleCloseModal = () => setModalVisible(false)
  const handleShowModal = () => setModalVisible(true)

  return (
    <RowComponent style={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <RowComponent alignItems>
        <AvatarComponent source={API.getFileUrl(user.avatar)} size={32} />
        <SpaceComponent width={12} />
        <ColumnComponent>
          <Text style={styles.userName}>{user.userName}</Text>
          <Text>{helper.DateTimeHelper.displayTimeDescendingFromDate(item.createdAt)}</Text>
        </ColumnComponent>
      </RowComponent>
      <Entypo onPress={handleShowModal} name="dots-three-vertical" size={18} />
      <PostModal modalVisible={modalVisible} ownerID={ownerID} postID={item._id} ownerPostID={item.userID} onClose={handleCloseModal} />
    </RowComponent>
  )
}

export default PostHeader

const styles = StyleSheet.create({
  userName: {
    fontSize: 16,
    fontWeight: '700'
  }
})
