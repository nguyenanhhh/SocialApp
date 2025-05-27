import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import RowComponent from '../../../../components/RowComponent'
import GoBackIcon from '../../../../components/GoBackComponent/GoBackIcon'
import SpaceComponent from '../../../../components/SpaceComponent'
import { template } from '@babel/core'
import { navigationRef } from '../../../../store'
import { OpacityButtton } from '../../../../components/ButtonComponent'

const ListGroupHeader = () => {
  const handleClickAddGroup = () => navigationRef.navigate('NewGroupScreen')

  return (
    <RowComponent style={styles.container}>
      <GoBackIcon />
      <SpaceComponent width={16} />
      <Text style={styles.title}>Nhóm của bạn</Text>
      <OpacityButtton title={'Tạo nhóm'} onPress={handleClickAddGroup} />
      <SpaceComponent width={16} />
      <Text>Sắp xếp</Text>
      <SpaceComponent width={16} />
    </RowComponent>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50
  },
  title: {
    flex: 1,
    fontSize:18,
    textAlign:'center',
    color:'blue'
  }
})

export default ListGroupHeader
