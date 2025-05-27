import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
  FlatList,
  ToastAndroid
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { API } from '../../api'
import CustomInput from './CustomInput'
import CommentItem from '../../components/CommentItem'
import SpaceComponent from '../../components/SpaceComponent'
import EditableModal from '../EditableModal'
import PopUpModal from '../PopUpModal'
import { RESPONSE_STATUS } from '../../utils/Constants'
import { useCustomContext } from '../../store'
import { stat } from 'react-native-fs'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'

const CommentModelOrigin = React.memo(({ modalVisible, onClose, postID }) => {
  const [commentData, setCommmentData] = useState([])
  const state = useSelector(selectCurrentUser)

  const [editableModal, setEditableModal] = useState(false)
  const [deletableModal, setDeletableModal] = useState(false)
  const [editableItem, setEditableItem] = useState()
  const [replyItem, setReplyItem] = useState()
  useEffect(() => {

    if (modalVisible) {
      API.getPostCommentsAPI(postID).then((data) => {
        if (data) {
          setCommmentData(handleRenderData(data))
        }
      })
    }
  }, [modalVisible, postID])

  const handleCloseModal = () => onClose()
  const handleShowEditableModal = (item) => {
    setEditableItem(item)
    setEditableModal(true)
  }
  const handleShowDeletableModal = (item) => {
    setEditableItem(item)
    setDeletableModal(true)
  }
  const handleCloseEditableModal = () => setEditableModal(false)
  const handleCloseDeletableModal = () => setDeletableModal(false)

  const handleRenderData = (data) => {
    const parentData = data.filter((item) => item.parentID === null)
    const childItem = data.filter((item) => item.parentID !== null)
    const customData = []
    parentData.forEach((item) => {
      const localArr = childItem.filter((child) => child.parentID === item._id)
      const customArr = localArr.map((element) => ({
        ...element,
        parentUserName: item.userName,
        parentUserID: item.userID
      }))
      customData.push(item, ...customArr)
    })
    return customData
  }

  const handleSendComment = (value) => {
    const customData = {
      postID: postID,
      parentID: replyItem?._id ? replyItem._id : null,
      userID: state._id,
      userName: state.userName,
      avatar: state.avatar,
      content: value
    }
    API.storeCommentAPI(customData)
      .then((data) => {
        setCommmentData((pre) => {
          const customArr = [...pre]
          const localArr = [].concat(pre)
          localArr.reverse()
          const editableIndex = localArr.findIndex(
            (item) => item._id === data.parentID || item.parentID === data.parentID
          )
          customArr.splice(pre.length - editableIndex, 0, {
            ...data,
            parentUserName: replyItem?.userName,
            parentUserID: replyItem?.userID
          })
          return customArr
        })
      })
      .catch((error) => {
        console.log('error when store comment: ', error)
      })

    setReplyItem(null)
  }

  const handleEditComment = (value) => {
    API.editCommentAPI(editableItem._id, { value: value }).then((response) => {
      if (response === RESPONSE_STATUS.SUCCESS) {
        ToastAndroid.show('Chỉnh sửa bình luận thành công', ToastAndroid.SHORT)
        setCommmentData((pre) => {
          const editableIndex = pre.findIndex((item) => item._id === editableItem._id)
          const customArr = [...pre]
          customArr[editableIndex] = { ...customArr[editableIndex], content: value }
          return customArr
        })
      } else {
        ToastAndroid.show('Lỗi xảy ra, chỉnh sửa thất bại', ToastAndroid.SHORT)
      }
      handleCloseEditableModal()
    })
  }

  const handleDeleteComment = () => {
    API.deleteCommentAPI(postID, editableItem._id).then((response) => {
      if (response === RESPONSE_STATUS.SUCCESS) {
        ToastAndroid.show('Bình luận đã được gỡ bỏ', ToastAndroid.SHORT)
        setCommmentData((pre) => {
          const customArr = pre.filter((item) => item._id !== editableItem._id)
          return customArr
        })
      } else {
        ToastAndroid.show('Lỗi xảy ra, xóa bình luận thất bại', ToastAndroid.SHORT)
      }
      handleCloseDeletableModal()
    })
  }

  const handleReactComment = (commentID) => {
    API.reactCommentAPI(commentID, state._id).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setCommmentData((pre) => {
          const updatableIndex = pre.findIndex((item) => item._id === commentID)
          if (response.data) {
            const customArr = [...pre]
            customArr[updatableIndex] = {
              ...customArr[updatableIndex],
              reactions: [...customArr[updatableIndex].reactions, state._id]
            }
            return customArr
          } else {
            const customArr = [...pre]
            customArr[updatableIndex] = {
              ...customArr[updatableIndex],
              reactions: customArr[updatableIndex].reactions.filter((item) => item !== state._id)
            }
            return customArr
          }
        })
      } else {
        ToastAndroid.show('Lỗi xảy ra, chỉnh sửa thất bại', ToastAndroid.SHORT)
      }
      handleCloseEditableModal()
    })
  }

  const handlePrereplyComment = (item) => {
    setReplyItem({ ...item, focus: true })
  }

  const handleCanclePreReplyComment = () => {
    setReplyItem(null)
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        handleCloseModal
      }}
    >
      <Pressable style={styles.pressableContainer} onPress={handleCloseModal}>
        <Pressable style={styles.pressableBody} onPress={(e) => e.stopPropagation()}>
          <View style={styles.modalContainer}>
            <View
              style={{
                height: 16,
                backgroundColor: '#fff',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
              }}
            />
            {commentData.length === 0 && (
              <View>
                <Text style={styles.noCommentTitle}>Chưa có bình luận nào</Text>
                <Text style={styles.noCommentSubTitle}>Hãy để lại bình luận của bạn đầu tiên</Text>
              </View>)}
            <FlatList
              style={styles.flatListComment}
              data={commentData}
              ListFooterComponent={<SpaceComponent height={32} />}
              keyExtractor={(item) => item._id}
              renderItem={React.useCallback(
                ({ item }) => (
                  <CommentItem
                    item={item}
                    ownerID={state._id}
                    key={item._id}
                    onEdit={handleShowEditableModal}
                    onDelete={handleShowDeletableModal}
                    onReact={handleReactComment}
                    onReply={handlePrereplyComment}
                    onClose={handleCloseModal}
                  />
                ),
                []
              )}
            />
            <CustomInput
              onSubmit={handleSendComment}
              onCancel={handleCanclePreReplyComment}
              replyItem={replyItem}
            />
          </View>
          <EditableModal
            title={'Chỉnh sửa bình luận'}
            content={editableItem?.content}
            modalVisible={editableModal}
            onClose={handleCloseEditableModal}
            onSubmit={handleEditComment}
          />
          <PopUpModal
            modalVisible={deletableModal}
            title={'Xóa bình luận?'}
            subtitle={'Bình luận này sẽ bị gỡ bỏ khỏi bài viết!'}
            onCancle={handleCloseDeletableModal}
            onSubmit={handleDeleteComment}
          />
        </Pressable>
      </Pressable>
    </Modal>
  )
})

export default CommentModelOrigin

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 1,
    paddingTop: 24
  },

  pressableBody: {
    flex: 1
  },

  modalContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 12
  },

  flatListComment: {
    flex: 1,
    padding: 12,
    paddingBottom: 0,
    backgroundColor: '#fff'
  },

  modalTitle: {
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 10,
    color: '#a2f',
    fontSize: 16,
    fontWeight: '500'
  },
  noCommentTitle: {
    fontSize:24,
    fontWeight:'bold',
    color:'#3339',
    alignSelf:'center',
    marginTop:'50%'
  },
  noCommentSubTitle: {
    fontSize:16,
    fontWeight:'300',
    color:'#3336',
    textAlign:'center'
  }
})
