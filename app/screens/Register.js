import React, { Component } from 'react';
import {
	Text, View, Button, StyleSheet, SafeAreaView, Dimensions,
	ScrollView, Image, FlatList, TouchableOpacity, ActivityIndicator, ToastAndroid
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import PasswordInputText from 'react-native-hide-show-password-input';
import { showMessage } from './Globals'
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'



export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			mobile: '',
			password: '',
			loading_status: false
		};

	}
	forgot() {
		this.props.navigation.navigate("ForgotPassword")
	}



	isValid() {


		var isnum = /^\d+$/.test(this.state.mobile);

		let valid = false;

		if (this.state.name.length > 0 && this.state.password.length > 0 && this.state.email.length > 0 && this.state.mobile.toString().length > 0) {
			valid = true;
		}

		if (this.state.name.length === 0) {
			showMessage(0, ' Enter name', "Register", true, false);

			return false;
		} else if (this.state.email.length === 0) {
			showMessage(0, 'Enter Email', "Register", true, false);

			return false;
		}
		else if (this.state.email.indexOf("@") < 0 || this.state.email.indexOf(".") < 0) {

			showMessage(0, 'Enter valid email', "Register", true, false);

			return false;
		}
		else if (this.state.mobile.toString().length === 0) {

			showMessage(0, 'Enter mobile number', "Register", true, false);

			return false;
		} else if (this.state.mobile.toString().length < 10) {

			showMessage(0, 'Mobile number must be 10 digits', "Register", true, false);

			return false;
		}
		else if (!isnum) {

			showMessage(0, "Please Enter Valid Contact Number", "Register", true, false);

			return false;
		}
		else if (this.state.password.length === 0) {
			showMessage(0, 'You must enter a password', "Register", true, false);

			return false;
		}

		else if (this.state.password.length < 8) {

			showMessage(0, 'Password must be 8 char/digits', "Register", true, false);

			return false;
		}
		return valid;

	}
	onsignup() {

		NetInfo.isConnected.fetch().then(isConnected => {
			if(!isConnected)
			{
			  this.props.navigation.navigate("NoNetwork")
			  return;
			}
			else{

				var formData = new FormData();

		formData.append('name', this.state.name);
		formData.append('phone', this.state.mobile);
		formData.append('email', this.state.email);
		formData.append('password', this.state.password);
		//2 for clinic 3 for practitioner
		formData.append('role', 2);

		if (this.isValid()) {
			this.setState({ loading_status: true })
			fetch('http://webmobril.org/dev/locum/api/signup.php', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'multipart/form-data',
				},
				body: formData

			}).then((response) => response.json())
				.then((responseJson) => {
					this.setState({ loading_status: false })
					//  ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.SHORT);
					if (responseJson.status === "success") {

						//ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
						var id = responseJson.result
						AsyncStorage.setItem('uname', id);
						this.props.navigation.navigate("Home");
					}
					else {
						showMessage(0, responseJson.message, "Register", true, false);

					}
				}).catch((error) => {
					console.error(error);
				});
		}

			}
		});

		
	}

	next(id) {

		let obj = {
			"user_id": id,

		}


		AsyncStorage.clear()
		AsyncStorage.setItem("temp_id", id.toString())
		AsyncStorage.setItem("name", this.state.name)
		AsyncStorage.setItem("phone", this.state.mobile.toString())
		AsyncStorage.setItem("email", this.state.email.toString())
		this.props.navigation.navigate("CreateProfile");

		//this.props.navigation.navigate("ApplyPromo",{result:obj});
	}

	//laravel api
	onSignup() {

		NetInfo.isConnected.fetch().then(isConnected => {
			if(!isConnected)
			{
			  this.props.navigation.navigate("NoNetwork")
			  return;
			}
			else{


				var formData = new FormData();

				formData.append('name', this.state.name);
				formData.append('phone', this.state.mobile);
				formData.append('email', this.state.email);
				formData.append('password', this.state.password);
				//2 for clinic 3 for practitioner
				formData.append('role', 2);
		
				if (this.isValid()) {
					this.setState({ loading_status: true })
					fetch('http://webmobril.org/dev/locum/api/signup', {
						method: 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'multipart/form-data',
						},
						body: formData
		
					}).then((response) => response.json())
						.then((responseJson) => {
							this.setState({ loading_status: false })
							//ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.SHORT);
							if (responseJson.status === 'success') {
		
								showMessage(0, responseJson.message, "Register", true, false);
		
								var id = responseJson.result
		
								this.next(id)
		
							}
							else {
								showMessage(0, responseJson.message, "Register", true, false);
		
							}
		
		
						}).catch((error) => {
							console.error(error);
						});
				}

			}
		});

	
	}

	render() {

		if (this.state.loading_status) {
			return (
				<ActivityIndicator
					animating={true}
					style={styles.indicator}
					size="large"
				/>
			);
		}
		return (

			<KeyboardAwareScrollView  >
				<View style={styles.container}>

					<Image source={require('../assets/clinic/clinic-logo.png')} 
					style={{
						alignSelf: 'center',
						width: Dimensions.get('window').width / 2,
						height: Dimensions.get('window').height * 0.2
					}} />

					<View style={{ width: Dimensions.get('window').width * 0.9,alignSelf:'center'}}>

					<TextField
						style={{ width: '100%' ,alignSelf:"center",marginTop:10}}
						label='Clinic Name'
						value={this.state.name}
						onChangeText={(name) => this.setState({ name: name.trim() })}
					/>


					<TextField
						style={{ width: '100%',alignSelf:"center",marginTop:10 }}
						label='Email'
						value={this.state.email}
						onChangeText={(email) => this.setState({ email: email.trim() })}
					/>

					<TextField
						style={{ width: '100%',alignSelf:"center",marginTop:10 }}
						label='Mobile no.'
						keyboardType='numeric'
						maxLength={14}
						textContentType='telephoneNumber'
						value={this.state.mobile}
						onChangeText={(mobile) => this.setState({ mobile: mobile.trim() })}
					/>

					<PasswordInputText
						style={{ width: '100%', paddingRight: 10 }}
						label='Password'
						maxLength={25}
						value={this.state.password}
						onChangeText={(password) => this.setState({ password: password.trim() })}
					/>





					<TouchableOpacity
						style={styles.submitButton}
						onPress={this.onSignup.bind(this)}
						underlayColor='#fff'>
						<Text style={styles.submitText}>Register</Text>
					</TouchableOpacity>

					<View style={{ flexDirection: 'row', alignSelf: 'center' }}>
						<Text style={{fontFamily:"Roboto-Light",  color: 'black' }}>Already have an account ?</Text>
						<Text onPress={() => this.props.navigation.goBack()} style={{fontFamily:"Roboto-Light",  textDecorationLine: 'underline', color: 'black', fontWeight: 'bold' }}> SIGN IN</Text>
					</View>
				</View>
				</View>
				</KeyboardAwareScrollView>
		)
	}
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
		width: '100%',
		marginTop: 10,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: '#4C74E6',
		borderRadius: 1,
		borderWidth: 1,
		borderColor: '#fff',
		marginBottom: 15
	},
	submitText: {
		fontFamily:"Roboto-Light", 
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
