import { useEffect } from 'react'
import { useCustomContext } from '../../store'
import { API } from '../../api'
import OwnerProfile from './Owner'
import UserProfile from './User'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'
const ProfileScreen = ({ navigation, route }) => {
  const userID = route?.params?.userID
  const state = useSelector(selectCurrentUser)

  const ownerID = state?._id
  const isOwnerProfile = !userID || ownerID === userID || userID === 'undefined'

  return isOwnerProfile ? (
    <OwnerProfile navigation={navigation} />
  ) : (
    <UserProfile navigation={navigation} ownerID={ownerID} userID={userID} />
  )
}

export default ProfileScreen
