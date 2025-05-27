import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'

const DropDownRole = ({ callback, initValue }) => {
  const data = [
    { label: 'Công khai', value: 'PUBLIC' },
    { label: 'Bạn bè', value: 'FRIEND' },
    { label: 'Chỉ mình tôi', value: 'PRIVATE' }
  ]
  const [value, setValue] = useState('PUBLIC')
  const [isFocus, setIsFocus] = useState(false)

  useEffect(() => {
    if(initValue) {
      setValue(initValue)
    }
  }, [initValue])

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={300}
      itemTextStyle={styles.itemTextStyle}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? 'Select' : value}
      value={value}
      renderItem={(item) => (
        <Text style={{ textAlign: 'center', padding: 4, fontSize: 12 }}>{item.label}</Text>
      )}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item.value)
        setIsFocus(false)
        callback(item.value)
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  dropdown: {
    height: 28,
    width: 100,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    marginLeft: 12
  },
  placeholderStyle: {
    fontSize: 14,
    textAlign: 'center'
  },
  selectedTextStyle: {
    textAlign: 'center',
    fontSize: 12,
    margin: 0,
    padding: 0,
    color: 'red'
  },

  iconStyle: {
    width: 24,
    height: 24
  }
})

export default DropDownRole
