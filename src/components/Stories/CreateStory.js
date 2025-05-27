import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

// import Profile from '../assets/images/img1.jpeg'
// import VectorIcon from '../utils/VectorIcon'

import AntDesign from 'react-native-vector-icons/dist/AntDesign'

import Colors from '../../utils/Colors'

const CreateStory = () => {
  // const [user, setUser] = useState({})

  // useEffect(() => {
  //   firestore()
  //     .collection('users')
  //     .doc(auth().currentUser.uid)
  //     .get()
  //     .then((documentSnapshot) => {
  //       if (documentSnapshot.exists) {
  //         setUser(documentSnapshot.data())
  //       }
  //     })
  // }, [])

  // const GetImage = ({ source }) => {
  //   if (source == '' || source == null) {
  //     return
  //   } else {
  //     return <Image source={{ uri: source }} style={styles.profileImg} />
  //   }
  // }

  return (
    <View style={styles.createStoryContainer}>
      {/* <GetImage source={user.avatar} /> */}
      <View style={styles.iconContainer}>
        <AntDesign name="pluscircleo" type="Ionicons" size={35} color={Colors.primaryColor} />
      </View>
      <Text style={styles.createStory}>Thêm vào tin</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  profileImg: {
    height: 110,
    width: 110,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  createStoryContainer: {
    borderWidth: 1,
    borderColor: Colors.lightgrey,
    borderRadius: 10,
    backgroundColor: Colors.storyImageBg,
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 10
  },
  iconContainer: {
    position: 'absolute',
    top: '55%',
    backgroundColor: Colors.white,
    borderRadius: 50
  },
  createStory: {
    fontSize: 14,
    color: Colors.black,
    textAlign: 'center',
    marginTop: 25,
    width: '50%'
  }
})

export default CreateStory
