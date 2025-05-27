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
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'

const FriendItem = ({ item, onPress, onRemove, ownerID }) => {
  const [title, setTitle] = useState()
  const handleClickItem = () => onPress(item._id)
  const handleCancleRequest = () => {
    const params = {
      ownerID,
      userID: item._id,
      status: FRIEND_STATUS.CANCELING
    }
    if(title === 'Thêm bạn bè') {
      API.updateStatusFriend({ownerID, userID: item._id, status:FRIEND_STATUS.PENDING}).then(response => {
        if (response.status === RESPONSE_STATUS.SUCCESS) {
          setTitle('Hủy yêu cầu')
        }
      })
    } else {
      API.updateStatusFriend({ ...params }).then((response) => {
        if (response.status === RESPONSE_STATUS.SUCCESS) {
          setTitle('Thêm bạn bè')
        }
      })
    }
  }

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
            title={title ?? 'Hủy yêu cầu'}
            textColor={!title || title === 'Hủy yêu cầu' ? '#111c' : '#fff'}
            borderRadius={10}
            textSize={16}
            fontWeight={'600'}
            underlay={'#ccc'}
            bgColor={!title || title === 'Hủy yêu cầu' ? '#ccc' : '#33d'}
            style={{ flex: 1 }}
            onPress={handleCancleRequest}
          />
        </RowComponent>
      </View>
    </RowComponent>
  )
}

const PendingFriendScreen = ({ navigation, route }) => {
  const state = useSelector(selectCurrentUser)

  const [pendings, setPendings] = useState([])

  useEffect(() => {
    API.getPendingFriend(state._id).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setPendings(response.data.data)
      }
    })
  }, [])

  const handlePressItem = (userID) => navigation.navigate('ProfileScreen', { userID })

  return (
    <View style={{ paddingHorizontal: 12, flex: 1, backgroundColor: '#fff' }}>
      <GoBackComponent
        borderColor={'#ccc'}
        borderWidth={1}
        textColor={'#333a'}
        title={'Yêu cầu đã gửi'}
      />
      <SpaceComponent height={24} />
      {pendings.length === 0 &&  <Text
        style={{
          fontWeight: '900',
          fontSize: 20,
          textTransform: 'capitalize',
          textAlign: 'center',
          marginTop: '50%',
          color: '#3336'
        }}
      >
        Không có yêu cầu được gửi đi
      </Text>}
      <FlatList
        style={{ backgroundColor: '#fff' }}
        data={pendings}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={<SpaceComponent height={8} />}
        renderItem={({ item, index }) => (
          <FriendItem ownerID={state._id} item={item} onPress={handlePressItem} />
        )}
      />
    </View>
  )
}

export default PendingFriendScreen
