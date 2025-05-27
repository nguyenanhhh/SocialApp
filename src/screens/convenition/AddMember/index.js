import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import RowComponent from '../../../components/RowComponent'
import { API } from '../../../api'
import { useCustomContext } from '../../../store'
import { FRIEND_STATUS, MEMBER_ROLE, MESSAGE_TYPE, RESPONSE_STATUS } from '../../../utils/Constants'
import AvatarComponent from '../../../components/AvatarComponent'
import SpaceComponent from '../../../components/SpaceComponent'
import GoBackIcon from '../../../components/GoBackComponent/GoBackIcon'
import { OpacityButtton } from '../../../components/ButtonComponent'
import GoBackComponent from '../../../components/GoBackComponent'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'

const AddMemberScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFriends, setSelectedFriends] = useState([])
  const [friends, setFriends] = useState([])
  const state = useSelector(selectCurrentUser)

  useEffect(() => {
    API.getListFriend({ userID: state._id }).then((data) => {
      if (data) {
        const uids = route.params.uids
        const listFriend = data.data.filter((item) => {
            const checkIndex = uids.findIndex(uid => uid === item._id)
            return (item.status === FRIEND_STATUS.FRIEND && checkIndex === -1)
        })
        setFriends(listFriend)
      }
    })
  }, [])

  // Lọc danh sách bạn bè theo từ khóa tìm kiếm
  const filteredFriends = searchQuery
    ? friends.filter((friend) => friend.userName.toLowerCase().includes(searchQuery.toLowerCase()))
    : friends

  // Toggle trạng thái chọn bạn bè
  const toggleSelectFriend = (selected) => {
    setSelectedFriends(
      (prev) =>
        prev.includes(selected)
          ? prev.filter((item) => item !== selected) // Bỏ chọn
          : [...prev, selected] // Thêm vào danh sách chọn
    )
  }

  const handleAddMemberToGroup = () => {
    const members = selectedFriends.map((item) => {
      const customData = {
        _id: item._id,
        userName: item.userName,
        avatar: item.avatar,
        aka: '',
        role: MEMBER_ROLE.MEMBER
      }
      return customData
    })
    const uids = selectedFriends.map((item) => item._id)
    const names = selectedFriends.map(item => item.userName)
    const message = {
      senderID: state._id,
      message: `${state.userName} đã thêm ${names.join(', ')} vào nhóm  `,
      type: MESSAGE_TYPE.NOTIFY
    }
    const newData = { members, uids, message }

    API.addMemberToGroup(route.params.conventionID, newData).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        ToastAndroid.show('Thêm thành viên thành công', ToastAndroid.SHORT)
        navigation.navigate('ChattingScreen', { conventionID: response.data._id })
      } else {
        ToastAndroid.show('Đã xảy ra lỗi', ToastAndroid.SHORT)
        navigation.navigate('ConventionScreen')
      }
    })
  }

  // Render một item bạn bè
  const renderFriendItem = ({ item }) => {
    const isSelected = selectedFriends.includes(item)
    return (
      <RowComponent
        alignItems
        key={item._id}
        style={{ justifyContent: 'space-between' }}
        onPress={() => toggleSelectFriend(item)}
      >
        <RowComponent alignItems>
          <AvatarComponent source={API.getFileUrl(item.avatar)} size={48} />
          <SpaceComponent width={16} />
          <Text style={styles.friendName}>{item.userName}</Text>
        </RowComponent>
        <FontAwesome color={'blue'} name={isSelected ? 'check-circle' : 'circle-thin'} size={24} />
      </RowComponent>
    )
  }

  return (
    <View style={styles.container}>
      <RowComponent alignItems style={styles.goBackContainer}>
        <RowComponent alignItems>
        <GoBackIcon size={32} />
        <SpaceComponent width={64} />
        <Text style={{fontSize:18, fontWeight:'800', color:'#62ae'}}>Thêm thành viên</Text>
        </RowComponent>
        {selectedFriends.length >= 1 && (
          <OpacityButtton
            disable={selectedFriends.length > 0 ? false : true}
            onPress={handleAddMemberToGroup}
            title={'Thêm'}
            textColor={'blue'}
            textSize={18}
          />
        )}
      </RowComponent>
      <View style={styles.groupActionContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Tìm kiếm bạn bè..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <FlatList
          data={filteredFriends}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={<SpaceComponent height={16} />}
          renderItem={renderFriendItem}
          contentContainerStyle={styles.friendList}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  groupActionContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9'
  },

  goBackContainer: {
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 3,
    paddingHorizontal:8,
    height:48,
  },

  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff'
  },
  friendList: {
    paddingBottom: 16
  },

  friendName: {
    fontSize: 16
  }
})

export default AddMemberScreen
