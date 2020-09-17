import React ,{useState, useEffect } from 'react';
import {View , Text ,StyleSheet,TouchableOpacity,Dimensions,}  from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from '../Globals/Globals';
import { TextField } from 'react-native-material-textfield';
import { useDispatch, useSelector } from "react-redux";
import {forgotPassword } from '../redux/stores/actions/register_user';
import MyActivityIndicator from '../CustomUI/MyActivityIndicator'; 

const ForgotPassword = (props) =>{


    const [email ,setEmail] = useState("");
    const loading_status = useSelector(state => state.register.loading_status);
    const dispatch = useDispatch();


	const isValid = () => {


		let valid = false;

		if (email.length > 0) {
			valid = true;
		}

		if (email.length === 0) {

			showMessage(0, 'You must enter an email', 'Forgot Password', true, false);

			return false
		}
		if (email.indexOf("@") < 0 || email.indexOf(".") < 0) {

			showMessage(0, 'You must enter a valid email', 'Forgot Password', true, false);
			return false;
		}

		return valid;
	}


    const onSubmitLogin = () => {
        if(isValid()){
            NetInfo.isConnected.fetch().then(isConnected => {
				if (!isConnected) {
					props.navigation.navigate("NoNetwork")
					return;
				}
				else {

                    console.log("on forgot password");

                    dispatch(forgotPassword(email,props.navigation))

                }
            })

        }
       
    }


    if (loading_status) {
        return (
           <MyActivityIndicator />
        );
    }

    return(
        <KeyboardAwareScrollView>
          
       
            <View style={{ width: Dimensions.get('window').width * 0.9,alignSelf:'center',marginTop:20}}>

                <TextField
                labelHeight={15}
                labelPadding={0}
                //style={{ width: '100%',alignSelf: "center",marginTop:10 }}
                label='Email'
                value={email}
                onChangeText={(email) => setEmail(email.trim())}
                />

                <Text style={{fontFamily:'roboto-light', fontSize: 15, color: "black", marginTop: 15, marginBottom: 15 }}>Don't worry ! Just enter your Email Id below and we will send you the password reset instructions</Text>
                <TouchableOpacity
                style={styles.submitButton}
                onPress={onSubmitLogin}
                underlayColor='#fff'>
                <Text style={styles.submitText}>Send</Text>
                </TouchableOpacity>

                       
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

export default ForgotPassword;