import React, { Component } from 'react';
import {
	Text, View, Button, StyleSheet, Dimensions, SafeAreaView,
	ScrollView, Image, FlatList, TouchableOpacity, ToastAndroid, TouchableWithoutFeedback
} from 'react-native';
import { showMessage } from './Globals';
// import { TextField } from 'react-native-material-textfield';
// import ScrollView, { ScrollViewChild } from 'react-native-directed-scrollview';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";



export default class PractitionersDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			about: '',
			name: '',
			id: '',
			experience: '',
			image: '',
			profession: '',
			contact: '',
			email: '',
			degree: '',
			description: "",
			mobile: "",
			application_id: 0,



		};

	}

	componentWillMount() {
		var result = this.props.navigation.getParam('result')

		let img;
		if (result['image'] == null) {

			img = "";
		} else {
			img = result["image"];
		}


		this.setState({
			name: result['name'],
			id: result['id'],//practionaer id
			about: result["about"],
			experience: result["experience"],
			description: result["description"],
			contact: result["contact"],
			email: result["email"],
			image: img,
			degree: result["degree"],
			application_id: result["appid"],//application id
		})
	}

	removePractitioner() {


		NetInfo.isConnected.fetch().then(isConnected => {
			if (!isConnected) {
				this.props.navigation.navigate("NoNetwork")
				return;
			}
			else {

				this.setState({ loading_status: true })

				var body = new FormData();
				//body.append('userid', this.state.id);
				body.append('application_id', this.state.application_id);
				body.append("application_status", "2");


				fetch('http://webmobril.org/dev/locum/api/accept_application', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'multipart/form-data',
					},
					body: body

				}).then((response) => response.json())
					.then((responseJson) => {
						this.setState({ loading_status: false })



						if (responseJson.status === 'success') {


							showMessage(0, "Removed Successfully", "Practitioners Details", true, false);
							this.props.navigation.state.params.fetch();
							this.props.navigation.pop();

						}


						else {
							showMessage(0, JSON.stringify(responseJson.message), "Practitioners Details", true, false);

						}

					}
					).catch((error) => {
						console.error(error);
					});

			}
		});




	}


	acceptPractitioner() {

		NetInfo.isConnected.fetch().then(isConnected => {
			if (!isConnected) {
				this.props.navigation.navigate("NoNetwork")
				return;
			}
			else {


				this.setState({ loading_status: true })


				var body = new FormData();
				//body.append('userid', this.state.id);
				body.append('application_id', this.state.application_id);
				body.append("application_status", "1");


				fetch('http://webmobril.org/dev/locum/api/accept_application', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'multipart/form-data',
					},
					body: body

				}).then((response) => response.json())
					.then((responseJson) => {
						this.setState({ loading_status: false })

						//	ToastAndroid.show(JSON.stringify(responseJson),ToastAndroid.LONG)

						if (responseJson.status === 'success') {

							showMessage(0, "Accepted Successfully ...", "Practitioners Details", true, false);

							this.props.navigation.state.params.fetch();
							this.props.navigation.pop();

						}


						else {
							showMessage(0, JSON.stringify(responseJson.message), "Practitioners Details", true, false);

						}

					}
					).catch((error) => {
						console.error(error);
					});


			}
		});


	}




	render() {
		return (

			<View style={{ flex: 1 }}>
				<SafeAreaView style={{ backgroundColor: '#4C74E6' }} />
				<View style={styles.container}>
					{/*for header*/}
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '09%', backgroundColor: '#4C74E6' }}>

						<TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
							<Image style={{ width: 20, height: 20, margin: 10 }} source={require('../assets/clinic/left-arrow.png')} />
						</TouchableWithoutFeedback>

						<View>

						</View>

						<View>
						</View>

					</View>

					{/*for main content*/}


					<ScrollView style={{ width: '100%', flex: 1, height: '100%' }}>



						<View style={{ width: '100%', height: 100, backgroundColor: '#4C74E6', alignItems: 'center', }}>
							{/*change margin top and bottom to make view hirht flexible in below header vieww */}
							<Text style={{ fontSize: 18, fontWeight: 'bold', color: "white", alignSelf: "center", }}>{this.state.name}</Text>

						</View>




						<View style={{ backgroundColor: 'white', borderRadius: 60, padding: 20, alignSelf: 'center', flex: 1 }}>
							{this.state.image == ""
								?
								<View style={{ borderWidth: 2, backgroundColor: "white", top: -50, position: "absolute", width: 120, height: 120, borderRadius: 120 / 2, alignSelf: 'center', }}>
									<Image
										source={require('../assets/doctor/avatar1.png')}
										style={{
											position: 'absolute',
											overflow: 'hidden',

											alignSelf: "center",
											borderRadius: 120 / 2,
											height: 120,
											width: 120
										}}
									/>
								</View>
								:
								<Image
									source={{ uri: this.state.image }}
									style={{
										position: 'absolute',
										overflow: 'hidden',
										marginTop: -50,
										alignSelf: "center",
										borderRadius: 120 / 2,
										height: 120,
										width: 120
									}}
								/>
							}

						</View>

						<View style={{ marginLeft: 10, marginTop: 40, marginBottom: 10, justifyContent: 'space-between' }}>
							<Text style={{ fontWeight: "bold" }}>Description</Text>
							<Text style={{ color: 'black', fontSize: 15 }}>{this.state.description}</Text>
						</View>

						<View style={{ margin: 10, justifyContent: 'space-between' }}>
							<Text style={{ fontWeight: "bold" }}>Qualifications</Text>
							<Text style={{ color: 'black', fontSize: 15 }}>{this.state.degree}</Text>
						</View>


						<View style={{ margin: 10, justifyContent: 'space-between' }}>
							<Text style={{ fontWeight: "bold" }}>Experience</Text>
							<Text style={{ color: 'black', fontSize: 15 }}>{this.state.experience}</Text>
						</View>

						<View style={{ margin: 10, justifyContent: 'space-between' }}>
							<Text style={{ fontWeight: "bold" }}>Contact</Text>
							<Text style={{ color: 'black', fontSize: 15 }}>{this.state.contact}</Text>
						</View>
						<View style={{ margin: 10, justifyContent: 'space-between' }}>
							<Text style={{ fontWeight: "bold" }}>Email ID</Text>
							<Text style={{ color: 'black', fontSize: 17 }}>{this.state.email}</Text>
						</View>

						{this.state.application_status == 0
							?
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
								<TouchableOpacity onPress={this.acceptPractitioner.bind(this)}
									style={{ width: '40%', borderRadius: 10, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', margin: 10 }}>
									<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: 'black', margin: 15 }}>Accept</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={this.removePractitioner.bind(this)}
									style={{ width: '40%', borderRadius: 10, borderWidth: 1, borderColor: '#686BE4', backgroundColor: '#686BE4', margin: 10, alignSelf: 'flex-end' }}>
									<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: 'white', margin: 15 }}>Reject</Text>
								</TouchableOpacity>
							</View>

							:
							<View />
						}


					</ScrollView>

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
		flex: 1,
		marginTop: 10,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: '#009AFF',
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

})
