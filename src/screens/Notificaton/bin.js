import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from '../../api'
import { OpacityButtton } from '../../components/ButtonComponent'
import { PermissionsAndroid } from 'react-native'
import SocketClient from '../../socket'
import { useCustomContext } from '../../store'
import { configureBackgroundFetch } from '../../socket/backgroundfetch'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'



const NotificationScreen = ({ navigation }) => {
  const [users, setUsers] = useState([])
  const state = useSelector(selectCurrentUser)


  const doSomeThing = async () => {
    const data = await API.getAllUserAPI()
    if (data) {
      setUsers(data)
    }
  }
  const requestPermission = async () => {
    await PermissionsAndroid.request('android.permission.USE_EXACT_ALARM')
    await PermissionsAndroid.request('android.permission.BIND_JOB_SERVICE')
    await PermissionsAndroid.request('android.permission.ACCESS_WIFI_STATE')
    await PermissionsAndroid.request('android.permission.CAMERA')
    await PermissionsAndroid.request('android.permission.ACTIVITY_RECOGNITION')
    await PermissionsAndroid.request('android.permission.RECORD_AUDIO')


  }
  useEffect(() => {
    SocketClient.runSocketClient(state._id, navigation)
    doSomeThing()
    requestPermission()
    const result = PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS')
  }, [])

  const handleUserProfile = (id) => {
    navigation.navigate('ProfileScreen', { userID: id })
  }


  return (
    <View>
      {users.map((item, index) => (
        <OpacityButtton
          style={{ backgroundColor: '#ccc', marginBottom: 20 }}
          key={index}
          title={item.userName}
          onPress={() => handleUserProfile(item._id)}
        />
      ))}
    </View>
  )
}

export default NotificationScreen
