import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View
} from 'react-native'

import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'
import { API } from '../../api'
import CommentItem from '../../components/CommentItem'
import SpaceComponent from '../../components/SpaceComponent'
import SocketClient from '../../socket'
import { RESPONSE_STATUS } from '../../utils/Constants'
import EditableModal from '../EditableModal'
import PopUpModal from '../PopUpModal'
import CustomInput from './CustomInput'

const CommentModal = React.memo(({ modalVisible, onClose, postID }) => {
  const [commentData, setCommmentData] = useState([])
  const [parentData, setParentData] = useState([])
  const childData = useRef()
  const state = useSelector(selectCurrentUser)

  const [editableModal, setEditableModal] = useState(false)
  const [deletableModal, setDeletableModal] = useState(false)
  const [editableItem, setEditableItem] = useState()
  const [replyItem, setReplyItem] = useState()
  useEffect(() => {
    // if (modalVisible && commentData.length === 0) {
    // if (commentData.length === 0) {
    API.getPostCommentsAPI(postID).then((data) => {
      if (data.length) {
        setCommmentData(data)
        handleRenderCommentData(data)
      }
    })
    // }
  }, [modalVisible, postID])

  const handleCloseModal = () => {
    onClose()
  }

  const handleShowEditableModal = (item) => {
    setEditableItem(item)
    setEditableModal(true)
  }

  const handleShowDeletableModal = (item) => {
    setEditableItem(item)
    setDeletableModal(true)
  }

  const handleCloseEditableModal = useCallback(() => setEditableModal(false), [])
  const handleCloseDeletableModal = useCallback(() => setDeletableModal(false), [])

  useEffect(() => {
    handleSocketOn()
  }, [])

  const handleSocketOn = () => {
    if (!SocketClient.socket) {
      console.warn('socket is not initial')
    }
    SocketClient.socket.on('emitAddComment', (data) => {
      handleSetParentData(data.comment)
    })

    SocketClient.socket.on('emitEditComment', (data) => {
      setParentData((pre) => {
        const customData = [...pre]
        const filterIndex = customData.findIndex((item) => item._id === data.comment._id)
        if (filterIndex !== -1) {

          customData[filterIndex] = data.comment
        }
        return customData
      })
    })

    SocketClient.socket.on('emitDeleteComment', (data) => {
      setParentData((pre) => {
        const newArr = pre.filter((item) => item._id !== data.commentID)
        return newArr
      })
    })
    SocketClient.socket.on('emitReactionComment', (data) => {
      setParentData((pre) => {
        const customData = [...pre]
        const filterIndex = customData.findIndex((item) => item._id === data.commentID)
        if (filterIndex !== -1) {
          customData[filterIndex].reactions = data.reactions
        }
        return customData
      })
    })
  }
  const handleRenderCommentData = (data) => {
    const parentDataArr = data.filter((item) => item.parentID === null)
    setParentData(parentDataArr)
    handleSetChilData(parentDataArr, data)
  }

  const handleSetChilData = (parents, comments) => {
    const childObject = {}
    parents.forEach((parent) => {
      const childElement = comments.filter((item) => item.rootParentID === parent._id)
      childObject[parent._id] = childElement
    })
    childData.current = childObject
  }

  const onViewChildItem = (parentID) => {
    setParentData((pre) => {
      const parentIndex = pre.findIndex((item) => item._id === parentID)
      const newItem = [
        ...pre.slice(0, parentIndex + 1),
        ...childData.current[parentID],
        ...pre.slice(parentIndex + 1)
      ]
      return newItem
    })
  }

  const handleSetParentData = (data) => {
    setParentData((pre) => {
      const customArr = [...pre]
      const localArr = [].concat(pre)
      localArr.reverse()
      const editableIndex = localArr.findIndex(
        (item) => item._id === data.rootParentID || item.rootParentID === data.rootParentID
      )
      customArr.splice(pre.length - editableIndex, 0, {
        ...data,
        parentUserName: replyItem?.userName,
        parentUserID: replyItem?.userID
      })
      return customArr
    })
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
    if (replyItem) {
      customData.rootParentID = replyItem.rootParentID ?? replyItem._id
    }
    API.storeCommentAPI(customData)
      .then((data) => {
        // handleSetParentData(data)
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
        // setCommmentData((pre) => {
        //   const customArr = pre.filter((item) => item._id !== editableItem._id)
        //   return customArr
        // })
      } else {
        ToastAndroid.show('Lỗi xảy ra, xóa bình luận thất bại', ToastAndroid.SHORT)
      }
      handleCloseDeletableModal()
    })
  }

  const handleReactComment = (commentID) => {
    API.reactCommentAPI(commentID, state._id).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        // setCommmentData((pre) => {
        //   const updatableIndex = pre.findIndex((item) => item._id === commentID)
        //   if (response.data) {
        //     const customArr = [...pre]
        //     customArr[updatableIndex] = {
        //       ...customArr[updatableIndex],
        //       reactions: [...customArr[updatableIndex].reactions, state._id]
        //     }
        //     return customArr
        //   } else {
        //     const customArr = [...pre]
        //     customArr[updatableIndex] = {
        //       ...customArr[updatableIndex],
        //       reactions: customArr[updatableIndex].reactions.filter((item) => item !== state._id)
        //     }
        //     return customArr
        //   }
        // })
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
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}
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
            {!parentData?.length && (
              <View>
                <Text style={styles.noCommentTitle}>Chưa có bình luận nào</Text>
                <Text style={styles.noCommentSubTitle}>Hãy để lại bình luận của bạn đầu tiên</Text>
              </View>
            )}
            <FlatList
              style={styles.flatListComment}
              data={parentData}
              ListFooterComponent={<SpaceComponent height={32} />}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <CommentItem
                  item={item}
                  ownerID={state._id}
                  onEdit={handleShowEditableModal}
                  onDelete={handleShowDeletableModal}
                  onReact={handleReactComment}
                  onReply={handlePrereplyComment}
                  onClose={handleCloseModal}
                  onViewChildItem={onViewChildItem}
                />
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

export default CommentModal

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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3339',
    alignSelf: 'center',
    marginTop: '50%'
  },
  noCommentSubTitle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#3336',
    textAlign: 'center'
  }
})
