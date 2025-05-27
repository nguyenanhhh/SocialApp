import { Text } from 'react-native'
import React from 'react'
import { helper } from '../../utils/helpers'

const DateTimeComponent = ({ timestamp }) => {
  return <Text>{helper.formatDate(timestamp)}</Text>
}

export default DateTimeComponent
