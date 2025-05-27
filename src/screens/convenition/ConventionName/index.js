import { View, Text, Button, Modal, Pressable, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import SpaceComponent from '../../../components/SpaceComponent'
import RowComponent from '../../../components/RowComponent'
import AvatarComponent from '../../../components/AvatarComponent'
import { API } from '../../../api'
import GoBackComponent from '../../../components/GoBackComponent'
import { OpacityButtton } from '../../../components/ButtonComponent'

const ConventionName = ({ navigation, route }) => {
  const { conventionID, conventionName } = route.params
  return (
    <View style={{ marginLeft: 24 }}>
      <View style={{maxHeight:'100%' }}>
        <SpaceComponent height={100} />
        <Text>This is name screen</Text>
        <RowComponent>
          <Text>Tên nhóm: </Text>
          <TextInput placeholder={conventionName || 'Nhập tên nhóm...'} />
        </RowComponent>
      </View>
      <RowComponent>
        <OpacityButtton style={{ flex: 1 }} title={'Hủy'} />
        <OpacityButtton style={{ flex: 1 }} title={'Lưu'} submit />
      </RowComponent>
    </View>
  )
}

export default ConventionName
