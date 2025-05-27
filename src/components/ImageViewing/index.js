import React, { useState } from 'react'
import { View } from 'react-native'
import EnhancedImageViewing from 'react-native-image-viewing'
import ImagePressable from '../ImagePressable'

const ImageViewing = ({ imageList, width, height }) => {
  const [imageViewState, setImageViewState] = useState(false)
  const [imageViewIndex, setImageViewIndex] = useState(0)
  const handleClickImage = (id) => {
    setImageViewIndex(id)
    setImageViewState(true)
  }
  return (
    <View >
      <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
        {imageList.map((item, index) => {
          return (
            <ImagePressable
              key={index}
              onPress={() => handleClickImage(index)}
              containerStyle={{
                width:  width ?? '31%',
                height: height ?? 100,
                marginHorizontal: 2,
                marginVertical: 2,
                borderWidth: 1,
                borderColor: '#aaa'
              }}
              source={item.uri}
            />
          )
        })}
      </View>
      <EnhancedImageViewing
        images={imageList}
        imageIndex={imageViewIndex}
        onImageIndexChange={(id) => setImageViewIndex(id)}
        visible={imageViewState}
        swipeToCloseEnabled
        onRequestClose={() => setImageViewState(false)}
      />
    </View>
  )
}

export default ImageViewing
