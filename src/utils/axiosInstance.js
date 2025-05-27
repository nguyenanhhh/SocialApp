import axios from 'axios'
const axiosInstance = axios.create()
axiosInstance.defaults.withCredentials = true
axiosInstance.defaults.timeout = 1000 * 60

axiosInstance.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosInstance
