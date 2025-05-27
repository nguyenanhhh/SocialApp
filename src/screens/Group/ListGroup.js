import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from '../../api'
import { RESPONSE_STATUS } from '../../utils/Constants'
import SpaceComponent from '../../components/SpaceComponent'
import { navigationRef } from '../../store'
import GoBackComponent from '../../components/GoBackComponent'
import GroupItem from './components/GroupItem'
import { NestableDraggableFlatList, NestableScrollContainer } from 'react-native-draggable-flatlist'

import ListGroupHeader from './components/ListGroupHeader'
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated'
import TextComponent from '~/components/TextComponent'
configureReanimatedLogger({
  level: ReanimatedLogLevel.error,
  strict: true
})
const ListGroupScreen = ({ navigation, route }) => {
  const userID = route.params.userID
  const [groups, setGroups] = useState([])

  useEffect(() => {
    // API.getAllgroupAPI().then((response) => {
    //   if (response.status === RESPONSE_STATUS.SUCCESS) {
    //     setGroups(response.data)
    //   }
    // })

    API.getGroupsByUserIDAPI(userID).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setGroups(response.data)
      }
    })
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {/* <GoBackComponent title={'Nhóm đã tham gia'} hasBorder /> */}
      <ListGroupHeader />
      <SpaceComponent height={24} />
      {groups.length === 0 && (
        <TextComponent
          style={{ marginTop: 32 }}
          align="center"
          size={24}
          text="Bạn chưa tham gia vào nhóm nào"
        />
      )}
      <FlatList
        data={groups}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={<SpaceComponent height={24} />}
        style={{ flex: 1, marginHorizontal: 16 }}
        renderItem={({ item }) => <GroupItem item={item} />}
      />

      {/* <NestableScrollContainer>
        <NestableDraggableFlatList
          data={groups}
          renderItem={({ item, drag, isActive }) => <GroupItem item={item} drag={drag} isActive={isActive} />}
          keyExtractor={(item) => item._id}
          onDragEnd={({ data }) => setGroups(data)}
        />
      </NestableScrollContainer> */}
    </View>
  )
}

export default ListGroupScreen
