import { View, Text, FlatList, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import GoBackComponent from '../../../components/GoBackComponent'
import SearchComponent from '../../../components/SearchComponent'
import groupStype from '../groupStyle'
import SpaceComponent from '../../../components/SpaceComponent'
import UserRowComponent from '../../../components/UserRowComponent'
import { API } from '../../../api'
import { RESPONSE_STATUS } from '../../../utils/Constants'
import RowComponent from '../../../components/RowComponent'
import { OpacityButtton } from '../../../components/ButtonComponent'

const GroupBlockingScreen = ({ navigation, route }) => {
  const { groupID, groupName } = route.params
  const [pendingMembers, setPendingMembers] = useState([])
  const [searchResult, setSearchResult] = useState('')

  const memberFilter = searchResult
    ? pendingMembers.filter((item) =>
        item.userName.toLowerCase().includes(searchResult.toLowerCase())
      )
    : pendingMembers

  const handleChangeSearch = (value) => setSearchResult(value)

  useEffect(() => {
    API.getBlockingGroupMemberByIDAPI(groupID).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setPendingMembers(response.data)
      }
    })
  }, [])

  const handleAccept = (userID) => {
    API.acceptMemberAPI(groupID, userID).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        ToastAndroid.show('Duyệt thành công!', ToastAndroid.SHORT)
        setPendingMembers((pre) => pre.filter((item) => item.userID !== userID))
      }
    })
  }

  return (
    <View>
      <GoBackComponent bgColor={'#2fa'} textColor={'#333'} title={'Danh sách bị chặn'} />
      <View style={groupStype.container}>
        <SearchComponent
          unGoback
          title={'Tìm kiếm thành viên...'}
          onCallback={handleChangeSearch}
        />
        <SpaceComponent height={16} />
        <Text style={groupStype.title}>Danh sách bị chặn</Text>
        <FlatList
          ItemSeparatorComponent={<SpaceComponent height={8} />}
          data={memberFilter}
          keyExtractor={(item, index) => item._id}
          renderItem={({ item, index }) => (
            <UserRowComponent
              key={item._id}
              name={item.userName}
              avatar={item.avatar}
              spacing={8}
              avatarSize={36}
              margin={4}
            >
              <RowComponent style={{ flex: 1, justifyContent: 'flex-end' }}>
                <OpacityButtton
                  width={60}
                  title={'Từ chối'}
                  textColor={'#fff'}
                  bgColor={'green6'}
                  underlay={'green'}
                />
                <SpaceComponent width={8} />
                <OpacityButtton
                  width={60}
                  title={'Duyệt'}
                  onPress={() => handleAccept(item.userID)}
                  textColor={'#fff'}
                  bgColor={'blue'}
                  underlay={'bluea'}
                />
              </RowComponent>
            </UserRowComponent>
          )}
        />
      </View>
    </View>
  )
}

export default GroupBlockingScreen
