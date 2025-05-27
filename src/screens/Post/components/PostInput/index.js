import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { forwardRef, useEffect, useState } from 'react'

const PostInput = forwardRef(function (props, ref) {
  const [inputValue, setInputValue] = useState(props.value)
  useEffect(() => {
    setInputValue(props.value || '')
    ref.current.value = props.value
  }, [props.value])

  const handleTextChange = (newValue) => {
    setInputValue(newValue)
    ref.current.value = newValue
  }
  return (
    <View>
      <TextInput
        style={styles.textInput}
        onChangeText={handleTextChange}
        focusable={true}
        textAlignVertical="top"
        value={inputValue}
        autoFocus={true}
        multiline={true}
        placeholder="Ngày hôm nay của bạn thế nào?"
      />
    </View>
  )
})

export default PostInput

const styles = StyleSheet.create({
  textInput: {
    width: '80%',
    fontSize: 16,
    marginLeft: 16
  }
})
