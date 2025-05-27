import {
  View,
  StyleSheet,
  FlatList,
  ToastAndroid
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useCustomContext } from '../../../../store'
import { API } from '../../../../api'
import { RESPONSE_STATUS } from '../../../../utils/Constants'
import SpaceComponent from '../../../../components/SpaceComponent'
import CommentItem from '../../../../components/CommentItem'
import CustomInput from '../../../../modals/CommentModal/CustomInput'
import EditableModal from '../../../../modals/EditableModal'
import PopUpModal from '../../../../modals/PopUpModal'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'
import SocketClient from '~/socket'


const FlatListComment = ({ postID }) => {
  const [commentData, setCommmentData] = useState([])
  const state = useSelector(selectCurrentUser)

  const [editableModal, setEditableModal] = useState(false)
  const [deletableModal, setDeletableModal] = useState(false)
  const [editableItem, setEditableItem] = useState()
  const [replyItem, setReplyItem] = useState()
  useEffect(() => {
    API.getPostCommentsAPI(postID).then((data) => {
      if (data) {
        setCommmentData(handleRenderCommentData(data))
      }
    })
  }, [postID])

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

  const [parentData, setParentData] = useState([])
  const childData = useRef()

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
  // tương tự handlerenderdata
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
console.log(commentData)
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
    return customData.reverse()
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
        // setCommmentData((pre) => {
        //   const customArr = [...pre]
        //   const localArr = [].concat(pre)
        //   localArr.reverse()
        //   const editableIndex = localArr.findIndex(
        //     (item) => item._id === data.parentID || item.parentID === data.parentID
        //   )
        //   customArr.splice(pre.length - editableIndex, 0, {
        //     ...data,
        //     parentUserName: replyItem?.userName,
        //     parentUserID: replyItem?.userID
        //   })
        //   return customArr
        // })
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
        // setCommmentData((pre) => {
        //   const editableIndex = pre.findIndex((item) => item._id === editableItem._id)
        //   const customArr = [...pre]
        //   customArr[editableIndex] = { ...customArr[editableIndex], content: value }
        //   return customArr
        // })
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
    <View style={{flex:1}}>
      <CustomInput
      style={{borderBottomWidth: 1, borderBottomColor: '#ccc'}}
        onSubmit={handleSendComment}
        onCancel={handleCanclePreReplyComment}
        replyItem={replyItem}
      />
      <FlatList
        style={styles.flatListComment}
        data={parentData}
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
              onViewChildItem={onViewChildItem}
              onClose={() => {}}
            />
          ),
          []
        )}
      />
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
    </View>
  )
}

export default FlatListComment

const styles = StyleSheet.create({


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
  }
})
