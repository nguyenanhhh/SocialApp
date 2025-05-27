/* eslint-disable react-native/no-inline-styles */
import { useEffect, useState, lazy, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RowComponent from '../../../components/RowComponent'
import styles from './styles'
import { API } from '../../../api'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import ChatHeader from './components/ChatHeader'
import ChatInput from './components/ChatInput'
import { actions, useCustomContext } from '../../../store'
import ChatList from './components/ChatList'
import ChatItemModal from './components/ChatItemModal'
import SocketClient from '../../../socket'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { MESSAGE_NOTIFY_STATUS, MESSAGE_NOTIFY_TYPE, MESSAGE_TYPE } from '../../../utils/Constants'
import SpaceComponent from '../../../components/SpaceComponent'
import PollModal from '../../../modals/PollModal'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'

const ChattingSearchScreen = ({ navigation, route }) => {
  let { userID } = route.params
  const ownerID = route.params?.ownerID
  const [conventionID, setConventionID] = useState(route.params.conventionID)
  const [chatData, setChatData] = useState([])
  const stateValue = useSelector(selectCurrentUser)

  const [state, setState] = useState(stateValue ? stateValue : route.params.ownerInfo)
  const [members, setMembers] = useState(new Map())
  const [conventionInfo, setConventionInfo] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [pollModalVisible, setPollModalVisible] = useState(false)
  const [selectionItem, setSelectionItem] = useState({})
  const [searchStatus, setSearchStatus] = useState(false)
  const setDataForConvention = (data) => {
    setConventionID(data._id)
    setMembers(() => {
      const membersMap = new Map()
      data.members.forEach((item) => {
        membersMap.set(item._id, item)
      })
      return membersMap
    })
    const userData = data.members.filter((item) => item._id !== state._id).at(0)
    if (data.avatar) {
      if (data.name) {
        setConventionInfo({
          type: data.type,
          name: data.name,
          avatar: data.avatar,
          conventionName: data.name
        })
      } else {
        setConventionInfo({
          type: data.type,
          name: userData.aka || userData.userName,
          avatar: data.avatar,
          conventionName: data.name
        })
      }
    } else if (data.name) {
      setConventionInfo({
        type: data.type,
        name: data.name,
        avatar: userData.avatar,
        conventionName: data.name
      })
    } else {
      setConventionInfo({
        type: data.type,
        name: userData.aka || userData.userName,
        avatar: userData.avatar,
        conventionName: data.name
      })
    }
  }

  const getConventionByID = async () => {
    if (conventionID) {
      const data = await API.getConventionByIdAPI(conventionID)
      if (data) {
        setDataForConvention(data)
      }
    } else {
      const userData = await API.getUserByIdAPI({ uid: userID })
      setConventionInfo({ type: 'private', name: userData.userName, avatar: userData.avatar })
    }
  }

  const handleSendMessage = async (message, type, pollID) => {
    const data = {
      senderID: state._id || ownerID,
      type: type,
      userID,
      message: message
    }
    if (pollID) {
      data.pollID = pollID
    }
    if (!conventionID) {
      const newData = await API.createConventionAPI({
        data: data,
        senderAvatar: state.avatar,
        senderName: state.userName
      })
      setConventionID(newData._id)
    } else {
      const fetchData = await API.sendMessageAPI({
        conventionID: conventionID,
        data: data,
        senderAvatar: state.avatar,
        senderName: state.userName
      })
    }
  }

  useEffect(() => {
      getConventionByID(conventionID)
  }, [conventionID])



  const handleClickDetail = () => {
    navigation.navigate('DetailContainerScreen', {conventionID})
  }

  const handleOnClose = useCallback(() => {
    setModalVisible((pre) => !pre)
  }, [])

  const handleOnShow = useCallback((item) => {
    setSelectionItem(item)
    setModalVisible((pre) => !pre)
  }, [])

  const handleCall = () => {
    navigation.navigate('MeetingScreen', {
      targetID: conventionID,
      ownerID: state._id
    })
  }
  const handleVideoCall = () => {
    navigation.navigate('MeetingScreen', {
      targetID: conventionID,
      ownerID: state._id
    })
  }

  const [search, setSearch] = useState(route.params?.search)

  useEffect(() => {
    setSearch(route?.params?.search)
  }, [route?.params?.search])
  
  useEffect(()=>{
    SocketClient.socket.on('emitChangeConventionAvatar', recieveData => {
      setConventionInfo(pre => ({...pre, avatar: recieveData.value} ))
    })

    SocketClient.socket.on('emitChangeConventionName', recieveData => {
      setConventionInfo(pre => ({...pre, name: recieveData.value} ))
    })
  }, [])

  const onDowntoSearch = () => {
    setSearch((pre) => {
      if (pre.currentIndex < pre.data.length-1) {
        return { ...pre, currentIndex: pre.currentIndex + 1 }
      }
      else {
        return pre
      }
    })
  }

  const onUptoSearch = () => {
    setSearch((pre) => {
      if (pre.currentIndex > 0) {
        return { ...pre, currentIndex: pre.currentIndex - 1 }
      }
      else {
        return pre
      }
    })
  }

  return (
    <View style={styles.chatScreenContainer}>
      <RowComponent
        alignItems
        style={[
          localStyle.container,
          { justifyContent: 'space-between', marginLeft: 8, marginRight: 16 }
        ]}
      >
        <ChatHeader type={conventionInfo.type} conventionInfo={conventionInfo} conventionID={conventionID} members={Object.fromEntries(members)} userIdReceive={userID} name={conventionInfo.name} avatar={conventionInfo.avatar} />
        <RowComponent>
          <Ionicons onPress={handleCall} name="call-outline" size={24} />
          <SpaceComponent width={24} />
          <Ionicons onPress={handleVideoCall} name="videocam-outline" size={24} />
          <SpaceComponent width={24} />
         {
          conventionID && <SimpleLineIcons
          color={'blue'}
          name="exclamation"
          size={24}
          onPress={handleClickDetail}
        />
         }
        </RowComponent>
      </RowComponent>
      {search && (
        <RowComponent
          style={{
            zIndex: 10,
            backgroundColor: '#fea',
            justifyContent: 'space-between',
            position: 'absolute',
            top: 50,
            left: 0,
            right: 0,
            paddingVertical: 8
          }}
        >
          <RowComponent>
            <SpaceComponent width={64} />
            <Text>
              Tìm kiếm:
              <Text>{` ${search.text} ${1 + search.currentIndex}/${
                search.data.length
              }`}</Text>
            </Text>
          </RowComponent>
          <RowComponent>
            <AntDesign name="up" onPress={onDowntoSearch} size={20} />
            <SpaceComponent width={8} />
            <AntDesign name="down" onPress={onUptoSearch} size={20} />
            <SpaceComponent width={32} />
          </RowComponent>
        </RowComponent>
      )}
      <ChatList
        search={search ? search?.data[search?.currentIndex] : null}
        conventionID={conventionID}
        ownerID={state._id}
        onLongPress={handleOnShow}
      />
      <ChatItemModal
        modalVisible={modalVisible}
        onClose={handleOnClose}
        item={selectionItem}
        members={members}
        ownerID={state._id}
        conventionID={conventionID}
      />
      <PollModal
        modalVisible={pollModalVisible}
        onCancle={() => setPollModalVisible(false)}
        onSubmit={handleSendMessage}
      />
      <ChatInput
        onPress={handleSendMessage}
        conventionID={conventionID}
        onPoll={() => setPollModalVisible(true)}
      />
    </View>
  )
}

const localStyle = StyleSheet.create({
  container: {
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    paddingVertical: 8
  }
})

export default ChattingSearchScreen
