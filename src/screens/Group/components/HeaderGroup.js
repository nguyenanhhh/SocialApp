import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import SpaceComponent from '../../../components/SpaceComponent'
import RowComponent from '../../../components/RowComponent'
import { OpacityButtton } from '../../../components/ButtonComponent'
import { SCOPE } from '../../../utils/Constants'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { navigationRef } from '../../../store'
import { API } from '../../../api'
import TextComponent from '~/components/TextComponent'

const groupScope = {
  [SCOPE.PUBLIC]: 'Nhóm công khai',
  [SCOPE.PRIVATE]: 'Nhóm riêng tư'
}

const HeaderGroup = ({ group, currentMember, onShowModal }) => {
  return (
    <View>
      <ImageBackground
        style={{ width: '100%', height: 250, position: 'relative' }}
        source={{ uri: API.getFileUrl(group.avatar) }}
      />
      <View style={{ marginHorizontal: 12 }}>
        <SpaceComponent height={8} />
        <TextComponent text={group.name} size={24} />
        <SpaceComponent height={16} />
        <TextComponent text={group.bio} color="#666" />
        <SpaceComponent height={16} />
        <RowComponent>
          {group.scope === SCOPE.PUBLIC && <Ionicons name="earth" size={22} />}
          {group.scope === SCOPE.PRIVATE && <Entypo name="lock" size={22} />}
          <SpaceComponent width={8} />
          <TextComponent color="#333" text={groupScope[group.scope]} />
          <SpaceComponent width={32} />
          <TextComponent text={`${group.memberLength} thành viên`} />
          {currentMember?.role === 'ADMIN' && (
            <OpacityButtton style={{ flex: 1 }} right onPress={onShowModal}>
              <Ionicons name="settings-outline" style={{ textAlign: 'right' }} size={22} />
            </OpacityButtton>
          )}
          <SpaceComponent width={8} />
        </RowComponent>
      </View>
    </View>
  )
}

export default HeaderGroup
