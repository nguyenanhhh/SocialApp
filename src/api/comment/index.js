import axios from 'axios'
import { SERVER_POST } from '../../utils/Constants'
import SocketClient from '../../socket'

const getPostCommentsAPI = async (postID) => {
  const response = await axios.get(`${SERVER_POST}/comment/post/${postID}`)
  return response.data
}

const storeCommentAPI = async (data) => {
  const response = await axios.post(`${SERVER_POST}/comment/store`, data)
  SocketClient.socket.emit('comment_count', {postID: data.postID, number: 1})
  return response.data
}

const editCommentAPI = async (commentID, data) => {
  const response = await axios.put(`${SERVER_POST}/comment/${commentID}/update`, data)
  return response.data
}

const deleteCommentAPI = async (postID, commentID) => {
  const response = await axios.delete(`${SERVER_POST}/comment/${commentID}/delete`)
  SocketClient.socket.emit('comment_count', {postID , number: -1})
  return response.data
}

const reactCommentAPI = async (commentID, userID) => {
  const response = await axios.put(`${SERVER_POST}/comment/${commentID}/react`, {userID: userID} )
  return response.data
}

const commentAPI = {
  getPostCommentsAPI,
  storeCommentAPI,
  editCommentAPI,
  deleteCommentAPI,
  reactCommentAPI
}

export default commentAPI
