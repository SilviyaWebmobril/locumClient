import React, { Component } from 'react';
import {
	Text, View, Button, StyleSheet, SafeAreaView, Dimensions,Alert,
	ScrollView, Image, FlatList, TouchableOpacity, ToastAndroid, TouchableWithoutFeedback, ActivityIndicator
} from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from './Globals'


export default class PractitionersList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			jobs: [],
			loading_status: false


		};

	}


	async getUserId() {
		var id = await AsyncStorage.getItem('uname')
		return id
	}


	async fetch(id) {

		NetInfo.isConnected.fetch().then(async isConnected => {
			if (!isConnected) {
				this.props.navigation.navigate("NoNetwork")
				return;
			} else {


				var id = await this.getUserId()
				var formData = new FormData();
				formData.append('clinicid', id);
				formData.append('job_id', this.props.navigation.getParam('job_id'));
				console.log("formdata", formData);
				//formData.append('clinicid',65);


				this.setState({ loading_status: true })
				fetch('http://webmobril.org/dev/locum/api/practitioner_request', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'multipart/form-data',
					},
					body: formData

				}).then((response) => response.json())
					.then((responseJson) => {
						this.setState({ loading_status: false })

						var temp_arr = []
						if (responseJson.status === 'success') {
							if (responseJson.result.length > 0) {

								for (var i = 0; i < responseJson.result.length; i++) {

									var application_id = responseJson.result[i].id
									var id = responseJson.result[i].user_name.id
									var name = responseJson.result[i].user_name.name
									var image = responseJson.result[i].user_name.user_image
									var experience = responseJson.result[i].user_name.experience
									var mobile = responseJson.result[i].user_name.mobile
									var email = responseJson.result[i].user_name.email
									var about = responseJson.result[i].user_name.about
									var description = responseJson.result[i].user_name.description
									var contact = responseJson.result[i].user_name.mobile
									var profession = responseJson.result[i].user_name.profession
									var degree = responseJson.result[i].user_name.degree
									var application_status = responseJson.result[i].application_status
									//	var job_name = responseJson.result[i].job_name.name

									let array = [...temp_arr];
									//	const array = [...this.state.data];
									array[i] = { ...array[i], key: id };
									array[i] = { ...array[i], name: name };
									if (image == null) {
										array[i] = { ...array[i], image: "" };
									} else {
										array[i] = { ...array[i], image: "http://webmobril.org/dev/locum/" + image };
									}

									array[i] = { ...array[i], experience: experience };
									array[i] = { ...array[i], mobile: mobile };
									array[i] = { ...array[i], email: email };
									array[i] = { ...array[i], about: about };
									array[i] = { ...array[i], profession: profession };
									array[i] = { ...array[i], degree: degree };
									array[i] = { ...array[i], appid: application_id };
									array[i] = { ...array[i], description: description };
									array[i] = { ...array[i], contact: contact };
									array[i] = { ...array[i], application_status: application_status };
									if (profession == null) {
										array[i] = { ...array[i], description: '' };
									}
									else {
										array[i] = { ...array[i], description: profession + " with " + experience + " years exp." };
									}

									temp_arr = array
								}
								this.setState({ jobs: temp_arr });

							}
							else {
								showMessage(0, "No practitioners found !", "Practitioner", true, false);

							}




						}


					}).catch((error) => {
						this.setState({ loading_status: false })
						console.error(error);
					});

			}
		});

	}


	async componentWillMount() {
		await this.fetch()
		var id = await this.getUserId()
		this.setState({
			id: id
		})

	}

	next(job_id) {
		if (this.state.jobs.length > 0) {
			//var jobs = this.state.jobs
			for (var i = 0; i < this.state.jobs.length; i++) {
				if (this.state.jobs[i].key == job_id) {
					let result = {}
					result["id"] = this.state.jobs[i].key //practiiontre_id
					result["about"] = this.state.jobs[i].about
					result["name"] = this.state.jobs[i].name
					result["description"] = this.state.jobs[i].description
					result["experience"] = this.state.jobs[i].experience
					result["profession"] = this.state.jobs[i].profession
					result["contact"] = this.state.jobs[i].contact
					result["email"] = this.state.jobs[i].email
					result["image"] = this.state.jobs[i].image
					result["degree"] = this.state.jobs[i].degree
					result['application_status'] = this.state.jobs[i].application_status
					result["appid"] = this.state.jobs[i].appid //application_id

					this.props.navigation.navigate('PractitionersDetails', { result: result, fetch: this.fetch });
				}
			}
		}
	}


	acceptPractitioner(id) {


		NetInfo.isConnected.fetch().then(async isConnected => {
			if (!isConnected) {
				this.props.navigation.navigate("NoNetwork")
				return;
			} else {

				this.setState({ loading_status: true })


				var body = new FormData();
				//body.append('userid', this.state.id);
				body.append('application_id', id);
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

							showMessage(0, "Accepted Successfully", "Practitioner", true, false);
							this.fetch()

						}


						else {
							showMessage(0, JSON.stringify(responseJson.message), "Practitioner", true, false);

						}

					}
					).catch((error) => {
						console.error(error);
					});



			}
		});

	}


	removePractitioner(id, prac_id) {

		NetInfo.isConnected.fetch().then(async isConnected => {
			if (!isConnected) {
				this.props.navigation.navigate("NoNetwork")
				return;
			} else {

				this.setState({ loading_status: true })


				var body = new FormData();
				//body.append('userid', this.state.id);
				body.append('application_id', id);
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

						//	ToastAndroid.show(JSON.stringify(responseJson),ToastAndroid.LONG)

						if (responseJson.status === 'success') {
							// this.setState({
							// 	jobs: this.state.jobs.filter((_item) => _item.key !== prac_id)
							// });
							showMessage(0, "Removed Successfully ", "Practitioner", true, false);

							this.fetch()

						}


						else {
							showMessage(0, JSON.stringify(responseJson.message), "Practitioner", true, false);

						}

					}
					).catch((error) => {
						console.error(error);
					});


			}
		});


	}


	accept(job_id) {
		if (this.state.jobs.length > 0) {
			//var jobs = this.state.jobs
			for (var i = 0; i < this.state.jobs.length; i++) {
				if (this.state.jobs[i].key == job_id) {
					let p_id = this.state.jobs[i].key
					let application_id = this.state.jobs[i].appid
					//this.props.navigation.navigate('PractitionersDetails',{result : result});
					this.acceptPractitioner(application_id, p_id)
				}
			}
		}
	}



	remove(job_id) {
		if (this.state.jobs.length > 0) {
			//var jobs = this.state.jobs
			for (var i = 0; i < this.state.jobs.length; i++) {
				if (this.state.jobs[i].key == job_id) {
					let p_id = this.state.jobs[i].key
					let application_id = this.state.jobs[i].appid
					//this.props.navigation.navigate('PractitionersDetails',{result : result});
					this.removePractitioner(application_id, p_id)
				}
			}
		}
	}


	onRemoveAlert = (key) => {

		Alert.alert(
			'Reject',
			'Are you sure you want to Reject the job application?',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				},
				{
					text: 'OK',
					onPress: () => {this.remove(key)}
				}
			],
			{
				cancelable: false
			}
		);
	}

	onAcceptAlert = (key) => {

		Alert.alert(
			'Accept',
			'Are you sure you want to Accept the job application?',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				},
				{
					text: 'OK',
					onPress: () => {this.accept(key)}
				}
			],
			{
				cancelable: false
			}
		);
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
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '09%', backgroundColor: '#4C74E6' }}>

						<TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
							<Image style={{ width: 20, height: 20, margin: 10 }} source={require('../assets/clinic/left-arrow.png')} />
						</TouchableWithoutFeedback>

						<View>
							<Text style={{fontFamily:"Roboto-Light",  fontSize: 20, fontWeight: 'bold', color: "white", paddingRight: 25 }}>Practitioners List</Text>
						</View>

						<View>
						</View>

					</View>

					{/*for main content*/}
					{this.state.jobs.length > 0
						?
						<ScrollView style={{ paddingBottom: 15 }}>
							<View style={{ padding: 1 }}>
								<FlatList
									style={{ marginBottom: 20, width: '100%' }}
									data={this.state.jobs}
									showsVerticalScrollIndicator={false}
									scrollEnabled={false}
									renderItem={({ item }) =>

										<TouchableOpacity onPress={() => this.next(item.key)}>
											<View style={{ width: '100%' }}>
												<Card containerStyle={{ padding: 10, borderRadius: 5, width: '95%', alignSelf: "center" }} >
													<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
														<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
															{item.image == ""
																?
																<Image source={require('../assets/doctor/avatar1.png')} style={{ height: 50, width: 50, borderRadius: 50 / 2, marginRight: 10 }} />
																:
																<Image source={{ uri: item.image }} style={{ height: 50, width: 50, borderRadius: 50 / 2, marginRight: 10 }} />
															}



															<View style={{ justifyContent: 'space-around', alignItems: 'flex-start', marginLeft: 5, marginRight: 10 }}>
																<Text style={{fontFamily:"Roboto-Light",  color: 'black', fontSize: 15, fontWeight: "bold" }}>{item.name}</Text>
																<Text style={{fontFamily:"Roboto-Light", }}>{item.description}</Text>
															</View>

														</View>

														{item.application_status == 0
															?
															<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
																<TouchableOpacity onPress={() => { this.onAcceptAlert(item.key) }}>
																	<Image source={require('../assets/clinic/accept.jpg')} style={{ height: 25, width: 25, marginRight: 5 }} />
																</TouchableOpacity>
																<TouchableOpacity onPress={() => {
																	this.onRemoveAlert(item.key)
																	
																}}>
																	<Image source={require('../assets/clinic/reject.jpg')} style={{ height: 25, width: 25 }} />
																</TouchableOpacity>
															</View>

															:
															(item.application_status == 1
																?
																<Text style={{fontFamily:"Roboto-Light",  fontSize: 13, marginBottom: 10, fontWeight: "bold", marginTop: 5, color: "#5AA86C", textAlign: "center" }}>Approved</Text>
																:
																<Text style={{fontFamily:"Roboto-Light",  fontSize: 13, marginBottom: 10, fontWeight: "bold", marginTop: 5, color: "red", textAlign: "center" }}>Rejected</Text>
															)
														}


													</View>
												</Card>
											</View>
										</TouchableOpacity>
									}
									keyExtractor={item => item.name}
								/>
							</View>
						</ScrollView>
						:
						<Text style={{fontFamily:"Roboto-Light",  textAlign: "center", justifyContent: "center", flex: 1, marginTop: 20, fontWeight: "bold", fontSize: 14 }}>No Practitioners Applied.</Text>
					}

				</View>
			</View>

		)
	}
}


let styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',

	},
	submitButton: {
		width: '100%',
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
	indicator: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 80
	}

})
