import React , { useState , useEffect} from 'react';
import {View ,Text, Image,TouchableOpacity,StyleSheet, Dimensions ,Platform,SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from "react-native-image-picker";
import {uploadProfilePic ,uploadEditProfilePic} from '../redux/stores/actions/register_user';
import {useSelector ,useDispatch} from 'react-redux';
import {showMessage} from '../Globals/Globals';
import ApiUrl from '../Globals/ApiUrl';
import {checkuserAuthentication , logoutUser} from '../redux/stores/actions/auth_action';
import { StackActions, NavigationActions } from 'react-navigation';

const HeaderComponentt = (props) => {

    console.log("props",props.name)

  
    return (

              <>
              <LinearGradient   
              colors= {["#4E73E6","#9456CE"]}
              start= {{x: 0.0, y: 0.5}}
              end= {{ x: 0.6, y: 0.4 }} >
          <SafeAreaView  />
          </LinearGradient>
       
            <LinearGradient   
                style={{ height:150, }}
                colors= {["#4E73E6","#9456CE"]}
                start= {{x: 0.0, y: 0.5}}
                end= {{ x: 0.6, y: 0.4 }} >

                <React.Fragment>
                    <TouchableOpacity onPress={() => {props.navigation.pop()}}>
                        <Image style={{ width: 20, height: 20, margin: 20 }} source={require('../assets/clinic/left-arrow.png')} />

                    </TouchableOpacity>

                  <View style={styles.mainStyle}>
                    <Text style={styles.userNameStyle}>{props.name}</Text>
                   
                    {((props.user_image === null) ||  props.user_image == undefined)
                    ?
                       
                        <View style={styles.fab}>
                         <Image source={require("../assets/doctor/avatar1.png")} style={styles.imageStyle} />
                        </View>
                       
                    :
                   
                    <View style={styles.fab}>
                        <Image source={{uri:ApiUrl.image_url+props.user_image}} style={styles.imageStyle} />
                    </View>
                    
                  
                    }

                   
                  </View>
                  
              </React.Fragment>
            </LinearGradient>
            </>
       
    )


}

const styles = StyleSheet.create({

    mainStyle:{
        justifyContent:"center",alignItems:"center",
        bottom:0,
        right:0,
        left:0,
        top:120,
        position: 'absolute',
    },

    fab:{
        height: 100,
        width: 100,
        borderRadius: 50,
        borderColor:"black",
        borderWidth:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
      },
     
    TouchableOpacityStyle: {
       
        alignItems: 'center',
        justifyContent: 'center',
       
      },
     
      imageStyle: {
        position: 'absolute',
       
        width: 100,
        height: 100,
        borderRadius:50,
       
      },
      userNameStyle:{
          fontSize:20,
          marginBottom:10,
          color:'white',
          fontFamily:'roboto-bold'
      },
      wallet_balance_text:{
        fontSize:15,
        marginBottom:10,
        color:'white',
        fontFamily:'roboto-bold'
    }

})

export default HeaderComponentt;