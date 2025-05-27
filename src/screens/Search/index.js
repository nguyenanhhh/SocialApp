import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { API } from '../../api'
import { useCustomContext } from '../../store'
import { RESPONSE_STATUS } from '../../utils/Constants'
import SpaceComponent from '../../components/SpaceComponent'
import SearchComponent from '../../components/SearchComponent'
import SearchTextItem from './components/SearchTextItem'
import SearchUserItem from './components/SearchUserItem'
import SearchGroupItem from './components/SearchGroupItem'
import { useFocusEffect } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'

const SearchItem = ({ item, onPress, onRemove }) => {
  switch (item.type) {
    case 'text':
      return <SearchTextItem item={item} onPress={onPress} onRemove={onRemove} />
    case 'user':
      return <SearchUserItem item={item} onPress={onPress} onRemove={onRemove} />
    case 'group':
      return <SearchGroupItem item={item} onPress={onPress} onRemove={onRemove} />
    default:
      return <SearchTextItem item={item} onPress={onPress} onRemove={onRemove} />
  }
}

const SearchScreen = ({ navigation, route }) => {
  const [searchHistory, setSearchHistory] = useState()
  const state = useSelector(selectCurrentUser)

  const [search, setSearchResult] = useState(route.params?.search ?? '')

  const handleSearch = (value) => {
    const customValue = value.trim()
    setSearchResult(customValue)
    if (customValue !== '') {
      navigation.setParams({ search: customValue })
      navigation.navigate('SearchResultScreen', { search: customValue })
      handleSearchAction({ search: customValue, type: 'text' })
      setSearchResult('')
    }
  }
  // useFocusEffect(
  //   useCallback(() => {

  //     if (route.params?.search !== search) {
  //       setSearchResult(pre => route.params?.search ?? '')
  //     }
  //   }, [route.params?.search])
  // )

  const handleSearchAction = (item) => {
    API.addSearchTypeHistory(state._id, item.search, item.type).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setSearchHistory((pre) => {
          const newItem = response.data
          const filterArr = pre.filter((element) => element._id !== newItem._id)
          return [newItem, ...filterArr]
        })
      }
      if (item.type === 'text') {
        navigation.setParams({ search: item })
      }
      setSearchResult('')
    })
  }

  const handleTextSearch = (text) => navigation.navigate('SearchResultScreen', { search: text })
  const handleUserSearch = (userID, ownerID) =>
    navigation.navigate('ProfileScreen', { userID, ownerID })
  const handleGroupSearch = (groupID, ownerID) =>
    navigation.navigate('GroupScreen', { groupID, ownerID })

  const handlePressItem = (item) => {
    switch (item.type) {
      case 'text':
        handleTextSearch(item.search)
        break
      case 'user':
        handleUserSearch(item.search, state._id)
        break
      case 'group':
        handleGroupSearch(item.search, state._id)
        break
      default:
        handleTextSearch(item)
    }
    handleSearchAction(item)
  }

  const handleRemoveItem = (searchID) => {
    API.removeOneSearchHistoryByID(searchID).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setSearchHistory((pre) => {
          const filterArr = pre.filter((item) => item._id !== searchID)
          return filterArr
        })
      }
    })
  }

  const onGoBack = () => navigation.goBack()

  useFocusEffect(useCallback(() => {
    API.getSearchHistoryListByUserID(state._id).then((response) => {
      response.status === RESPONSE_STATUS.SUCCESS && setSearchHistory(response.data)
    })
  }, []))

  return (
    <View>
      <SearchComponent
        unReset
        value={search ?? route.params?.search}
        onGoBack={onGoBack}
        onSearch={handleSearch}
      />
      <SpaceComponent height={16} />
      <FlatList
        style={styles.flatlistContainer}
        data={searchHistory}
        key={(item) => item._id}
        ItemSeparatorComponent={<SpaceComponent height={8} />}
        renderItem={({ item }) => (
          <SearchItem
            item={item}
            ownerID={state._id}
            onPress={handlePressItem}
            onRemove={handleRemoveItem}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  flatlistContainer: {
    marginHorizontal: 8
  }
})

export default SearchScreen
