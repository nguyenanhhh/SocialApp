import { View, Text, Pressable, StyleSheet, TextInput, Modal, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import AvatarComponent from '../../../components/AvatarComponent'
import SpaceComponent from '../../../components/SpaceComponent'
import RowComponent from '../../../components/RowComponent'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { API } from '../../../api'
import GoBackComponent from '../../../components/GoBackComponent'
import { OpacityButtton } from '../../../components/ButtonComponent'
import {
  CONVENTION_TYPE,
  MESSAGE_NOTIFY_STATUS,
  MESSAGE_NOTIFY_TYPE,
  MESSAGE_TYPE,
  RESPONSE_STATUS
} from '../../../utils/Constants'
import PopUpModal from '../../../modals/PopUpModal'
import SocketClient from '../../../socket'
import TextComponent from '~/components/TextComponent'

const DetailScreen = ({
  conventionID,
  name,
  navigation,
  avatar,
  members,
  onChange,
  chatData,
  type,
  ownerID,
  conventionName
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [chatName, setChatName] = useState(name)
  const onCloseModal = () => setModalVisible(false)
  const onShowModal = () => setModalVisible(true)

  const onUpdate = (value) => {
    const data = {
      senderID: ownerID,
      type: MESSAGE_TYPE.NOTIFY,
      newState: value,
      userID: ownerID,
      notify: {
        type: MESSAGE_NOTIFY_TYPE.CHANGE_CONVENTION_NAME,
        changedID: ownerID,
        value: value
      },
      customMessage: `${members[ownerID].userName} đã đổi tên nhóm thành ${value}`
    }
    API.sendMessageAPI({
      conventionID,
      data: data,
      senderName: members[ownerID].userName,
      senderAvatar: members[ownerID].avatar
    }).then((response) => {
      // SocketClient.emitChangeConventionName(conventionID, value)
    })
    setChatName(value)
  }

  const handleClickFileViewing = () => {
    navigation.navigate('FileViewingScreen', { conventionID })
  }

  const handleClickAvtarConvention = () => {
    navigation.navigate('BackgroundConventionScreen', { conventionID, avatar })
  }

  const handleClickConventionName = () => {
    onShowModal()
  }

  const handleClickAka = () => {
    const customMembers = Object.values(members)
      .map((value) => value)
      .filter((item) => item.status === 'ACTIVE')

    navigation.navigate('AkaScreen', { conventionID, members: customMembers })
  }

  const handleClickMember = () => {
    const customMembers = Object.values(members)
      .map((value) => value)
      .filter((item) => item.status === 'ACTIVE')
    navigation.navigate('MemberScreen', {
      members: customMembers,
      rawMembers: members,
      conventionID
    })
  }

  const handleClickSearch = () => {
    const customMembers = Object.values(members)
      .map((value) => value)
      .filter((item) => item.status === 'ACTIVE')

    navigation.navigate('SearchConventionScreen', {
      chatData,
      conventionID,
      members: customMembers
    })
  }

  const handleClickProfile = () => {
    navigation.navigate('ProfileScreen', {
      userID: Object.values(members)
        .filter((item) => item._id !== ownerID)
        .at(0)._id
    })
  }

  const handleCall = () => {
    navigation.navigate('MeetingScreen', {
      targetID: conventionID,
      ownerID: ownerID
    })
  }
  const handleVideoCall = () => {
    navigation.navigate('MeetingScreen', {
      targetID: conventionID,
      ownerID: ownerID
    })
  }

  const handleAddMember = () => {
    const customMembers = Object.values(members)
      .map((value) => value)
      .filter((item) => item.status === 'ACTIVE')

    const customUids = customMembers.map((item) => item._id)
    navigation.navigate('AddMemberScreen', { conventionID, uids: customUids })
  }

  const handleLogoutGroup = (member) => {
    API.logoutGroupAPI(conventionID, ownerID, member).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        ToastAndroid.show('Đã rời khỏi nhóm', ToastAndroid.SHORT)
        navigation.navigate('ConventionScreen')
      } else {
        ToastAndroid.show('Đã xảy ra lỗi!', ToastAndroid.SHORT)
      }
    })
  }

  return (
    <View style={{ marginHorizontal: 16 }}>
      <GoBackComponent hasBorder />
      <SpaceComponent height={16} />
      <View style={{ alignItems: 'center' }}>
        <AvatarComponent source={API.getFileUrl(avatar)} size={140} />
        <SpaceComponent height={8} />
        <TextComponent text={chatName} size={32} fontWeight="600" />
      </View>
      <SpaceComponent height={16} />
      <RowComponent justify>
        <View style={{ alignItems: 'center' }}>
          <Ionicons onPress={handleCall} name="call-outline" size={24} />
          <Text>Gọi thoại</Text>
        </View>
        <SpaceComponent width={32} />
        <View style={{ alignItems: 'center' }}>
          <Ionicons onPress={handleVideoCall} name="videocam-outline" size={24} />
          <Text>Gọi video</Text>
        </View>
        <SpaceComponent width={32} />
        {type === CONVENTION_TYPE.GROUP && (
          <View style={{ alignItems: 'center' }}>
            <AntDesign onPress={handleAddMember} name="adduser" size={24} />
            <SpaceComponent width={24} />
            <Text>Thêm</Text>
          </View>
        )}
      </RowComponent>
      <SpaceComponent height={32} />

      {/* PROFILE */}
      {type === CONVENTION_TYPE.PRIVATE && (
        <RowComponent alignItems onPress={handleClickProfile}>
          <Ionicons name="person" size={24} />
          <SpaceComponent width={8} />
          <Text style={{ fontSize: 18, fontWeight: '500' }}>Trang cá nhân</Text>
        </RowComponent>
      )}

      {/* NAME */}
      {type === CONVENTION_TYPE.GROUP && (
        <RowComponent alignItems onPress={handleClickConventionName}>
          <Ionicons name="text" size={24} />
          <SpaceComponent width={8} />
          <Text style={{ fontSize: 18, fontWeight: '500' }}>Tên cuộc trò chuyện</Text>
        </RowComponent>
      )}
      <SpaceComponent height={20} />

      {/* AVATAR */}
      <RowComponent alignItems onPress={handleClickAvtarConvention}>
        <Ionicons name="image-outline" size={24} />
        <SpaceComponent width={8} />
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Avatar</Text>
      </RowComponent>
      <SpaceComponent height={20} />

      {/* MEMBERS */}
      <RowComponent alignItems onPress={handleClickMember}>
        <MaterialIcons name="people" size={24} />
        <SpaceComponent width={8} />
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Thành viên</Text>
      </RowComponent>
      <SpaceComponent height={20} />

      {/* AKA */}
      <RowComponent alignItems onPress={handleClickAka}>
        <Ionicons name="text" size={24} />
        <SpaceComponent width={8} />
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Biệt danh</Text>
      </RowComponent>
      <SpaceComponent height={20} />

      {/* SEARCH */}
      <RowComponent alignItems onPress={handleClickSearch}>
        <Ionicons name="search-outline" size={24} />
        <SpaceComponent width={8} />
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Tìm kiếm trong cuộc trò chuyện</Text>
      </RowComponent>
      <SpaceComponent height={20} />

      {/* IMAGE & VIDEO */}
      <RowComponent alignItems onPress={handleClickFileViewing}>
        <MaterialIcons name="photo-library" size={24} />
        <SpaceComponent width={8} />
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Ảnh và video</Text>
      </RowComponent>
      <SpaceComponent height={20} />

      {/* OUT ROOM */}

      {type === CONVENTION_TYPE.GROUP && (
        <LogOutGroupComponent onLogoutGroup={handleLogoutGroup} member={members[ownerID]} />
      )}
      {/* CUSTOM MODAL */}
      <CustomModal
        modalVisible={modalVisible}
        name={name}
        onClose={onCloseModal}
        onUpdate={onUpdate}
      />
      {/* <PopUpModal modalVisible={modalVisible} onCancle={onCloseModal} onSubmit={onUpdate} title={'Thay đổi tên nhóm'} /> */}
    </View>
  )
}

const LogOutGroupComponent = ({ onLogoutGroup, member }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const onShowModal = () => setModalVisible(true)
  const onHideModal = () => setModalVisible(false)

  const handleLogoutGroup = () => {
    onLogoutGroup(member)
    onHideModal()
  }

  return (
    <RowComponent  onPress={onShowModal}>
      <SimpleLineIcons name="logout" size={24} color={'red'} />
      <SpaceComponent width={8} />
      <Text style={{ fontSize: 18, fontWeight: '500', color: 'red' }}>Rời khỏi nhóm</Text>
      <PopUpModal
        modalVisible={modalVisible}
        onCancle={onHideModal}
        onSubmit={handleLogoutGroup}
        title={'Bạn có chắc muốn rời khỏi nhóm!'}
        subtitle={'Bạn sẽ không thể truy cập vào cuộc trò chuyện này nữa'}
      />
    </RowComponent>
  )
}

const CustomModal = ({ modalVisible, onClose, onUpdate, name }) => {
  const [inputValue, setInputValue] = useState(name)

  const handleInputChange = (value) => {
    setInputValue(value)
  }
  const handleCloseModal = () => onClose(false)

  const handleUpdate = () => {
    handleCloseModal()
    onUpdate(inputValue)
  }

  useEffect(() => {
    setInputValue(name)
  }, [])

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        onClose(!modalVisible)
      }}
    >
      <Pressable style={{ flex: 1 }} onPress={handleCloseModal}>
        <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
          <View>
            <SpaceComponent height={8} />
            <Text style={styles.modalTitle}>Thay đổi tên nhóm</Text>
            <SpaceComponent height={32} />
            <RowComponent >
              <SpaceComponent width={8} />
              <TextInput
                style={styles.modalTextInput}
                placeholder="Nhập tên mới..."
                value={inputValue}
                focusable={true}
                onChangeText={handleInputChange}
              />
            </RowComponent>
            <SpaceComponent height={16} />
            <RowComponent
              style={{ marginVertical: 10, marginHorizontal: 32, justifyContent: 'space-between' }}
            >
              <OpacityButtton
                title={'Hủy'}
                textStyle={styles.modalBtnText}
                style={styles.modalBtn}
                onPress={handleCloseModal}
              />
              <RowComponent>
                <OpacityButtton
                  title={'Lưu'}
                  textStyle={styles.modalBtnText}
                  style={styles.modalBtn}
                  onPress={handleUpdate}
                />
              </RowComponent>
            </RowComponent>
            <SpaceComponent height={8} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 20,
    backgroundColor: '#fff',
    marginTop: '50%',
    marginHorizontal: 40,
    borderColor: '#3332',
    borderWidth: 3
  },
  modalTitle: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 17,
    color: '#000',
    fontWeight: '500',
    textAlign: 'center'
  },
  modalTextInput: {
    borderBottomColor: '#ccc',
    flex: 1,
    borderBottomWidth: 1,
    paddingBottom: 2
  },
  modalBtnText: {
    color: 'blue',
    fontWeight: '400',
    fontSize: 16
  },
  modalBtn: {
    paddingVertical: 4,
    paddingHorizontal: 6
  }
})

export default DetailScreen
