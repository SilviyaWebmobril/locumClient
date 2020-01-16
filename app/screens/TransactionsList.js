import React, { Component } from 'react';
import {
	Text, View, Button, StyleSheet, SafeAreaView,
	Dimensions, ScrollView, Image, FlatList, TouchableOpacity, ActivityIndicator, ToastAndroid, TouchableWithoutFeedback
} from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from './Globals';



export default class TransactionsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			transactions:
				[
				],
			loading_status: false,


		};

	}




	async getUserId() {
		var id = await AsyncStorage.getItem('uname')
		return id
	}



	async fetch() {
		var id = await this.getUserId()
		var formData = new FormData();
		formData.append('userid', id);
		//formData.append('userid',340);

		NetInfo.isConnected.fetch().then(isConnected => {
			if (!isConnected) {
				this.props.navigation.navigate("NoNetwork")
				return;
			}
			else {

				this.setState({ loading_status: true })

				fetch('http://webmobril.org/dev/locum/api/my_purchased_packages?user_id=' + id, {
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
						var temp_arr = []
						if (responseJson.status === 'success') {
							if (responseJson.data.length > 0) {

								this.setState({ transactions: responseJson.data });


							}
							else {
								showMessage(0, "No transactions history found !", 'Transaction', true, false);

							}




						}
						else {
							//showMessage(0, responseJson.message, 'Transaction', true, false);

						}



					}).catch((error) => {
						console.error(error);
					});
			}

		})

	}


	async componentWillMount() {
		await this.fetch()


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

					<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("HomePage")}>
						<Image style={{ width: 20, height: 20, margin: 10 }} source={require('../assets/clinic/left-arrow.png')} />
					</TouchableWithoutFeedback>

					<View>
						<Text style={{ fontFamily:"Roboto-Light", fontSize: 20, fontWeight: 'bold', color: "white", paddingRight: 25 }}>Transactions List</Text>
					</View>

					<View>
					</View>

				</View>

				{/*for main content*/}
				{/* <ScrollView style={{paddingBottom:15}}>
			 <View style={{padding:1,width:'100%'}}>
						  <FlatList
							  style={{marginBottom:20}}
							  data={this.state.transactions}
							  showsVerticalScrollIndicator={false}
							  scrollEnabled={false}
							  renderItem={({item}) =>

							   <TouchableOpacity  onPress={() => this.next(item.key)}>
									  <Card containerStyle={{padding: 10,borderRadius:10}}>
										<View style={{}}>
											<Text style={{color:"#4C74E6" ,fontWeight:"bold",fontSize:15,marginBottom:10 }}>{item.package.name}</Text>
											<View style={{flexDirection:"row"}}>
												<Image source={require('../assets/nav/clock.png')} style={{width:20,height:20}} />

											</View>

									
										</View>
									</Card>
							  </TouchableOpacity>
							  }
							  keyExtractor={item => item.name}
							/>
			 </View>
			</ScrollView> */}
				<ScrollView style={{ paddingBottom: 15, width: '100%' }}>
					<View style={{ padding: 1, width: '100%' }}>

						{this.state.transactions.length > 0 
						?
						<FlatList
							style={{ marginBottom: 20 }}
							data={this.state.transactions}
							showsVerticalScrollIndicator={false}
							scrollEnabled={false}
							renderItem={({ item }) =>


								<View style={{ width: '100%' }}>
									<Card containerStyle={{ padding: 12, borderRadius: 5 }} >
										<Text style={{ fontFamily:"Roboto-Light", color: 'black', fontSize: 18, marginBottom: 10, fontWeight: "bold", color: "#4C74E6", }}>{item.package.name}</Text>
										<View style={{ flexDirection: "row", marginLeft: 10, marginBottom: 10 }}>
											<Image source={require('../assets/nav/clock.png')} style={{ width: 15, height: 15 }} />
											<Text style={{ fontFamily:"Roboto-Light", fontSize: 12, marginLeft: 5, marginTop: -2 }}>{item.created_at.split(' ')[1]}</Text>
										</View>
										<View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
											<Text style={{ fontFamily:"Roboto-Light", alignSelf: "flex-end", fontSize: 15 }}>Date</Text>
											<Text style={{fontFamily:"Roboto-Light",  color: '#4C74E6', alignSelf: "flex-end", fontWeight: "bold", fontSize: 15 }}>{item.created_at.split(' ')[0]}</Text>
										</View>
										<View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
											<Text style={{ fontFamily:"Roboto-Light", alignSelf: "flex-end", fontSize: 15 }}>Mode Of Payment</Text>
											<Text style={{ fontFamily:"Roboto-Light", color: '#4C74E6', alignSelf: "flex-end", fontWeight: "bold", fontSize: 15 }}>Wallet</Text>
										</View>
										<View style={{ width: "100%", height: 1, backgroundColor: "#808080", marginBottom: 5 }}></View>
										<View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
											<Text style={{ fontFamily:"Roboto-Light", alignSelf: "flex-end", fontSize: 15, color: '#5AA86C', fontWeight: "bold" }}>Total</Text>
											<Text style={{ fontFamily:"Roboto-Light", color: '#5AA86C', alignSelf: "flex-end", fontWeight: "bold", fontSize: 15 }}>$ {item.package.amt}</Text>
										</View>





									</Card>
								</View>

							}
							keyExtractor={item => item.id}
						/>
						:
						<Text style={{ fontFamily:"Roboto-Light", textAlign: "center", justifyContent: "center", flex: 1, marginTop: 20, fontWeight: "bold", fontSize: 14 }}>No Transactions Found.</Text>
						}
						
					</View>
				</ScrollView>
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
