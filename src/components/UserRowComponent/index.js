import { View, Text, Pressable } from 'react-native'
import React from 'react'
import RowComponent from '../RowComponent'
import AvatarComponent from '../AvatarComponent'
import SpaceComponent from '../SpaceComponent'
import { API } from '~/api'

const UserRowComponent = ({
  onPress,
  name,
  avatar,
  textSize,
  avatarSize,
  padding,
  margin,
  height,
  spacing,
  children,
  detail
}) => {
  return (
    <RowComponent style={{ height, padding, margin }}>
      <AvatarComponent onPress={onPress} source={API.getFileUrl(avatar)} size={avatarSize} />
      <SpaceComponent width={spacing ?? 16} />
      <Pressable onPress={onPress}>
        <Text style={{ fontSize: textSize ?? 16, color: '#666', fontWeight: '500' }}>{name}</Text>
        {detail && (
          <>
            <SpaceComponent height={4} />
            <Text style={{ fontSize: 14 }}>{detail}</Text>
          </>
        )}
      </Pressable>
      {children}
    </RowComponent>
  )
}

export default UserRowComponent
