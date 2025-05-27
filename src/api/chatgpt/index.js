import axios from 'axios'
import { SERVER_POST } from '../../utils/Constants'

const getChatGPT = async (userID) => {
  const response = await axios.get(`${SERVER_POST}/chatgpt/${userID}`)
  return response.data
}

const postNewChat = async (userID, question) => {
  const response = await axios.post(`${SERVER_POST}/chatgpt/${userID}`, { question })
  return response.data
}

const chatgptAPI = {
  getChatGPT,
  postNewChat
}

export default chatgptAPI
