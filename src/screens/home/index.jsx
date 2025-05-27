import { StyleSheet, View, ScrollView, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'

import Story from '../../components/Stories'
import Colors from '../../utils/Colors'
import NewPostBox from '../../components/NewPostBox'
import FlatListPostNewFeed from '../../components/FlatListPostNewFeed'
import { useCustomContext } from '../../store'
import SocketClient from '../../socket'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'
const HomeScreen = ({ navigation }) => {
  const state = useSelector(selectCurrentUser)


  const requestPermission = async () => {
    await PermissionsAndroid.request('android.permission.USE_EXACT_ALARM')
    await PermissionsAndroid.request('android.permission.BIND_JOB_SERVICE')
    await PermissionsAndroid.request('android.permission.ACCESS_WIFI_STATE')
    await PermissionsAndroid.request('android.permission.CAMERA')
    await PermissionsAndroid.request('android.permission.ACTIVITY_RECOGNITION')
    await PermissionsAndroid.request('android.permission.RECORD_AUDIO')
  }
  useEffect(() => {
    if (state) {
      SocketClient.runSocketClient(state._id, navigation)
      requestPermission()
      const result = PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS')
    }
  }, [state])

  return <View style={{ flex: 1 }}>{state && <FlatListPostNewFeed navigation={navigation} />}</View>
}

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: Colors.background
  }
})

export default HomeScreen
