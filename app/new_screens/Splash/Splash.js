import React, { useState, useEffect } from 'react';
import {View , Text, Image,StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector } from 'react-redux'


const Splash = (props) => {

    const user_id =  useSelector (state => state.auth.user_id);
    


    check = async () =>{
        
            let item =await AsyncStorage.getItem("STORE_USER_ID_GLOBALLY");  
            console.log("user_id",user_id);

            if(user_id){
                props.navigation.navigate('Home')
            }else{
                props.navigation.navigate('Login')
            }
     //});

    }

    useEffect(() => {
        StatusBar.setBackgroundColor('#0040FF');

        const timer = setInterval(()=>{
            check()
        },3000)
        
        return () => clearInterval(timer);
    },[])
   

    return(
         <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
			  height:'100%',
			  backgroundColor:'white'
            }}>

			 <Image source={require('../assets/doctor/logo.jpg')} style={{height:'35%', width:'50%',marginTop:-20}} resizeMode='contain'/>

          </View>
    )


}

export default Splash;