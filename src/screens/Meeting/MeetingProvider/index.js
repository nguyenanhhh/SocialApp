import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { MeetingProvider } from '@videosdk.live/react-native-sdk'
import { createMeeting, token } from '../videocall'
import MeetingView from '../MeetingView'
import { API } from '../../../api'
import { CONVENTION_TYPE } from '../../../utils/Constants'

export default function MeetingProviderScreen({ navigation, route }) {
  const [meetingId, setMeetingId] = useState(route.params?.meetingId)
  const [ownerInfo, setOwnerInfo] = useState()
  const [targetInfo, setTargetInfo] = useState()

  const { ownerID, targetID } = route.params
  const reply = route.params?.reply
   console.log('owner ID va target ID: ', ownerID, ' ', targetID)

  useEffect(() => {
    API.getUserByIdAPI({uid:ownerID}).then((data) => {
      console.log('get owner info: ', data)
      setOwnerInfo(data)
    })
    API.getConventionByIdAPI(targetID).then((data) => {
      // console.log('get target info: ', data)

      if (data.type === CONVENTION_TYPE.PRIVATE) {
        const target = data.members.filter((item) => item._id !== ownerID)[0]
        setTargetInfo({ name: target.aka ?? target.userName, avatar: target.avatar, members: data.members })
      } else {
        setTargetInfo({ name: data.name, avatar: data.avatar, members: data.members })
      }
    })
  }, [])

  const getMeetingId = async (id) => {
    if (!token) {
      console.log('PLEASE PROVIDE TOKEN IN api.js FROM app.videosdk.live')
    }
    const newMeeting = await createMeeting()
    console.log('get meetingId: ', newMeeting)
    setMeetingId(newMeeting)
  }

  useEffect(() => {
    !reply && getMeetingId()
  }, [])

  return meetingId && ownerInfo && targetInfo ? (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F6FF' }}>
      <MeetingProvider
        config={{
          meetingId: meetingId,
          participantId: ownerInfo._id,
          micEnabled: true,
          webcamEnabled: true,
          name: ownerInfo.userName,
          autoConsume: true
        }}
        token={token}
        joinWithoutUserInteraction={true}
      >
        <MeetingView
          targetID={targetID}
          targetInfo={targetInfo}
          ownerID={ownerID}
          ownerInfo={ownerInfo}
          reply={reply}
        />
      </MeetingProvider>
    </SafeAreaView>
  ) : (
    <></>
  )
}
