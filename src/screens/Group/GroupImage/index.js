import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MixedViewing from '../../../components/MixedViewing'
import { API } from '../../../api'
import { MESSAGE_TYPE, POST_ATTACHMENT } from '../../../utils/Constants'
import TextComponent from '~/components/TextComponent'
import GoBackComponent from '~/components/GoBackComponent'

const GroupImageScreen = ({ navigation, route }) => {
  const [files, setFiles] = useState([])
  const groupID = route.params.groupID

  useEffect(() => {
    API.getGroupFilesByID(groupID, MESSAGE_TYPE.IMAGE).then((data) => {
      setFiles(data.map(item => ({uri: API.getFileUrl(item), type: POST_ATTACHMENT.IMAGE.toLowerCase()})))
    })
  }, [groupID])

  return (
    <View>
      <GoBackComponent title={'Thư mục ảnh'} />
      {files.length === 0 && <TextComponent align='center' style={{marginTop:20}} text={'Danh sách trống'} />}
      <MixedViewing attachments={files} />
    </View>
  )
}

export default GroupImageScreen
