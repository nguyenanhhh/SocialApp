import { Text } from 'react-native'

const TextComponent = ({ children, text, style, align, size, fontWeight, color }) => {
  const customStyle = {
    color: color ?? '#333',
    fontSize: size ?? 18,
    fontWeight: fontWeight ?? '400',
    textAlign: align ?? 'left',
    ...style
  }
  return (
    <Text style={customStyle}>
      {text}
      {children}
    </Text>
  )
}

export default TextComponent
