import BackgroundFetch from 'react-native-background-fetch'
import SocketClient from './index.js'
const runBackgroundFetch = (socket) => {
  BackgroundFetch.configure(
    {
      minimumFetchInterval: 15, // Lấy dữ liệu mỗi 15 phút
      stopOnTerminate: false, // Không dừng khi ứng dụng bị kill
      startOnBoot: true // Bắt đầu khi máy khởi động lại
    },
    async (taskId) => {
      console.log('[BackgroundFetch] task started')
      // Thực thi kết nối lại WebSocket hoặc gửi thông báo
      SocketClient.runSocketClient()
      BackgroundFetch.finish(taskId)
    },
    (error) => {
      console.log('[BackgroundFetch] failed to start', error)
    }
  )
}

const configureBackgroundFetch = async (ownerID) => {
  console.log('go to configure background fetch')
  // Configure the background fetch task
  await BackgroundFetch.configure(
    {
      minimumFetchInterval: 15, // Chạy mỗi 15 phút
      stopOnTerminate: false, // Tiếp tục chạy khi ứng dụng bị đóng
      startOnBoot: true // Khởi động lại khi thiết bị khởi động
    },
    async (taskId) => {
      console.log('[BackgroundFetch] Task started:', taskId)
      try {
        if (!SocketClient.socket.connected) {
          SocketClient.runSocketClient(ownerID)

          // Hoàn thành tác vụ
          BackgroundFetch.finish(taskId)
        }
      } catch (error) {
        console.log('[BackgroundFetch] Fetch failed:', error)
        BackgroundFetch.finish(taskId)
      }
    },
    (error) => {
      console.log('[BackgroundFetch] Failed to configure:', error)
    }
  )

  // Đăng ký xử lý khi ứng dụng bị terminate
  BackgroundFetch.registerHeadlessTask(async (taskId) => {
    console.log('app killed: ')
    SocketClient.runSocketClient(ownerID)
    BackgroundFetch.finish(taskId)
  })
}

export { runBackgroundFetch, configureBackgroundFetch }
