import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import GoBackComponent from '../../../components/GoBackComponent'
import { useCustomContext } from '../../../store'
import SpaceComponent from '../../../components/SpaceComponent'
import { RESPONSE_STATUS } from '../../../utils/Constants'
import { helper } from '../../../utils/helpers'
import { API } from '../../../api'
import RowComponent from '../../../components/RowComponent'

const GroupIntroduceScreen = ({ navigation, route }) => {
  const { groupID, groupName } = route.params
  const [groupData, setGroupData] = useState({})

  useEffect(() => {
    API.getGroupByIDAPI(groupID).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setGroupData(response.data)
      }
    })
  }, [groupID])

  return (
    <View>
      <GoBackComponent borderWidth={1} borderColor={'#ccc'} height={42} title={groupName} />
      <View style={styles.container}>
        <SpaceComponent height={16} />
        <Text style={styles.title}>Giới thiệu</Text>
        <SpaceComponent height={8} />
        <Text>{groupData.bio}</Text>
        <SpaceComponent height={16} />
        {/* Nhóm công khai hay riêng tư - kèm mô tả */}
        <SpaceComponent height={23} />
        <RowComponent>
          <Text>Thành viên:</Text>
          <SpaceComponent width={16} />
          <Text>{groupData.memberLength}</Text>
        </RowComponent>
        <SpaceComponent height={16} />
        <Text>
          Ngày thành lập: {helper.DateTimeHelper.displayDayMonthYearFromDate(groupData.createdAt)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16
  },
  title: {
    color: '#000',
    fontWeight: '600',
    fontSize: 18
  }
})

export default GroupIntroduceScreen
