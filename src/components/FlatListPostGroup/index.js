import { FlatList, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { API } from '../../api'
import PostItem from '../PostItem'
import SpaceComponent from '../SpaceComponent'
import { REACTION_TYPE, RESPONSE_STATUS } from '../../utils/Constants'
import SocketClient from '../../socket'

const FlatListPostGroup = ({ groupID, ownerID, children }) => {
  const [postsData, setPostsData] = useState([])
  useEffect(() => {
    API.getGroupPostsOfGroupAPI(groupID).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS && response.data.length > 0) {
        setPostsData(response.data)
      }
    })
  }, [groupID])


  // POSTVIEW ACTION
  const timeoutRefs = useRef(new Map()) // Lưu timeout cho từng item
  const handleJoinPostIdRoom = (postID) => SocketClient.emitJoinRoomsByArray([postID])
  const handleExitPostIdRoom = (postID) => SocketClient.exitRooms([postID])
  const handleAddPostView = (pUserID, postID) => API.addPostViewAPI(pUserID, postID)

  const viewabilityConfig = { itemVisiblePercentThreshold: 10 }// 50% => item visible

  const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
    changed.forEach(({ item, isViewable }) => {
      const postID = item._id
      const userID = ownerID
      if (isViewable) {
        //nếu item hiển thị => join room preparing add postview
        handleJoinPostIdRoom(postID)
        const timeout = setTimeout(() => handleAddPostView(userID, postID), 2000)
        timeoutRefs.current.set(postID, timeout)
      } else {
        //item thoát khỏi view nhìn => exit room và check condition of postview
        handleExitPostIdRoom(item._id)
        if (timeoutRefs.current.has(postID)) {
          clearTimeout(timeoutRefs.current.get(postID))
          timeoutRefs.current.delete(postID)
        }
      }
    })
  }).current


  // // ON LISTEN REACTION ACTION
  // useEffect(() => {
  //   const event_name = REACTION_TYPE.POST + 'reaction'
  //   SocketClient.socket.on(event_name, (data) => {
  //     setPostsData((pre) => {
  //       const postList = [...pre]
  //       const filterIndex = postList.findIndex((item) => item._id === data.postID)
  //       postList[filterIndex].reactionsCount += data.number
  //       return postList
  //     })
  //   })
  // }, [])

  useEffect(() => {
    SocketClient.socket.on('emitAddPost', data => {
      setPostsData(pre => {
        const customArr = [data.post, ...pre]
        return customArr
      })
    })

    SocketClient.socket.on('emitEditPost', data => {
      setPostsData(pre => {
        const customArr = [...pre]
        const filterIndex = customArr.findIndex(item => item._id === data.post._id)
        if (filterIndex !== -1) {
          customArr[filterIndex] = data.post
        }
        return customArr
      })

    })
    SocketClient.socket.on('emitRemovePost', data => {
      setPostsData(pre => {
        const customArr = [...pre]
        const filterArr = customArr.filter(item => item._id !== data.postID)
        return filterArr
      })
    })

    SocketClient.socket.on('emitReactionPostChange', data => {
      setPostsData(pre => {
        const customArr = [...pre]
        const filterIndex = customArr.findIndex(item => item._id === data.post._id)
        if (filterIndex !== -1) {
          customArr[filterIndex] = data.post
        }
        return customArr
      })
    })

    SocketClient.socket.on('emitCommentPostChange', data => {
      setPostsData(pre => {
        const customArr = [...pre]
        const filterIndex = customArr.findIndex(item => item._id === data.post._id)
        if (filterIndex !== -1) {
          customArr[filterIndex] = data.post
        }
      })
    })
   
  }, [])

  return (
    <FlatList
      data={postsData}
      initialNumToRender={2}
      ItemSeparatorComponent={
        <View style={{ height: 4, flex: 1, marginVertical: 16, backgroundColor: '#ccc' }} />
      }
      ListFooterComponent={<SpaceComponent height={64} />}
      ListHeaderComponent={children}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      style={{backgroundColor:'#fff'}}
      renderItem={({ item, index }) => (
        <PostItem item={item} groupID={groupID} ownerID={ownerID} key={item._id} />
      )}
    />
  )
}

export default FlatListPostGroup
