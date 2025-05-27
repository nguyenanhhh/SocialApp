import { View, Text, TextInput, StyleSheet, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import RowComponent from '../../../components/RowComponent'
import GoBackComponent from '../../../components/GoBackComponent'
import SpaceComponent from '../../../components/SpaceComponent'
import DropDownComponent from '../../../components/DropDownComponent'
import { OpacityButtton } from '../../../components/ButtonComponent'
import { API } from '../../../api'
import { RESPONSE_STATUS } from '../../../utils/Constants'
import { useCustomContext } from '../../../store'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'

const SCOPE_DATA = [
  { label: 'Công khai', value: 'PUBLIC' },
  { label: 'Riêng tư', value: 'PRIVATE' }
]

const NewGroupScreen = ({ navigation }) => {
  const [groupName, setGroupName] = useState('')
  const [groupBio, setGroupBio] = useState('')
  const [scope, setScope] = useState('PUBLIC')
  const state = useSelector(selectCurrentUser)

  const handleChangeGroupName = (value) => setGroupName(value)
  const handleChangeGroupBio = (value) => setGroupBio(value)

  const handleChangeScope = (value) => setScope(value)

  const handleCreateGroup = () => {
    const data = {
      name: groupName,
      bio: groupBio,
      scope: scope,
      userData:state
    }
    API.createGroupAPI(data).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        ToastAndroid.show('Tạo nhóm thành công!', ToastAndroid.SHORT)
        navigation.navigate('GroupScreen', {groupID: response.data._id, userID: state._id})
      } else {
        ToastAndroid.show('Tạo nhóm thất bại !!!', ToastAndroid.SHORT)
        navigation.goBack()
      }
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <GoBackComponent style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Tạo nhóm</Text>
      </GoBackComponent>
      <View style={styles.bodyContainer}>
        <View>
          <Text style={styles.itemTilte}>Tên</Text>
          <SpaceComponent height={12} />
          <TextInput
            value={groupName}
            onChangeText={handleChangeGroupName}
            style={styles.itemInput}
            placeholder="Đặt tên nhóm..."
            multiline
          />
        </View>
        <SpaceComponent height={32} />
        <View>
          <Text style={styles.itemTilte}>Mô tả</Text>
          <SpaceComponent height={12} />
          <TextInput
            value={groupBio}
            onChangeText={handleChangeGroupBio}
            style={styles.itemInput}
            placeholder="Thêm mô tả nhóm..."
            multiline
          />
        </View>
        <SpaceComponent height={32} />
        <View>
          <RowComponent>
            <Text style={styles.itemTilte}>Quyền riêng tư</Text>
            <SpaceComponent width={12} />
            <DropDownComponent
              width={150}
              height={30}
              size={14}
              data={SCOPE_DATA}
              initValue={scope}
              callback={handleChangeScope}
            />
          </RowComponent>
          <SpaceComponent height={8} />
          {scope === 'PUBLIC' ? (
            <Text>Chế độ công khai: Mọi người đều có thể truy cập vào nhóm</Text>
          ) : (
            <Text>Chế độ riêng tư: Chỉ những thành viên mới có thể xem nội dung trong nhóm</Text>
          )}
        </View>
      </View>
      <OpacityButtton
        disable={groupName.trim() ? false : true}
        textColor={'#fff'}
        textSize={18}
        title={'Tạo nhóm'}
        height={40}
        bgColor={groupName.trim() ? '#22fd' : '#ccc'}
        underlay={'#22ff'}
        onPress={handleCreateGroup}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    flex: 1,
    textAlign: 'center'
  },

  bodyContainer: {
    marginTop: 32,
    marginHorizontal: 16,
    flex: 1
  },

  itemTilte: {
    fontWeight: '600',
    fontSize: 18,
    color: 'black'
  },

  itemInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 8
  }
})

export default NewGroupScreen
