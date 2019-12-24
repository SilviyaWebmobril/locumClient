export default {
  STORE_KEY: 'a56z0fzrNpl^2',
  BASE_URL: 'http://someurl.com',
  COLOR: {
    ORANGE: '#C50',
    DARKBLUE: '#0F3274',
    LIGHTBLUE: '#6EA8DA',
    DARKGRAY: '#999',
  },
};

import { Platform, ToastAndroid, Alert } from "react-native";

//import GLOBALS from '../Globals';
// and access them the same way as before
//GLOBALS.COLOR.ORANGE


export const showMessage = (toasttime, message ,messageHeading, isOk ,isCancel) =>{

  if(Platform.OS == 'android'){

    ToastAndroid.show(message,toasttime == 1 ? ToastAndroid.LONG :  ToastAndroid.SHORT);

  }else{
    Alert.alert(
      messageHeading,
      message,
      [
        
      isOk ? {text: 'OK', onPress: () => {console.log("ok")}} : "",
      isCancel ? {text: 'Cancel', onPress: () => {console.log("ok")}} : "",
      ], 
      { cancelable: false }
      )
  }




  
}