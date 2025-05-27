import { View, Text, TextInput } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import SpaceComponent from '../SpaceComponent'
import GoBackIcon from '../GoBackComponent/GoBackIcon'
import RowComponent from '../RowComponent'
import { OpacityButtton } from '../ButtonComponent'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useFocusEffect } from '@react-navigation/native'

const SearchComponent = ({
  unGoback,
  onSearch,
  onCallback,
  onGoBack,
  onNavigate,
  onFocus,
  padding,
  margin,
  title,
  value,
  unsearch,
  unReset,
  iconSize
}) => {
  const [searchInput, setSearchInput] = useState('')
  const ref = useRef()
  
  useFocusEffect(useCallback(() => {
    ref.current.focus()
  }, []))

  const handleTextInputChange = (newValue) => {
    setSearchInput(newValue)
    onCallback && onCallback(newValue)
  }

  const handleSearch = () => {
    onSearch(searchInput)
  }
  useEffect(() => {
    handleTextInputChange(value)
  }, [])

  return (
    <RowComponent alignItems style={{ padding, margin }} onPress={onNavigate}>
      {!unGoback && <GoBackIcon color={'blue'} size={iconSize} onNavigate={onGoBack} />}
      <SpaceComponent width={8} />
      <TextInput
        placeholder={title ?? 'Nhập nội dung tìm kiếm...'}
        value={searchInput}
        autoFocus
        ref={ref}
        onFocus={onFocus}
        onChangeText={handleTextInputChange}
        style={{
          flex: 1,
          borderBottomColor: '#ccc',
          borderBottomWidth: 1
        }}
      />
      <SpaceComponent width={16} />
      {!unsearch && (
        <OpacityButtton width={38} height={32} onPress={handleSearch}>
          <Ionicons name="search" size={30} />
        </OpacityButtton>
      )}
    </RowComponent>
  )
}

export default SearchComponent
