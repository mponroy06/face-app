
import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    camera:{
      display: 'flex',
      flex: 1,
      width: '100%'
    },
    buttonContainer:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    button:{
      marginBottom: 40,
      backgroundColor: 'white',
      width: 80,
      height: 80,
      borderRadius: 180,
      alignItems: 'center',
      justifyContent: 'center'
    },
    green:{
      backgroundColor: '#4cd137'
    },
    tomato:{
      backgroundColor: 'red'
    },
    abso:{
      position: 'absolute',
      borderRadius: 100
    },
    visible:{
      opacity: 1
    },
    lefteyes:{
      width: 80,
      height: 80,
      borderColor: 'black',
      borderWidth: 5,
      opacity: 0
    },
    righteyes:{
      width: 80,
      height: 80,
      borderColor: 'black',
      borderWidth: 5,
      opacity: 0
    },
    nose:{
      width: 64,
      height: 64,
      backgroundColor: 'red',
      borderRadius: 20,
      opacity: 0,
    },
    moustache:{
      width: 120,
      height: 40,
      opacity: 0,
    },
    moustache:{
      width: 120,
      height: 40,
      opacity: 0,
    },
    whiteText:{
      color: 'white',
      fontWeight: 'bold'
    },
    circle:{
      borderWidth: 5,
      borderColor: '#3498db',
    }
});