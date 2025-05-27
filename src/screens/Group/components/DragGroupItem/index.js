import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import React from 'react'
import RowComponent from '../../../../components/RowComponent'
import AvatarComponent from '../../../../components/AvatarComponent'
import SpaceComponent from '../../../../components/SpaceComponent'
import { OpacityButtton } from '../../../../components/ButtonComponent'
import { SCOPE } from '../../../../utils/Constants'
import { navigate } from '../../../../store'
import { API } from '../../../../api'
import { ScaleDecorator } from 'react-native-draggable-flatlist'

const GroupItem = ({ item, drag, isActive }) => {
  const accessGroup = () => navigate('GroupScreen', { groupID: item._id })

  const scopeGroup = item.scope === SCOPE.PUBLIC ? 'Nhóm công khai' : 'Nhóm riêng tư'
  const lengthGroup = item.memberLength + ' thành viên'
  const avatarGroup = API.getFileUrl(item.avatar)
  return (
    //   <RowComponent style={{ alignItems: 'flex-start' }}>
    //     <AvatarComponent onPress={accessGroup} style={{ borderRadius: 10 }} source={avatarGroup} />
    //     <SpaceComponent width={16} />
    //     <View>
    //       <OpacityButtton title={item.name} onPress={accessGroup} textStyle={styles.groupName} />
    //       <SpaceComponent height={8} />
    //       <RowComponent>
    //         <Text style={styles.scopeGroup}>{scopeGroup}</Text>
    //         <SpaceComponent width={8} />
    //         <Text style={styles.lengthGroup}>{lengthGroup}</Text>
    //       </RowComponent>
    //       <SpaceComponent height={6} />
    //       <OpacityButtton textColor={'#21f'} title={'Đã tham gia'} bgColor={'#25e2'} />
    //     </View>
    //   </RowComponent>
    <ScaleDecorator>
      <TouchableHighlight onLongPress={drag} onPress={() => {}}>
        <Text>{item.name}</Text>
      </TouchableHighlight>
    </ScaleDecorator>
  )
}

const styles = StyleSheet.create({
  groupName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111'
  },
  scopeGroup: {
    color: '#22a',
    fontSize: 16
  },
  lengthGroup: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500'
  }
})

export default GroupItem
