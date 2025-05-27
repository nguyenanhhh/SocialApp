import axios from 'axios'
import { SERVER_POST } from '../../utils/Constants'

const getAllgroupAPI = async () => {
  const response = await axios.get(`${SERVER_POST}/group/all`)
  return response.data
}

const getGroupByIDAPI = async (groupID) => {
  const response = await axios.get(`${SERVER_POST}/group/${groupID}`)
  return response.data
}

const getGroupsByUserIDAPI = async (userID) => {
  const response = await axios.get(`${SERVER_POST}/group/user/${userID}`)
  return response.data
}

const getGroupPostsOfUserAPI = async (groupID, userID) => {
  const response = await axios.get(`${SERVER_POST}/group/${groupID}/post/member/${userID}`)
  return response.data
}

const getGroupPostsOfGroupAPI = async (groupID) => {
  const response = await axios.get(`${SERVER_POST}/group/${groupID}/post`)
  return response.data
}

const getGroupMemberByUserIDAPI = async (groupID, userID) => {
  const response = await axios.get(`${SERVER_POST}/group/${groupID}/member/${userID}`)
  return response.data
}

const getGroupMembersByIDAPI = async (groupID) => {
  const response = await axios.get(`${SERVER_POST}/group/${groupID}/member`)
  return response.data
}

const getPendingGroupMemberByIDAPI = async (groupID) => {
  const response = await axios.get(`${SERVER_POST}/group/${groupID}/member/pending`)
  return response.data
}

const getBlockingGroupMemberByIDAPI = async (groupID) => {
  const response = await axios.get(`${SERVER_POST}/group/${groupID}/member/blocking`)
  return response.data
}

const getGroupImagesByIDAPI = async () => {
  const response = await axios.get(`${SERVER_POST}/group/`)
  return response.data
}

const getGroupVideosByIDAPI = async () => {
  const response = await axios.get(`${SERVER_POST}/group/`)
  return response.data
}

const requestJoinGroupAPI = async (groupID, userData) => {
  const response = await axios.post(
    `${SERVER_POST}/group/${groupID}/member/${userData._id}/join`,
    userData
  )
  return response.data
}

const cancelRequestJoinGroupAPI = async (groupID, userID) => {
  const response = await axios.post(`${SERVER_POST}/group/${groupID}/member/${userID}/cancel`)
  return response.data
}

const acceptMemberAPI = async (groupID, userID) => {
  const response = await axios.post(`${SERVER_POST}/group/${groupID}/member/${userID}/accept`)
  return response.data
}

const blockMemberAPI = async (groupID, userID) => {
  const response = await axios.post(`${SERVER_POST}/group/${groupID}/member/${userID}/block`)
  return response.data
}

const unblockMemberAPI = async (groupID, userID) => {
  const response = await axios.post(`${SERVER_POST}/group/${groupID}/member/${userID}/unblock`)
  return response.data
}

const exitGroupAPI = async (groupID, userID) => {
  const response = await axios.delete(`${SERVER_POST}/group/${groupID}/member/${userID}/exit`)
  return response.data
}

const deleteMemberAPI = async (groupID, userID) => {
  const response = await axios.delete(`${SERVER_POST}/group/${groupID}/member/${userID}/exit`)
  return response.data
}

const createGroupAPI = async (data) => {
  const response = await axios.post(`${SERVER_POST}/group/create`, data)
  return response.data
}

const updateGroupNameAPI = async (groupID, value) => {
  const response = await axios.put(`${SERVER_POST}/group/${groupID}/update/name`, { value })
  return response.data
}

const updateGroupAvatarAPI = async (groupID, value) => {
  const response = await axios.put(`${SERVER_POST}/group/${groupID}/update/avatar`, { value })
  return response.data
}

const updateGroupBioAPI = async (groupID, value) => {
  const response = await axios.put(`${SERVER_POST}/group/${groupID}/update/bio`, { value })
  return response.data
}

const groupAPI = {
  getAllgroupAPI,
  getGroupsByUserIDAPI,
  getGroupPostsOfUserAPI,
  getGroupPostsOfGroupAPI,
  getPendingGroupMemberByIDAPI,
  getBlockingGroupMemberByIDAPI,
  getGroupMemberByUserIDAPI,
  getGroupMembersByIDAPI,
  getGroupByIDAPI,
  getGroupImagesByIDAPI,
  getGroupVideosByIDAPI,

  requestJoinGroupAPI,
  cancelRequestJoinGroupAPI,
  acceptMemberAPI,
  blockMemberAPI,
  unblockMemberAPI,
  exitGroupAPI,
  deleteMemberAPI,

  createGroupAPI,
  updateGroupNameAPI,
  updateGroupAvatarAPI,
  updateGroupBioAPI
}

export default groupAPI
