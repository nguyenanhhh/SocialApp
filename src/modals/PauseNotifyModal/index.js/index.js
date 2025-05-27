import { View, Text, StyleSheet, Pressable, Modal } from 'react-native'
import React, { useState } from 'react'
import SpaceComponent from '../../../components/SpaceComponent'
import RowComponent from '../../../components/RowComponent'
import { OpacityButtton } from '../../../components/ButtonComponent'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { NOTIFY_CONVENTION_STATUS } from '../../../utils/Constants'
import { helper } from '../../../utils/helpers'

const CustomItem = ({ selectedFlag, title, onPress, flag }) => {
  const handlePress = () => onPress(flag)
  return (
    <RowComponent alignItems onPress={handlePress}>
      <FontAwesome color={'blue'} name={selectedFlag === flag ? 'check-circle' : 'circle-thin'} size={24} />
      <SpaceComponent width={16} />
      <Text style={styles.friendName}>{title}</Text>
    </RowComponent>
  )
}

const FLAG ={
  after15m: '15m',
  after1h: '1h',
  after6h: '6h',
  after1d: '1d',
  never: 'never',
  allow: 'allow'
}

const handleCustomPauseNotifyData = (flag) => {
  const data = { }
  const timeStamp = Date.now()
  data.status = NOTIFY_CONVENTION_STATUS.CUSTOM
  switch(flag) {
    case FLAG.after15m: {
      data.upto = timeStamp + helper.DateTimeHelper.timeCounter.MINUTE * 15
      break
    }
    case FLAG.after1h: {
      data.upto = timeStamp + helper.DateTimeHelper.timeCounter.HOUR
      break
    }
    case FLAG.after6h: {
      data.upto = timeStamp + helper.DateTimeHelper.timeCounter.HOUR * 6
      break
    }
    case FLAG.after1d: {
      data.upto = timeStamp + helper.DateTimeHelper.timeCounter.DAY
      break
    }
    case FLAG.never: {
      data.upto = ''
      data.status = NOTIFY_CONVENTION_STATUS.NOT_ALLOW
      break
    }
    case FLAG.allow: {
      data.upto = ''
      data.status = NOTIFY_CONVENTION_STATUS.ALLOW
      break
    }
    default: NOTIFY_CONVENTION_STATUS.ALLOW
  }
  return data
} 

const PauseNotifyModal = ({ modalVisible, onClose, onSubmit }) => {
  const handleCloseModal = () => onClose()
  const handleSubmit = () => onSubmit(handleCustomPauseNotifyData(selectedFlag))
  const [selectedFlag, setSelectedFlag] = useState()
  const handleSelect = value => setSelectedFlag(value)

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}
    >
      <Pressable style={{ flex: 1, backgroundColor:'rgba(0, 0, 0, 0.6)' }} onPress={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.container}>
            <SpaceComponent height={16} />
            <CustomItem title={'Tắt trong 15 phút'} onPress={handleSelect} selectedFlag={selectedFlag} flag={FLAG.after15m} />
            <SpaceComponent height={16} />
            <CustomItem title={'Tắt trong 1 giờ'} onPress={handleSelect} selectedFlag={selectedFlag} flag={FLAG.after1h} />
            <SpaceComponent height={16} />
            <CustomItem title={'Tắt trong 6 giờ'} onPress={handleSelect} selectedFlag={selectedFlag} flag={FLAG.after6h} />
            <SpaceComponent height={16} />
            <CustomItem title={'Tắt trong 1 ngày'} onPress={handleSelect} selectedFlag={selectedFlag} flag={FLAG.after1d} />
            <SpaceComponent height={16} />
            <CustomItem title={'Đến khi tôi bật lại'} onPress={handleSelect} selectedFlag={selectedFlag} flag={FLAG.never} />
            <SpaceComponent height={16} />
            <CustomItem title={'reset'} onPress={handleSelect} selectedFlag={selectedFlag} flag={FLAG.allow} />
            <SpaceComponent height={32} />
          </View>
          <RowComponent style={{ justifyContent: 'flex-end' }}>
            <OpacityButtton textColor={'#333'} textSize={18} paddingHorizontal={16} title={'Hủy'} onPress={handleCloseModal} />
            <OpacityButtton textColor={'#11f'} textSize={18} paddingHorizontal={16} title={'Lưu'} onPress={handleSubmit} />
          </RowComponent>
          <SpaceComponent height={16} />
        </View>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginTop: '50%',
    marginHorizontal: 40,
    paddingHorizontal: 20
  },
  container: {
    paddingLeft:10,
    paddingTop:10
  },
  modalTitle: {
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 10,
    color: '#000',
    fontWeight: '500'
  },
  modalTextInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 2
  },

  modalBtnText: {
    color: 'blue',
    fontWeight: '400',
    fontSize: 16
  }
})

export default PauseNotifyModal
