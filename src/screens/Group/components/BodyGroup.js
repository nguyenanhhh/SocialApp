import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BarComponent from './BarComponent'
import NavBarComponent from './NavBarComponent'
import { MEMBER_STATUS, RESPONSE_STATUS, SCOPE } from '../../../utils/Constants'
import { useCustomContext } from '../../../store'
import { API } from '../../../api'
import NewPostBox from '../../../components/NewPostBox'
import SpaceComponent from '../../../components/SpaceComponent'
import FlatListPost from '../../../components/FlatListPost'
import FlatListPostGroup from '../../../components/FlatListPostGroup'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'

const BodyGroup = ({ group, currentMember }) => {
  const [viewState, setViewState] = useState(false)
  const state = useSelector(selectCurrentUser)

  useEffect(() => {
    // setViewState(true)

    if (group.scope === SCOPE.PUBLIC) {
      console.log('into')
      if (currentMember?.status !== MEMBER_STATUS.BLOCK) {
        setViewState(true)
        return
      }
    } else if (currentMember?.status === MEMBER_STATUS.ACCEPT) {
      setViewState(true)
      return
    }
  }, [currentMember])

  return (
    <View>
      <BarComponent group={group} state={state} groupUser={currentMember} />
      {viewState && (
        <>
          <NavBarComponent groupID={group._id} groupName={group.name} userID={state._id} />
          <SpaceComponent height={8} />
          <NewPostBox groupID={group._id} />
          <SpaceComponent height={16} />
        </>
      )}
    </View>
  )
}

export default BodyGroup
