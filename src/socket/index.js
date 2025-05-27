import { io } from 'socket.io-client'
import { MESSAGE_TYPE, SERVER_POST } from '../utils/Constants'
import { API } from '../api'
const socket = io(SERVER_POST)
function runSocketClient(userID, navigation) {
  // socket = io(SERVER_POST, { query: { userID } })

  socket.emit('connection', { data: { userID: userID } })
  onDisconnecting(userID)
  emitUserJoinRoom('friend_' + userID)
  emitConventionJoinRooms(userID)
  emitUserJoinRoom(userID)
  onConventionStored()
  onConvention((value) => {
    const { conventionID, type, message, senderID, senderName, senderAvatar } = value
    let messageCustom = ''
    switch (type) {
      case MESSAGE_TYPE.TEXT:
        messageCustom = message
        break
      case MESSAGE_TYPE.IMAGE:
        messageCustom = `Đã gửi ${message.split(',').length} ảnh`
        break
      case MESSAGE_TYPE.VIDEO:
        messageCustom = `Đã gửi ${message.split(',').length} video`
        break
      default:
        messageCustom = message
    }
    // startLocalNotification({
    //   ownerID:userID,
    //   conventionID: conventionID,
    //   title: senderName,
    //   senderAvatar: senderAvatar,
    //   message: messageCustom,
    //   senderID: senderID,
    //   data: {
    //     type: NOTIFICATION_TYPE.CONVENTION,
    //     screen: 'ChattingScreen',
    //     id: conventionID
    //   }
    // })
  })
}

async function get(userID) {
  const data = await API.getUserByIdAPI({ uid: userID })
}

async function onFriendActive(callBack) {
  socket.on('friendActive', (data) => {
    callBack(data)
  })
}

async function onDisconnecting(userID) {
  socket.on('disconnecting', () => {
    // Gửi dữ liệu đến server
    socket.emit('client-disconnecting', { message: 'Client is disconnecting', userId: userID })
  })
}

async function emitConventionJoinRooms(ownerID) {
  const conventionIDs = await API.getConventionIDs(ownerID)
  if (conventionIDs) {
    joinChatRooms(conventionIDs)
  }
}

async function emitJoinRoomsByArray(array) {
  joinChatRooms(array)
}

async function exitRooms(array) {
  socket.emit('exitRooms', array)
}

async function emitConventionJoinRoom(conventionID) {
  joinChatRoom(conventionID)
}

function onConvention(callback) {
  socket.on('convention', function (data) {
    callback(data)
  })
}

function onConventions(callback) {
  socket.on('convention', function (data) {
    callback(data)
  })
}

function emitConvention(data) {
  socket.emit('convention', data)
}

function joinChatRoom(conventionID) {
  socket.emit('joinChatRooms', [conventionID])
}

function joinChatRooms(roomIDs) {
  socket.emit('joinChatRooms', roomIDs)
}

function onConventionStored() {
  socket.on('conventionStored', emitConventionJoinRoom)
}

function emitConventionStored({ data, uids, conventionID }) {
  const configdata = { data, conventionID, uids }
  socket.emit('conventionStored', configdata)
}

function emitUserJoinRoom(id) {
  joinChatRoom(id)
}

// CONVENTION:
const emitChangeConventionName = (conventionID, name) => {
  socket.emit('changeConventionName', { conventionID, value: name })
}

const emitChangeConventionAvatar = (conventionID, avatar) => {
  socket.emit('changeConventionAvatar', { conventionID, value: avatar })
}

const emitChangeConventionAka = (conventionID, userID, aka) => {
  socket.emit('changeConventionAka', { conventionID, userID, value: aka })
}

const SocketClient = {
  socket,
  runSocketClient,
  emitConventionJoinRoom,
  emitConventionJoinRooms,
  emitJoinRoomsByArray,
  exitRooms,
  onConvention,
  onConventions,
  emitConvention,
  onConventionStored,
  emitConventionStored,
  onFriendActive,

  emitChangeConventionName,
  emitChangeConventionAvatar,
  emitChangeConventionAka
}

export default SocketClient
