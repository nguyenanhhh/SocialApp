import {
  Pressable,
  StyleSheet,
  Text,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native'
import AvatarComponent from '../AvatarComponent'
import ColumnComponent from '../ColumnComponent'
import RowComponent from '../RowComponent'
import SpaceComponent from '../SpaceComponent'
import { helper } from '../../utils/helpers'
import React, { useEffect, useState } from 'react'
import { API } from '../../api'
import BottomModal from '../../modals/BottomModal'
import { OpacityButtton } from '../ButtonComponent'
import Octicons from 'react-native-vector-icons/Octicons'
import { navigationRef } from '../../store'

const CommentItem = React.memo(
  ({ item, ownerID, onEdit, onDelete, onReact, onReply, onClose, onViewChildItem }) => {
    const [expand, setExpand] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const handleShowModal = () => setModalVisible(true)
    const handleCloseModal = () => setModalVisible(false)

    const handleEdit = () => onEdit(item)
    const handleDelete = () => onDelete(item)
    const handleReact = () => onReact(item._id)
    const handleReply = () => onReply(item)
    const handleNavigate = () => {
      onClose()
      navigationRef.navigate('ProfileScreen', { userID: item.parentUserID })
    }

    const openProfile = () => {
      onClose()
      navigationRef.navigate('ProfileScreen', {ownerID, userID: item.userID})
    }

    return (
      <View>
        <SpaceComponent height={item.parentID ? 0 : 12} />
        <RowComponent
          style={{ alignItems: 'flex-start', marginLeft: item.parentID !== null ? 32 : 0 }}
        >
          <AvatarComponent source={API.getFileUrl(item.avatar)} size={32} onPress={openProfile} />
          <SpaceComponent width={8} />
          <View style={{ flex: 1 }}>
            <ColumnComponent style={styles.wrapperComment} onLongPress={handleShowModal}>
              <View>
                <RowComponent>
                  <OpacityButtton onPress={openProfile} textSize={16} title={item.userName} />
                  <SpaceComponent width={8} />
                  <Text style={{ fontSize: 14 }}>
                    {helper.DateTimeHelper.displayTimeDescendingFromDate(item.createdAt)}
                  </Text>
                </RowComponent>
                <SpaceComponent height={4} />
                <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                  <Text style={{ fontSize: 15, color: '#000' }}>
                    <Text onPress={handleNavigate} style={{ fontSize: 15, color: '#11fa' }}>
                      {item.parentUserName}{' '}
                    </Text>
                    {item.content}
                  </Text>
                </View>
              </View>
            </ColumnComponent>
            <RowComponent>
              <SpaceComponent width={14} />
              {item.reactions.findIndex((child) => child === ownerID) === -1 ? (
                <OpacityButtton title={'Thích'} onPress={handleReact} />
              ) : (
                <OpacityButtton
                  textStyle={{ fontWeght: '700' }}
                  submit
                  title={'Đã thích'}
                  onPress={handleReact}
                />
              )}
              <SpaceComponent width={16} />
              <OpacityButtton
                textStyle={{ fontWeght: '700' }}
                title={'Trả lời'}
                onPress={handleReply}
              />
            </RowComponent>
            {!expand && item.commentChildCount > 0 && item.parentID === null && (
              <OpacityButtton
                title={`Xem thêm ${item.commentChildCount} câu trả lời`}
                onPress={() => {
                  onViewChildItem(item._id)
                  setExpand(true)
                }}
              />
            )}
          </View>
          <SpaceComponent width={16} />
          {item.reactions.length > 0 && (
            <View style={{ width: 32, alignItems: 'center' }}>
              <Octicons name={'heart'} size={18} />
              <SpaceComponent height={4} />
              <Text>{item.reactions.length}</Text>
            </View>
          )}
          <BottomModal
            modalVisible={modalVisible}
            onClose={handleCloseModal}
            onDelete={handleDelete}
            onReact={handleReact}
            onEdit={handleEdit}
            onReply={handleReply}
            ownerID={ownerID}
            userID={item.userID}
            content={item.content}
            reactionStatus={item.reactions.findIndex((child) => child === ownerID) !== -1}
          />
        </RowComponent>
      </View>
    )
  }
)

const styles = StyleSheet.create({
  wrapperComment: {
    backgroundColor: '#eee',
    borderRadius: 16,
    marginRight: 20,
    paddingHorizontal: 24,
    paddingVertical: 4
  }
})

export default CommentItem
