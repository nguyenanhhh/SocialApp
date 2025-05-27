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
import { navigationRef } from '../../../../store'
import { OpacityButtton } from '../../../ButtonComponent'

const PostHeader = ({ item, ownerID, groupID, avatarSize, textSize, showGroup }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const handleCloseModal = () => setModalVisible(false)
  const handleShowModal = () => setModalVisible(true)
  const handleToProfile = () => navigationRef.navigate('ProfileScreen', {userID: item.userID, ownerID})
  return (
    <RowComponent style={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <RowComponent style={{ alignItems: 'center' }}>
        <AvatarComponent onPress={handleToProfile} source={API.getFileUrl(item.avatar)} size={avatarSize ?? 36} />
        <SpaceComponent width={8} />
        <ColumnComponent>
          <RowComponent>
            <OpacityButtton title={item.userName} textStyle={[styles.userName, { fontSize: textSize ?? 17 }]} />
            {showGroup && (
              <>
                <SpaceComponent width={8} />
                <Text>{helper.DateTimeHelper.displayTimeDescendingFromDate(item.createdAt)}</Text>
              </>
            )}
          </RowComponent>
          <RowComponent>
            {!showGroup && (
              <>
                <Text>{helper.DateTimeHelper.displayTimeDescendingFromDate(item.createdAt)}</Text>
                <SpaceComponent width={8} />
              </>
            )}
            {!groupID && <Text style={{ color: '#a1f' }}>{item.scope.toLowerCase()}</Text>}
          </RowComponent>
        </ColumnComponent>
      </RowComponent>
      {ownerID === item.userID && (
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
    fontSize: 16,
    fontWeight: '700'
  }
})
