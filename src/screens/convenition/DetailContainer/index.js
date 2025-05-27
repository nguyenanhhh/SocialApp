import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { API } from '../../../api'
import DetailScreen from '../Detail'
import { useCustomContext } from '../../../store'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'

const DetailContainerScreen = ({ navigation, route }) => {
  const { conventionID } = route.params
  const state = useSelector(selectCurrentUser)

  const [conventionData, setConventionData] = useState()
  const [member, setMembers] = useState()
  useFocusEffect(
    useCallback(() => {
      API.getConventionByIdAPI(conventionID).then((response) => {
        setConventionData(response)
        const customMap = new Map()
        response.members.forEach((item) => {
          customMap.set(item._id, item)
        })
        setMembers(customMap)
      })
    }, [conventionID])
  )

  const getMember = () => {
    const customMap = new Map()
    conventionData.members.forEach((item) => {
      customMap.set(item._id, item)
    })
    return Object.fromEntries(customMap)
  }

  const getConvetionName = () => {
    const customName =
      conventionData.name ||
      conventionData.members.find((item) => item._id !== state._id).aka ||
      conventionData.members.find((item) => item._id !== state._id).userName
    return customName
  }

  const getConventionAvatar = () => {
    const customAvatar =
      conventionData.avatar || conventionData.members.find((item) => item._id !== state._id).avatar
    return customAvatar
  }

  return conventionData ? (
    <DetailScreen
      avatar={getConventionAvatar()}
      chatData={conventionData.data}
      conventionID={conventionID}
      navigation={navigation}
      //   members={Object.fromEntries(conventionData.members.map((item) => ({ [item._id]: item })))}
      members={getMember()}
      ownerID={state._id}
      type={conventionData.type}
      name={getConvetionName()}
    />
  ) : (
    <></>
  )
}

export default DetailContainerScreen
