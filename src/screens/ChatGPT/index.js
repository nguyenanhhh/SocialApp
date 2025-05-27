import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native'
import { API } from '../../api'
import { useCustomContext } from '../../store'
import GoBackComponent from '../../components/GoBackComponent'
import Octicons from 'react-native-vector-icons/Octicons'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'
const ChatGPTScreen = () => {
  const state = useSelector(selectCurrentUser)

  const [chatData, setChatData] = useState([])
  const [inputText, setInputText] = useState('')
  const [typing, setTyping] = useState('')

  useEffect(() => {
    API.getChatGPT(state._id).then((response) => {
      setChatData(response.data.reverse())
    })
  }, [])

  const handleSend = async () => {
    if (!inputText.trim()) {
      return
    }
    const userMessage = {
      question: inputText,
      answer: 'Đang phân tích...',
      _id: Math.random.toString()
    }
    // setChatData((prev) => [...prev, userMessage])
    setChatData((prev) => [userMessage, ...prev])
    // try {
    //   const response = await API.postNewChat(state._id, inputText)
    //   setInputText('')

    //   const answer = response.data.answer
    //   let displayedText = ''

    //   for (let i = 0; i < answer.length; i++) {
    //     setTimeout(() => {
    //       displayedText += answer[i]
    //       setTyping(displayedText)
    //     }, i)
    //   }

    //   setTimeout(() => {
    //     // setChatData((prev) => [...prev.slice(0,prev.length - 1), {...prev.at(prev.length - 1), answer: response.data.answer}])
    //     setChatData((prev) => [{...prev.at(0), answer: response.data.answer}, ...prev.slice(1,prev.length)])
    //     setTyping('')
    //     displayedText = null
    //   }, answer.length * 10)

    // } catch (error) {
    //   console.error('Error communicating with server:', error.message)
    // }
    const response = await API.postNewChat(state._id, inputText)
    setChatData((prev) => [
      { ...prev.at(0), answer: response.data.answer },
      ...prev.slice(1, prev.length)
    ])
    setInputText('')
    setTyping('')
  }

  return (
    <View style={styles.container}>
      <GoBackComponent title={'Chat bot'} hasBorder>
        <Octicons name="dependabot" size={28} />
      </GoBackComponent>
      <View style={styles.flatlistContainer}>
        <FlatList
          inverted
          data={chatData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.userMessage}>{item.question}</Text>
              <Text style={styles.botMessage}>{item.answer}</Text>
            </View>
          )}
        />
        {typing ? <Text style={styles.botMessage}>{typing}</Text> : null}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5'
  },
  flatlistContainer: {
    flex: 1
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1e7dd',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f8d7da',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5
  }
})

export default ChatGPTScreen
