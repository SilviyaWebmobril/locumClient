import React, { Component } from 'react';
import {
	Text, View, Button, StyleSheet, SafeAreaView, Dimensions, ScrollView,
	Image, FlatList, TouchableOpacity, ToastAndroid,
	TouchableWithoutFeedback, ActivityIndicator
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import PasswordInputText from 'react-native-hide-show-password-input';
import {
	createStackNavigator, createAppContainer, createDrawerNavigator,
	DrawerItems, StackActions, NavigationActions, withNavigationFocus
} from 'react-navigation';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from './Globals';
import AsyncStorage from '@react-native-community/async-storage';


export default class ResetPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			oldpass: '',
			newpass: '',
			cnfpass: '',
			id: 0,
			loading_status: false,
			old_password_visible: true,
			new_password_visible: true,
			cnf_password_visible: true,



		};

	}



	isValid() {



		let valid = false;

		if (this.state.oldpass.length > 0 && this.state.newpass.length > 7 && this.state.cnfpass.length > 7) {
			valid = true;
		}

		if (this.state.oldpass.length === 0) {
			showMessage(0,'You must enter your old password',"Reset Password",true,false);
			
			return false;
		}
		else if (this.state.newpass.length === 0) {
			showMessage(0,'You must enter your new password',"Reset Password",true,false);
			
			return false;
		}
		else if (this.state.newpass.length < 8) {

			showMessage(0,'New password must be 8 characters long',"Reset Password",true,false);
		
			return false;
		}



		else if (this.state.cnfpass.toString().length === 0) {

			showMessage(0,'You must enter confirm password',"Reset Password",true,false);
			
			return false;
		}
		else if (this.state.cnfpass.toString().length < 8) {

			showMessage(0,'Confirm  password must be 8 characters long','Reset Password',true,false);
		
			return false;
		}

		return valid;

	}
	onResetPassword() {

		NetInfo.isConnected.fetch().then(async isConnected => {
			if (!isConnected) {
				this.props.navigation.navigate("NoNetwork")
				return;
			} else {


				var formData = new FormData();

				formData.append('userid', this.state.id);
				formData.append('old_password', this.state.oldpass);
				formData.append('new_password', this.state.newpass);
				formData.append('confirm_password', this.state.cnfpass);
				//2 for clinic 5 for practitioner
				formData.append('role', 2);
		
				if (this.isValid()) {
					NetInfo.isConnected.fetch().then(isConnected => {
						if (!isConnected) {
							this.props.navigation.navigate("NoNetwork")
							return;
						}
						else {
		
							this.setState({ loading_status: true })
							fetch('http://webmobril.org/dev/locum/api/change_password', {
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
									if (responseJson.status === "success") {
		
		
										showMessage(0,responseJson.message,"Reset Password",true,false);
										AsyncStorage.clear()
		
										this.props.navigation.navigate("Login");
										const resetAction = StackActions.reset({
											index: 0,
		
											actions: [NavigationActions.navigate({ routeName: 'Login' })],
										});
										this.props.navigation.dispatch(resetAction);
		
		
		
										//	this.props.navigation.navigate("UploadDocuments");
									}
									else {
										showMessage(0,responseJson.message,"Reset Password",true,false);
										
									}
								}).catch((error) => {
									console.error(error);
								});
						}
		
					})
		
				}


			}

		});

	
	}



	async getUserId() {
		var id = await AsyncStorage.getItem('uname')
		return id
	}



	async componentWillMount() {

		let user_id = await this.getUserId()
		this.setState({ id: user_id })

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
			<View style={{flex:1}}>
			<SafeAreaView style={{  backgroundColor: '#4C74E6'}} />

			<View style={styles.container}>
				{/*for header*/}
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '09%', backgroundColor: '#4C74E6' }}>

					<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("HomeScreen")}>
						<Image style={{ width: 20, height: 20, margin: 10 }} source={require('../assets/clinic/left-arrow.png')} />
					</TouchableWithoutFeedback>

					<View>
						<Text style={{fontFamily:"Roboto-Light",  fontSize: 20, fontWeight: 'bold', color: "white", paddingRight: 25 }}>Reset Password</Text>
					</View>

					<View>
					</View>

				</View>

				{/*for main content*/}

				<View style={{ padding: 10, width: '90%' }}>



					<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
						<View style={{ width: '100%' }}>
							<TextField
								style={{ width: '100%' }}
								label='Old Password'
								secureTextEntry={this.state.old_password_visible}
								value={this.state.oldpass}
								onChangeText={(oldpass) => this.setState({ oldpass })}
							/>
						</View>
						<View style={{ marginLeft: -23 }}>
							<TouchableWithoutFeedback onPress={() => this.setState({ old_password_visible: !this.state.old_password_visible })}>
								{
									this.state.old_password_visible
										?
										<Image source={require('../assets/nav/eye-cross-grey.png')} style={{ width: 20, height: 20, marginLeft: 0 }} resizeMode='contain' />
										:
										<Image source={require('../assets/nav/eye-grey.png')} style={{ width: 20, height: 20, marginLeft: 0 }} resizeMode='contain' />
								}

							</TouchableWithoutFeedback>
						</View>
					</View>

					<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
						<View style={{ width: '100%' }}>
							<TextField
								style={{ width: '100%' }}
								label='New Password'
								secureTextEntry={this.state.new_password_visible}
								value={this.state.newpass}
								onChangeText={(newpass) => this.setState({ newpass })}
							/>
						</View>
						<View style={{ marginLeft: -23 }}>
							<TouchableWithoutFeedback onPress={() => this.setState({ new_password_visible: !this.state.new_password_visible })}>
								{
									this.state.new_password_visible
										?
										<Image source={require('../assets/nav/eye-cross-grey.png')} style={{ width: 20, height: 20, marginLeft: 0 }} resizeMode='contain' />
										:
										<Image source={require('../assets/nav/eye-grey.png')} style={{ width: 20, height: 20, marginLeft: 0 }} resizeMode='contain' />
								}

							</TouchableWithoutFeedback>
						</View>
					</View>





					<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
						<View style={{ width: '100%' }}>
							<TextField
								style={{ width: '100%' }}
								label='Confirm Password'
								secureTextEntry={this.state.cnf_password_visible}
								value={this.state.cnfpass}
								onChangeText={(cnfpass) => this.setState({ cnfpass })}
							/>
						</View>
						<View style={{ marginLeft: -23 }}>
							<TouchableWithoutFeedback onPress={() => this.setState({ cnf_password_visible: !this.state.cnf_password_visible })}>
								{
									this.state.cnf_password_visible
										?
										<Image source={require('../assets/nav/eye-cross-grey.png')} style={{ width: 20, height: 20, marginLeft: 0 }} resizeMode='contain' />
										:
										<Image source={require('../assets/nav/eye-grey.png')} style={{ width: 20, height: 20, marginLeft: 0 }} resizeMode='contain' />
								}

							</TouchableWithoutFeedback>
						</View>
					</View>



					<TouchableOpacity onPress={this.onResetPassword.bind(this)}
						style={styles.submitButton}>
						<Text style={styles.submitText}>Update</Text>
					</TouchableOpacity>

				</View>

			</View>
			</View>

		)
	}
}


let styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
	},
	submitButton: {
		width: '100%',
		marginTop: 10,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: '#4C74E6',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#fff',
		marginTop: 40,

	},
	submitText: {
		fontFamily:"Roboto-Light", 
		color: 'white',
		textAlign: 'center',
		paddingLeft: 10,
		paddingRight: 10,
		fontSize: 20,
		fontWeight: 'bold'
	},
	indicator: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 80
	}

})
