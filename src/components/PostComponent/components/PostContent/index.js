import { View, Text } from 'react-native'
import React from 'react'
import MixedViewing from '../../../MixedViewing'
import { API } from '../../../../api'

const PostContent = ({ content, attachments }) => {
  return (
    <View>
      <Text>{content}</Text>
      <MixedViewing
        attachments={attachments.map(API.convertPostItemAPI)}
        // attachments={attachments}
      />
    </View>
  )
}

export default PostContent
