import { ScrollView, StyleSheet } from 'react-native'
import CreateStory from './CreateStory'
import FriendStories from './FriendStories'
import Colors from '../../utils/Colors'

const Stories = ({ user }) => {
  return (
    <ScrollView
      horizontal
      style={styles.storiesContainer}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <CreateStory />
      <FriendStories />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  storiesContainer: {
    backgroundColor: Colors.white,
    marginTop: 8,
    padding: 15
  },
  contentContainerStyle: {
    paddingRight: 30
  }
})

export default Stories
