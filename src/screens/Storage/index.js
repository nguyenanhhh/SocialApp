import CheckBox from '@react-native-community/checkbox'
import { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useSelector } from 'react-redux'
import { API } from '~/api'
import GlobalStyle from '~/assets/css/GlobalStyle'
import { OpacityButtton } from '~/components/ButtonComponent'
import GoBackComponent from '~/components/GoBackComponent'
import PollComponent from '~/components/PostItem/components/PollComponent'
import PostContent from '~/components/PostItem/components/PostContent'
import PostHeader from '~/components/PostItem/components/PostHeader'
import RowComponent from '~/components/RowComponent'
import SpaceComponent from '~/components/SpaceComponent'
import TextComponent from '~/components/TextComponent'
import { selectCurrentUser } from '~/redux/slice/userSlice'
import { RESPONSE_STATUS } from '~/utils/Constants'

const StorageScreen = () => {
  const currentUser = useSelector(selectCurrentUser)
  const [trashData, setTrashData] = useState([])
  const [checkList, setCheckList] = useState([])
  const [checkAll, setCheckAll] = useState(false)
  useEffect(() => {
    API.getUserTrashPostsAPI(currentUser._id).then((response) => {
      console.log('response')
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setTrashData(response.data)
      }
    })
  }, [])

  const handleCheckAll = () => {
    setCheckAll(true)
    setCheckList(trashData.map((post) => ({ [post._id]: true })))
  }

  const handleUnCheckAll = () => {
    setCheckAll(false)
    setCheckList([])
  }

  const handleBeforeAfterCheckAll = (isBoolean) => {
    if (isBoolean) {
      handleCheckAll()
    } else {
      handleUnCheckAll()
    }
  }

  const handleDeletePosts = () => {
    console.log({checkList})
    const deleteIds = checkList.reduce((accomulator, currenValue) => {
        return accomulator.concat(Object.keys(currenValue).at(0))
    }, [])
  console.log({deleteIds})
    API.deletePostsAPI({ deleteIds }).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setTrashData((pre) => {
          return pre.filter((item) => !deleteIds.includes(item._id))
        })
        setCheckAll(false)
        setCheckList([])
      }
    })
  }

  const handleClickCheckBox = (value) => {
    setCheckList((pre) => {
      const condition = pre.find((item) => item[value])
      if (condition) {
        if (checkAll) {
          setCheckAll(false)
        }
        return pre.filter((item) => !item[value])
      } else {
        const newCheckList = pre.concat({ [value]: true })
        if (newCheckList.length === trashData.length) {
          setCheckAll(true)
        }
        return newCheckList
      }
    })
  }
  return (
    <View style={GlobalStyle.container}>
      <GoBackComponent title="Kho lưu trữ" />
      <RowComponent>
        <SpaceComponent width={32} />
        <OpacityButtton
          borderColor="#333"
          padding={4}
          borderWidth={1}
          borderRadius={20}
          title="Thùng rác"
          textColor="#fff"
          textSize={14}
          bgColor="blue"
          underlay={'66f'}
        />
      </RowComponent>
      <SpaceComponent height={12} />
      <RowComponent style={{ justifyContent: 'space-between', paddingHorizontal: 16 }}>
        <RowComponent>
          <CheckBox value={checkAll} onValueChange={(value) => handleBeforeAfterCheckAll(value)} />
          <SpaceComponent width={8} />
          <TextComponent text="Chọn tất cả" />
        </RowComponent>
        <OpacityButtton title="Xóa" onPress={handleDeletePosts} />
      </RowComponent>
      <SpaceComponent height={12} />

      {trashData.length === 0 && (
        <TextComponent text="Không có mục nào" align="center" style={{ marginTop: 50 }} />
      )}
      <FlatList
        style={{ paddingHorizontal: 12 }}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={<SpaceComponent height={12} />}
        data={trashData}
        renderItem={({ item }) => (
          <View>
            {/* <TextComponent text={DateTimeHelper.formatDateWithTimeStamp(item.updatedAt)} />
            <RowComponent>
              <AvatarComponent size={43} source={API.getFileUrl(item.avatar)} />
              <SpaceComponent width={12} />
              <ColumnComponent>
                <TextComponent text={item.content} />
              </ColumnComponent>
            </RowComponent> */}

            <RowComponent style={{ justifyContent: 'space-between' }}>
              <PostHeader item={item} ownerID={currentUser._id} disable />
              <CheckBox
                value={!!checkList.find((checkItem) => checkItem[item._id])}
                onValueChange={() => handleClickCheckBox(item._id)}
              />
            </RowComponent>
            <SpaceComponent height={8} />
            <PostContent content={item.content} attachments={item.attachments} />
            <SpaceComponent height={16} />

            {item?.pollID && <PollComponent postID={item._id} pollID={item.pollID} disable />}
            <SpaceComponent height={16} />
          </View>
        )}
      />
    </View>
  )
}

export default StorageScreen
