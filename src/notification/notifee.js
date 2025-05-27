import notifee, {
  AndroidImportance,
  AndroidLaunchActivityFlag,
  EventType
} from '@notifee/react-native'
// import messaging from '@react-native-firebase/messaging'
import { API } from '../api'

async function createNotificationChannel() {
  const isExist = await notifee.getChannel('default')
  if (!isExist) {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      // groupId: groupID,

      importance: AndroidImportance.HIGH // Mức độ cao, hiển thị ngay lập tức
    })
  }
}

async function displayNotification({ data }) {
  await notifee.displayNotification({
    title: data.title,
    body: data.body,
    id: data.channelID,
    android: {
      channelId: 'default',
      importance: AndroidImportance.HIGH,
      //   groupSumary: true,
      //   groupID: groupID,
      pressActions: {
        id: 1,
        lauchActivity: 'default'
      },
      largeIcon: API.getFileUrl(data.senderAvatar)
    },
    data: data
  })
}

async function handleStartNotify(remoteMessage) {
  await createNotificationChannel()
  await displayNotification({ data: remoteMessage.data })
}

export {
  createNotificationChannel,
  displayNotification,
  handleStartNotify
}
