import { FlatList, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { API } from '../../api'
import PostItem from '../PostItem'
import SpaceComponent from '../SpaceComponent'
import { useCustomContext } from '../../store'
import SocketClient from '../../socket'
import NewPostBox from '../NewPostBox'
import Stories from '../Stories'
import { REACTION_TYPE } from '../../utils/Constants'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'

const FlatListPostNewFeed = ({ navigation }) => {
  const [postsData, setPostsData] = useState([])
  const state = useSelector(selectCurrentUser)
  useEffect(() => {
    API.getNewFeedPostsAPI(state._id).then((response) => {
      setPostsData(response)
    })
  }, [])

  // ON LISTEN REACTION ACTION
  // useEffect(() => {
  //   const event_name = REACTION_TYPE.POST+'reaction'
  //   SocketClient.socket.on(event_name, (data) => {
  //     setPostsData((pre) => {
  //       const postList = [...pre]
  //       const filterIndex = postList.findIndex((item) => item._id === data.postID)
  //       if(filterIndex !== -1) {
  //         postList[filterIndex].reactionsCount += data.number
  //       }
  //       return postList
  //     })
  //   })

  // }, [])

  // ON LISTEN COMMENT ACTION
  // useEffect(() => {
  //   const event_name = 'comment_count'
  //   SocketClient.socket.on(event_name, (data) => {
  //     setPostsData((pre) => {
  //       const postList = [...pre]
  //       const filterIndex = postList.findIndex((item) => item._id === data.postID)
  //       postList[filterIndex].commentsCount += data.number
  //       return postList
  //     })
  //   })
  // }, [])

  // POSTVIEW ACTION
  const timeoutRefs = useRef(new Map()) // Lưu timeout cho từng item
  const handleJoinPostIdRoom = (postID) => SocketClient.emitJoinRoomsByArray([postID])
  // const handleExitPostIdRoom = (postID) => SocketClient.exitRooms([postID])
  const handleExitPostIdRoom = (postID) => {}
  const handleAddPostView = (userID, postID) => API.addPostViewAPI(userID, postID)

  const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
    changed.forEach(({ item, isViewable }) => {
      const postID = item._id
      const userID = state._id
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

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 10 // Chỉ định >= 50% là "hiển thị"
  }

  useEffect(() => {
    SocketClient.socket.on('emitAddPost', (data) => {
      setPostsData((pre) => {
        const customArr = [data.post, ...pre]
        return customArr
      })
    })

    SocketClient.socket.on('emitEditPost', (data) => {
      setPostsData((pre) => {
        const customArr = [...pre]
        const filterIndex = customArr.findIndex((item) => item._id === data.post._id)
        if (filterIndex !== -1) {
          customArr[filterIndex] = data.post
        }
        return customArr
      })
    })
    SocketClient.socket.on('emitRemovePost', (data) => {
      setPostsData((pre) => {
        const customArr = [...pre]
        const filterArr = customArr.filter((item) => item._id !== data.postID)
        return filterArr
      })
    })

    SocketClient.socket.on('emitReactionPostChange', (data) => {
      setPostsData((pre) => {
        const customArr = [...pre]
        const filterIndex = customArr.findIndex((item) => item._id === data.post._id)
        if (filterIndex !== -1) {
          customArr[filterIndex] = data.post
        }
        return customArr
      })
    })

    SocketClient.socket.on('emitCommentPostChange', (data) => {
      setPostsData((pre) => {
        const customArr = [...pre]
        const filterIndex = customArr.findIndex((item) => item._id === data.post._id)
        if (filterIndex !== -1) {
          customArr[filterIndex] = data.post
        }
        return customArr
      })
    })
  }, [])

  return (
    <FlatList
      // scrollEnabled={false}
      data={postsData}
      initialNumToRender={2}
      style={{ backgroundColor: '#fff' }}
      ItemSeparatorComponent={
        <View style={{ height: 4, marginVertical: 16, backgroundColor: '#fff' }} />
      }
      ListHeaderComponent={
        <View>
          {/* <Stories /> */}
          <SpaceComponent height={8} />
          <NewPostBox navigation={navigation} />
          <SpaceComponent height={8} />
          <SpaceComponent height={32} />
        </View>
      }
      ListFooterComponent={<SpaceComponent height={64} />}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      renderItem={({ item, index }) => <PostItem ownerID={state._id} item={item} key={item._id} />}
    />
  )
}

export default FlatListPostNewFeed
