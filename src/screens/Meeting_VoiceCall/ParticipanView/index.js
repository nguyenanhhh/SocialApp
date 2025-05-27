import { MediaStream, RTCView, useParticipant } from '@videosdk.live/react-native-sdk'
import { Text, View } from 'react-native'

export default function ParticipantView({ participantId, name }) {
  const { webcamStream, webcamOn } = useParticipant(participantId)

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
      <Text
        style={{
          position: 'absolute',
          fontSize: 20,
          fontWeight: 'bold',
          color: '#fff',
          bottom: 20,
          right: 20
        }}
      >
        {name}
      </Text>
    </View>
  ) : (
    <View
      style={{
        backgroundColor: 'grey',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text style={{ fontSize: 16 }}>NO MEDIA</Text>
    </View>
  )
}
