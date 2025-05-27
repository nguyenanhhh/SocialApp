import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GoBackComponent from '../../../components/GoBackComponent'
import { API } from '../../../api'
import { RESPONSE_STATUS } from '../../../utils/Constants'
import groupStype from '../groupStyle'

import FlatlistMembers from './component/FlatlistMembers'


const GroupMemberScreen = ({ navigation, route }) => {
  const { groupID, groupName } = route.params
  const [groupMembers, setGroupMembers] = useState([])

  useEffect(() => {
    API.getGroupMembersByIDAPI(groupID).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setGroupMembers(response.data)
      }
    })

   
  }, [groupID])


  return (
    <View>
      <GoBackComponent bgColor={'#2fa'} textColor={'#333'} title={'Thành viên'} />
      <View style={groupStype.container}>
        <FlatlistMembers data={groupMembers} navigation={navigation} groupID={groupID} groupName={groupName} />
      </View>
    </View>
  )
}

export default GroupMemberScreen
