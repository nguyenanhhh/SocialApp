import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  chatScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    position:'relative'
  },
  chatFlatlistContainer: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8
  },
  chatInputContainer: {
    minHeight:50,
    marginBottom:4,
    marginLeft:2
  },

  chatInput: {
    flex:1,
    padding:0,
    margin:0,
    paddingLeft:8,
    fontSize:13,
    color: '#000',
    // backgroundColor:'#aaa',
    borderWidth: 1,
    borderRadius:20,
    borderColor: '#ccc'
  },

  chatInputIcon: {
    width:40,
    // backgroundColor:'#ccc',
    alignItems:'center',
    justifyContent:'center'
  }
})

export default styles
