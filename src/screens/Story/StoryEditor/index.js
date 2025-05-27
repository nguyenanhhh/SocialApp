import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, Dimensions, Image, Alert } from 'react-native'
import Video from 'react-native-video'
import ImageCropPicker from 'react-native-image-crop-picker'
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
  PinchGestureHandler
} from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const { width, height } = Dimensions.get('window')

// Component kéo thả và thu phóng văn bản
const DraggableText = ({ text, initialPosition, initialScale }) => {
  const translateX = useSharedValue(initialPosition.x)
  const translateY = useSharedValue(initialPosition.y)
  const scale = useSharedValue(initialScale)

  // Pan gesture
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX + initialPosition.x
      translateY.value = event.translationY + initialPosition.y
    })
    .onEnd(() => {
      initialPosition.x = translateX.value
      initialPosition.y = translateY.value
    })

  // Pinch gesture
  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = initialScale * event.scale
    })
    .onEnd(() => {
      initialScale = scale.value
    })

  // Combine gestures
  const composedGesture = Gesture.Simultaneous(panGesture, pinchGesture)

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withSpring(translateX.value) },
      { translateY: withSpring(translateY.value) },
      { scale: withSpring(scale.value) }
    ]
  }))

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[styles.textContainer, animatedStyle]}>
        <Text style={styles.text}>{text}</Text>
      </Animated.View>
    </GestureDetector>
  )
}

const CropImageTool = ({ imageUrl }) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

  // Vị trí và kích thước khung cắt
  const cropX = useSharedValue(SCREEN_WIDTH * 0.1)
  const cropY = useSharedValue(SCREEN_HEIGHT * 0.2)
  const cropWidth = useSharedValue(SCREEN_WIDTH * 0.6)
  const cropHeight = useSharedValue(SCREEN_HEIGHT * 0.4)

  // Gesture kéo khung
  const panGesture = Gesture.Pan().onUpdate((event) => {
    cropX.value += event.translationX
    cropY.value += event.translationY
  })

  // Gesture phóng to/thu nhỏ khung
  const pinchGesture = Gesture.Pinch().onUpdate((event) => {
    cropWidth.value *= event.scale
    cropHeight.value *= event.scale
  })

  const animatedStyle = useAnimatedStyle(() => ({
    left: cropX.value,
    top: cropY.value,
    width: cropWidth.value,
    height: cropHeight.value,
    borderWidth: 2,
    borderColor: 'white'
  }))

  const handleCrop = async () => {
    // Dùng thư viện xử lý crop theo cropX.value, cropY.value, cropWidth.value, cropHeight.value
    console.log('Cắt ảnh với toạ độ:', {
      x: cropX.value,
      y: cropY.value,
      width: cropWidth.value,
      height: cropHeight.value
    })
    // Tích hợp logic cắt ảnh ở đây
  }

  const styles1 = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT * 0.7
    },
    cropBox: {
      position: 'absolute',
      backgroundColor: 'rgba(255, 255, 255, 0.3)'
    }
  })

  return (
    <View style={styles1.container}>
      <Image source={{ uri: imageUrl }} style={styles1.image} resizeMode="contain" />
      <GestureDetector gesture={Gesture.Simultaneous(panGesture, pinchGesture)}>
        <Animated.View style={[styles1.cropBox, animatedStyle]} />
      </GestureDetector>
      <Button title="Cắt ảnh" onPress={handleCrop} />
    </View>
  )
}



const StoryEditor = ({ onSave }) => {
  const [media, setMedia] = useState(null)
  const [mediaType, setMediaType] = useState('')
  const [texts, setTexts] = useState([])
  const [newText, setNewText] = useState('')

  const pickMedia = async () => {
    try {
      const result = await ImageCropPicker.openPicker({
        mediaType: 'any'
      })

      setMedia(result.path)
      setMediaType(result.mime.startsWith('image') ? 'image' : 'video')
    } catch (error) {
      console.log(error)
    }
  }

  const handleCrop = async (imageUrl) => {
    try {
      const croppedImage = await ImageCropPicker.openCropper({
        path: imageUrl,
        width: cropWidth.value,
        height: cropHeight.value,
        cropping: true // Bật tính năng cắt
      })

      console.log('Đường dẫn ảnh đã cắt:', croppedImage.path)
    } catch (error) {
      console.error('Lỗi cắt ảnh:', error)
    }
  }

  //   const pickMedia = async (type = 'image') => {
  //     try {
  //       const options = {
  //         mediaType: type,
  //         cropping: type === 'photo' // Chỉ bật cắt khi chọn ảnh
  //       }

  //       if (type === 'photo') {
  //         options.width = 1080
  //         options.height = 1920
  //         options.freeStyleCropEnabled = false
  //       }

  //       const result = await ImageCropPicker.openPicker(options)

  //       setMedia(result.path)
  //       setMediaType(result.mime.startsWith('image') ? 'image' : 'video')
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  const addText = () => {
    setTexts([...texts, { text: newText, position: { x: 50, y: 50 }, scale: 1 }])
    setNewText('')
  }

  const saveStory = () => {
    if (!media) {
      Alert.alert('Lỗi', 'Vui lòng chọn ảnh hoặc video trước!')
      return
    }

    onSave({
      media,
      mediaType,
      texts
    })
  }

  return (
    <View style={styles.container}>
      {!media ? (
        <>
          <Button title="Chọn ảnh hoặc video" onPress={pickMedia} />
          <Button title="Chọn và cắt ảnh" onPress={pickMedia} />
        </>
      ) : (
        <>
          {mediaType === 'image' ? (
            <Image source={{ uri: media }} style={styles.media} />
          ) : (
            <Video source={{ uri: media }} style={styles.media} resizeMode="cover" repeat />
          )}

          {texts.map((item, index) => (
            <DraggableText
              key={index}
              text={item.text}
              initialPosition={item.position}
              initialScale={item.scale}
            />
          ))}

          <TextInput
            style={styles.input}
            placeholder="Nhập văn bản..."
            value={newText}
            onChangeText={setNewText}
          />
          <Button title="Thêm văn bản" onPress={addText} />
          <Button title="Lưu Story" onPress={saveStory} />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  media: {
    width: width,
    height: height
  },
  textContainer: {
    position: 'absolute'
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 100,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5
  }
})

export default StoryEditor
