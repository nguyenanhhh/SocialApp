import { View, Text, FlatList, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import groupStype from '../../groupStyle'
import SpaceComponent from '../../../../components/SpaceComponent'
import SearchComponent from '../../../../components/SearchComponent'
import MemberItem from './MemberItem'
import GroupMemberModal from '../../../../modals/GroupMemberModal'
import { API } from '../../../../api'
import { RESPONSE_STATUS } from '../../../../utils/Constants'
import TextComponent from '~/components/TextComponent'

const FlatlistMembers = ({ data, navigation, groupID, groupName }) => {
  const [memberData, setMemberData] = useState([])
  const [searchResult, setSearchResult] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const memberFilter = searchResult
    ? memberData.filter((item) => item.userName.toLowerCase().includes(searchResult.toLowerCase()))
    : memberData

  useEffect(() => {
    if (data !== memberData) {
      setMemberData(data)
    }
  }, [data])

  const handleChangeSearch = (value) => setSearchResult(value)
  const handleShowModal = (item) => {
    setModalVisible(true)
    setSelectedItem(item)
  }
  const handleCloseModal = () => setModalVisible(false)
  const handlePressItem = (item) =>
    navigation.navigate('GroupUserScreen', { userID: item.userID, groupID, groupName })
  
  const onDeleteMember = () => {
    API.deleteMemberAPI(groupID, selectedItem.userID).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        ToastAndroid.show('Xóa thành công', ToastAndroid.SHORT)
        setMemberData(pre => pre.filter(item => item.userID !== selectedItem.userID))
      }
      else {
        ToastAndroid.show('Lỗi xảy ra! Không thể xóa!!!', ToastAndroid.SHORT)
      }
    })
  }

  const onBlockMember = () => {
    API.blockMemberAPI(groupID, selectedItem.userID).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        ToastAndroid.show('Block thành công', ToastAndroid.SHORT)
        setMemberData(pre => pre.filter(item => item.userID !== selectedItem.userID))
      }
      else {
        ToastAndroid.show('Lỗi xảy ra! Không thể block người dùng này!!!', ToastAndroid.SHORT)
      }
    })
  }

  return (
    <View style={groupStype.container}>
      <SearchComponent unsearch unGoback title={'Tìm kiếm thành viên...'} onCallback={handleChangeSearch} />
      <SpaceComponent height={32} />
      {memberFilter.length === 0 && (<TextComponent align='center' size={24} style={{marginTop:50}} text={'Không tìm thấy thành viên'} />)}
      <FlatList
        ItemSeparatorComponent={<SpaceComponent height={8} />}
        data={memberFilter}
        keyExtractor={(item, index) => item._id}
        renderItem={({ item, index }) => (
          <MemberItem
            key={item.userID}
            item={item}
            onPress={handlePressItem}
            onOption={handleShowModal}
          />
        )}
      />
      <GroupMemberModal
        modalVisible={modalVisible}
        navigation={navigation}
        item={selectedItem}
        onClose={handleCloseModal}
        onDelete={onDeleteMember}
        onBlock = {onBlockMember}
      />
    </View>
  )
}

export default FlatlistMembers
