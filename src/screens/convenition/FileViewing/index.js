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

const FlatlistImage = ({ data }) => {
  const [imageIndex, setImageIndex] = useState(0)
  const [imageViewState, setImageViewState] = useState(false)

  const handleClickImage = (id) => {
    setImageIndex(id)
    setImageViewState(true)
  }

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {data.map((item, index) => (
        <ImagePressable
          key={'item-' + index}
          onPress={() => handleClickImage(index)}
          containerStyle={{
            borderWidth: 1,
            borderColor: '#ddd',
            marginHorizontal: 4,
            marginVertical: 4,
          }}
          source={API.getFileUrl(item)}
          width={'30%'}
          height={100}
        />
      ))}
      <EnhancedImageViewing
        images={data.map((item) => {
          return { uri: API.getFileUrl(item) }
        })}
        imageIndex={imageIndex}
        onImageIndexChange={(id) => setImageIndex(id)}
        visible={imageViewState}
        swipeToCloseEnabled
        onRequestClose={() => setImageViewState(false)}
      />
    </View>
  )
}
const FlatlistVideo = ({ data }) => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {data.map((item, index) => (
        <View
          key={index}
          style={{ marginHorizontal: 2, marginVertical: 2, borderWidth: 1, borderColor: '#ddd' }}
        >
          <VideoComponent source={API.getFileUrl(item)} width={100} height={100} />
        </View>
      ))}
    </View>
  )
}

const FileViewing = ({ navigation, route }) => {
  const { conventionID } = route.params
  const [active, setActive] = useState('image')
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])
  const handleClickImage = () => {
    if (active !== 'image') {
      setActive('image')
    }
  }
  const handleClickVideo = () => {
    if (active !== 'video') {
      setActive('video')
    }
  }

  useEffect(() => {
    if (active === 'image' && !images?.length) {
      API.getConventionFilesByID(conventionID, 'image').then((data) => {
        setImages(data)
      })
    } else if (active === 'video' && !videos?.length) {
      API.getConventionFilesByID(conventionID, 'video').then((data) => {
        setVideos(data)
      })
    }
  }, [active])

  return (
    <View>
      <GoBackComponent marginLeft={16} title={'Ảnh và video'} hasBorder />
      <SpaceComponent height={16} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <OpacityButtton
          style={active === 'image' ? styles.active : styles.inactive}
          onPress={handleClickImage}
          title={'Ảnh'}
          textStyle={active === 'image' ? styles.textActive : styles.textInactive}
        />
        <OpacityButtton
          style={active === 'video' ? styles.active : styles.inactive}
          onPress={handleClickVideo}
          textStyle={active === 'video' ? styles.textActive : styles.textInactive}
          title={'Video'}
        />
      </View>
      <SpaceComponent height={32} />
      {active === 'image' ? <FlatlistImage data={images} /> : <FlatlistVideo data={videos} />}
    </View>
  )
}

export default FileViewing

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
