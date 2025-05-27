import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostHeader from './components/PostHeader'
import PostContent from './components/PostContent'
import PostFooter from './components/PostFooter'
import SpaceComponent from '../SpaceComponent'
import { POST_TYPE } from '../../utils/Constants'
import RowComponent from '../RowComponent'
import { API } from '../../api'
import AvatarComponent from '../AvatarComponent'
import PostItem from '../PostItem'

const getGroupName = async (groupID) => {
  const name = await API.getGroupByIDAPI(groupID).then((response) => response.data.name)
  return name
}

const WrappedPostItem = ({ item, ownerID, groupID, onRemove }) => {
  const [groupInfo, setGroupInfo] = useState({})

  useEffect(() => {
    item.groupID &&
      API.getGroupByIDAPI(groupID).then((response) => {
        setGroupInfo({ name: response.data.name, avatar: response.data.avatar })
      })
  }, [])

  return (
    <View style={{ flex: 1, marginHorizontal: 8 }}>
      <PostItem groupID={groupID} item={item} onRemove={onRemove} ownerID={ownerID} />
      {/* {item.type === POST_TYPE.PERSONAL ? (
        <>
          <PostHeader onRemove={onRemove} item={item} ownerID={ownerID} groupID={groupID} />
          <SpaceComponent height={8} />
          <PostContent content={item.content} attachments={item.attachments} />
          <SpaceComponent height={16} />
          <PostFooter postID={item._id} item={item} ownerID={ownerID} />
        </>
      ) : (
        <View>
          <RowComponent style={{ alignItems: 'flex-start' }}>
            <AvatarComponent source={API.getFileUrl(groupInfo.avatar)} size={36} />
            <SpaceComponent width={8} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#333', fontSize: 17, fontWeight: '700' }}>
                {groupInfo.name}
              </Text>
              <PostHeader
                avatarSize={24}
                textSize={14}
                showGroup
                onRemove={onRemove}
                item={item}
                ownerID={ownerID}
                groupID={groupID}
              />
            </View>
          </RowComponent>
          <SpaceComponent height={4} />
          <View style={{ marginHorizontal: 12 }}>
            <SpaceComponent height={8} />
            <PostContent content={item.content} attachments={item.attachments} />
            <SpaceComponent height={16} />
            <PostFooter postID={item._id} item={item} ownerID={ownerID} />
          </View>
        </View>
      )} */}
    </View>
  )
}

export default WrappedPostItem
