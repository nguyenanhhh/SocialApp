import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'

const DropDownComponent = ({ callback, initValue, data, height, width, size }) => {
  const [value, setValue] = useState(initValue)

  const customSize = {
    width: width ?? 200,
    height: height ?? 40
  }
  const customTextStyle = {
    fontSize: size ?? 16
  }
  return (
    <Dropdown
      style={[styles.dropdown, customSize]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={[styles.selectedTextStyle, customTextStyle]}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={ value}
      value={value}
      activeColor='#edda'
      renderItem={(item) => <Text style={[styles.dropDownItem, customTextStyle]}>{item.label}</Text>}
      onChange={(item) => {
        setValue(item.value)
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
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeholderStyle: {
    fontSize:14,
    textAlign: 'center',
  },
  selectedTextStyle: {
    textAlign: 'center',
    flex:1,
    fontSize: 16,
    color: 'red',
    margin:0
},
  dropDownItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 16,
    fontSize: 16,
    width: '100%',
    height: '100%'
  },

  iconStyle: {
    width: 24,
    height: 24
  }
})

export default DropDownComponent
