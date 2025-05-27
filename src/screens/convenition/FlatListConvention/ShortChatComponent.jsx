import React from 'react'
import { Text, View } from 'react-native'
import RowComponent from '../../../components/RowComponent'
import { helper } from '../../../utils/helpers'
import AvatarComponent from '../../../components/AvatarComponent'
import { API } from '../../../api'
import SpaceComponent from '../../../components/SpaceComponent'
import { MESSAGE_TYPE, NOTIFY_CONVENTION_STATUS } from '../../../utils/Constants'
import TextComponent from '~/components/TextComponent'

const convertMessage = (messageOwner, lastChat) => {
  let lastMessage = ''
  switch (lastChat.type) {
    case MESSAGE_TYPE.TEXT:
      lastMessage = messageOwner + ': ' + lastChat.message
      break
    case MESSAGE_TYPE.NOTIFY:
      lastMessage = lastChat.message
      break
    case MESSAGE_TYPE.IMAGE:
    case MESSAGE_TYPE.VIDEO: {
      lastMessage =
        messageOwner +
        ': ' +
        `đã gửi ${lastChat.message.split(',').length} ${lastChat.type.toLowerCase()}`
      break
    }
    default:
      lastMessage = lastChat.message
  }
  return lastMessage
}

const convertName = (convention, privateUser) =>
  convention.type === 'private' ? privateUser.aka || privateUser.userName : convention.name

const handleCheckNotifyCustomStatus = (status, upto) => {
  switch (status) {
    case NOTIFY_CONVENTION_STATUS.ALLOW:
      return ''
    case NOTIFY_CONVENTION_STATUS.NOT_ALLOW:
      return 'Đoạn chat này đã tắt thông báo'
    case NOTIFY_CONVENTION_STATUS.CUSTOM: {
      const newDate = Date.now()
      const customDate = Date.parse(upto)
      const customTime =
        'Đoạn chat này sẽ tắt thông báo cho đến ' +
        new Date(upto).getHours() +
        ' : ' +
        new Date(upto).getMinutes()
      return newDate > customDate ? '' : customTime
    }
    default:
      return ''
  }
}

const ShortChatingComponent = ({ convention, navigation, ownerID, onLongPress }) => {
  const { members, data } = convention
  const membersMap = new Map()
  members.forEach((item) => {
    membersMap.set(item._id, item)
  })

  const privateUser = membersMap.get(convention.uids.filter((item) => item !== ownerID).at(0))
  const lastChat = data.at(-1)
  const lastTime = helper.DateTimeHelper.displayTimeDescendingFromDate(lastChat.createdAt)
  const avatar = convention.avatar ? convention.avatar : privateUser.avatar
  const chatName = convertName(convention, privateUser)

  const messageOwner = membersMap.get(lastChat.senderID).userName
  const lastMessage = convertMessage(messageOwner, lastChat)

  const handleOnLongPress = () => onLongPress({ _id: convention._id, type: convention.type })
  const currentTime = Date.now()
  const ownerMember = membersMap.get(ownerID)
  const notifyMessage = handleCheckNotifyCustomStatus(ownerMember.notify, ownerMember.upto)
  return (
    <RowComponent
      onLongPress={handleOnLongPress}
      onPress={() => navigation.navigate('ChattingScreen', { conventionID: convention._id })}
    >
      <AvatarComponent source={API.getFileUrl(avatar)} />
      <SpaceComponent width={8} />
      <View>
        <TextComponent size={14} color={'blue'} text={notifyMessage} />
        <Text style={{ fontWeight: '500', fontSize: 17 }}>{chatName}</Text>
        <RowComponent>
          <Text style={{ fontWeight: '400', fontSize: 15 }}>
            {lastMessage.trim().length > 30
              ? lastMessage.trim().slice(0, 30) + '....'
              : lastMessage.trim()}
          </Text>
          <SpaceComponent width={16} />
          <Text style={{ fontSize: 15, fontWeight: '400' }}>{lastTime} </Text>
        </RowComponent>
      </View>
    </RowComponent>
  )
}
export default ShortChatingComponent
