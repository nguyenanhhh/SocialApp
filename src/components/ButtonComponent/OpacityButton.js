import { Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import React from 'react'

const OpacityButtton = ({
  disable,
  title,
  borderWidth,
  borderRadius,
  borderColor,
  underlay,
  left,
  right,
  textSize,
  submit,
  width,
  height,
  padding,
  paddingHorizontal,
  bgColor,
  margin,
  onPress,
  style,
  textColor,
  textStyle,
  fontWeight,
  children
}) => {
  const initValue = {
    onPress: () => {},
    textStyle: {
      color: (disable && 'gray') || (submit && 'red') || textColor || '#000',
      fontWeight: (disable && '300') || fontWeight || '500',
      fontSize: (disable && 16) || textSize,
      paddingVertical: 4,
      paddingHorizontal: paddingHorizontal ?? 4,
      textAlign: left ? 'left' : right ? 'right' : 'center',
      ...textStyle
    },
    style: {
      width: width,
      height: height,
      padding: padding ?? 2,
      margin: margin,
      backgroundColor: bgColor,
      justifyContent: 'center',
      alignItems: left ? 'left' : right ? 'right' : 'center',
      borderColor: borderColor,
      borderRadius: borderRadius,
      borderWidth: borderWidth
    }
  }
  const localValue = {
    onPress: onPress || initValue.onPress,
    style: [initValue.style, style],
    textStyle: initValue.textStyle,
    children: children || <Text style={initValue.textStyle}>{title}</Text>
  }
  return (
    <TouchableHighlight
      disabled={disable}
      underlayColor={underlay ?? '#ddd'}

      onPress={localValue.onPress}
      style={localValue.style}
    >
      {localValue.children}
    </TouchableHighlight>
  )
}

export default OpacityButtton