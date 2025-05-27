import { Text, TouchableOpacity, View } from "react-native"
import { navigationRef } from "../../../store"
import { useMeeting } from "@videosdk.live/react-native-sdk"

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
  const {localMicOn, localWebcamOn} = useMeeting()
  return (
    <View
      style={{
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      
      <Button
        onPress={() => {
          toggleWebcam()
        }}
        buttonText={localWebcamOn ? 'Tắt camera' : 'Bật camera'}
        backgroundColor={'#1178F8'}
      />
      <Button
        onPress={() => {
          toggleMic()
        }}
        buttonText={localMicOn ? 'Tắt mic' : 'Mở mic'}
        backgroundColor={'#1178F8'}
      />
      <Button
        onPress={() => {
          leave()
          navigationRef.goBack()
        }}
        buttonText={'Kết thúc'}
        backgroundColor={'#1178F8'}
      />
    </View>
  )
}
