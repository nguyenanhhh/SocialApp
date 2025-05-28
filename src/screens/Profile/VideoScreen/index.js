import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import SpaceComponent from '../../../components/SpaceComponent'
import { OpacityButtton } from '../../../components/ButtonComponent'
import { API } from '../../../api'
import Video from 'react-native-video'
import EnhancedImageViewing from 'react-native-image-viewing'
import ImagePressable from '../../../components/ImagePressable'
import VideoComponent from '../../../components/VideoComponent'
import GoBackComponent from '../../../components/GoBackComponent'
import { MESSAGE_TYPE, RESPONSE_STATUS } from '../../../utils/Constants'
import TextComponent from '~/components/TextComponent'

const FlatlistVideo = ({ data }) => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {data.map((item, index) => (
        <View
          key={index}
          style={{
            marginHorizontal: 2,
            width: '30%',
            height: 120,
            marginVertical: 2,
            borderWidth: 1,
            borderColor: '#ddd'
          }}
        >
          <VideoComponent source={item} width={'100%'} height={'100%'} />
          
        </View>
      ))}
    </View>
  )
}

const ProfileVideoScreen = ({ navigation, route }) => {
  const { userID, ownerID } = route.params
  const [images, setImages] = useState([])

  useEffect(() => {
    API.getUserPostsAPI(userID, ownerID).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setImages((pre) => {
          const postData = response.data
          const fileVideos = postData.map((post) => {
            const attachments = post.attachments
            const filters = attachments.filter((item) => item.type === MESSAGE_TYPE.VIDEO)
            const urls = filters.map((item) => API.getFileUrl(item.source))
            return urls
          })
          const listVideoUrl = fileVideos.reduce((total, currentValue) => total.concat(currentValue), [])
          return listVideoUrl
        })
      }
    })
  }, [])

  return (
    <View>
      <GoBackComponent marginLeft={16} title={'Video'} hasBorder />
      <SpaceComponent height={16} />

      <SpaceComponent height={32} />
      <FlatlistVideo data={images} />
      {images?.length === 0 && (<TextComponent style={{marginTop: 50}} align="center" size={32} color="red" fontWeight="500" text="Thư viện rỗng" />)}

    </View>
  )
}

export default ProfileVideoScreen

const styles = StyleSheet.create({
  active: {
    backgroundColor: 'blue',
    fontWeight: '600',
    width: '40%',
    height: 32,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inactive: {
    backgroundColor: '#ccc',
    fontWeight: '600',
    width: '40%',
    height: 32,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInactive: {
    fontSize: 16,
    fontWeight: '500'
  },
  textActive: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff'
  }
})
