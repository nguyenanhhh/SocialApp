import { Modal, Pressable, StyleSheet, View } from 'react-native'

import CreatePollScreen from '../../screens/convenition/Vote'

const PollModal = ({ modalVisible, onCancle, onSubmit }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        onCancle()
      }}
    >
      <Pressable style={styles.pressableContainer} onPress={onCancle}>
        <Pressable style={styles.pressableBody} onPress={(e) => e.stopPropagation()}>
          <View style={styles.modalContainer}>
            <CreatePollScreen onSendMessage={onSubmit} onCancel={onCancle} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#bbb',
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 32,
  },
  modalTitle: {
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 10,
    color: '#a2f',
    fontSize: 16,
    fontWeight: '500'
  },
  pressableContainer: {
    flex: 1,
    position: 'relative',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  pressableBody: {
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    top: 50,
    bottom: 0,
    left: 0,
    right: 0
  }
})

export default PollModal
