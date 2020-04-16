import React, { useState , useEffect } from 'react';
import {
	Text, View, Button, StyleSheet, SafeAreaView,
	Dimensions, ScrollView, Image, FlatList,
	TouchableOpacity, ToastAndroid, TouchableWithoutFeedback,Alert
} from 'react-native';
import {
	StackActions, NavigationActions
} from 'react-navigation';
import {useDispatch ,useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { logoutUser } from '../redux/stores/actions/auth_action';
import ApiUrl from '../Globals/ApiUrl';

const Drawer = (props) => {

	const dispatch = useDispatch();
	
	const name = useSelector(state => state.auth.user_basic_details.name);
	const user_image = useSelector(state => state.auth.user_basic_details.user_image);
	const post_available =  useSelector(state => state.register.user.jobs_remaining)


	const onlogout =()=>{

		Alert.alert(
			'Logout',
			'Are you sure you want to logout?',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				},
				{
					text: 'OK',
					onPress: () => logout()
				}
			],
			{
				cancelable: false
			}
		);
	}

	const logout = () =>{

		//AsyncStorage.clear();
		dispatch(logoutUser());
		ToastAndroid.show("Successfully logged out", ToastAndroid.SHORT);
		
		props.navigation.closeDrawer()
	    props.navigation.navigate("Login")
		const resetAction = StackActions.reset({
			index: 0,
			key: 'Login',
			actions: [NavigationActions.navigate({ routeName: 'Login' })],
		});
		props.navigation.dispatch(resetAction);

	}


	return(
		<View style={styles.container}>
		
			<LinearGradient
				style={styles.drawerHeader}
				colors= {["#4E73E6","#9456CE"]}
				start= {{x: 0.0, y: 0.5}}
				end= {{ x: 0.6, y: 0.4 }}>
					{(user_image !== null)
					?
					<TouchableOpacity onPress={()=>{
						props.navigation.closeDrawer()
						props.navigation.navigate('Profile');
						//below is used to reset stacki navigator so that goes infirst screen only
						const resetAction = StackActions.reset({
							index: 0,
							key: 'Profile',
							actions: [NavigationActions.navigate({ routeName: 'EditProfile' })],
						});
						props.navigation.dispatch(resetAction);
					}}>
						<Image source={{uri:ApiUrl.image_url+user_image}} style={styles.imageStyle}/> 
					</TouchableOpacity>
					
					:
					<TouchableOpacity onPress={()=>{
						props.navigation.closeDrawer()
						props.navigation.navigate('Profile');
						//below is used to reset stacki navigator so that goes infirst screen only
						const resetAction = StackActions.reset({
							index: 0,
							key: 'Profile',
							actions: [NavigationActions.navigate({ routeName: 'EditProfile' })],
						});
						props.navigation.dispatch(resetAction);
					}}>
						<Image source={require('../assets/doctor/avatar.png')} style={styles.imageStyle}/> 
					</TouchableOpacity>
					
					}
					
					<View style={{flexDirection:"column",marginLeft:10}}>
						<Text numberOfLines={2} style={styles.userNameText}>{name}</Text>
						<Text style={styles.postAvailable}>Post Available : {post_available}</Text>
					</View>
					

			</LinearGradient>

			 <ScrollView style={{ flex: 1 }}>


							<TouchableOpacity onPress={() => {
								props.navigation.closeDrawer()
								props.navigation.navigate('HomePage');
								//below is used to reset stacki navigator so that goes infirst screen only
								const resetAction = StackActions.reset({
									index: 0,
									key: 'HomeScreen',
									actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
								});
								props.navigation.dispatch(resetAction);
							}} >
								<View style={styles.drawerlayout}>
									<Image source={require('../assets/nav/home.png')} style={styles.drawerimage} />
									<Text style={styles.drawertext}>Home</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity onPress={() => {
								props.navigation.navigate('Packages');
								//below is used to reset stacki navigator so that goes infirst screen only
								const resetAction = StackActions.reset({
									index: 0,
									key: 'Packages',
									actions: [NavigationActions.navigate({ routeName: 'Packages' })],
								});
								props.navigation.dispatch(resetAction);
							}}>
								<View style={styles.drawerlayout}>
									<Image source={require('../assets/nav/buy.png')} style={styles.drawerimage} />
									<Text style={styles.drawertext}>Buy Packages</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity onPress={() => {
								props.navigation.navigate('Wallet');
								//below is used to reset stacki navigator so that goes infirst screen only
								const resetAction = StackActions.reset({
									index: 0,
									key: 'Wallet',
									actions: [NavigationActions.navigate({ routeName: 'Wallet' })],
								});
								props.navigation.dispatch(resetAction);
							}}>
								<View style={styles.drawerlayout}>
									<Image source={require('../assets/nav/wallet.png')} style={styles.drawerimage} />
									<Text style={styles.drawertext}>Wallet</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity onPress={() => {
								props.navigation.closeDrawer()
								props.navigation.navigate('Transactions');
								//below is used to reset stacki navigator so that goes infirst screen only
								const resetAction = StackActions.reset({
									index: 0,
									key: 'Transactions',
									actions: [NavigationActions.navigate({ routeName: 'TransactionList' })],
								});
								props.navigation.dispatch(resetAction);
							}}>
								<View style={styles.drawerlayout}>
									<Image source={require('../assets/nav/trans.png')} style={styles.drawerimage} />
									<Text style={styles.drawertext}>Transactions</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity onPress={() => {
								props.navigation.closeDrawer()
								props.navigation.navigate('Profile');
								//below is used to reset stacki navigator so that goes infirst screen only
								const resetAction = StackActions.reset({
									index: 0,
									key: 'Profile',
									actions: [NavigationActions.navigate({ routeName: 'EditProfile' })],
								});
								props.navigation.dispatch(resetAction);
							}}>
								<View style={styles.drawerlayout}>
									<Image source={require('../assets/nav/user-shape.png')} style={styles.drawerimage} />
									<Text style={styles.drawertext}>Profile</Text>
								</View>
							</TouchableOpacity>

						
							<TouchableOpacity onPress={() => {
								props.navigation.navigate('ResetPassword');
								//below is used to reset stacki navigator so that goes infirst screen only
								const resetAction = StackActions.reset({
									index: 0,
									key: 'ResetPassword',
									actions: [NavigationActions.navigate({ routeName: 'ResetPassword' })],
								});
								props.navigation.dispatch(resetAction);
							}}>
								<View style={styles.drawerlayout}>
									<Image source={require('../assets/nav/setting.png')} style={styles.drawerimage} />
									<Text style={styles.drawertext}>Reset Password</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity onPress={() => {
								props.navigation.navigate('TermsCondition');
								//below is used to reset stacki navigator so that goes infirst screen only
								const resetAction = StackActions.reset({
									index: 0,
									key: 'TermsCondition',
									actions: [NavigationActions.navigate({ routeName: 'TermsCondition' })],
								});
								props.navigation.dispatch(resetAction);
							}}>
								<View style={styles.drawerlayout}>
									<Image source={require('../assets/nav/terms.png')} style={styles.drawerimage} />
									<Text style={styles.drawertext}>Terms & Conditions</Text>
								</View>
							</TouchableOpacity>



							<TouchableOpacity onPress={onlogout}>
								<View style={styles.drawerlayout}>
									<Image source={require('../assets/nav/logout.png')} style={styles.drawerimage} />
									<Text style={styles.drawertext}>Logout</Text>
								</View>
							</TouchableOpacity>
						</ScrollView> 


	

		</View>
	)

}

const styles = StyleSheet.create({

	container:{
		flex:1,
	},
	drawerHeader:{
		width:'100%',
		height:'24%',
		paddingLeft:20,
		justifyContent:"flex-start",
		alignItems:"center",
		flexDirection:"row",
		
	},
	userNameText:{
		lineHeight:25,
		width:140,
		fontSize:17,
		fontFamily:'roboto-bold',
		color:'white'
	},
	postAvailable:{
		marginTop:5,
		fontSize:15,
		fontFamily:'Roboto-bold',
		color:'white'
	},
	imageStyle:{
		height:80,
		width:80,
		borderRadius:40,
		borderWidth:1,
	},
	userProfileText:{
		fontSize:17,
		fontFamily:'Roboto-bold',
		color:'white'
	},
		drawerlayout: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'

	},
		drawerimage: {
		height: 25,
		width: 25,
		marginRight: 20,
		marginLeft: 20
	},
		drawertext: {
		fontFamily:'Roboto-Light',
		fontSize: 14,
		color: 'black',
		marginTop: 15,
		marginBottom: 15,
		marginLeft: 10
	},

})

export default Drawer;


