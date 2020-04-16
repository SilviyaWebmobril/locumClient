import React ,{useState ,useEffect } from 'react';
import {View ,TextInput, TouchableOpacity ,TouchableWithoutFeedback,Image,StyleSheet,Text} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { useDispatch, useSelector } from 'react-redux';
import {userResetPassword} from '../redux/stores/actions/register_user';
import {showMessage} from '../Globals/Globals';
import NetInfo from "@react-native-community/netinfo";
import MyActivityIndicator from '../CustomUI/MyActivityIndicator';
import {checkuserAuthentication ,logoutUser} from '../redux/stores/actions/auth_action';
import {
	StackActions, NavigationActions
} from 'react-navigation';

const ResetPassword = (props) => {

    const device_token  = useSelector(state => state.auth.device_token)
    const [old_password_visible , setOldPasswordVisible] = useState(true);
    const [oldPassword,setOldPassword] = useState(""); 
    const [newPassword ,setNewPassword] = useState("");
    const [new_password_visible ,setNewPasswordVisible ] = useState(true);
    const [confirmPassword ,setConfirmPassword] = useState("");
    const [confirm_password_visible ,setConfirmPasswordVisible ] = useState(true);
    const user_id = useSelector(state =>state.register.user.id);
    const loading_status = useSelector(state =>state.register.loading_status);
    const dispatch = useDispatch();



		const isValid = () => {

          


		
            let valid = false;

            if (oldPassword.length > 0 && newPassword.length > 7 && confirmPassword.length > 7 ) {
            valid = true;
            }

            if (oldPassword.length === 0) {
               showMessage(0,'You must enter your old password','Reset Password',true,false);
           
               return false;
            } 
            else if (newPassword.length === 0) {
               showMessage(0,'You must enter your new password','Reset Password',true,false);
           
               return false;
            }
            else if (newPassword.length < 8) {
               showMessage(0,'New password must be 8 characters long','Reset Password',true,false);
           
                  return false;
               }
               
               
                   
            else if (confirmPassword.toString().length === 0 ) {

               showMessage(0,'You must enter confirm password','Reset Password',true,false);
           
           
               return false;
            }
            else if (confirmPassword.toString().length < 8) {
               showMessage(0,'Confirm  password must be 8 characters long','Reset Password',true,false);
           
                  return false;
               }
               console.log("isvalidd",valid)

    return valid;

}


    const onResetPassword  = () => {

        if(isValid()){

               NetInfo.isConnected.fetch().then(isConnected => {
                   if(!isConnected)
                   {
                       props.navigation.navigate("NoNetwork")
                       return;
                   }
                   else{

                    dispatch(checkuserAuthentication(user_id,device_token))
                        .then(response => {
                            if(response.data.error){
                                
                                showMessage(0, 'Session Expired! Please Login.', 'Reset Password', true, false);
                                dispatch(logoutUser())
                                props.navigation.navigate("Login");
                               
                                const resetAction = StackActions.reset({
                                    index: 0,
                                    key: 'Login',
                                    actions: [NavigationActions.navigate({ routeName: 'Login' })],
                                });
                                props.navigation.dispatch(resetAction);

                            }else{

                                dispatch(userResetPassword(user_id,oldPassword,newPassword,confirmPassword,props.navigation))

                            }
                        })
                    
                     
                   }
                });

        }
    }

    if (loading_status) {
        return (
          <MyActivityIndicator />
       );
      }
    

    return(
        <View style={{paddingLeft:20,paddingRight:20,flex:1,paddingTop:10}}> 
			

        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
            <View style={{width:'100%'}}>
                <TextField
                  style = {{width:'100%'}}
                  label='Old Password'
                  secureTextEntry={old_password_visible}
                  value={oldPassword}
                  onChangeText={ (oldpass) => setOldPassword(oldpass) }
              />
            </View>
            <View style={{marginLeft:-23}}>
                <TouchableWithoutFeedback onPress={()=> {setOldPasswordVisible(!old_password_visible)}}>
                {
                    old_password_visible
                    ?
                    <Image source={require('../assets/nav/eye-cross-grey.png')} style={{width:25,height:25,marginLeft:0}} resizeMode='contain'/>
                    :
                    <Image source={require('../assets/nav/eye-grey.png')} style={{width:25,height:25,marginLeft:0}} resizeMode='contain'/>
                }

                </TouchableWithoutFeedback>
            </View>
        </View>

        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
            <View style={{width:'100%'}}>
                <TextField
                    style = {{width:'100%'}}
                    label='New Password'
                    secureTextEntry={new_password_visible}
                    value={newPassword}
                    onChangeText={ (newpass) => {setNewPassword(newpass)} }
                />
            </View>
        <View style={{marginLeft:-23}}>
                <TouchableWithoutFeedback onPress={()=> {setNewPasswordVisible(!new_password_visible)}}>
                {
                new_password_visible
                ?
                <Image source={require('../assets/nav/eye-cross-grey.png')} style={{width:25,height:25,marginLeft:0}} resizeMode='contain'/>
                :
                <Image source={require('../assets/nav/eye-grey.png')} style={{width:25,height:25,marginLeft:0}} resizeMode='contain'/>
                }

                </TouchableWithoutFeedback>
            </View>
        </View>





        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
            <View style={{width:'100%'}}>
                <TextField
                style = {{width:'100%'}}
                label='Confirm Password'
                secureTextEntry={confirm_password_visible}
                value={confirmPassword}
                onChangeText={ (cnfpass) => {setConfirmPassword(cnfpass)} }
            />
            </View>
            <View style={{marginLeft:-23}}>
                <TouchableWithoutFeedback onPress={()=> {setConfirmPasswordVisible(!confirm_password_visible)}}>
                {
                confirm_password_visible
                ?
                <Image source={require('../assets/nav/eye-cross-grey.png')} style={{width:25,height:25,marginLeft:0}} resizeMode='contain'/>
                    :
                    <Image source={require('../assets/nav/eye-grey.png')} style={{width:25,height:25,marginLeft:0}} resizeMode='contain'/>
                }

                </TouchableWithoutFeedback>
            </View>
        </View>

       
        <TouchableOpacity onPress={onResetPassword}
           style={styles.submitButton}>
                   <Text style={styles.submitText}>Update</Text>
       </TouchableOpacity>
        
    </View>

    )
}




let styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
		alignItems:'center',
		
    },
	submitButton:{
      width :'100%',
      marginTop:10,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#4C74E6',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff',
      marginTop:40,
	  
    },
    submitText:{
		fontFamily:'roboto-bold',
        color:'white',
        textAlign:'center',
        fontSize :17,
		},
	
})

export default ResetPassword;