import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { navigationRef } from '../../../store'
import { useMeeting } from '@videosdk.live/react-native-sdk'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import { OpacityButtton } from '../../../components/ButtonComponent'
import RowComponent from '../../../components/RowComponent'
const Button = ({ onPress, buttonText, backgroundColor }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 4
      }}
    >
      <Text style={{ color: 'white', fontSize: 12 }}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

export default function ControlsContainer({ join, leave, toggleWebcam, toggleMic }) {
  const { localMicOn, localWebcamOn } = useMeeting()

  const handlestopMeeting = () => {
    leave()
    navigationRef.goBack()
  }

  const handleToggleMic = () => toggleMic()
  const handleToggleWebcam = () => toggleWebcam()

  return (
    <View style={styles.controlContainer}>
      <OpacityButtton onPress={handleToggleWebcam}>
        <Feather name={localWebcamOn ? 'video' : 'video-off'} size={32} color={'#fff'} />
      </OpacityButtton>
      <RowComponent style={styles.middleContainer}>
        <OpacityButtton onPress={handleToggleMic}>
          <Feather name={localMicOn ? 'mic' : 'mic-off'} size={24} color={'#fff'} />
        </OpacityButtton>
      </RowComponent>
      <OpacityButtton onPress={handlestopMeeting} style={styles.btnStop}>
        <MaterialIcons name="call-end" size={36} color={'red'} />
      </OpacityButtton>
    </View>
  )
}

const styles = StyleSheet.create({
  controlContainer: {
    padding: 12,
    paddingHorizontal: 32,
    flexDirection: 'row',
    backgroundColor: '#0009',
    marginHorizontal: 32,
    marginVertical: 16,
    borderRadius:30
  },

  middleContainer: {
    flex: 1,
    justifyContent: 'space-around'
  },

  btnStop: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: '#fff'
  }
})
