import React from 'react'
import RowComponent from '../../../../../components/RowComponent'
import AvatarComponent from '../../../../../components/AvatarComponent'
import SpaceComponent from '../../../../../components/SpaceComponent'
import { OpacityButtton } from '../../../../../components/ButtonComponent'
import Feather from 'react-native-vector-icons/Feather'
import { navigationRef } from '../../../../../store'
import { API } from '../../../../../api'

const ChatHeader = ({ name, avatar }) => {
  const handleGoBack = () => navigationRef.navigate('ConventionScreen')

  return (
    <RowComponent alignItems>
      <OpacityButtton
        onPress={handleGoBack}
        children={<Feather name="arrow-left-circle" size={26} color={'blue'} />}
      />
      <SpaceComponent width={8} />
      <AvatarComponent style={{ borderWidth: 1, borderColor: '#ccf' }} source={API.getFileUrl(avatar)} size={36} />
      <SpaceComponent width={8} />
      <OpacityButtton
        textStyle={{ fontWeight: '500', fontSize: 16 }}
        textColor={'#000'}
        title={name}
      />
    </RowComponent>
  )
}

export default ChatHeader
