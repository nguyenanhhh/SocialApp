import React from 'react'
import RowComponent from '../RowComponent'

import SpaceComponent from '../SpaceComponent'
import GoBackIcon from './GoBackIcon'
import { StyleSheet, Text } from 'react-native'

const GoBackComponent = ({
  height,
  title,
  size,
  color,
  style,
  paddingLeft,
  marginLeft,
  children,
  borderWidth,
  borderColor,
  bgColor,
  textColor,
  hasBorder
}) => {
  const borderStyle = hasBorder ? styles.borderStyle : {}
  return (
    <RowComponent
      alignItems
      style={[
        {
          backgroundColor: bgColor,
          marginLeft,
          paddingLeft,
          borderBottomColor: borderColor,
          borderBottomWidth: borderWidth
        },
        {},
        borderStyle
      ]}
    >
      <GoBackIcon size={size} color={color} />
      <SpaceComponent height={height ?? 48} />

      {title && <Text style={[styles.title, { color: textColor ?? '#000' }]}>{title}</Text>}
      {children}
    </RowComponent>
  )
}

const styles = StyleSheet.create({
  borderStyle: {
    borderBottomColor: '#3996',
    borderBottomWidth: 3
  },
  title: {
    textAlign: 'center',
    fontWeight: '500',
    flex: 1,
    fontSize: 20,
    marginRight: 24
  }
})

export default GoBackComponent
