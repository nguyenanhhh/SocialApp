/* eslint-disable react/no-unstable-nested-components */
import { Button, FlatList, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import SpaceComponent from '../../../../../components/SpaceComponent'
import ChatItem from './components/ChatItem'
import { API } from '../../../../../api'
import SocketClient from '../../../../../socket'
import { MESSAGE_ACTION } from '../../../../../utils/Constants'
import { useCustomContext } from '../../../../../store'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'

const ChatList = React.memo(({ conventionID, onLongPress, search }) => {
  const state = useSelector(selectCurrentUser)

  const [chatData, setChatData] = useState([])
  const [historyTime, setHistoryTime] = useState(null)
  const [members, setMembers] = useState(new Map())
  const [ownerID, setOwnerID] = useState(state._id)
  const [offsets, setOffsets] = useState([])

  useEffect(() => {
    API.getConventionByIdAPI(conventionID).then((data) => {
      if (data) {
        setChatData(data.data.reverse() ?? [])
        setHistoryTime(data.createdAt)
        setMembers(() => {
          const arrMap = new Map()
          data.members.forEach((item) => arrMap.set(item._id, item))
          return arrMap
        })
      }
    })
  }, [])

  useEffect(() => {
    SocketClient.socket.on('convention', (value) => {
      if (value.action === MESSAGE_ACTION.ADD) {
        setChatData((pre) => {
          const { _id, senderID, message, type, createdAt, updatedAt } = value
          const pollID = value?.pollID
          const newData = { _id, senderID, message, type, createdAt, updatedAt, pollID: pollID }
          return [newData, ...pre]
        })
      } else if (value.action === MESSAGE_ACTION.EDIT || value.action === MESSAGE_ACTION.REMOVE) {
        setChatData((pre) => {
          const { messageID, message } = value
          const itemIndex = pre.findIndex((current) => current._id.toString() === messageID)
          const customItem = { ...pre.at(itemIndex), message: message }
          return [...pre.slice(0, itemIndex), customItem, ...pre.slice(itemIndex + 1)]
        })
      } else if (value.action === MESSAGE_ACTION.DELETE) {
        setChatData((pre) => {
          const { messageID, message } = value
          const itemIndex = pre.findIndex((current) => current._id.toString() === messageID)
          return [...pre.slice(0, itemIndex), ...pre.slice(itemIndex + 1)]
        })
      }
    })
  }, [])

  const flatlistRef = useRef()
  const handleScrollTo = () => {
    const customOffset = offsets.at(search)
    flatlistRef.current.scrollToOffset({
      animated: true,
      offset: customOffset.position - customOffset.height
    })
  }

  useEffect(() => {
    if (search && offsets.length > 0) {
      handleScrollTo(search)
    }
  }, [search, offsets])

  const onLayout = useCallback((height, index) => {
    if (search && index) {
      setOffsets((pre) => {
        const newArr = [...pre]
        newArr[index] = {
          height: height + 8,
          position: (newArr?.at(index - 1)?.position || 0) + height
        }

        return newArr
      })
    }
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        style={{ flex: 1, marginLeft: 8, marginRight: 8 }}
        inverted
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        data={chatData}
        keyExtractor={(item) => item._id}
        ref={flatlistRef}
        ListFooterComponent={<SpaceComponent height={64} />}
        ListHeaderComponent={<SpaceComponent height={32} />}
        ItemSeparatorComponent={<SpaceComponent height={8} />}
        renderItem={({ item, index }) => {
         return search ? (
            <ChatItem
              index={index}
              onLayout={onLayout}
              onLongPress={onLongPress}
              members={members}
              beforeItem={chatData[index + 1]}
              ownerID={ownerID}
              item={item}
              key={item._id}
              conventionID={conventionID}
              historyTime = {historyTime}

            />
          ) : (
            <ChatItem
              index={undefined}
              onLayout={onLayout}
              onLongPress={onLongPress}
              members={members}
              beforeItem={chatData[index + 1]}
              ownerID={ownerID}
              item={item}
              historyTime = {historyTime}
              key={item._id}
              conventionID={conventionID}
            />
          )
        }}
      />
    </View>
  )
})

export default ChatList
