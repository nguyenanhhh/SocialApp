import { useContext } from 'react'
import { Context } from './Context'
import { createNavigationContainerRef } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'

const useCustomContext = () => {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  return [currentUser, dispatch]
}

const navigationRef = createNavigationContainerRef()

const navigate = (name, params) => {
  navigationRef.navigate(name, { ...params })
}
export { useCustomContext, navigationRef, navigate }
