import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import Video from 'react-native-video'

const StoryPlayer = ({ story }) => (
  <View style={styles.container}>
    {story.mediaType === 'image' ? (
      <Image source={{ uri: story.media }} style={styles.media} />
    ) : (
      <Video source={{ uri: story.media }} style={styles.media} resizeMode="cover" repeat />
    )}

    {story.texts.map((item, index) => (
      <Text
        key={index}
        style={{
          position: 'absolute',
          left: item.position.x,
          top: item.position.y,
          fontSize: 24 * item.scale,
          color: 'white',
          fontWeight: 'bold'
        }}
      >
        {item.text}
      </Text>
    ))}
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  media: {
    width: '100%',
    height: '100%'
  }
})

export default StoryPlayer
