import { View } from 'react-native'

const SpaceComponent = ({ width, height }) => {
  const localStyle = {
    width: width ?? 0,
    height: height ?? 0
  }
  return (
    <View style={localStyle} />
  )
}

export default SpaceComponent
