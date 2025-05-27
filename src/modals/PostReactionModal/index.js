import { View, Text, StyleSheet, Pressable, Modal, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from '../../api'
import { RESPONSE_STATUS } from '../../utils/Constants'
import RowComponent from '../../components/RowComponent'
import AvatarComponent from '../../components/AvatarComponent'
import { OpacityButtton } from '../../components/ButtonComponent'
import SpaceComponent from '../../components/SpaceComponent'
import { navigationRef } from '../../store'

const PostReactionModal = ({ modalVisible, onClose, postID, ownerID }) => {
  const [postReaction, setPostReaction] = useState([])

  useEffect(() => {
    if(modalVisible) {
        API.getReactionByTargetAPI(postID).then((response) => {
            if (response.status === RESPONSE_STATUS.SUCCESS) {
              setPostReaction(response.data)
            }
          })
    }
  }, [modalVisible])

  const handleCloseModal = () => onClose()
  const openProfile = (userID) => {
    onClose()
    navigationRef.navigate('ProfileScreen', { ownerID, userID })
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}
    >
      <Pressable style={styles.pressableContainer} onPress={handleCloseModal}>
        <Pressable style={styles.pressableBody} onPress={(e) => e.stopPropagation()}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Người đã bày tỏ cảm xúc</Text>
            <SpaceComponent height={16} />
            <FlatList
              data={postReaction}
              keyExtractor={(item) => item._id}
              ItemSeparatorComponent={<SpaceComponent height={16} />}
              maxToRenderPerBatch={10}
              initialNumToRender={10}
              renderItem={({ item }) => (
                <RowComponent style={styles.rowContainer}>
                  <AvatarComponent
                    source={API.getFileUrl(item.avatar)}
                    size={42}
                    onPress={() => openProfile(item.userID)}
                  />
                  <SpaceComponent width={8} />
                  <OpacityButtton textStyle={styles.textStyle} onPress={() => openProfile(item.userID)} title={item.userName} />
                </RowComponent>
              )}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 1,
    paddingTop: 24
  },

  pressableBody: {
    flex: 1
  },

  modalContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop:16
  },
  title: {
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center',
    color:'#333c',
    borderBottomColor:'#3a9c',
    borderBottomWidth:1,
    paddingBottom:8
  },
  rowContainer: {

  },
  textStyle: {
    fontSize:18,
    color:'#336a',
    fontWeight:'600'
  }
})

export default PostReactionModal
