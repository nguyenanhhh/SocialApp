import React, { useCallback, useEffect, useState } from 'react'
import RowComponent from '../../../RowComponent'
import Octicons from 'react-native-vector-icons/Octicons'
import { OpacityButtton } from '../../../ButtonComponent'
import SpaceComponent from '../../../SpaceComponent'
import CommentModal from '../../../../modals/CommentModal'
import { API } from '../../../../api'
import { useCustomContext } from '../../../../store'
import { Text, View } from 'react-native'
import { REACTION_TYPE } from '../../../../utils/Constants'
import PostReactionModal from '../../../../modals/PostReactionModal'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'

const icon = {
  none: 'heart',
  react: 'heart-fill'
}

const PostFooter = ({ postID, ownerID, item }) => {
  
  const state = useSelector(selectCurrentUser)

  const [modalVisible, setModalVisible] = useState(false)
  const [reaction, setReaction] = useState()
  const handleShowModal = () => {
    if(modalVisible) {
      setModalVisible(false)
      setModalVisible(true)
    } else {
      setModalVisible(true)
    }
  }
  const handleCloseModal = useCallback(() => setModalVisible(false), [])


  const [postReactionModal, setPostReactionModal] = useState(false)
  const handleShowPostReactionModel = useCallback(() => setPostReactionModal(true), [])
  const handleHidePostReactionModel = useCallback(() => setPostReactionModal(false), [])

  useEffect(() => {
    API.getReactionOfUserByTargetAPI(postID, ownerID)
      .then((data) => {
        setReaction(data)
      })
      .catch((error) => {
        console.log('Lỗi khi getReactionOfUserByTargetAPI ', error)
      })
  }, [])

  const handleUpdateReaction = () => {
    const customData = {
      targetID: postID,
      type: REACTION_TYPE.POST,
      userID: ownerID,
      userName: state.userName,
      avatar: state.avatar,
      status: reaction?.status
    }
    API.updateReactionOfUserByTargetAPI(customData)
      .then((data) => {
        setReaction(data)
      })
      .catch((error) => {
        console.log('Lỗi khi getReactionOfUserByTargetAPI ', error)
      })
  }

  return (
    <View>
      <RowComponent alignItems>
        <OpacityButtton
          onPress={handleUpdateReaction}
          children={<Octicons name={reaction?.status ? icon.react : icon.none} size={22} />}
        />
        <SpaceComponent width={24} />
        <OpacityButtton
          onPress={handleShowModal}
          children={<Octicons name="comment" size={22} />}
        />
        <SpaceComponent width={4} />
        <Text style={{ fontSize: 18, fontWeight: '700' }}>
          {item.commentsCount > 0 && item.commentsCount}
        </Text>
        <SpaceComponent width={24} />
        <OpacityButtton children={<Octicons name="share-android" size={22} />} />
        <CommentModal modalVisible={modalVisible} onClose={handleCloseModal} postID={postID} />
        <PostReactionModal modalVisible={postReactionModal} onClose={handleHidePostReactionModel} ownerID={state._id} postID={postID} />
      </RowComponent>
      {item.reactionsCount > 0 && <OpacityButtton fontWeight={'400'} textColor={'#333c'} left onPress={handleShowPostReactionModel} title={`Có ${item.reactionsCount} lượt thích bài viết này`} />}
    </View>
  )
}

export default PostFooter
