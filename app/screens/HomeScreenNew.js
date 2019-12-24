import React, { Component } from 'react';
import {
	Text, View, Button, StyleSheet, SafeAreaView,
	Dimensions, ScrollView, Alert, Image, FlatList, TouchableOpacity,
	ToastAndroid, TouchableWithoutFeedback, BackHandler
} from 'react-native';
// import { TextField } from 'react-native-material-textfield';
// import ScrollView, { ScrollViewChild } from 'react-native-directed-scrollview';
import { Card, ListItem, Icon } from 'react-native-elements';
import { withNavigationFocus } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { StackActions, NavigationActions  } from 'react-navigation'



class HomeScreenNew extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};

	}

	handleBackWithAlert = () => {
		// const parent = this.props.navigation.dangerouslyGetParent();
		// const isDrawerOpen = parent && parent.state && parent.state.isDrawerOpen;
		// ToastAndroid.show(JSON.stringify(isDrawerOpen),ToastAndroid.LONG)

		if (this.props.isFocused) {

			if (this.state.loading_status) {
				this.setState({ loading_status: false })
			}

			else {
				Alert.alert(
					'Exit App',
					'Exiting the application?',
					[
						{
							text: 'Cancel',
							onPress: () => console.log('Cancel Pressed'),
							style: 'cancel'
						},
						{
							text: 'OK',
							onPress: () => BackHandler.exitApp()
						}
					],
					{
						cancelable: false
					}
				);
			}

			return true;
		}
	}



	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackWithAlert);

	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackWithAlert);

	}


	render() {
		return (

			<View style={{flex:1}}>
			<SafeAreaView style={{  backgroundColor: '#4C74E6'}} />
			<View style={styles.container}>
				{/*for header*/}
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '09%', backgroundColor: '#4C74E6' }}>

					<TouchableWithoutFeedback onPress={() => this.props.navigation.toggleDrawer()}>
						<Image style={{ width: 20, height: 20, margin: 10 }} source={require('../assets/clinic/menu-options.png')} />
					</TouchableWithoutFeedback>

					<View>
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: "white", paddingRight: 25 }}>Home</Text>
					</View>

					<View>
					</View>

				</View>

				{/*for main content*/}


				<View style={{ width: '100%', flex: 1, height: '100%' }}>
					<Image style={{ width: '100%', height: 250,marginBottom:30}} source={require('../assets/clinic/banner.jpg')} />


					
						<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom:20}}>
							<Card containerStyle={{width:"40%",height:"90%"}}>
								<TouchableOpacity onPress={() => this.props.navigation.navigate("JobPost")}>
									<View style={{ justifyContent: 'center', alignItems: 'center' }}>
										<Image style={{ width: 40, height: 40 }} source={require('../assets/clinic/1.png')} />
										<Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>Add Post</Text>
									</View>
								</TouchableOpacity>
							</Card>
							<Card containerStyle={{width:"40%",height:"90%"}}>
								<TouchableOpacity onPress={() => this.props.navigation.navigate("JobList")}>
									<View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
										<Image style={{ width: 40, height: 40 }} source={require('../assets/clinic/2.png')} />
										<Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>Listings</Text>
									</View>
								</TouchableOpacity>
							</Card>
						</View>


						<View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
							<Card containerStyle={{width:"40%",height:"90%"}}>
								<TouchableOpacity onPress={()=>{this.props.navigation.navigate("FAQ")
									const resetAction = StackActions.reset({
										index: 0,
										key: 'FAQ',
										actions: [NavigationActions.navigate({ routeName: 'FAQ' })],
									});
									this.props.navigation.dispatch(resetAction);}}>
									<View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', marginLeft: 3, marginRight: 3 }}>
										<Image style={{ width: 40, height: 40 }} source={require('../assets/clinic/3.png')} />
										<Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>FAQs</Text>
									</View>
								</TouchableOpacity>
							</Card>
							<Card containerStyle={{width:"40%",height:"90%"}}>
								<TouchableOpacity onPress={() => this.props.navigation.navigate("ContactAdmin")}>
									<View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
										<Image style={{ width: 40, height: 40 }} source={require('../assets/clinic/4.png')} />
										<Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>Contact</Text>
									</View>
								</TouchableOpacity>
							</Card>
						</View>

					


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

export default withNavigationFocus(HomeScreenNew);
