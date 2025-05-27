import React from 'react'
import AvatarComponent from '../../../../../../../components/AvatarComponent'
import SpaceComponent from '../../../../../../../components/SpaceComponent'

const ChatAvatar = ({ avatar, size }) => {
  const [width, height] = size ? [size, size] : [40, 40]
  return avatar ? (
    <AvatarComponent
      source={avatar}
      style={{ width: width, height: height, marginLeft: 4, marginRight: 4 }}
    />
  ) : (
    <SpaceComponent width={width + 8} height={height} />
  )
}

export default ChatAvatar
