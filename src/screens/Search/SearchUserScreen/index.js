import { View, Text, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { API } from '../../../api'
import { navigationRef, useCustomContext } from '../../../store'
import { RESPONSE_STATUS } from '../../../utils/Constants'
import UserRowComponent from '../../../components/UserRowComponent'
import { useFocusEffect } from '@react-navigation/native'
import groupStype from '../../Group/groupStyle'
import SpaceComponent from '../../../components/SpaceComponent'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'
import TextComponent from '~/components/TextComponent'

const SearchUserScreen = ({ navigation, route }) => {
  const { search } = route.params
  const state = useSelector(selectCurrentUser)

  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState([])

  useFocusEffect(
    useCallback(() => {
      API.searchUserAPI(state._id, search).then((response) => {
        if (response.status === RESPONSE_STATUS.SUCCESS) {
          response.data && setUserData(response.data)
          setIsLoading(false)
        }
      })
    }, [search])
  )

  const handlePressItem = (item) => {
    navigation.navigate('ProfileScreen', { userID: item._id })
    API.addSearchTypeHistory(state._id, item._id, 'user')
  }

  return (
    <View style={groupStype.container}>
      {userData.length === 0 && (
        <Text
          style={{
            fontWeight: '900',
            fontSize: 20,
            textTransform: 'capitalize',
            textAlign: 'center',
            marginTop: '50%',
            color: '#3336'
          }}
        >
          {isLoading ? 'Đang tìm kiếm...' : 'Không người dùng được tìm thấy'}
        </Text>
      )}
      {userData.length > 0 && (
        <TextComponent
          fontWeight="500"
          color="#f33"
          text={`Có ${userData.length} người dùng được tìm thấy`}
        />
      )}
      <SpaceComponent height={16} />

      <FlatList
        data={userData}
        ItemSeparatorComponent={<SpaceComponent height={16} />}
        renderItem={({ item, index }) => (
          <UserRowComponent
            onPress={() => handlePressItem(item)}
            avatar={item.avatar}
            name={item.userName}
          />
        )}
      />
    </View>
  )
}

export default SearchUserScreen
