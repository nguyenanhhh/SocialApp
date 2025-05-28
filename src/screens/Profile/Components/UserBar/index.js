import React, { useEffect, useState } from 'react'
import { OpacityButtton } from '../../../../components/ButtonComponent'
import RowComponent from '../../../../components/RowComponent'
import { StyleSheet, Text } from 'react-native'
import SpaceComponent from '../../../../components/SpaceComponent'
import { API } from '../../../../api'
import { FRIEND_STATUS, RESPONSE_STATUS } from '../../../../utils/Constants'
import PopUpModal from '../../../../modals/PopUpModal'
import AntDesign from 'react-native-vector-icons/AntDesign'
import TextComponent from '~/components/TextComponent'
const CustomButton = ({ title, onPress }) => {
  return (
    <OpacityButtton
      style={styles.userBtn}
      textStyle={styles.userBtnTxt}
      title={title}
      onPress={onPress}
    />
  )
}

const handleCLick = {
  addFriend: async ({ ownerID, userID }) => {
    const response = await API.updateStatusFriend({
      ownerID,
      userID,
      status: FRIEND_STATUS.PENDING
    })
    return response
  },

  acceptFriend: async ({ ownerID, userID }) => {
    const response = await API.updateStatusFriend({
      ownerID: ownerID,
      userID: userID,
      status: FRIEND_STATUS.ACCEPTING
    })
    return response
  },

  refuseFriend: async ({ ownerID, userID }) => {
    const response = await API.updateStatusFriend({
      ownerID,
      userID,
      status: FRIEND_STATUS.REFUSING
    })
    return response
  },

  cancelRequest: async ({ ownerID, userID }) => {
    const response = await API.updateStatusFriend({
      ownerID,
      userID,
      status: FRIEND_STATUS.CANCELING
    })
    return response
  },

  cancelFriend: async ({ ownerID, userID }) => {
    const response = await API.updateStatusFriend({
      ownerID,
      userID,
      status: FRIEND_STATUS.CANCELING
    })
    return response
  }
}

const FriendStatusButton = ({ status, ownerID, userID, onSelect, onAfter }) => {
  const showCancelRequestModal = () => {
    onSelect('Hủy yêu cầu', 'Bạn có chắc chắn muốn hủy yêu cầu kết bạn!', () => {
      handleCLick.cancelRequest({ ownerID, userID }).then((response) => {
        if (response.status === RESPONSE_STATUS.SUCCESS) {
          onAfter(response.data?.status ?? FRIEND_STATUS.NONE)
        }
      })
    })
  }

  const showCanceFriendlModal = () => {
    onSelect('Hủy kết bạn', 'Bạn có chắc chắn muốn hủy kết bạn!', () => {
      handleCLick.cancelFriend({ ownerID, userID }).then((response) => {
        if (response.status === RESPONSE_STATUS.SUCCESS) {
          onAfter(response.data?.status ?? FRIEND_STATUS.NONE)
        }
      })
    })
  }

  const handleAdd = () => {
    handleCLick.addFriend({ ownerID, userID }).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        onAfter(response.data?.status ?? FRIEND_STATUS.NONE)
      }
    })
  }

  const handleRefuse = () => {
    handleCLick.refuseFriend({ ownerID, userID }).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        onAfter(response.data?.status ?? FRIEND_STATUS.NONE)
      }
    })
  }

  const handleAccept = () => {
    handleCLick.acceptFriend({ ownerID, userID }).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        onAfter(response.data?.status ?? FRIEND_STATUS.NONE)
      }
    })
  }

  switch (status) {
    case FRIEND_STATUS.NONE:
      return <CustomButton title={'Thêm bạn bè'} onPress={handleAdd} />
    case FRIEND_STATUS.PENDING:
      return <CustomButton title={'Đã gửi yêu cầu'} onPress={showCancelRequestModal} />
    case FRIEND_STATUS.ACCEPTING:
      return (
        <RowComponent>
          <CustomButton title={'Từ chối'} onPress={handleRefuse} />
          <CustomButton title={'Chấp nhận'} onPress={handleAccept} />
        </RowComponent>
      )
    case FRIEND_STATUS.FRIEND:
      return <CustomButton title={'Bạn bè'} onPress={showCanceFriendlModal} />
    default:
      return <CustomButton title={'Thêm bạn bè'} onPress={handleAdd} />
  }
}
const UserBar = ({ navigation, ownerID, userID }) => {
  const [statusFriend, setStatusFriend] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const [modalData, setModalData] = useState({ title: '', subTitle: '', onsubmit: () => {} })

  const closeModal = () => setModalVisible(false)

  const handleSetModalData = (title, subTitle, onsubmit) => {
    setModalVisible(true)
    setModalData({ title, subTitle, onsubmit })
  }

  const handleSubmitModal = () => {
    modalData.onsubmit()
    closeModal()
  }

  const handleSetStatusFriend = (status) => {
    setStatusFriend(status)
  }

  const handleChat = async () => {
    const conventionID = await API.getConventionID(ownerID, userID)
    navigation.navigate('ChattingScreen', { conventionID, userID })
  }

  useEffect(() => {
    API.getStatusFriend({ ownerID, userID }).then((data) => {
      setStatusFriend(data.status)
    })
  }, [])

  return (
    <RowComponent style={styles.userBtnWrapper}>
      <FriendStatusButton
        status={statusFriend}
        ownerID={ownerID}
        userID={userID}
        onSelect={handleSetModalData}
        onAfter={handleSetStatusFriend}
      />
      <SpaceComponent width={12} />
      <RowComponent
        onPress={handleChat}
        style={[styles.userBtn, { paddingHorizontal: 6, paddingVertical: 6 }]}
      >
        <TextComponent text="Nhắn tin" fontWeight="500" size={16} color="blue" />
        <SpaceComponent width={4} />
        <AntDesign name="message1" size={20} color={'blue'} />
      </RowComponent>
      <PopUpModal
        modalVisible={modalVisible}
        onCancle={closeModal}
        title={modalData.title}
        subtitle={modalData.subTitle}
        onSubmit={handleSubmitModal}
      />
    </RowComponent>
  )
}

export default UserBar

const styles = StyleSheet.create({
  userBtnWrapper: {
    justifyContent: 'center',
    marginBottom: 10
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userBtnTxt: {
    // color: '#2e64e5'
    color: 'blue'
  }
})
