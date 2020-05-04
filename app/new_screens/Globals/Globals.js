import { Platform, ToastAndroid, Alert } from "react-native";

export default {
  role: 5,
  BASE_URL: 'http://someurl.com',
  COLOR: {
    ORANGE: '#C50',
    DARKBLUE: '#0F3274',
    LIGHTBLUE: '#6EA8DA',
    DARKGRAY: '#999',
  },
};

//how to use
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

export const getday = (date) =>{

  let  day = new Date(date);

  return day.getDate();
}

export  const getWeekday = (date) => {

  let weekDays = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat']

  let day = new Date(date);
  return weekDays[day.getDay()];
}

export  const getMonth = (date) => {

  let weekDays = ['January','Feburary','March','April','May','June','July','August','September','October','November','December']

  let day = new Date(date);
  return weekDays[day.getMonth()];
}

export  const getYear = (date) => {

  let day = new Date(date);
  return day.getFullYear();
}
