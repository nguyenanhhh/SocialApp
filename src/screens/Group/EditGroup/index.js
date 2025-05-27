import { View, Text, TextInput, SafeAreaView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import GoBackComponent from '../../../components/GoBackComponent'
import { OpacityButtton } from '../../../components/ButtonComponent'
import SpaceComponent from '../../../components/SpaceComponent'
import RowComponent from '../../../components/RowComponent'
import { API } from '../../../api'
import { RESPONSE_STATUS } from '../../../utils/Constants'

const EditGroupScreen = ({ navigation, route }) => {
  const { groupID, editType, editValue } = route.params
  const [inputValue, setInputValue] = useState(editValue)
  const title = editType === 'name' ? 'tên nhóm' : 'mô tả'
  const handleInputChange = (newValue) => {
    setInputValue(newValue)
  }

  const handleUpdate = () => {
    if(inputValue === editValue) {
          navigation.goBack()
    }
    else if (route.params.editType === 'name') {
      API.updateGroupNameAPI(groupID, inputValue).then((response) => {
        if (response.status === RESPONSE_STATUS.SUCCESS) {
          ToastAndroid.show('Cập nhật tên nhóm thành công', ToastAndroid.SHORT)
          navigation.goBack()
        } else {
          ToastAndroid.show('Xảy ra lỗi, vui lòng thử lại!', ToastAndroid.SHORT)
          navigation.goBack()
        }
      })
    } else {
      API.updateGroupBioAPI(groupID, inputValue).then((response) => {
        if (response.status === RESPONSE_STATUS.SUCCESS) {
          ToastAndroid.show('Cập nhật mô tả thành công', ToastAndroid.SHORT)
          navigation.goBack()
        } else {
          ToastAndroid.show('Xảy ra lỗi, vui lòng thử lại!', ToastAndroid.SHORT)
          navigation.goBack()
        }
      })
    }
  }

  return (
    <View>
      <GoBackComponent color={'blue'}>
        <RowComponent
          alignItems
          style={{
            flex: 1,
            marginHorizontal: 8,
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc'
          }}
        >
          <Text style={{ flex: 1, textAlign: 'center', fontWeight: '600', fontSize: 16 }}>
            {' '}
            Chỉnh sửa {title}
          </Text>
          <OpacityButtton title={'Lưu'} textColor={'blue'} textSize={18} onPress={handleUpdate} />
        </RowComponent>
      </GoBackComponent>
      <SpaceComponent height={8} />
      <View style={{ marginLeft: 12, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>

        <SpaceComponent height={8} />
        <TextInput
          placeholder={`Thêm ${title}...`}
          value={inputValue}
          onChangeText={handleInputChange}
          multiline
          maxLength={100}
        />
      </View>
      <SpaceComponent height={8} />
      <Text style={{ marginRight: 8, textAlign: 'right' }}>{inputValue.length}/100</Text>
    </View>
  )
}

export default EditGroupScreen
