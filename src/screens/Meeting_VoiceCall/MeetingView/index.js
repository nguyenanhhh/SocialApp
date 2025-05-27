import { ImageBackground, Text, View } from 'react-native'
import { useMeeting } from '@videosdk.live/react-native-sdk'
import ParticipantList from '../ParticipanList'
import ControlsContainer from '../ControlContainer'
import { API } from '../../../api'
import { useEffect } from 'react'
import SocketClient from '../../../socket'
import AvatarComponent from '../../../components/AvatarComponent'
import SpaceComponent from '../../../components/SpaceComponent'

export default function MeetingView({ ownerID, targetID, ownerInfo, targetInfo, reply }) {
  // Get `participants` from useMeeting Hook
  const { join, leave, toggleWebcam, toggleMic, participants, meetingId } = useMeeting({})
  const participantsArrId = [...participants.keys()]
  const arrParticipants = Array.from(participants.entries()).map(item => ({id: item.at(1).id, name: item.at(1).displayName}))
  console.log('arr par: ', arrParticipants)

  useEffect(() => {
    if (meetingId && !reply) {
      SocketClient.socket.emit('call', {
        targetID,
        senderID: ownerID,
        senderName: ownerInfo.userName,
        senderAvatar: ownerInfo.avatar,
        meetingId,
        members: targetInfo.members
      })
    }
  }, [meetingId])

  return (
    <View style={{flex:1, backgroundColor:'#e2a'}}>
      <SpaceComponent height={64} />
      <AvatarComponent size={100} style={{alignSelf:'center'}} source={API.getFileUrl(targetInfo.avatar)} />
      <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 20 }}>
        {targetInfo.name}
      </Text>
      <ParticipantList participants={participantsArrId} arr={arrParticipants}  />
      <ControlsContainer join={join} leave={leave} toggleWebcam={toggleWebcam} toggleMic={toggleMic} />
      </View>
  )
}
