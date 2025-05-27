import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ToastAndroid
} from 'react-native'
import RowComponent from '../../../components/RowComponent'
import SpaceComponent from '../../../components/SpaceComponent'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { API } from '../../../api'
import { useCustomContext } from '../../../store'
import { MESSAGE_TYPE, POLL_TYPE, RESPONSE_STATUS } from '../../../utils/Constants'
import { OpacityButtton } from '../../../components/ButtonComponent'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'


const CreatePollScreen = ({ onSendMessage, onCancel, submitState, onPollChange, onPollClear }) => {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['']) // Ít nhất 2 tùy chọn mặc định
  const state = useSelector(selectCurrentUser)

  const handleAddOption = () => {
    setOptions([...options, ''])
    onPollChange && onPollChange({ options: [...options, ''] })
  }

  const handleOptionChange = (text, index) => {
    const updatedOptions = [...options]
    updatedOptions[index] = text
    setOptions(updatedOptions)
    onPollChange && onPollChange({ options: updatedOptions })
  }

  const handleRemoveOption = (deletedIndex) => {
    const currentOptions = [...options]
    const updatedOptions = currentOptions.filter((item, index) => index !== deletedIndex)
    setOptions(updatedOptions)
    onPollChange && onPollChange({ options: updatedOptions })
  }

  const handleSubmit = async () => {
    if (!question.trim()) {
      return Alert.alert('Lỗi', 'Vui lòng nhập câu hỏi.')
    }

    const filledOptions = options.filter((option) => option.trim())
    if (options.length < 2) {
      return Alert.alert('Lỗi', 'Cần ít nhất 2 tùy chọn.')
    } else if (filledOptions.length < options.length) {
      return Alert.alert('Lỗi', 'Tùy chọn không được rỗng.')
    }

    const customData = {
      targetID: null,
      userID: state._id,
      question,
      options: filledOptions,
      result: [],
      type: POLL_TYPE.CONVENTION
    }
    API.createPoll(customData).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        onSendMessage(' đã tạo cuộc bình chọn: ' + question, MESSAGE_TYPE.POLL, response.data._id)
        onCancel()
      } else {
        Alert.alert('Lỗi', response.data)
      }
    })
  }

  const handleCancle = () => {
    if (submitState) {
      onPollClear && onPollClear()
      onCancel()
    } else {
      onCancel()
    }
  }

  return (
    <View style={styles.container}>
      <RowComponent alignItems style={{ justifyContent: 'space-between' }}>
        <Text style={styles.title}>Tạo bình chọn mới</Text>
        <OpacityButtton padding={4} onPress={handleCancle}>
          <FontAwesome style={styles.title} name="close" size={42} color={'#666'} />
        </OpacityButtton>
      </RowComponent>
      <TextInput
        style={styles.input}
        placeholder="Nhập câu hỏi của bạn"
        value={question}
        onChangeText={(value) => {
          setQuestion(value)
          onPollChange && onPollChange({ question: value })
        }}
      />

      <FlatList
        data={options}
        scrollEnabled={!submitState}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <RowComponent style={{ flex: 1 }}>
            <TextInput
              style={styles.itemInput}
              placeholder={`Tùy chọn ${index + 1}`}
              value={item}
              onChangeText={(text) => handleOptionChange(text, index)}
            />
            <SpaceComponent height={4} />
            <MaterialIcons
              name="clear"
              size={24}
              onPress={() => handleRemoveOption(index)}
              style={{ paddingHorizontal: 10 }}
            />
          </RowComponent>
        )}
        ListFooterComponent={
          <TouchableOpacity style={styles.addOptionButton} onPress={handleAddOption}>
            <Text style={styles.addOptionText}>+ Thêm tùy chọn</Text>
          </TouchableOpacity>
        }
      />
      {!submitState && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Tạo bình chọn</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8
  },
  itemInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8
  },

  addOptionButton: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center'
  },
  addOptionText: {
    color: '#fff',
    fontSize: 16
  },
  submitButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#28a745',
    borderRadius: 8,
    alignItems: 'center'
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default CreatePollScreen
