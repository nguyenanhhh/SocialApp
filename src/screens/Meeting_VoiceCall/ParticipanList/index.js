import { FlatList, Text, View } from 'react-native'
import ParticipantView from '../ParticipanView'

export default function ParticipantList({ participants, arr }) {
  return participants.length > 0 ? (
    <FlatList
    style={{flexDirection:'column-reverse'}}
      data={participants}
      renderItem={({ item, index }) => {
        return <ParticipantView participantId={item} name={arr[index].name} />
      }}
    />
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F6F6FF',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text style={{ fontSize: 20 }}>Press Join button to enter meeting.</Text>
    </View>
  )
}
