import React, { useState, useRef, useEffect } from 'react'
import { View, Button, StyleSheet, TouchableOpacity } from 'react-native'
import Video from 'react-native-video'

const VideoComponent = ({ source, width, height, onLongPress }) => {
  const [paused, setPaused] = useState( true)
  const [controls, setControls] = useState(false)
  const [fullMode, setFullMode] = useState(false)
  const videoRef = useRef(null)

  const togglePlayPause = () => {
      setPaused(!paused)
  }

  useEffect(()=> {
    if(!fullMode) {
      setPaused(true)
    }
  }, [fullMode])

  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={togglePlayPause}
      style={{ width: width, height:height,paddingRight:4,  backgroundColor: '#bbb',  justifyContent:'flex-end' }}
    >
      <Video
        ref={videoRef}
        source={{ uri: source }}
        style={styles.video}
        paused={paused}
        fullscreen={ paused ? false : true}
        resizeMode={fullMode ? "contain" : "stretch"}
        onFullscreenPlayerDidPresent={()=> setFullMode(true)}
        onFullscreenPlayerDidDismiss={()=> setFullMode(false)}
        bufferConfig={{
          minBufferMs: 15000, // Thời gian buffer tối thiểu
          maxBufferMs: 50000, // Thời gian buffer tối đa
          bufferForPlaybackMs: 2500, // Thời gian buffer trước khi bắt đầu phát lại
          bufferForPlaybackAfterRebufferMs: 5000 // Buffer lại sau khi bị gián đoạn
        }}

      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%'
  }
})

export default VideoComponent
