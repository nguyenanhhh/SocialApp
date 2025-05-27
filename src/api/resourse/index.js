import axios from 'axios'
import { MESSAGE_TYPE, POST_ATTACHMENT, SERVER_POST } from '../../utils/Constants'

const getFile = async (uri) => {
  return (await axios.get(uri)).data
}

const getFileUrl = uri => {
 return `${SERVER_POST}/${uri}`
}

const getConventionFilesByID = async (conventionID, type) => {
  const requestString = `${SERVER_POST}/resource/convention/${conventionID}?fileType=${type}`
  const data = await axios.get(requestString)
  return data.data
}

const getGroupFilesByID = async (groupID, type) => {
  const requestString = `${SERVER_POST}/resource/group/${groupID}/${type}`
  const data = await axios.get(requestString)
  return data.data
}

const convertPostItemAPI = (item) => {
  const customData = {
    type: item.type === MESSAGE_TYPE.IMAGE ? POST_ATTACHMENT.IMAGE : POST_ATTACHMENT.VIDEO,
    uri: getFileUrl(item.source)
  }
  return customData
}

const ResourseAPI = {
  getFile,
  getFileUrl,
  convertPostItemAPI,
  getConventionFilesByID,
  getGroupFilesByID
}

export default ResourseAPI
