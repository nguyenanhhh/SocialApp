import { ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from '../../api'
import { RESPONSE_STATUS } from '../../utils/Constants'

import DrawerModal from '../../modals/DrawerModal'
import BodyGroup from './components/BodyGroup'
import HeaderGroup from './components/HeaderGroup'
import FlatListPostGroup from '../../components/FlatListPostGroup'
import { useCustomContext } from '../../store'
import GoBackComponent from '../../components/GoBackComponent'
import SearchComponent from '../../components/SearchComponent'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'
import RNFS from 'react-native-fs'

const GroupScreen = ({ navigation, route }) => {
  const [group, setGroup] = useState({})
  const [currentMember, setCurrentMember] = useState({})
  const [modalVisible, setModalVisibal] = useState(false)
  const state = useSelector(selectCurrentUser)

  const { groupID } = route.params

  useEffect(() => {
    API.getGroupByIDAPI(groupID).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setGroup(response.data)
      }
    })
    API.getGroupMemberByUserIDAPI(groupID, state._id).then((response) => {
      setCurrentMember(response.data)
    })
  }, [])

  const handleOpenDrawerModal = () => setModalVisibal(true)
  const handleCloseDrawerModal = () => setModalVisibal(false)

  const handleUpdateGroupAvatar = async (value) => {
    console.log('update group avatar preparing')
    const { customPath } = value[0]
    const base64 = await RNFS.readFile(customPath, 'base64')
    API.updateGroupAvatarAPI(group._id, base64).then((data) => {
      // onClose()
      console.log('update group avatar successfully: ', data)
      setGroup((preGroup) => ({ ...preGroup, avatar: data.data.avatar }))
    }).catch(error => console.log('errror whem update group avatar: ', error)).finally(() => handleCloseDrawerModal())
  }

  return (
    <FlatListPostGroup groupID={groupID} ownerID={state._id}>
      <View style={{ backgroundColor: '#fff' }}>
        <GoBackComponent />
        <HeaderGroup
          currentMember={currentMember}
          group={group}
          onShowModal={handleOpenDrawerModal}
        />
        <BodyGroup group={group} groupID={groupID} currentMember={currentMember} />
        <DrawerModal
          modalVisible={modalVisible}
          onClose={handleCloseDrawerModal}
          updateGroupAvatar={handleUpdateGroupAvatar}
          group={group}
          groupID={groupID}
          navigation={navigation}
        />
      </View>
    </FlatListPostGroup>
  )
}

export default GroupScreen
