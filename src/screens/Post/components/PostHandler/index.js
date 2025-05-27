import { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import RNFS from 'react-native-fs'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import GoBackIcon from '~/components/GoBackComponent/GoBackIcon'
import { API } from '../../../../api'
import GlobalStyle from '../../../../assets/css/GlobalStyle'
import AvatarComponent from '../../../../components/AvatarComponent'
import OpacityButtton from '../../../../components/ButtonComponent/OpacityButton'
import ImageLibrary from '../../../../components/ImageLibrary'
import MixedViewing from '../../../../components/MixedViewing'
import RowComponent from '../../../../components/RowComponent'
import SpaceComponent from '../../../../components/SpaceComponent'
import { useCustomContext } from '../../../../store'
import { POLL_TYPE, POST_ATTACHMENT, RESPONSE_STATUS, SCOPE } from '../../../../utils/Constants'
import CreatePollScreen from '../../../convenition/Vote'
import DropDownRole from '../DropDownRole'
import PostInput from '../PostInput'
import TextComponent from '~/components/TextComponent'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'
import Loading from '~/components/Loading'

const PostHandler = ({ postData = {}, type, files, onSubmit, editable, groupID }) => {
  const state = useSelector(selectCurrentUser)

  const [atttachments, setAttachments] = useState(files)
  const [scopePost, setScopePost] = useState(SCOPE.PUBLIC)
  const postInputRef = useRef({ value: postData.content })
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (files !== atttachments) {
      setAttachments(files)
    }
  }, [files])

  useEffect(() => {
    if (postData.scope) {
      setScopePost(postData.scope)
    }
  }, [postData])

  const handlePost = async (pollID) => {
    setIsLoading(true)
    const customAttachments = []
    if (atttachments) {
      if (atttachments !== files) {
        for (const item of atttachments) {
          const data = await RNFS.readFile(item.customPath, 'base64')
          customAttachments.push({
            source: data,
            type: item.type
          })
        }
      } else {
        customAttachments.push(...atttachments)
      }
    }

    if (editable) {
      await onSubmit(state._id, customAttachments, postInputRef.current.value, scopePost, pollID)
    } else {
      await onSubmit(state._id, customAttachments, postInputRef.current.value, scopePost, pollID)
    }
    setIsLoading(false)

  }

  const handleChosenFiles = useCallback((data) => setAttachments(data), [])

  const handleChangeScope = useCallback((newValue) => setScopePost(newValue), [])

  // THIS IS POLL ACTION
  const [pollModalVisible, setPollModalVisible] = useState(false)
  const onShowPollModal = () => setPollModalVisible(true)
  const onHideShowModal = () => setPollModalVisible(false)

  const [pollInfo, setPollInfo] = useState()
  const onPollChange = (obj) => setPollInfo((pre) => ({ ...pre, ...obj }))
  const onPollClear = () => setPollInfo(null)
  const handleCreatePollAndPost = async () => {
    if (!pollInfo?.question?.trim()) {
      return Alert.alert('Lỗi', 'Vui lòng nhập câu hỏi.')
    }

    const filledOptions = pollInfo?.options?.filter((option) => option?.trim()) ?? []
    if (pollInfo?.options?.length < 2) {
      return Alert.alert('Lỗi', 'Cần ít nhất 2 tùy chọn.')
    } else if (filledOptions.length < pollInfo?.options?.length) {
      return Alert.alert('Lỗi', 'Tùy chọn không được rỗng.')
    }

    const customData = {
      targetID: null,
      userID: state._id,
      question: pollInfo.question,
      options: filledOptions,
      result: [],
      type: POLL_TYPE.POST
    }
    API.createPoll(customData).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        handlePost(response.data._id)
      } else {
        Alert.alert('Lỗi', response.data)
      }
    })
  }
  const handleCheckBeforeSubmit = () => {
    if (pollModalVisible) {
      handleCreatePollAndPost()
    } else {
      handlePost()
    }
  }

  return (
    <ScrollView style={[GlobalStyle.container, {position:'relative'}]}>
      <View style={styles.header}>
        <RowComponent>
          <GoBackIcon style={{ paddingLeft: 8, paddingRight: 12 }} />
          <TextComponent fontWeight={'500'} text={type === 'add' ? 'Tạo bài viết' : 'Chỉnh sửa'} />
        </RowComponent>
        <OpacityButtton
          onPress={handleCheckBeforeSubmit}
          activeOpacity={0.6}
          title="Đăng"
          textStyle={{ fontSize: 20, fontWeight: '500', paddingHorizontal:8, color: 'blue' }}
        />
      </View>

      <RowComponent style={styles.inputContainer}>
        <AvatarComponent source={API.getFileUrl(state.avatar)} />
        <RowComponent>
          <SpaceComponent width={8} />
          {!groupID ? (
            <DropDownRole initValue={scopePost} callback={handleChangeScope} />
          ) : (
            <Text style={{ fontSize: 20 }}>{state.userName}</Text>
          )}
        </RowComponent>
      </RowComponent>
      <PostInput ref={postInputRef} value={postData.content} />
      <View style={{ flexDirection: 'row-reverse' }}>
        <SpaceComponent width={16} />
        <ImageLibrary iconColor={'gray'} callback={handleChosenFiles} type={POST_ATTACHMENT.MIX} />
        <SpaceComponent width={4} />
        {!postData?.pollID && (
          <OpacityButtton onPress={onShowPollModal}>
            <EvilIcons
              style={{ paddingBottom: 8 }}
              name="chart"
              size={46}
              color={'gray'}
              onPress={onShowPollModal}
            />
          </OpacityButtton>
        )}
      </View>
      <SpaceComponent height={48} />
      <MixedViewing attachments={atttachments ?? []} />
      {pollModalVisible && (
        <CreatePollScreen
          onCancel={onHideShowModal}
          onPollClear={onPollClear}
          submitState
          onPollChange={onPollChange}
        />
      )}
    {/* {isLoading && <Loading />} */}
    {/* {isLoading && <TextComponent color="red" size={50} />} */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#d8D9DB'
  },
  inputContainer: {
    margin: 20
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16
  },
  imgPost: {
    width: '100%',
    height: '100%'
  },
  photo: {
    alignItems: 'flex-end',
    marginHorizontal: 32
  }
})

export default PostHandler
