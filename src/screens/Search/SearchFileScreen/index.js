import { Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import SpaceComponent from '../../../components/SpaceComponent'
import { API } from '../../../api'
import { navigationRef, useCustomContext } from '../../../store'
import { RESPONSE_STATUS } from '../../../utils/Constants'
import WrappedFlatListPost from '../../../components/WrappedFlatlistPost'
import { useFocusEffect } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'

const SearchFileScreen = ({ navigation, route }) => {
  const state = useSelector(selectCurrentUser)

  const [postData, setPostData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { search } = route.params

  useFocusEffect(
    useCallback(() => {
      API.searchImageAPI(state._id, search).then((response) => {
        if (response.status === RESPONSE_STATUS.SUCCESS) {
          response.data && setPostData(response.data)
        }
      })
      
    }, [search])
  )

  return (
    <View>
      <SpaceComponent height={16} />
      {postData.length === 0 && (
        <Text
          style={{
            fontWeight: '900',
            fontSize: 20,
            textTransform: 'capitalize',
            textAlign: 'center',
            marginTop: '50%',
            color: '#3336'
          }}
        >
          {isLoading ? 'Đang tìm kiếm...' : 'Không có file phương tiện được tìm thấy'}
        </Text>
      )}
       {
        postData.length > 0 && <Text style={{fontSize:18, color:'#f33', fontWeight:'500', margin:16}}>Có {postData.length} bài viết chứa file cần tìm</Text>
      }
      <SpaceComponent height={16} />

      <WrappedFlatListPost data={postData} ownerID={state._id} />
    </View>
  )
}

export default SearchFileScreen
