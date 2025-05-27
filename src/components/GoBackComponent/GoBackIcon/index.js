import React from 'react'
import { OpacityButtton } from '../../ButtonComponent'
import Octicons from 'react-native-vector-icons/Octicons'
import { navigationRef } from '../../../store'

const GoBackIcon = ({ style, size, paddingLeft, paddingRight, color, onNavigate }) => {
  const handleGoBack = () => {
    navigationRef.goBack()
  }
  const customStyle = { paddingLeft: paddingLeft ?? 12, paddingRight: paddingRight ?? 12, ...style }

  return (
    <OpacityButtton style={customStyle} onPress={onNavigate ?? handleGoBack}>
      <Octicons name="chevron-left" size={size ?? 32} color={color} />
    </OpacityButtton>
  )
}

export default GoBackIcon
