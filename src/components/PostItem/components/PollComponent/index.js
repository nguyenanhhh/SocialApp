import { View, Text } from 'react-native'
import React from 'react'
import PollScreen from '../../../../screens/convenition/Vote/Show'

const PollComponent = ({ pollID, postID, disable }) => {
  return (
    <View style={{ flex: 1, postID }} aria-disabled={disable}>
      <PollScreen pollID={pollID} postID={postID} disable={disable} />
    </View>
  )
}

export default PollComponent
