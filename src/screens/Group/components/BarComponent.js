import { View, Text, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import PopUpModal from '../../../modals/PopUpModal'
import { MEMBER_STATUS, RESPONSE_STATUS } from '../../../utils/Constants'
import RowComponent from '../../../components/RowComponent'
import { OpacityButtton } from '../../../components/ButtonComponent'
import { API } from '../../../api'


const getModalTitle = (memberStatus) => {
  switch (memberStatus) {
    case MEMBER_STATUS.ACCEPT: return 'Rời khỏi nhóm!'
    case MEMBER_STATUS.PENDING: return 'Hủy yêu cầu!'
    default: return ''
  }
}

const getModalSubTitle = (memberStatus) => {
  switch (memberStatus) {
    case MEMBER_STATUS.ACCEPT:
      return 'Bạn có chắc rời khỏi nhóm?'
    case MEMBER_STATUS.PENDING: return 'Bạn vẫn chưa tham gia nhóm. Xác nhận hủy?'
    default: return ''
  }
}

const getBarTitle = (memberStatus) => {
  switch (memberStatus) {
    case MEMBER_STATUS.ACCEPT:
      return 'Đã tham gia'
    case MEMBER_STATUS.PENDING: return 'Đang chờ duyệt'
    default: return 'Tham gia nhóm'
  }
}


const BarComponent = ({ group, state, groupUser }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [member, setMember] = useState({})

  const onCloseModal = () => setModalVisible(false)
  const onOpenModal = () => setModalVisible(true)

  useEffect(() => {
    if (groupUser) {
      setMember(groupUser)
    }
  }, [groupUser])


  const getBarOnPress = (memberStatus) => {
    switch (memberStatus) {
      case MEMBER_STATUS.ACCEPT:
        return onOpenModal
      case MEMBER_STATUS.PENDING: return onOpenModal
      default: return handleRequestJoinGroup
    }
  }

  const handleRequestJoinGroup = () => {
    API.requestJoinGroupAPI(group._id, state).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setMember(response.data)
        if (response.data.status === MEMBER_STATUS.ACCEPT) {
          ToastAndroid.show('Đã tham gia nhóm!', ToastAndroid.SHORT)
        } else {
          ToastAndroid.show('Yêu cầu tham gia đang chờ duyệt!', ToastAndroid.SHORT)
        }
      }
    })
    onCloseModal()

  }

  const handleCancleRequestJoinGroup = () => {
    API.cancelRequestJoinGroupAPI(group._id, state._id).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        ToastAndroid.show('Đã hủy yêu cầu!', ToastAndroid.SHORT)
        setMember({})
      }
    })
    onCloseModal()
  }

  const handleExitGroup = () => {
    API.exitGroupAPI(group._id, state._id).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        ToastAndroid.show('Đã rời khỏi nhóm!', ToastAndroid.SHORT)
        setMember({})
      }
    })
    onCloseModal()

  }

  return (
    <View>
      <RowComponent>
        <OpacityButtton
          onPress={getBarOnPress(member.status)}
          underlay={'#11fa'}
          style={{ flex: 1 }}
          bgColor={'blue'}
          height={32}
          margin={12}
        >
          <Text style={{ color: '#fff' }}>{getBarTitle(member.status)}</Text>
        </OpacityButtton>
      </RowComponent>
      <PopUpModal
        modalVisible={modalVisible}
        onCancle={onCloseModal}
        onSubmit={member.status === MEMBER_STATUS.PENDING ? handleCancleRequestJoinGroup : handleExitGroup}
        title={getModalTitle(member.status)}
        subtitle={getModalSubTitle(member.status)}
      />
    </View>
  )
}

export default BarComponent