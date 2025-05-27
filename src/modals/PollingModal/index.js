import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'

import SpaceComponent from '../../components/SpaceComponent'
import { OpacityButtton } from '../../components/ButtonComponent'
import RowComponent from '../../components/RowComponent'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { useState } from 'react'
import { API } from '../../api'
import { useCustomContext } from '../../store'
import { MESSAGE_NOTIFY_TYPE, MESSAGE_TYPE } from '../../utils/Constants'
import SocketClient from '../../socket'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'

const PollingModal = ({
  modalVisible,
  ownerID,
  pollID,
  members,
  onCancle,
  poll,
  conventionID,
  postID
}) => {
  const [edited, setEdited] = useState(false)
  const [ownerChosen, setOwnerChosen] = useState(
    poll.results.filter((item) => item.userID === ownerID)?.at(0)?.optionIDs ?? []
  )
  const state = useSelector(selectCurrentUser)


  const checkItem = (optionID) => setOwnerChosen((pre) => [...pre, optionID])
  const uncheckItem = (optionID) =>
    setOwnerChosen((pre) => [...pre].filter((id) => id !== optionID))

  const updatePolling = () => {
    const origin = poll.results.filter((item) => item.userID === ownerID)?.at(0)?.optionIDs

    const currentMember = members?.get(state._id) ?? state._id
    const displayName = currentMember.aka || currentMember.userName
    if (!origin) {
      const targetID = conventionID ?? postID
      const customResult = { userID: ownerID, optionIDs: ownerChosen }
      API.addPolling(pollID, customResult, targetID).then((response) => {
        conventionID &&
          API.sendMessageAPI({
            conventionID: conventionID,
            senderAvatar: state.avatar,
            senderName: state.userName,
            data: {
              customMessage: displayName + ' đã thêm lựa chọn cho cuộc bình chọn: ' + poll.question,
              senderID: state._id,
              type: MESSAGE_TYPE.NOTIFY,
              notify: {
                type: MESSAGE_NOTIFY_TYPE.POLL
              }
            }
          }).then(response => {
            onCancle()
            SocketClient.socket.emit('updatePolling', { pollID, data: customResult, targetID })
          })
          })
    } else if (ownerChosen.sort((a, b) => a > b) !== origin?.sort((a, b) => a > b)) {
      const targetID = conventionID ?? postID
      const customResult = { userID: ownerID, optionIDs: ownerChosen }
      API.updatePolling(pollID, customResult, targetID).then((response) => {
        API.sendMessageAPI({
          conventionID: conventionID,
          senderAvatar: state.avatar,
          senderName: state.userName,
          data: {
            customMessage: displayName + ' đã cập nhật lựa chọn cho cuộc bình chọn: ' + poll.question,
            senderID: state._id,
            type: MESSAGE_TYPE.NOTIFY,
            notify: {
              type: MESSAGE_NOTIFY_TYPE.POLL
            }
          }
        })
        onCancle()
        SocketClient.socket.emit('updatePolling', { pollID, data: customResult, targetID })
      })
    }
  }
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
            <View style={styles.container}>
              <RowComponent style={{ justifyContent: 'space-between', paddingHorizontal: 16 }}>
                <Text>Thăm dò ý kiến</Text>
                <OpacityButtton onPress={onCancle}>
                  <FontAwesome style={styles.title} name="close" size={24} color={'#666'} />
                </OpacityButtton>
              </RowComponent>
              <SpaceComponent height={8} />
              <Text style={styles.question}>{poll.question}</Text>
              <SpaceComponent height={16} />
              <FlatList
                data={poll.options}
                keyExtractor={(item) => item._id}
                style={{ flex: 1 }}
                ItemSeparatorComponent={<SpaceComponent height={8} />}
                renderItem={({ item }) => {
                  const chosensLength = poll.results.filter(
                    (result) => result.optionID === item._id
                  ).length
                  const checked = !ownerChosen
                    ? false
                    : ownerChosen.findIndex((optionID) => optionID === item._id) !== -1
                  return (
                    <View>
                      <RowComponent>
                        <OpacityButtton
                          onPress={() => {
                            setEdited(true)
                            if (checked) {
                              uncheckItem(item._id)
                            } else {
                              checkItem(item._id)
                            }
                          }}
                        >
                          <Feather
                            name={checked ? 'check-circle' : 'circle'}
                            size={24}
                            color={checked ? 'blue' : '#ccc'}
                          />
                        </OpacityButtton>
                        <SpaceComponent width={4} />
                        <RowComponent style={{ justifyContent: 'space-between', width: '90%' }}>
                          <Text style={{ marginLeft: 18 }}>{item.value}</Text>
                          <Text>{chosensLength > 0 && chosensLength}</Text>
                        </RowComponent>
                      </RowComponent>
                    </View>
                  )
                }}
              />
              <SpaceComponent height={24} />
              <OpacityButtton
                disable={!edited}
                title={'Cập nhật'}
                bgColor={edited ? '#66f' : '#ccc'}
                style={{ borderRadius: 25 }}
                textColor={edited ? '#fff' : '#333'}
                textSize={17}
                textStyle={{ fontWeight: 'bold' }}
                onPress={updatePolling}
              />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 3,
    borderColor: '#bbb',
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 32,
    paddingVertical: 8,
    paddingLeft: 16
  },
  modalTitle: {
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 10,
    color: '#a2f',
    fontSize: 16,
    fontWeight: '500'
  },
  container: {
    flex: 1
  },
  pressableContainer: {
    flex: 1,
    position: 'relative'
  },

  pressableBody: {
    backgroundColor: '#eee',
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: 50,
    bottom: 0,
    left: 0,
    right: 0
  },
  question: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600'
  },
  itemPollLengthStyle: {
    backgroundColor: '#ddd',
    width: '90%',
    height: 12,
    borderRadius: 25
  }
})

export default PollingModal
