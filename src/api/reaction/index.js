import axios from 'axios'
import { SERVER_POST } from '../../utils/Constants'
import SocketClient from '../../socket'

const getReactionByTargetAPI = async (targetID) => {
  const response = await axios.get(`${SERVER_POST}/reaction/${targetID}`)
  return response.data
}

const getReactionOfUserByTargetAPI = async (targetID, userID) => {
  const response = await axios.get(`${SERVER_POST}/reaction/${targetID}/${userID}`)
  return response.data
}

const updateReactionOfUserByTargetAPI = async (data) => {
  const response = await axios.post(`${SERVER_POST}/reaction/update`, data)
  SocketClient.socket.emit('reaction', data )
  return response.data
}

const reactionAPI = {
  getReactionByTargetAPI,
  getReactionOfUserByTargetAPI,
  updateReactionOfUserByTargetAPI
}

export default reactionAPI
