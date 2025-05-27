import { MediaStream, RTCView, useParticipant } from '@videosdk.live/react-native-sdk'
import { StyleSheet, Text, View } from 'react-native'
import RowComponent from '../../../components/RowComponent'
import { useEffect, useState } from 'react'
import { API } from '../../../api'
import AvatarComponent from '../../../components/AvatarComponent'
import { useCustomContext } from '../../../store'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'

export default function ParticipantView({ participantId, name }) {
  const { webcamStream, webcamOn, micOn } = useParticipant(participantId)
  const state = useSelector(selectCurrentUser)

  const [paticiantInfo, setParticiantInfo] = useState({})
  useEffect(() => {
    API.getUserByIdAPI({ uid: participantId }).then((data) => {
      setParticiantInfo(data)
    })
  }, [])
  return webcamOn && webcamStream ? (
    <View>
      <RTCView
        streamURL={new MediaStream([webcamStream.track]).toURL()}
        objectFit={'cover'}
        style={{
          height: 300,
          marginVertical: 8,
          marginHorizontal: 8,
          position: 'relative'
        }}
      />
      <RowComponent style={styles.rowContainer}>
        <Text style={styles.textName}>{name}</Text>
      </RowComponent>
    </View>
  ) : participantId === state._id ? <></> : (
    <View
      style={styles.wrapperNoWebCam}
    >
      <AvatarComponent source={API.getFileUrl(paticiantInfo?.avatar)} size={120} />
    </View>
  )
}

const styles = StyleSheet.create({
  rowContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  textName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  wrapperNoWebCam: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
