import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import RowComponent from '../../../components/RowComponent'
import { OpacityButtton } from '../../../components/ButtonComponent'
import Feather from 'react-native-vector-icons/Feather'
import SpaceComponent from '../../../components/SpaceComponent'

const CustomInput = ({ onSubmit, onCancel, replyItem, style }) => {
  const [inputValue, setInputValue] = useState('')
  const ref = useRef()
  const handleInputChange = (value) => setInputValue(value)

  const handleCancle = () => {
    onCancel()
    setInputValue('')
  }

  const handleSubmit = () => {
    onSubmit(inputValue)
    setInputValue('')
  }

  useEffect(() => {
    if (replyItem?.focus) {
      ref.current.focus()
    }
    else {
      ref.current.blur()
    }
  }, [replyItem])

  return (
    <View style={style}>
      <RowComponent>
        {replyItem && (
          <>
            <Text>Trả lời {replyItem.userName}:</Text>
            <SpaceComponent width={8} />
            <OpacityButtton onPress={handleCancle} title={'Hủy'} textColor={'blue'} padding={2} />
          </>
        )}
      </RowComponent>
      <RowComponent style={{ borderTopColor: '#ccc', borderTopWidth: 1 }}>
        <SpaceComponent width={8} />
        <TextInput
          ref={ref}
          value={inputValue}
          focusable
          onChangeText={handleInputChange}
          placeholder={replyItem ? '' : 'Thêm bình luận...'}
          style={{ flex: 1, fontSize: 16 }}
          multiline
        />
        <OpacityButtton style={{ padding: 8 }} onPress={handleSubmit}>
          <Feather name="send" size={32} color={'#666'} />
        </OpacityButtton>
      </RowComponent>
    </View>
  )
}

export default CustomInput
