import React, { Component } from 'react';
import {
	Text, View, Button, StyleSheet, SafeAreaView, Dimensions,
	ScrollView, Image, FlatList, ActivityIndicator, TouchableOpacity, ToastAndroid, TouchableWithoutFeedback
} from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import {showMessage} from './Globals'



export default class JobList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			jobs: [],
			loading_status: false


		};

	}

	fetch(item) {

		NetInfo.isConnected.fetch().then(async isConnected =>  {
			if (!isConnected) {
			  this.props.navigation.navigate("NoNetwork")
			  return;
			}else{

				this.setState({ loading_status: true })
				var formData = new FormData();
				formData.append('userid', item);


			fetch('http://webmobril.org/dev/locum/api/job_list', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'multipart/form-data',
				},
				body: formData

			}).then((response) => response.json())
				.then((responseJson) => {
					this.setState({ loading_status: false })

					console.log("res/..",responseJson);
					if (responseJson.status === 'success') {
						var length = responseJson.result.length
						var temp_arr = []
						if (length > 0) {
							for (var i = 0; i < length; i++) {
								var id = responseJson.result[i].id
								var profile = responseJson.result[i].profile.name
								var date = responseJson.result[i].required_date
								var location = responseJson.result[i].job_location
								var experience = responseJson.result[i].exp_required
								var description = responseJson.result[i].job_desc
								var from_last_index;
								var from;
								if(responseJson.result[i].from_time == null){

									from_last_index = "";
									from = "";

								}else{
									from_last_index = responseJson.result[i].from_time.lastIndexOf(":")
									from = responseJson.result[i].from_time.substring(0,from_last_index);
								}
								var to_last_index;
								var to;
								if(responseJson.result[i].to_time == null){

									to_last_index="";
									to="";

								}else{
									to_last_index	= responseJson.result[i].to_time.lastIndexOf(":");
									to = responseJson.result[i].to_time.substring(0,to_last_index);
								}

								const array = [...temp_arr];
								array[i] = { ...array[i], name: "Need " + profile + " with " + experience + " years experience" };
								array[i] = { ...array[i], description: description };
								array[i] = { ...array[i], profile: profile };
								array[i] = { ...array[i], experience: experience };
								array[i] = { ...array[i], location: location };
								array[i] = { ...array[i], date: date };
								array[i] = { ...array[i], key: id };
								array[i] = { ...array[i], from_time: from};
								array[i] = { ...array[i], to_time:to};
								temp_arr = array
								
							}//end of for

							//return true;
							this.setState({ jobs: temp_arr })
						}

						else {
							let arr = [];
							this.setState({ jobs: arr })
							// Alert.alert("No Record Found!!!");
							showMessage(0,"No Jobs Found !!!","Job List",true,false);
						
							return false;
						}

					}
					else {
						let arr = [];
							this.setState({ jobs: arr })
							// Alert.alert("No Record Found!!!");
						showMessage(0,"No Jobs Found !!!","Job List",true,false);
						
					}




				}).catch((error) => {
					console.error(error);
				});

				}
		});
		
	}

	async _getStorageValue() {
		var value = await AsyncStorage.getItem('uname')
		return value
	}

	next(job_id) {
		if (this.state.jobs.length > 0) {
			//var jobs = this.state.jobs
			for (var i = 0; i < this.state.jobs.length; i++) {
				if (this.state.jobs[i].key == job_id) {
					let result = {}
					console.log("this.job",this.state.jobs[i]);
					result["job_id"] = job_id;
					result["profile"] = this.state.jobs[i].profile
					result["location"] = this.state.jobs[i].location
					result["experience"] = this.state.jobs[i].experience
					result["date"] = this.state.jobs[i].date
					result["description"] = this.state.jobs[i].description
					result["to"] = this.state.jobs[i].to_time;
					result["from"] =  this.state.jobs[i].from_time
					
					this.props.navigation.navigate('JobDetails', { result: result });
				}
			}
		}
	}

	async componentDidMount() {
		let user_id = await this._getStorageValue()

		this.fetch(user_id)
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

					<TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
						<Image style={{ width: 20, height: 20, margin: 10 }} source={require('../assets/clinic/left-arrow.png')} />
					</TouchableWithoutFeedback>

					<View>
						<Text style={{fontFamily:"Roboto-Light", fontSize: 20, fontWeight: 'bold', color: "white", paddingRight: 25 }}>Listed Vaccancy</Text>
					</View>

					<View>
					</View>

				</View>

				{this.state.jobs.length > 0 
				?
				
				<ScrollView style={{ paddingBottom: 15 }}>
					<View style={{ padding: 1, width: '100%' }}>
						<FlatList
							style={{ marginBottom: 20 }}
							data={this.state.jobs}
							showsVerticalScrollIndicator={false}
							scrollEnabled={false}
							renderItem={({ item }) =>

								<TouchableOpacity onPress={() => this.next(item.key)}>
									<View>
										<Card containerStyle={{ padding: 10, borderRadius: 5 }} >
											<Text style={{fontFamily:"Roboto-Light", color: 'black', fontSize: 15, marginBottom: 5 ,fontWeight:"bold"}}>Requirement : <Text style={{fontSize:15,fontWeight:"normal"}}>{item.name}</Text></Text>
											<Text style={{fontFamily:"Roboto-Light", marginBottom: 5 ,fontWeight:"bold"}}>Description : <Text style={{fontWeight:"normal"}}>{item.description}</Text></Text>
											<View style={{ flexDirection: 'row', justifyContent: 'space-between',marginBottom:5 }}>
												<Text style={{fontFamily:"Roboto-Light",fontWeight:"bold"}}>Required Date : </Text>
												<Text style={{fontFamily:"Roboto-Light",textAlign:"right"}}>{item.date}</Text>
												
											</View>
											<Text style={{ color: '#4C74E6' ,justifyContent:"flex-end",textAlign:"right"}}>Read More >></Text>
										</Card>
									</View>
								</TouchableOpacity>
							}
							keyExtractor={item => item.name}
						/>
					</View>
				</ScrollView>
				 :
				 <Text style={{fontFamily:"Roboto-Light",textAlign:"center",justifyContent:"center",flex:1,marginTop:20,fontWeight:"bold",fontSize:14}}>No Jobs Found.</Text>
				}
				
			</View>
			</View>

		)
	}
}


let styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F2F2F2',
		alignItems: 'center',
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
