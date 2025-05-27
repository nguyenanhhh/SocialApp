import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from '../../../api'
import RowComponent from '../../../components/RowComponent'
import AvatarComponent from '../../../components/AvatarComponent'
import SpaceComponent from '../../../components/SpaceComponent'
import { useCustomContext } from '../../../store'
import { OpacityButtton } from '../../../components/ButtonComponent'
import { FRIEND_STATUS, RESPONSE_STATUS } from '../../../utils/Constants'
import GoBackComponent from '../../../components/GoBackComponent'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'

const FriendItem = ({ item, onPress, onRemove, ownerID }) => {
  const [title, setTitle] = useState()
  const handleClickItem = () => onPress(item._id)

  const handleAdd = () => {
    if (title === 'Hủy yêu cầu') {
      handleCancleRequest()
    } else {
      handleRequest()
    }
  }

  const handleRequest = () => {
    handleAddFriend(ownerID, item._id).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setTitle('Hủy yêu cầu')
      }
    })
  }

  const handleCancleRequest = () => {
    const params = {
      ownerID,
      userID: item._id,
      status: FRIEND_STATUS.CANCELING
    }

    API.updateStatusFriend({ ...params }).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setTitle('Thêm bạn bè')
      }
    })
  }

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
            title={title ?? 'Thêm bạn bè'}
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
const SuggestFriendScreen = ({ navigation, route }) => {
  const state = useSelector(selectCurrentUser)

  const [suggests, setSuggests] = useState([])

  useEffect(() => {
    API.getSuggestFriend(state._id).then((data) => {
      setSuggests(data)
    })
  }, [])

  const handlePressItem = (userID) => navigation.navigate('ProfileScreen', { userID })
  const handleRemove = (userID) => {
    setSuggests((pre) => {
      const newArr = pre.filter((item) => item._id !== userID)
      setSuggests(newArr)
    })
  }
  return (
    <View style={{ marginHorizontal: 12 }}>
      <GoBackComponent
        borderColor={'#ccc'}
        borderWidth={1}
        textColor={'#333a'}
        title={'Những người bạn có thể biết'}
      />

      <SpaceComponent height={32} />
      {suggests.length === 0 && (
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
          Không có đề xuất
        </Text>
      )}

      <FlatList
        data={suggests}
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

export default SuggestFriendScreen
