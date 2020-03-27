import React,{useState, useEffect} from 'react';
import {
	Text, View, Button, StyleSheet, SafeAreaView, Dimensions, ScrollView, Image, FlatList,
	TouchableOpacity, ToastAndroid, ActivityIndicator
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import PasswordInputText from 'react-native-hide-show-password-input';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from '../Globals/Globals';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import MyActivityIndicator from '../CustomUI/MyActivityIndicator';
import { useDispatch, useSelector } from "react-redux";
import {userRegister} from '../redux/stores/actions/register_user';



const Register = (props) => {


    const [email ,setEmail ] = useState("");
    const [password ,setPassword ] = useState("");
    const [name ,setName ] = useState('') ;
    const [mobile ,setMobile  ] = useState("");
    const loading_status = useSelector(state => state.register.loading_status);
    const dispatchRegisterUser = useDispatch();


    const isValid = () => {

        console.log("i am on is valid")

		var isnum = /^\d+$/.test(mobile);

		let valid = false;

		if (name.length > 0 && password.length > 0 && email.length > 0 && mobile.toString().length > 0) {
			valid = true;
		}

		if (name.length === 0) {

			showMessage(0, "Enter name", 'Register', true, false);

			return false;
		} else if (email.length === 0) {

			showMessage(0, "Enter email", 'Register', true, false);

			return false;
		}
		else if (email.indexOf("@") < 0 || email.indexOf(".") < 0) {

			showMessage(0, "Enter valid email", 'Register', true, false);

			return false;
		}
		else if (mobile.toString().length === 0) {

			showMessage(0, "Enter mobile number", 'Register', true, false);

			return false;
		} else if (mobile.toString().length < 10) {

			showMessage(0, "Mobile number must be 10 digits", 'Register', true, false);

			return false;
		}
		else if (!isnum) {
			showMessage(0, "Please Enter Valid Contact Number", 'Register', true, false);

			return false;
		}
		else if (password.length === 0) {
			showMessage(0, "Please Enter Password", 'Register', true, false);
			return false;
		}

		else if (password.length < 8) {
			showMessage(0, "Password must be 8 char/digits", 'Register', true, false);

			return false;
        }
        console.log("i am on is valid",valid)
		return valid;

    }
    
    
    const registerUser = () => {

        
        if(isValid()){

            NetInfo.isConnected.fetch().then(isConnected => {

                if(!isConnected){
                    props.navigation.navigate("NoNetwork");
                    return;
                }else{
                    dispatchRegisterUser(userRegister(name,email,mobile,password,props.navigation));
                }

            });

            
          
        }
       
        


    }


 



    if (loading_status) {

        return(

            <MyActivityIndicator />
        )
       
    }
    return (




        <KeyboardAwareScrollView  >
            <View style={styles.container}>
                <Image source={require('../assets/doctor/logo.jpg')}
                    style={{
                        alignSelf: 'center',
                        width: Dimensions.get('window').width / 2,
                        height: Dimensions.get('window').height * 0.2
                    }} />


                <View style={{ width: Dimensions.get('window').width * 0.9,alignSelf:'center'}}>

                    <TextField
                        style={{ width: '100%', alignSelf: "center",marginTop:10 }}
                        label='Name'
                        maxLength={17}
                        value={name}
                        onChangeText={(name) => setName( name )}
                    />

                    <TextField
                        style={{ width: '100%', alignSelf: "center" ,marginTop:10}}
                        label='Email'
                        value={email}
                        onChangeText={(email) => setEmail(email.trim())}
                    />


                    <TextField
                        style={{ width: '100%', alignSelf: "center",marginTop:10 }}
                        label='Mobile no.'
                        maxLength={14}
                        keyboardType='numeric'
                        textContentType='telephoneNumber'
                        value={mobile}
                        onChangeText={(mobile) => setMobile(mobile.trim())}
                    />

                    <PasswordInputText
                        style={{ width: '100%', alignSelf: "center" ,}}
                        label='Password'
                        maxLength={25}
                        value={password}
                        onChangeText={(password) => setPassword(password.trim())}
                    />





                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={registerUser}
                        underlayColor='#fff'>
                        <Text style={styles.submitText}>Register</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <Text style={{  fontFamily:'Roboto-Light',color: 'black' }}>Already have an account </Text>
                        <Text onPress={() => props.navigation.goBack()} style={{ fontFamily:'Roboto-Light', textDecorationLine: 'underline', color: 'black', fontWeight: 'bold' }}>SIGN IN</Text>
                    </View>




                </View>


            </View>



        </KeyboardAwareScrollView>


    )
}



let styles = StyleSheet.create({
	container: {
		padding: 30,
		// justifyContent: "center",
		// alignItems: 'center',
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
        alignSelf:'center'
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
	

})


export default Register;