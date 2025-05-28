/* eslint-disable react-native/no-inline-styles */
import { Text, StyleSheet } from 'react-native'
import React from 'react'
import RowComponent from '../../../../components/RowComponent'
import SpaceComponent from '../../../../components/SpaceComponent'
import { OpacityButtton } from '../../../../components/ButtonComponent'
import { actions, useCustomContext } from '../../../../store'

const OwnerBar = () => {
  const [state, dispatch] = useCustomContext()
  const handleLogout = () => {
    dispatch(actions.onLogout())
  }
  return (
    // <RowComponent style={{ justifyContent: 'center' }}>
    //   <OpacityButtton textStyle={styles.userBtnTxt} title="Edit" />
    //   <SpaceComponent width={20} />
    //   <OpacityButtton textStyle={styles.userBtnTxt} onPress={handleLogout} title="Logout" />
    // </RowComponent>
    <RowComponent alignItems justify>
      <OpacityButtton title={'Chỉnh sửa thông tin cá nhân'} padding={4} borderColor={'#aaa'} borderWidth={2} borderRadius={20} />
    </RowComponent>
  )
}

export default OwnerBar

const styles = StyleSheet.create({
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginHorizontal: 5
  },
  userBtnTxt: {
    color: '#2e64e5'
  }
})
