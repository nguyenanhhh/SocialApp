import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from '../../../api'
import RowComponent from '../../../components/RowComponent'
import AvatarComponent from '../../../components/AvatarComponent'
import SpaceComponent from '../../../components/SpaceComponent'
import { useCustomContext } from '../../../store'
import { OpacityButtton } from '../../../components/ButtonComponent'
import { FRIEND_STATUS, RESPONSE_STATUS } from '../../../utils/Constants'
import GoBackComponent from '../../../components/GoBackComponent'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'

const FriendItem = ({ item, onPress, onRemove, ownerID }) => {
  const [title, setTitle] = useState()
  const handleClickItem = () => onPress(item._id)
  const handleAdd = () =>
    handleAddFriend(ownerID, item._id).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setTitle('Hủy yêu cầu')
      }
    })

  const handleRemove = () =>
    handleRemoveSuggest(ownerID, item._id).then((response) => {
      onRemove(item._id)
    })
  return (
    <RowComponent alignItems style={{ marginBottom: 16 }}>
      <AvatarComponent size={64} source={API.getFileUrl(item.avatar)} onPress={handleClickItem} />
      <SpaceComponent width={16} />
      <View style={{ flex: 1 }}>
        <Text onPress={handleClickItem} style={{ fontWeight: '500', fontSize: 17 }}>
          {item.userName}
        </Text>
        <SpaceComponent height={4} />
        <RowComponent style={{ flex: 1 }}>
          <OpacityButtton
            title={'Gỡ'}
            textColor={'#333'}
            borderRadius={10}
            underlay={'#3331'}
            bgColor={'#ccc'}
            style={{ flex: 1 }}
            onPress={handleRemove}
          />
          <SpaceComponent width={16} />
          <OpacityButtton
            title={title ?? 'Chấp nhận'}
            textColor={'#fff'}
            borderRadius={10}
            underlay={'#33d4'}
            bgColor={'#33d'}
            style={{ flex: 1 }}
            onPress={handleAdd}
          />
        </RowComponent>
      </View>
    </RowComponent>
  )
}

const handleAddFriend = async (ownerID, userID) => {
  const response = await API.updateStatusFriend({
    ownerID,
    userID,
    status: FRIEND_STATUS.PENDING
  })
  return response
}

const handleRemoveSuggest = async (ownerID, userID) => {
  const response = await API.removeSuggestFriend({
    ownerID,
    userID
  })
  return response
}

const AcceptingFriendScreen = ({ navigation, route }) => {
  const state = useSelector(selectCurrentUser)

  const [suggests, setSuggests] = useState([])

  useEffect(() => {
    API.getAcceptingFriend(state._id).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setSuggests(response.data.data)
      }
    })
  }, [])

  const handlePressItem = (userID) => navigation.navigate('ProfileScreen', { userID })
  const handleRemove = (userID) => {
    setSuggests((pre) => {
      const newArr = pre.filter((item) => item._id !== userID)
      setSuggests(newArr)
    })
  }
  const handleAccept = (userID) => {
  }
  return (
    <View style={{ paddingHorizontal: 12, backgroundColor: '#fff', flex: 1 }}>
      <GoBackComponent
        borderColor={'#ccc'}
        borderWidth={1}
        textColor={'#333a'}
        title={'Yêu cầu đang chờ chấp nhận'}
      />
      <SpaceComponent height={8} />
      {suggests?.length === 0 && (
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
         Không có yêu cầu nào được gửi đến
       </Text>
      )}

      <FlatList
        data={suggests}
        style={{ backgroundColor: '#fff' }}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={<SpaceComponent height={8} />}
        renderItem={({ item, index }) => (
          <FriendItem
            ownerID={state._id}
            item={item}
            onPress={handlePressItem}
            onRemove={handleRemove}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 4,
    paddingHorizontal: 8
  }
})

export default AcceptingFriendScreen
