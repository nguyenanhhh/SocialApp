import { StyleSheet, View } from 'react-native'
import ConventionNavigator from '~/navigation/ConventionNavigator'
import SpaceComponent from '../../../components/SpaceComponent'

const ConvenitionScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SpaceComponent height={16} />
      <ConventionNavigator />
    </View>
  )
}

export default ConvenitionScreen

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 0
  },

  searchInput: {
    backgroundColor: '#eee',
    height: 32,
    color: '#ffe',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 25,
    padding: 0,
    margin: 0,
    paddingHorizontal:8
  },

  textInput: {
    margin: 0,
    padding: 0
  }
})
