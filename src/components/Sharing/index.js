import { View, Text } from 'react-native'
import React from 'react'
import { OpacityButtton } from '../ButtonComponent'
import Share from 'react-native-share'
import { SHARE_TYPE } from '~/utils/Constants'
import RowComponent from '../RowComponent'
import TextComponent from '../TextComponent'
const SharingComponent = ({ icon, buttonTitle, type, target }) => {
  const handleShare = (userInfo) => {
    // const link = `socialapp://open/profile/${userId}`
    // const link = `socialapp://open/profile/${userInfo._id}`

    const isShareProfile = type === SHARE_TYPE.PROFILE
    const tilte = isShareProfile ? 'Chia sẻ trang cá nhân' : 'Chia sẻ bài viết'
    const mesage = isShareProfile
      ? `Hồ sơ của ${target?.userName}`
      : `Bài viết của ${target.userName}`
    const url = isShareProfile
      ? `socialapp://open/profile/${target._id}`
      : `socialapp://open/post/${target._id}`
    Share.open({
      title: tilte,
      message: mesage,
      url: url
    })
      .then((res) => console.log('Shared', res))
      .catch((err) => console.log('Share error', err))
  }
  return (
    <OpacityButtton onPress={handleShare}>
      <RowComponent>
        <TextComponent text={buttonTitle} /> 
      </RowComponent>
    </OpacityButtton>
  )
}

export default SharingComponent
