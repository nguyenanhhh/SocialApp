const { default: axios } = require('axios')
import SocketClient from '../../socket'
import { SERVER_POST } from '../../utils/Constants'

const getPoll = async (pollID) => {
  const response = await axios.get(`${SERVER_POST}/poll/${pollID}`)
  return response.data
}

const createPoll = async (data) => {
  const response = await axios.post(`${SERVER_POST}/poll/create`, data)
  return response.data
}

const closePoll = async (pollID) => {
  const response = await axios.post(`${SERVER_POST}/poll/${pollID}/close`)
  return response.data
}

const addOption = async (pollID, data, targetID) => {
  const response = await axios.post(`${SERVER_POST}/poll/${pollID}/option/add`, data)
  return response.data
}

const addPolling = async (pollID, data, targetID) => {
  const response = await axios.post(`${SERVER_POST}/poll/${pollID}/polling/add`, data)
  return response.data
}

const updatePolling = async (pollID, data, targetID) => {
  const response = await axios.post(`${SERVER_POST}/poll/${pollID}/polling/update`, data)
  return response.data
}

const pollAPI = { getPoll, createPoll, closePoll, addOption, addPolling, updatePolling }

export default pollAPI
