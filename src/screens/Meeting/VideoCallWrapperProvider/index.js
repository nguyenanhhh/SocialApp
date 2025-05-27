import React, { useEffect, useState } from 'react'
import { PermissionsAndroid, SafeAreaView } from 'react-native'
import { MeetingProvider, useParticipant } from '@videosdk.live/react-native-sdk'
import { createMeeting, token } from '../videocall'
import JoinScreen from '../JoinScreen'
import MeetingView from '../MeetingView'

import { useMediaDevice } from '@videosdk.live/react-native-sdk'

import { createCameraVideoTrack, createMicrophoneAudioTrack } from '@videosdk.live/react-native-sdk'




//For Getting Audio Tracks
const getMediaTracks = async () => {
  try {
    //Returns a MediaStream object, containing the Audio Stream from the selected Mic Device.
    let customTrack = await createMicrophoneAudioTrack({
      encoderConfig: 'speech_standard',
      noiseConfig: {
        noiseSuppression: true,
        echoCancellation: true,
        autoGainControl: true
      }
    })
  } catch (error) {
    console.log('Error in getting Audio Track', error)
  }

  //For Getting Video Tracks
  try {
    //Returns a MediaStream object, containing the Video Stream from the selected Webcam Device.
    let customVideoTrack = await createCameraVideoTrack({
      optimizationMode: 'motion',
      encoderConfig: 'h720p_w1280p',
      facingMode: 'user'
    })
    //To retrive video tracks that will be displayed to the user from the stream.
    const videoTracks = stream?.getVideoTracks()
    const videoTrack = videoTracks.length ? videoTracks[0] : null
  } catch (error) {
    console.log('Error in getting Video Track', error)
  }
}

export default function VideoCallWrapperProvider({ children }) {
  const [meetingId, setMeetingId] = useState(null)
  const {
    checkPermission,
    checkBlueToothPermission,
    requestPermission,
    requestBluetoothPermission,
    getCameras,
    getDevices,
    getAudioDeviceList,
  } = useMediaDevice()

  const getMeetingId = async (id) => {
    const meetingId = id == null ? await createMeeting({ token }) : id
    setMeetingId(meetingId)
  }

  useEffect(() => {
   
    PermissionsAndroid.request('android.permission.CAMERA')
    PermissionsAndroid.request('android.permission.RECORD_AUDIO')
    PermissionsAndroid.request('android.permission.CALL_PHONE')
  }, [])

  const checkMediaPermission = async () => {
    //These methods return a Promise that resolve to a Map<string, boolean> object.
    const checkAudioPermission = await checkPermission('audio') //For getting audio permission
    const checkVideoPermission = await checkPermission('video') //For getting video permission
    const checkAudioVideoPermission = await checkPermission('audio_video') //For getting both audio and video permissions
    const checkBTPermission = await checkBlueToothPermission()
  }

  const requestAudioVideoPermission = async () => {
    try {
      //These methods return a Promise that resolve to a Map<string, boolean> object.
      const requestAudioPermission = await requestPermission('audio') //For Requesting Audio Permission
      const requestVideoPermission = await requestPermission('video') //For Requesting Video Permission
      const requestAudioVideoPermission = await requestPermission('audio_video') //For Requesting Audio and Video Permissions

      // Applicable only to Android; not required for iOS
      const checkBTPermission = await requestBluetoothPermission() //For requesting Bluetooth Permission.
    } catch (ex) {
      console.log('Error in requestPermission ', ex)
    }
  }

  const getMediaDevices = async () => {
    try {
      //Method to get all available webcams.
      //It returns a Promise that is resolved with an array of CameraDeviceInfo objects describing the video input devices.
      let webcams = await getCameras()
      console.log('List of Devices:', webcams)
      //Method to get all available Microphones.
      //It returns a Promise that is resolved with an array of MicrophoneDeviceInfo objects describing the audio input devices.
      const mics = await getAudioDeviceList()
      console.log('List of Microphone:', mics)
      //Method to get all available cameras and playback devices.
      //It returns a list of the currently available media input and output devices, such as microphones, cameras, headsets, and so forth
      let deivces = await getDevices()
      console.log('List of Cameras:', deivces)
    } catch (err) {
      console.log('Error in getting audio or video devices', err)
    }
  }


  return meetingId ? (
    <SafeAreaView style={{ flex: 1 }}>
      <MeetingProvider
        config={{
         //Status of Mircophone Device as selected by the user (On/Off).
         micEnabled: true,
         //Status of Webcam Device as selected by the user (On/Off).
         webcamEnabled: true,
         //customVideoStream has to be the Video Stream of the user's selected Webcam device as created in Step-5.
        }}
        token={token}
      >
        <MeetingView />
      </MeetingProvider>
    </SafeAreaView>
  ) : (
    <JoinScreen getMeetingId={getMeetingId} />
  )
}
