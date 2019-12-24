import React, { Component } from 'react';
import {
	Text, View, Button, StyleSheet, Dimensions, StatusBar, ScrollView, Image, FlatList, SafeAreaView,
	TouchableOpacity, ToastAndroid, TouchableWithoutFeedback, ActivityIndicator, KeyboardAvoidingView
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Header } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from './Globals';


export default class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			loading_status: false


		};

	}

	componentDidMount() {

		StatusBar.setBackgroundColor('#0040FF')
	}

	isValid() {


		let valid = false;

		if (this.state.email.length > 0) {
			valid = true;
		}

		if (this.state.email.length === 0) {

			showMessage(0, 'You must enter an email', "Forgot Password", true, false);

			return false;

		}
		if (this.state.email.indexOf("@") < 0 || this.state.email.indexOf(".") < 0) {

			showMessage(0, 'You must enter a valid email', "Forgot Password", true, false);

			return false;
		}

		return valid;
	}


	onForgot() {

		NetInfo.isConnected.fetch().then(isConnected => {
			if (!isConnected) {
				this.props.navigation.navigate("NoNetwork")
				return;
			}
			else {

				var formData = new FormData();


				formData.append('email', this.state.email);
				if (this.isValid()) {

					this.setState({ loading_status: true })
					fetch('http://webmobril.org/dev/locum/api/forgot_password', {
						method: 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'multipart/form-data',
						},
						body: formData

					}).then((response) => response.json())
						.then((responseJson) => {
							this.setState({ loading_status: false })

							if (responseJson.status === "success") {
								showMessage(0, responseJson.message, "Forgot Password", true, false);

								this.props.navigation.navigate("Login");
							}
							else {
								showMessage(0, responseJson.message, "Forgot Password", true, false);

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

			<View style={{ flex: 1 }}>
				<SafeAreaView style={{ backgroundColor: '#4C74E6' }} />
				<View style={styles.container}>
					{/*for header*/}
					<KeyboardAvoidingView behavior="padding" enabled style={{ 'width': '100%', 'height': "9%" }}>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%', backgroundColor: '#4C74E6' }}>

							<TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
								<Image style={{ width: 25, height: 25, margin: 10 }} source={require('../assets/clinic/left-arrow.png')} />
							</TouchableWithoutFeedback>

							<View>
								<Text style={{ fontSize: 21, fontWeight: 'bold', color: "white", paddingRight: 25 }}>Forgot Password</Text>
							</View>

							<View>
							</View>

						</View>
					</KeyboardAvoidingView>


					{/*for main content*/}

					<View style={{ padding: 10, width: '90%' }}>

						<Text style={{ fontSize: 17, color: "black", marginTop: 15, marginBottom: 15 }}>Don't worry! Just enter your Email Id below and we will send you the password reset instructions</Text>

						<TextField
							style={{ width: '100%' }}
							label='Email '
							value={this.state.email}
							onChangeText={(email) => this.setState({ email: email.trim() })}
						/>

						<TouchableOpacity
							onPress={this.onForgot.bind(this)}
							style={styles.submitButton}>
							<Text style={styles.submitText}>Sent</Text>
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
