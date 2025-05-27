import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import AvatarComponent from '../../../../components/AvatarComponent'
import SpaceComponent from '../../../../components/SpaceComponent'
import RowComponent from '../../../../components/RowComponent'
import { API } from '../../../../api'
import Feather from 'react-native-vector-icons/Feather'
import { navigate } from '../../../../store'

const SearchGroupItem = ({ item, onPress, onRemove }) => {
  const [groupInfo, setGroupInfo] = useState({})
  useEffect(() => {
    API.getGroupByIDAPI(item.search).then((response) => {
        setGroupInfo(response.data)
    })
  }, [])

  const onPressItem = () => onPress(item)
  const handleRemove = () => onRemove(item._id)


  return (
    <RowComponent style={styles.rowContainer}>
      <RowComponent onPress={onPressItem}>
        <AvatarComponent size={32} source={API.getFileUrl(groupInfo.avatar)} />
        <SpaceComponent width={12} />
        <Text style={styles.textStyle}>{groupInfo.name}</Text>
      </RowComponent>
      <Feather name="x" size={28} onPress={handleRemove} />
    </RowComponent>
  )
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#666',
    textAlign: 'left'
  }
})

export default SearchGroupItem
