import { View, Text } from 'react-native'
import React from 'react'
import MixedViewing from '../../../MixedViewing'
import { API } from '../../../../api'
import SpaceComponent from '../../../SpaceComponent'

const PostContent = ({ content, attachments }) => {
  return (
    <View>
      <Text>{content}</Text>
      <SpaceComponent height={8} />
      <MixedViewing
        attachments={attachments.map(API.convertPostItemAPI)}
        // attachments={attachments}
      />
    </View>
  )
}

export default PostContent
