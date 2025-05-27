import { TouchableOpacity, View } from 'react-native'

const RowComponent = ({ children, style, justify, alignItems, onPress, onLongPress }) => {
  const defaultValue = {
    onPress: () => {},
    styles: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: justify && 'center'
    }
  }

  const customStyles = [defaultValue.styles, style]

  return onPress || onLongPress ? (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={customStyles}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={customStyles}>{children}</View>
  )
}

export default RowComponent
