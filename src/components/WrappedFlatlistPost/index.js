import React from 'react'
import { FlatList, Text, View } from 'react-native'
import WrappedPostItem from '../WrappedPostItem'
import SpaceComponent from '../SpaceComponent'

const WrappedFlatListPost = ({ data, ownerID }) => {
  return (
    <FlatList
      scrollEnabled={true}
      data={data}
      initialNumToRender={2}
      ItemSeparatorComponent={
        <View style={{ height: 4, flex: 1, marginVertical: 16, backgroundColor: '#ccc' }} />
      }
      ListFooterComponent={<SpaceComponent height={64} />}
      renderItem={({ item, index }) => (
        <WrappedPostItem item={item} groupID={item.groupID} ownerID={ownerID} key={item._id} />
      )}
    />
  )
}

export default WrappedFlatListPost
