import { View, Text, StyleSheet, Pressable, Modal } from 'react-native'
import React from 'react'
import SpaceComponent from '../../components/SpaceComponent'
import RowComponent from '../../components/RowComponent'
import { OpacityButtton } from '../../components/ButtonComponent'
import { navigate } from '../../store'
import { API } from '../../api'

const FlatlistConventionModal = ({ convention, ownerID, onPause, modalVisible, onClose, onExitGroup }) => {
  const handleCloseModal = () => onClose()
  const handlOpenConvention = () => navigate('ChattingScreen', { conventionID: convention._id })

  const handleExitGroupConvention = async () => {
    onExitGroup(convention._id, ownerID)
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}
    >
      <Pressable style={{ flex: 1, backgroundColor:'rgba(0, 0, 0, 0.6)' }} onPress={handleCloseModal}>
        <View style={styles.modalContainer}>
          <SpaceComponent height={16} />
          <OpacityButtton onPress={handlOpenConvention} left textSize={16} title={'Truy cập cuộc trò chuyện'} />
          <SpaceComponent height={16} />
          <OpacityButtton onPress={onPause} left title={'Tắt thông báo'} textSize={16} />
          <SpaceComponent height={16} />
          {/* {convention?.type === 'group' && <OpacityButtton left title={'Thêm thành viên'} />}
          <SpaceComponent height={32} /> */}
          {convention?.type === 'group' && <OpacityButtton onPress={handleExitGroupConvention} textSize={16} left title={'Rời khỏi nhóm'} />}
          <SpaceComponent height={32} />
        </View>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginTop: '70%',
    marginHorizontal: 40,
    paddingHorizontal: 20
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

export default FlatlistConventionModal
