import React, { useState } from 'react'
import { View } from 'react-native'
import EnhancedImageViewing from 'react-native-image-viewing'
import ImagePressable from '../ImagePressable'
import VideoComponent from '../VideoComponent'

const MixedViewing = ({ attachments, width, height }) => {
  const [imageViewState, setImageViewState] = useState(false)
  const [imageViewIndex, setImageViewIndex] = useState(0)
  const handleClickImage = (id) => {
    setImageViewIndex(id)
    setImageViewState(true)
  }
  return (
    <View>
      <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
        {attachments.map((item, index) => {
          return ['image/jpeg', 'image/png'].includes(item.type) ? (
            <ImagePressable
              key={index}
              onPress={() => handleClickImage(index)}
              containerStyle={{
                width: width ?? '31%',
                height: height ?? 100,
                marginHorizontal: 2,
                marginVertical: 2,
                borderWidth: 1,
                borderColor: '#aaa'
              }}
              source={item.uri}
            />
          ) : (
            <VideoComponent key={index} source={item.uri} width={100} height={100} />
          )
        })}
      </View>
      <EnhancedImageViewing
        images={attachments.filter((item) => item.type === 'image/jpeg')}
        // images={attachments}
        imageIndex={imageViewIndex}
        onImageIndexChange={(id) => setImageViewIndex(id)}
        visible={imageViewState}
        swipeToCloseEnabled
        onRequestClose={() => setImageViewState(false)}
      />
    </View>
  )
}

export default MixedViewing
