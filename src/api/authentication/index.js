import axios from 'axios'
import { SERVER_POST } from '../../utils/Constants'
const loginAPI = async ({ data }) => {
  const newUser = await axios.post(`${SERVER_POST}/user/create`, data)
  return newUser.data
}

const getUserByIdAPI = async ({ uid }) => {
  const newUser = await axios.get(`${SERVER_POST}/user/${uid}`)
  return newUser.data
}

const getAllUserAPI = async () => {
  const users = await axios.get(`${SERVER_POST}/user/all`)
  return users.data
}

const getConventionUserFriend = async (userID) => {
  const user = await axios.get(`${SERVER_POST}/user/conventionUserFriend/${userID}`)
  return user.data
}

const updateUserBioAPI = async (userID, value) => {
  const response = await axios.put(`${SERVER_POST}/user/${userID}/bio/update`, { value })
  return response.data
}

const updateUserNameAPI = async (userID, value) => {
  const response = await axios.put(`${SERVER_POST}/user/${userID}/username/update`, { value })
  return response.data
}

const updateUserAvatarAPI = async (userID, current, avatar) => {
  const response = await axios.put(`${SERVER_POST}/user/${userID}/avatar/update`, {
    current,
    avatar
  })
  return response.data
}

const updateUserBackgroundAPI = async (userID, current, background) => {
  const response = await axios.put(`${SERVER_POST}/user/${userID}/background/update`, {
    current,
    background
  })
  return response.data
}



const AuthenApi = {
  loginAPI,
  getUserByIdAPI,
  getAllUserAPI,
  getConventionUserFriend,
  updateUserBioAPI,
  updateUserNameAPI,
  updateUserAvatarAPI,
  updateUserBackgroundAPI
}
export default AuthenApi
