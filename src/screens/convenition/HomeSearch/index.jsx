import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import RowComponent from '~/components/RowComponent'
import SpaceComponent from '~/components/SpaceComponent'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AvatarComponent from '~/components/AvatarComponent'
import { API } from '~/api'
import TextComponent from '~/components/TextComponent'
import GoBackIcon from '~/components/GoBackComponent/GoBackIcon'
import { CONVENTION_TYPE } from '~/utils/Constants'

const HomeSearchScreen = ({ navigation, route }) => {
  const { conventions, ownerId } = route.params
  const [searchValue, setSearchValue] = useState('')
  const filterConventions = searchValue ? conventions?.filter((item) => item?.name?.toLowerCase()?.includes(searchValue?.toLocaleLowerCase())) : []

  const handleChange = (value) => setSearchValue(value)
  const handleClear = () => setSearchValue('')

  return (
    <View style={{ flex: 1, paddingHorizontal: 12, backgroundColor: '#fff' }}>
      <SpaceComponent height={12} />
      <RowComponent>
        <GoBackIcon />
        <RowComponent alignItems style={styles.searchContainer}>
          <TextInput
            onChangeText={handleChange}
            value={searchValue}
            style={styles.textInput}
            placeholder="Tìm kiếm..."
          />
          <SpaceComponent width={16} />
          <MaterialIcons onPress={handleClear} name="clear" size={28} />
        </RowComponent>
      </RowComponent>
      <SpaceComponent height={16} />
      {filterConventions.length === 0 && (
        <TextComponent
          style={{ marginTop: 20, textAlign: 'center' }}
          color={'#666'}
          size={24}
          text={searchValue ? 'Không tìm thấy kết quả' : ''}
        />
      )}
      <FlatList
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={<SpaceComponent height={16} />}
        data={filterConventions}
        renderItem={({ item: convention, index }) => {
          const privateUser = convention.members.find((member) => member._id !== ownerId)
          const avatar = convention.avatar ? convention.avatar : privateUser.avatar
          const subName = convention.type === CONVENTION_TYPE.GROUP ? ' (group)' : ''
          const name = convention.name || privateUser.userName
          console.log('ownerId, memberId, name: ', {
            ownerId,
            privateUserId: privateUser._id,
            avatar,
            name
          })

          return (
            <RowComponent
              onPress={() =>
                navigation.navigate('ChattingScreen', { conventionID: convention._id })
              }
            >
              <AvatarComponent size={42} source={API.getFileUrl(avatar)} />
              <SpaceComponent width={12} />
              <TextComponent text={name} size={18}>
                <TextComponent text={subName} style={{ color: 'blue' }} />
              </TextComponent>
            </RowComponent>
          )
        }}
      />
    </View>
  )
}

export default HomeSearchScreen

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 0,
    backgroundColor: '#dee',
    borderRadius: 20,
    padding: 2,
    paddingLeft: 4,
    paddingRight: 8
  },

  searchInput: {
    backgroundColor: '#eee',
    height: 32,
    color: '#ffe',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 25,
    padding: 0,
    margin: 0,
    paddingHorizontal: 8
  },

  textInput: {
    margin: 0,
    padding: 8,
    paddingLeft: 12,

    flex: 1
  }
})
