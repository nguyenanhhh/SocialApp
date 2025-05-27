import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import RowComponent from '../../../../components/RowComponent'
import AvatarComponent from '../../../../components/AvatarComponent'
import SpaceComponent from '../../../../components/SpaceComponent'
import { API } from '../../../../api'
import { navigate } from '../../../../store'
import Feather from 'react-native-vector-icons/Feather'

const SearchUserItem = ({ item, onPress, onRemove }) => {
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    API.getUserByIdAPI({ uid: item.search }).then((response) => setUserInfo(response))
  }, [])

  const onPressItem = () => onPress(item)
  const handleRemove = () => onRemove(item._id)

  return (
    <RowComponent style={styles.rowContainer}>
      <RowComponent onPress={onPressItem}>
        <AvatarComponent size={36} source={API.getFileUrl(userInfo.avatar)} />
        <SpaceComponent width={12} />
        <Text style={styles.textStyle}>{userInfo.userName}</Text>
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

export default SearchUserItem
