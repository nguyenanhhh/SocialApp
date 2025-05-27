import axios from 'axios'
import { MESSAGE_TYPE, POST_ATTACHMENT, SERVER_POST } from '../../utils/Constants'

const searchPostAPI = async (userID, queryString) => {
  const response = await axios.get(`${SERVER_POST}/search/post/${userID}/${queryString}`)
  return response.data
}

const searchUserAPI = async (userID, queryString) => {
  const response = await axios.get(`${SERVER_POST}/search/user/${userID}/${queryString}`)
  return response.data
}
const searchGroupAPI = async (userID, queryString) => {
  const response = await axios.get(`${SERVER_POST}/search/group/${userID}/${queryString}`)
  return response.data
}

const searchImageAPI = async (userID, queryString) => {
  const response = await axios.get(`${SERVER_POST}/search/image/${userID}/${queryString}`)
  return response.data
}

const searchVideoAPI = async (userID, queryString) => {
  const response = await axios.get(`${SERVER_POST}/search/video/${userID}/${queryString}`)
  return response.data
}

const getSearchHistoryListByUserID = async userID => {
  const response = await axios.get(`${SERVER_POST}/search/history/${userID}`)
  return response.data
}

const addSearchTextHistory = async (userID, queryString) => {
  const response = await addSearchTypeHistory(userID, queryString, 'text')
  return response
}

const addSearchTypeHistory = async (userID, queryString, type) => {
  const response = await axios.post(`${SERVER_POST}/search/history/add/${userID}/${type}/${queryString}`)
  return response.data
}

const removeOneSearchHistoryByID = async searchID => {
  const response = await axios.delete(`${SERVER_POST}/search/history/remove/${searchID}`)
  return response.data
}

const removeAllSearchHistoryByUserID = async userID => {
  const response = await axios.delete(`${SERVER_POST}/search/history/remove/all/${userID}`)
  return response.data
}

const searchAPI = {
  searchPostAPI,
  searchUserAPI,
  searchGroupAPI,
  searchImageAPI,
  searchVideoAPI,
  getSearchHistoryListByUserID,
  addSearchTextHistory,
  addSearchTypeHistory,
  removeOneSearchHistoryByID,
  removeAllSearchHistoryByUserID
}

export default searchAPI
