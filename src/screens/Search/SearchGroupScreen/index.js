import { View, Text, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import UserRowComponent from '../../../components/UserRowComponent'
import SpaceComponent from '../../../components/SpaceComponent'
import groupStype from '../../Group/groupStyle'
import { API } from '../../../api'
import { useFocusEffect } from '@react-navigation/native'
import { RESPONSE_STATUS } from '../../../utils/Constants'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'
import TextComponent from '~/components/TextComponent'

const SearchGroupScreen = ({ navigation, route }) => {
  const { search } = route.params
  const state = useSelector(selectCurrentUser)

  const [userData, setUserData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      API.searchGroupAPI(state._id, search).then((response) => {
        if (response.status === RESPONSE_STATUS.SUCCESS) {
          response.data ? setUserData(response.data) : setUserData([])
          setIsLoading(false)
        }
      })
    }, [search])
  )

  const handlePressItem = (item) => {
    navigation.navigate('GroupScreen', { groupID: item._id, userID: state._id })
    API.addSearchTypeHistory(state._id, item._id, 'group')
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
          {isLoading ? 'Đang tìm kiếm...' : 'Không có nhóm được tìm thấy'}
        </Text>
      )}
      {userData.length > 0 && (
        <TextComponent size={18} fontWeight='500' color="red" text={`Có ${userData.length} nhóm được tìm thấy`} />
      )}

      <FlatList
        data={userData}
        ItemSeparatorComponent={<SpaceComponent height={16} />}
        renderItem={({ item, index }) => (
          <UserRowComponent
            onPress={() => handlePressItem(item)}
            avatar={item.avatar}
            name={item.name}
          />
        )}
      />
    </View>
  )
}

export default SearchGroupScreen
