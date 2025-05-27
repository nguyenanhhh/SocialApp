import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostHeader from './components/PostHeader'
import PostContent from './components/PostContent'
import PostFooter from './components/PostFooter'
import SpaceComponent from '../SpaceComponent'
import PollComponent from './components/PollComponent'

const PostItem = ({ item, ownerID, groupID, onRemove }) => {
  return (
    <View style={{ flex: 1, marginHorizontal: 8 }}>
      <PostHeader onRemove={onRemove} item={item} ownerID={ownerID} groupID={groupID} />
      <SpaceComponent height={8} />
      <PostContent content={item.content} attachments={item.attachments}  />

      <SpaceComponent height={16} />

      {item?.pollID && <PollComponent postID={item._id} pollID={item.pollID} />}
      <SpaceComponent height={16} />
      <PostFooter postID={item._id} item={item} ownerID={ownerID} />
    </View>
  )
}

export default PostItem
