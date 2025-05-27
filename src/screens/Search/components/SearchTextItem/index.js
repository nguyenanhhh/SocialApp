import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { OpacityButtton } from '../../../../components/ButtonComponent'
import RowComponent from '../../../../components/RowComponent'
import Feather from 'react-native-vector-icons/Feather'
import { navigate } from '../../../../store'
import { API } from '../../../../api'

const SearchTextItem = ({ item, onPress, onRemove }) => {

  const handlePressItem = () => onPress(item)
  const handleRemove = () => onRemove(item._id)
  return (
    <RowComponent style={styles.rowContainer}>
      <OpacityButtton style={styles.btnStyle} title={item.search} left textStyle={styles.textStyle} onPress={handlePressItem} />
      <Feather name="x" size={28} onPress={handleRemove} />
    </RowComponent>
  )
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  btnStyle: {
    flex:1
  },
  textStyle: {
    fontSize: 22,
    fontWeight: '400',
    color: '#666',
    textAlign: 'left'
  }
})

export default SearchTextItem
