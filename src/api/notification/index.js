import axios from 'axios'
import { SERVER_POST } from '../../utils/Constants'

const getNotification = async (userID) => {
  const response = await axios.get(`${SERVER_POST}/notification/${userID}`)
  return response.data
}

const notificationAPI = {
  getNotification
}

export default notificationAPI
