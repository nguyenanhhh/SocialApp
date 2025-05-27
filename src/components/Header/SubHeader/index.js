import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Colors from '../../../utils/Colors'

const GetImage = ({ source }) => {
  if (source) {
    return <Image source={{ uri: source }} style={styles.profileStyle} />
  }
}

const SubHeader = ({ navigation, user }) => {
  const createNewPost = () => {
    navigation.navigate('newpost')
  }

  return (
    <View style={styles.container}>
      <GetImage source={user.avatar} />
      <View style={styles.inputBox}>
        <TouchableOpacity onPress={createNewPost}>
          <Text style={styles.inputStyle}>Thêm nội dung mới...</Text>
        </TouchableOpacity>
      </View>
      <Image source={''} style={styles.cameraRoll} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    backgroundColor: Colors.white,
    alignItems: 'center'
  },
  profileStyle: {
    height: 40,
    width: 40,
    borderRadius: 50
  },
  inputBox: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    borderRadius: 30,
    paddingHorizontal: 20,
    width: '70%',
    paddingVertical: 8
  },
  inputStyle: {
    fontSize: 16,
    color: Colors.grey
  }
})

export default SubHeader
