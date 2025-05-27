import React, { useState } from 'react'
import { SafeAreaView, Button } from 'react-native'
import StoryEditor from './StoryEditor'
import StoryPlayer from './StoryPlayer'

const StoryScreen = () => {
  const [editing, setEditing] = useState(true)
  const [story, setStory] = useState(null)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {editing ? (
        <StoryEditor
          onSave={(newStory) => {
            setStory(newStory)
            setEditing(false)
          }}
        />
      ) : (
        <StoryPlayer story={story} />
      )}
      <Button
        title={editing ? 'Hiển thị Story' : 'Chỉnh sửa Story'}
        onPress={() => setEditing(!editing)}
      />
    </SafeAreaView>
  )
}

export default StoryScreen
