import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, SafeAreaView, Dimensions, ScrollView, Image, FlatList, TouchableOpacity, ToastAndroid, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
// import { TextField } from 'react-native-material-textfield';
// import ScrollView, { ScrollViewChild } from 'react-native-directed-scrollview';
import { Card, ListItem, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { showMessage }  from './Globals'


export default class Wallet extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			wallets: [],
			balance: 0.0,
			loading_status: false,
			user_image: ''


		};

	}

	async getUserId() {
		var id = await AsyncStorage.getItem('uname')
		return id
	}
	async getUserName() {
		var name = await AsyncStorage.getItem('name')
		return name
	}

	async getUserPic() {
		var pic = await AsyncStorage.getItem('user_image')
		console.log("pic..",pic);
		return pic
	}



	async componentWillMount() {
		let user_id = await this.getUserId()
		let name = await this.getUserName()
		let pic = await this.getUserPic()
		let ppic ;
		if(pic === null){
			ppic = "";
		}else{
			ppic = `http://webmobril.org/dev/locum/${pic}`;
			
		}


		this.setState({ id: user_id, name: name, user_image:  ppic })

		NetInfo.isConnected.fetch().then(isConnected => {
			if (isConnected) {

				this.fetch(user_id)
				//this.fetch()
			}
			else {
				//this.props.navigation.navigate("NoNetwork")
				return;
			}
		})

	}

	fetch(id) {
		NetInfo.isConnected.fetch().then(isConnected => {
			if (!isConnected) {
				this.props.navigation.navigate("NoNetwork")
				return;
			}
			else {
				this.setState({ loading_status: true })


				var body = new FormData();
				//body.append('userid', this.state.id);
				body.append('userid', id);


				fetch('http://webmobril.org/dev/locum/api/recharge_history', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'multipart/form-data',
					},
					body: body

				}).then((response) => response.json())
					.then((responseJson) => {
						this.setState({ loading_status: false })

						//ToastAndroid.show(JSON.stringify(responseJson),ToastAndroid.LONG)
						var balnc = 0
						if (responseJson.status === 'success') {
							
							if (responseJson.avlbal == null) {
								balnc = 0.0
							}
							else {
								balnc = responseJson.avlbal.toString()
							}
							AsyncStorage.setItem("avlbal", balnc.toString())
							//var balnc = responseJson.avlbal.toString()
							var length = responseJson.result.length.toString();
							var temp_arr = []
							if (parseInt(length) > 0) {
								for (var i = 0; i < length; i++) {

									var id = responseJson.result[i].id
									var price = responseJson.result[i].amt.toString()
									var date = responseJson.result[i].created_at.split(" ")[0]
									var txn_id = responseJson.result[i].txn_id



									const array = [...temp_arr];
									array[i] = { ...array[i], key: id };
									array[i] = { ...array[i], name: txn_id.toString() };
									array[i] = { ...array[i], price: price.toString() };
									array[i] = { ...array[i], date: date.toString() };

									temp_arr = array

								}

								this.setState({ wallets: temp_arr, balance: balnc })
							}
							else {
								showMessage(0,"No Wallet Recharge History found","Wallet",true,false);
							
							}


						}


						else {
							showMessage(0,JSON.stringify(responseJson.message),"Wallet",true,false);
						
						}

					}
					).catch((error) => {
						console.error(error);
					});

			}

		})





	}


	async componentDidMount() {
		//  StatusBar.setBackgroundColor('#32CD32')


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

					</View>

					<View>
					</View>

				</View>

				{/*for main content*/}


				<ScrollView style={{ width: '100%', flex: 1, height: '100%' }}>



					<View style={{ width: '100%', height: 150, backgroundColor: '#4C74E6', justifyContent: 'center', alignItems: 'center', flex: 3, flexGrow: 1 }}>
						{/*change margin top and bottom to make view hirht flexible in below header vieww */}
						<Text style={{fontFamily:"Roboto-Light", fontSize: 18, fontWeight: 'bold', color: "white", marginBottom: '2%', marginTop: '1%', }}>{this.state.name}</Text>
						<Text style={{fontFamily:"Roboto-Light", fontSize: 18, fontWeight: 'bold', color: "white", marginBottom: '23%', marginTop: '1%', }}>${this.state.balance}</Text>
					</View>




					<View style={{ backgroundColor: 'white', borderRadius: 60, padding: 20, alignSelf: 'center', flex: 1 }}>
						{this.state.user_image == "" 
						?
						<View style={{borderWidth:2,backgroundColor:"white",top: -80,  width: 120, height: 120, borderRadius: 120 / 2, alignSelf: 'center', }}>
						<Image
							source={require('../assets/doctor/avatar1.png')}
							style={{
								position: 'absolute',
								overflow: 'hidden',
								borderRadius: 120 / 2,
								height: 120,
								width: 120,
								alignSelf:"center",
								

							}}
						/>
						</View>
						:
						<View style={{borderWidth:2,top: -80,  width: 120, height: 120, borderRadius: 120 / 2, alignSelf: 'center', }}>
						<Image
							source={{ uri: this.state.user_image }}
							style={{
								position: 'absolute',
								overflow: 'hidden',
								borderRadius: 120 / 2,
								height: 120,
								width: 120,
								alignSelf:"center",
								width: 120
							}}
						/>
						</View>
						}
						
						
					</View>

					<TouchableOpacity onPress={() => this.props.navigation.navigate("AddMoney")}
						style={{ marginRight: 10, alignSelf: 'flex-end',marginTop:-120 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text
								onPress={() => this.props.navigation.navigate("AddMoney")}
								style={{ color: 'black', fontSize: 15, marginRight: 10 }}>
								Add Money
													</Text>
							<Image
								source={require('../assets/clinic/add-money.png')}
								style={{ height: 20, width: 20 }}>
							</Image>

						</View>
					</TouchableOpacity>




					<FlatList
						style={{ marginBottom: 20, marginTop: 25 }}
						data={this.state.wallets}
						showsVerticalScrollIndicator={false}
						scrollEnabled={false}
						renderItem={({ item }) =>

							<TouchableOpacity>
								<View>

									<Card containerStyle={{ padding: 15, borderRadius: 10 }} >
										<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

											<Text style={{fontFamily:"Roboto-Light", fontSize: 15, color: 'black', fontWeight: 'bold' }}>{item.date}</Text>


											<Text style={{fontFamily:"Roboto-Light", color: '#4C74E6', fontSize: 15 }}>${item.price}</Text>
										</View>
									</Card>
								</View>
							</TouchableOpacity>
						}
						keyExtractor={item => item.name}
					/>




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
