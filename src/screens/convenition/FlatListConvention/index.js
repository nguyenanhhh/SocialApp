import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet, ToastAndroid, View } from 'react-native'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'
import { API } from '../../../api'
import SpaceComponent from '../../../components/SpaceComponent'
import FlatlistConventionModal from '../../../modals/FlatlistConventionModal'
import PauseNotifyModal from '../../../modals/PauseNotifyModal/index.js'
import { NOTIFY_CONVENTION_STATUS, RESPONSE_STATUS } from '../../../utils/Constants.js'
import ShortChatingComponent from './ShortChatComponent'

import { TextInput } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import RowComponent from '../../../components/RowComponent'
import GoBackIcon from '~/components/GoBackComponent/GoBackIcon'

const FlatListConvention = ({ navigation }) => {
  const state = useSelector(selectCurrentUser)

  const [conventions, setConventions] = useState([])

  useFocusEffect(
    useCallback(() => {
      API.getOwnerConventions(state._id).then((data) => {
        data.length && setConventions(data ?? [])
      })
    }, [])
  )

  useEffect(() => {
    API.getOwnerConventions(state._id).then((data) => {
      data.length && setConventions(data ?? [])
    })
  }, [])

  const [modalVisible, setModalVisible] = useState(false)
  const handleCloseModal = () => setModalVisible(false)
  const handleOpenModal = () => setModalVisible(true)
  const [selectConvention, setSelectConvention] = useState()
  const handleSelectItem = (value) => {
    setSelectConvention(value)
    handleOpenModal()
  }

  const [pauseNotifyVisible, setPauseNotifyVisible] = useState(false)
  const openPauseNotifyModal = () => {
    setPauseNotifyVisible(true)
    handleCloseModal()
  }
  const closePauseNotifyModal = () => {
    setPauseNotifyVisible(false)
  }

  const handleSubmitPauseNotify = (data) => {
    API.updateNotifyConventionStatus(selectConvention._id, state._id, data.status, data.upto).then(
      (response) => {
        if (response.status === RESPONSE_STATUS.SUCCESS) {
          const newDate = new Date(data.upto)
          const customTime = newDate.getHours() + ' : ' + newDate.getMinutes()
          const customMessage =
            data.status === NOTIFY_CONVENTION_STATUS.CUSTOM
              ? customTime
              : data.status === NOTIFY_CONVENTION_STATUS.ALLOW
              ? 'Đã bật thông báo cho đoạn chat này'
              : ' khi bạn bật lại'
          ToastAndroid.show(
            (data.status === NOTIFY_CONVENTION_STATUS.ALLOW
              ? ''
              : 'Thông báo sẽ được tắt cho đến: ') + customMessage,
            ToastAndroid.SHORT
          )
          closePauseNotifyModal()
        } else {
          ToastAndroid.show('Lỗi xảy ra: ', ToastAndroid.SHORT)
          closePauseNotifyModal()
        }
      }
    )
  }

  const handleExitGroup = async (conventionID, ownerID) => {
    await API.logoutGroupAPI(conventionID, ownerID).then((data) => {
      handleCloseModal()
      setConventions((pre) => {
        const custom = pre.filter((item) => item._id !== conventionID)
        return custom
      })
    })
  }

  const handleClickSearch = () => {
    navigation.navigate('HomeSearchScreen', { conventions, ownerId: state._id })
  }

  const handleClickCreateGroup = () => navigation.navigate('CreateGroupScreen')

  return (
    <View style={{ flex: 1,  backgroundColor: '#fff' }}>
      <RowComponent alignItems style={styles.searchContainer}>
        <GoBackIcon />
        <RowComponent onPress={handleClickSearch} style={styles.searchInput}>
          <TextInput editable={false} style={styles.textInput} placeholder="Tìm kiếm..." />
          <MaterialIcons name="search" size={24} />
        </RowComponent>
        <SpaceComponent width={16} />
        <MaterialIcons onPress={handleClickCreateGroup} name="group-add" size={32} />
      </RowComponent>
      <SpaceComponent height={24} />
      <FlatList
        style={{ flexDirection: 'column', flex: 1, paddingHorizontal:16 }}
        data={conventions}
        ItemSeparatorComponent={<SpaceComponent height={16} />}
        renderItem={({ item, index }) => (
          <ShortChatingComponent
            onLongPress={handleSelectItem}
            convention={item}
            navigation={navigation}
            ownerID={state._id}
          />
        )}
      />
      <FlatlistConventionModal
        convention={selectConvention}
        modalVisible={modalVisible}
        ownerID={state._id}
        onClose={handleCloseModal}
        onPause={openPauseNotifyModal}
        onExitGroup={handleExitGroup}
      />

      <PauseNotifyModal
        onSubmit={handleSubmitPauseNotify}
        onClose={closePauseNotifyModal}
        modalVisible={pauseNotifyVisible}
      />
    </View>
  )
}

export default FlatListConvention

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 0
  },

  searchInput: {
    backgroundColor: '#eee',
    height: 32,
    color: '#ffe',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 25,
    padding: 0,
    margin: 0,
    paddingHorizontal: 8
  },

  textInput: {
    margin: 0,
    padding: 0
  }
})
