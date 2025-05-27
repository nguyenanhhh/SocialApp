import { useState } from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'

import RNFS from 'react-native-fs'
import { useDispatch } from 'react-redux'
import ImageLibrary from '~/components/ImageLibrary'
import { userAction } from '~/redux/slice/userSlice'
import { MESSAGE_TYPE, SERVER_ADDRESS } from '~/utils/Constants'
import { API } from '../../../../api'
import AvatarComponent from '../../../../components/AvatarComponent'
import { OpacityButtton } from '../../../../components/ButtonComponent'
import ColumnComponent from '../../../../components/ColumnComponent'
import GoBackComponent from '../../../../components/GoBackComponent'
import AvatarProfileModal from '../../../../modals/AvatarProfileModal'
import TextComponent from '~/components/TextComponent'
import SpaceComponent from '~/components/SpaceComponent'
const BoxInfor = ({ title, value }) => {
  return (
    <ColumnComponent style={styles.userInfoItem}>
      <Text style={styles.userInfoTitle}>{value}</Text>
      <Text style={styles.userInfoSubTitle}>{title}</Text>
    </ColumnComponent>
  )
}
const Header = ({ navigation, children, user, ownerID }) => {
  const isOwner = user._id === ownerID
  const handleUpdateBio = () => {
    navigation.navigate('BioScreen', { user })
  }

  const dispatch = useDispatch()
  const handleUpdateBackground = async (value) => {
    const { customPath } = value[0]
    const base64 = await RNFS.readFile(customPath, 'base64')
    API.updateUserBackgroundAPI(ownerID, user.background, base64).then((data) => {
      // onClose()
      dispatch(userAction.updateCurrentUser({ background: data.background }))
    })
  }

  const [modelVisible, setModalVisible] = useState(false)
  const onCloseModal = () => setModalVisible(false)
  const onShowModal = () => setModalVisible(true)

  return (
    <View>
      {!isOwner && <GoBackComponent marginLeft={4} />}
      {/* <View style={styles.backgroundContainer}> */}
      <ImageBackground
        source={{ uri: `${SERVER_ADDRESS}/${user.background}` }}
        style={styles.backgroundContainer}
      >
        {user._id === ownerID && (
          // <OpacityButtton style={styles.backgroundText} title={'Thêm ảnh bìa'} />
          <View style={styles.backgroundText}>
            <ImageLibrary
              limit={1}
              type={MESSAGE_TYPE.IMAGE}
              callback={handleUpdateBackground}
              text={'Đổi ảnh bìa'}
              spacing={8}
              textStyle={{ fontWeight: '400', color: '#000', fontSize: 16 }}
            />
          </View>
        )}
        <View style={styles.container}>
          <AvatarComponent
            onPress={onShowModal}
            source={API.getFileUrl(user.avatar)}
            style={styles.userImg}
          />
        </View>
      </ImageBackground>

      {/* AVATAR AND NAME */}

      <View>
        <SpaceComponent height={32} />
        <TextComponent text={user.userName} fontWeight="500" align="center" size={32} />
      </View>
      {/* BAR */}
      <OpacityButtton
        title={isOwner ? user.bio || 'Thêm tiểu sử...' : user.bio || ''}
        onPress={isOwner ? handleUpdateBio : null}
      />
      {children}
      <SpaceComponent height={16} />
      <AvatarProfileModal
        ownerID={ownerID}
        userID={user._id}
        avatar={user.avatar}
        onClose={onCloseModal}
        modalVisible={modelVisible}
      />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'relative',
    height: 250,
    backgroundColor: '#eee8'
  },
  backgroundText: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#00ffff',
    borderRadius: 25,
    right: 8,
    top: 8,
    paddingVertical: 4,
    paddingHorizontal: 8
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    position: 'absolute',
    // flexDirection:'column-reverse',
    bottom: '-15%',
    left: '20%',
    right: '20%'
  },
  userImg: {
    marginTop: 48,
    height: 120,
    width: 120
  },
  userName: {
    fontSize: 22,
    fontWeight: '400',
    color: '#0f5fff',
    marginTop: 10,
    marginBottom: 10
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10
  },

  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10
  },
  userInfoItem: {
    justifyContent: 'center'
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center'
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center'
  }
})
