import { Pressable, TouchableHighlight, TouchableOpacity, View } from 'react-native'

const ColumnComponent = ({ children, style, bgColor, onPress, onLongPress }) => {
  const customStyle = {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: bgColor,
    ...style
  }

  return onPress || onLongPress ? (
    <TouchableHighlight
      underlayColor={'#eee'}
      onPress={onPress}
      onLongPress={onLongPress}
      style={customStyle}
    >
      {children}
    </TouchableHighlight>
  ) : (
    <View style={customStyle}>{children}</View>
  )
}

export default ColumnComponent
