import axios from 'axios'
import { SERVER_POST } from '../../utils/Constants'

const addPostViewAPI = async (userID, postID) => {
  const response = await axios.post(`${SERVER_POST}/postview/add/${userID}/${postID}`)
  return response.data
}

const removePostViewAPI = async (userID, postID) => {
  const response = await axios.post(`${SERVER_POST}/postview/remove/${userID}/${postID}`)
  return response.data
}

const postviewAPI = {
  addPostViewAPI,
  removePostViewAPI
}

export default postviewAPI
