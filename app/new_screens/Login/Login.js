import React ,{ useState , useEffect } from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, Alert, Dimensions, Platform} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import PasswordInputText from 'react-native-hide-show-password-input';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from '../Globals/Globals';
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import MyActivityIndicator from '../CustomUI/MyActivityIndicator';
import {submitUserLogin} from '../redux/stores/actions/register_user';
import firebase from 'react-native-firebase';
import {userDevicetoken } from '../redux/stores/actions/auth_action';

const Login = (props) => {

    const loading_status = useSelector(state=> state.register.loading_status);
    const [email ,setEmail] = useState("");
    const [password ,setPassword] = useState();
    const dispatch = useDispatch();
    const token = useSelector(state => state.register.device_token);


      const  onTokenRefreshListener =()=>  firebase.messaging().onTokenRefresh(fcmToken => {
          // Process your token as required
          if(fcmToken){
            console.log("get fcmtoken123",fcmToken);
              dispatch(userDevicetoken(fcmToken));
          }
      });

        const getFcmToken =  () => firebase.messaging().getToken()
          .then(fcmToken => {
              if (fcmToken) {
                dispatch(userDevicetoken(fcmToken));
                
              } else {
                console.log("get fcmtoken111");
               
                  onTokenRefreshListener();
              } 
          })
     
  useEffect(() => {
  
  
      onTokenRefreshListener();
       getFcmToken();
      
     
      return () => {
          onTokenRefreshListener();
      };

  },[])
  

    signup =() => {
        // this.next()
        props.navigation.navigate('Register');
      }
    forgot = () => {
    props.navigation.navigate("ForgotPassword")
    }




  const isValid =() => {


    let valid = false;

    if (email.length > 0 && password.length > 0) {
      valid = true;
    }

    if (email.length === 0) {
      showMessage(1, 'You must enter an email', 'Login', true, false);

    }
    else if (email.indexOf("@") < 0 || email.indexOf(".") < 0) {

      showMessage(1, 'You must enter a valid email', 'Login', true, false);

      return false;
    }
    else if (password.length === 0) {

      showMessage(1, 'You must enter a password', 'Login', true, false);

    }

    return valid;
  }

    const onSubmitLogin = () => {

      if(isValid()){

        NetInfo.isConnected.fetch().then(isConnected => {

            if(!isConnected){
                props.navigation.navigate("NoNetwork");
                return;
            }else{
              dispatch(submitUserLogin(email,password,token,props.navigation));
            }

        });

        
      
    }
   

    }
    


    if (loading_status) {
        return (
          <MyActivityIndicator />
        );
      }
      return (
  
        <KeyboardAwareScrollView contentContainerStyle={{
          
        }}>
  
          <View style={styles.container}>
  
            <Image source={require('../assets/doctor/logo.jpg')} 
                style={{
                    alignSelf: 'center',
                    marginTop: 60,
                    width: Dimensions.get('window').width / 2,
                    height: Dimensions.get('window').height * 0.2
                }} />
  
            <View style={{ width: Dimensions.get('window').width * 0.9,alignSelf:'center'}}>
  
              <TextField
                style={{ width: '100%',alignSelf: "center",marginTop:10 }}
                label='Email'
                value={email}
                onChangeText={(email) => setEmail(email.trim())}
              />
  
              <PasswordInputText
                style={{ width: '100%',alignSelf: "center",}}
                label='Password'
                maxLength={25}
                value={password}
                onChangeText={(password) => setPassword(password.trim() )}
              />
  
  
  
  
              <Text onPress={()=> {this.forgot()}} style={{fontFamily:'Roboto-Light', alignSelf: 'flex-end', marginBottom: 5, marginTop: 5 }}>Forgot Password?</Text>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={onSubmitLogin}
                underlayColor='#fff'>
                <Text style={styles.submitText}>Login</Text>
              </TouchableOpacity>
  
              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Text style={{ color: 'black',fontFamily:'Roboto-Light' }}>Don't have an account ? </Text>
  
                <Text onPress={signup} style={{fontFamily:'Roboto-Light', textDecorationLine: 'underline', color: 'black', fontWeight: 'bold' }}>SIGN UP</Text>
  
              </View>
  
            </View>
  
  
          </View>
  
        </KeyboardAwareScrollView>
  
  
      )

}

const styles  = StyleSheet.create({
    container: {
        padding: 30,
        marginTop:Platform.OS == "android" ? Dimensions.get('window').width * 0.10 : Dimensions.get('window').width * 0.20,
        flex:1
      },
      submitButton: {
        width: '90%',
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#4C74E6',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        marginBottom: 15,
        alignSelf:"center",
      },
      submitText: {
        fontFamily:'Roboto-Light',
        color: 'white',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 17,
        fontWeight: 'bold'
      },
      indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
      }
})

export default Login;


