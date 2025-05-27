import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import RowComponent from '../../../components/RowComponent'
import Octicons from 'react-native-vector-icons/Octicons'
import SpaceComponent from '../../../components/SpaceComponent'
import { MESSAGE_TYPE } from '../../../utils/Constants'
import { OpacityButtton } from '../../../components/ButtonComponent'
import AvatarComponent from '../../../components/AvatarComponent'
import { API } from '../../../api'
import { helper } from '../../../utils/helpers'
import GoBackComponent from '../../../components/GoBackComponent'
import GoBackIcon from '../../../components/GoBackComponent/GoBackIcon'

const SearchItem = ({ memberMap, item, onPress }) => {
  return (
    <View style={styles.resultItem}>
      <SpaceComponent height={16} />
      <RowComponent alignItems onPress={()=> onPress(item)}>
        <SpaceComponent width={8} />
        <AvatarComponent size={32} source={API.getFileUrl(memberMap.get(item.senderID).avatar)} />
        <SpaceComponent width={8} />
        <View>
          <Text style={{fontWeight: 'bold'}}>{memberMap.get(item.senderID).name}</Text>
          <SpaceComponent height={4} />
          <RowComponent>
          <Text style={styles.resultMessage}>{item.message}</Text>
          <SpaceComponent width={16} />
          <Text style={styles.resultDateTime}>
            {helper.DateTimeHelper.formatDateWithString(item.createdAt)}
          </Text>
          </RowComponent>
        </View>
      </RowComponent>
      <SpaceComponent height={16} />
    </View>
  )
}

const SearchConventionScreen = ({ navigation, route }) => {
  const {  members, conventionID } = route.params
  const [chatData, setChatData] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [searchAction, setSearchAction] = useState(false)
  const [memberMap, setMemberMap] = useState(() => {
    const newMap = new Map()
    members.forEach((item) => newMap.set(item._id, {name: item.userName, avatar: item.avatar}))
    return newMap
  })


  useEffect(()=>{
    API.getConventionByIdAPI(conventionID).then(data => {
      if(data) {
        setChatData(data.data.reverse())
      }
    })
  }, [])

  const handleSearch = () => {
    const result = chatData
      .map((item, index) => ({ ...item, index: index }))
      .filter((item) => {
        if (item.type === MESSAGE_TYPE.TEXT) {
          if (item.message.includes(searchValue)) {
            return true
          }
        }
        return false
      })
    setSearchResult(result)
    setSearchAction(true)
  }

  const handleTextInputChange = (value) => setSearchValue(value)

  const handleClickSearchItem = (item) => {
    const arrIndex = searchResult.map(element => element.index)
    const search = {
      text: searchValue,
      currentIndex: arrIndex.indexOf(item.index),
      data: arrIndex
    }
    navigation.navigate('ChattingScreen', { conventionID, search: search })
  }

  return (
    <View style={styles.container}>
      <SpaceComponent height={8} />
      <RowComponent alignItems style={styles.searchInputContainer}>
        <GoBackIcon color={'blue'} />
        <SpaceComponent width={8} />
        <TextInput
          placeholder="Nhập nội dung tìm kiếm..."
          value={searchResult}
          onChangeText={handleTextInputChange}
          style={styles.textInput}
        />
        <SpaceComponent width={16} />
        <OpacityButtton width={38} height={32} onPress={handleSearch}>
          <Octicons name="search" size={32} color={'blue'} />
        </OpacityButtton>
      </RowComponent>
      <SpaceComponent height={16} />
      {searchAction && (
        <Text style={styles.resultTitle}>Kết quả tìm thấy: {searchResult.length}</Text>
      )}
      <FlatList
        ListFooterComponent={<SpaceComponent height={100} />}
        data={searchResult}
        renderItem={({ item, index }) => (
          <SearchItem onPress={handleClickSearchItem} memberMap={memberMap} item={item} key={index} index={index} />
        )}
      />
    </View>
  )
}

export default SearchConventionScreen
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },

  searchInputContainer: {},

  textInput: {
    flex: 1,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },

  resultTitle: {
    fontSize: 17,
    color: '#f33',
    fontWeight: 'bold'
  },
  resultItem: {},
  resultMessage: {
    fontWeight: '400'
  },
  resultDateTime: {
    fontSize: 12
  }
})
