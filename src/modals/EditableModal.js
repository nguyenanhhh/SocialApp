import { View, Text, Modal, Pressable, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import SpaceComponent from '../components/SpaceComponent'
import RowComponent from '../components/RowComponent'
import { OpacityButtton } from '../components/ButtonComponent'

const EditableModal = ({ modalVisible, onClose, onSubmit, title, content }) => {
  const [inputValue, setInputValue] = useState(content)

  const handleInputChange = (value) => setInputValue(value)
  const handleCloseModal = () => onClose()

  const handleUpdate = () => {
    onSubmit(inputValue)
  }
  useEffect(()=> {
    setInputValue(content)
  }, [content])

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}
    >
      <Pressable style={{ flex: 1 }} onPress={handleCloseModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <SpaceComponent height={16} />
          <TextInput
            style={styles.modalTextInput}
            placeholder="Thêm nội dung..."
            value={inputValue}
            focusable={true}
            onChangeText={handleInputChange}
          />
          <SpaceComponent height={32} />
          <RowComponent
            alignItems
            style={{ marginVertical: 10, marginHorizontal: 32, justifyContent: 'space-between' }}
          >
            <OpacityButtton
              title={'Hủy'}
              textStyle={styles.modalBtnText}
              onPress={handleCloseModal}
            />
            <RowComponent>
              <OpacityButtton
                paddingHorizontal={8}
                title={'Lưu'}
                textStyle={styles.modalBtnText}
                onPress={handleUpdate}
              />
            </RowComponent>
          </RowComponent>
          <SpaceComponent height={8} />
        </View>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 20,
    borderWidth:2,
    borderColor:'#ccc',
    backgroundColor: '#fff',
    marginTop: '50%',
    marginHorizontal: 40,
    paddingHorizontal:20
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

export default EditableModal
