import { ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostHeader from '../../../components/PostItem/components/PostHeader'
import SpaceComponent from '../../../components/SpaceComponent'
import PostContent from '../../../components/PostItem/components/PostContent'
import { API } from '../../../api'
import { OpacityButtton } from '../../../components/ButtonComponent'
import Octicons from 'react-native-vector-icons/Octicons'
import RowComponent from '../../../components/RowComponent'
import FlatListComment from './FlatlistComment'
import TextComponent from '~/components/TextComponent'

const icon = {
  none: 'heart',
  react: 'heart-fill'
}

const SinglePostScreen = ({ navigation, route }) => {
  const [post, setPost] = useState()
  const { ownerID, postID } = route.params
  const [reaction, setReaction] = useState()
  console.log('single post: ', route.params)
  useEffect(() => {
    API.getReactionOfUserByTargetAPI(postID, ownerID)
      .then((data) => {
        setReaction(data)
      })
      .catch((error) => {
        console.log('Lỗi khi getReactionOfUserByTargetAPI ', error)
      })
  }, [])

  useEffect(() => {
    API.getPostAPI(postID).then((data) => {
      setPost(data)
    })
  }, [])
  console.log('post: ', post)

  return post ? (
    <View style={{ flex: 1, position: 'relative', backgroundColor: '#fff' }}>
      <View style={{ flex: 1, marginHorizontal: 8 }}>
        <SpaceComponent height={16} />
        <PostHeader groupID={post.groupID} item={post} ownerID={ownerID} />
        <SpaceComponent height={32} />
        <PostContent content={post.content} attachments={post?.attachments} />
        <SpaceComponent height={32} />
        <RowComponent>
          <RowComponent>
            <OpacityButtton
              children={<Octicons name={reaction?.status ? icon.react : icon.none} size={22} />}
            />
            <SpaceComponent width={4} />
            <TextComponent text={post.reactionsCount} size={20} />
          </RowComponent>
          <SpaceComponent width={32} />
          <RowComponent alignItems={'center'}>
            <OpacityButtton padding={0} children={<Octicons name="comment" size={22} />} />
            <SpaceComponent width={4} />
            <TextComponent text={post.commentsCount} size={20} />
          </RowComponent>
          <SpaceComponent width={32} />
          <OpacityButtton children={<Octicons name="share-android" size={22} />} />
        </RowComponent>
        <SpaceComponent height={12} />
        {post?.reactionsCount && (
          <TextComponent text={`Có ${post.reactionsCount} người thích bài viết này`} />
        )}
        <SpaceComponent height={24} />
        <FlatListComment postID={postID} />
      </View>
    </View>
  ) : (
    <></>
  )
}

export default SinglePostScreen
