import React, { useEffect, useState } from 'react'
import RowComponent from '../../../../../components/RowComponent'
import AvatarComponent from '../../../../../components/AvatarComponent'
import SpaceComponent from '../../../../../components/SpaceComponent'
import { OpacityButtton } from '../../../../../components/ButtonComponent'
import Feather from 'react-native-vector-icons/Feather'
import { navigationRef, useCustomContext } from '../../../../../store'
import { API } from '../../../../../api'
import { CONVENTION_TYPE } from '../../../../../utils/Constants'
import RNRestart from 'react-native-restart'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'
const ChatHeader = ({ name, avatar, type, conventionID, members, userIdReceive }) => {
  const state = useSelector(selectCurrentUser)

  const [userID, setUserID] = useState()

  const ownerID = state._id

  useEffect(() => {
    let id = null
    if (members) {
      for (let item in members) {
        if (item !== state._id) {
          id = item
          setUserID(id)

          break
        }
      }
    }
  }, [members])

  const handleGoBack = () =>
    navigationRef.canGoBack() ? navigationRef.goBack() : RNRestart.restart()
  const openDetail = () => navigationRef.navigate('DetailContainerScreen', { conventionID })
  const openProfile = () =>
    navigationRef.navigate('ProfileScreen', { userID: userIdReceive ?? userID, ownerID })

  const handlePressName = () => conventionID && openDetail()
  const handlePressAvatar = () => (type === CONVENTION_TYPE.PRIVATE ? openProfile() : openDetail())

  return (
    <RowComponent alignItems>
      <OpacityButtton
        onPress={handleGoBack}
        children={<Feather name="arrow-left-circle" size={26} color={'blue'} />}
      />
      <SpaceComponent width={8} />
      <AvatarComponent
        style={{ borderWidth: 1, borderColor: '#ccf' }}
        source={API.getFileUrl(avatar)}
        size={36}
        onPress={handlePressAvatar}
      />
      <SpaceComponent width={8} />
      <OpacityButtton
        textStyle={{ fontWeight: '500', fontSize: 16 }}
        textColor={'#000'}
        title={name}
        onPress={handlePressName}
      />
    </RowComponent>
  )
}

export default ChatHeader
