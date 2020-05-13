import React ,{useState ,useEffect} from 'react';
import {View ,Text ,TouchableOpacity ,FlatList,StyleSheet,Image,Alert} from 'react-native';
import {Card} from 'react-native-elements';
import {useDispatch ,useSelector}  from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import MyActivityIndicator from '../CustomUI/MyActivityIndicator';
import {getJobAppliedList,acceptApplication} from '../redux/stores/actions/search_job_action';
import { checkuserAuthentication,logoutUser} from '../redux/stores/actions/auth_action';
import NetInfo from '@react-native-community/netinfo';
import ApiUrl from '../Globals/ApiUrl';
import {
	StackActions, NavigationActions
} from 'react-navigation';
import {showMessage } from '../Globals/Globals';

const PractionersList = (props) => { 

	const user_id = useSelector(state => state.register.user.id);
	const device_token  = useSelector(state => state.auth.device_token)
	const practioners_list = useSelector(state => state.search_job.applied_users);
	console.log("list",practioners_list);
    const loading_status = useSelector(state =>state.register.loading_status);
	const job_id = useState(props.navigation.getParam('job_id'));
	const authenticated = useSelector(state =>state.auth.authenticated);
    console.log("jobid ",job_id[0]);

    const dispatch = useDispatch();

    useEffect(() => {
		
		dispatch(checkuserAuthentication(user_id,device_token))
			.then(response => {
				if(response.data.error){
					showMessage(0, 'Session Expired! Please Login.', 'Practitioners List', true, false);
					dispatch(logoutUser())
                    props.navigation.navigate("Login");
                   
                    const resetAction = StackActions.reset({
                        index: 0,
                        key: 'Login',
                        actions: [NavigationActions.navigate({ routeName: 'Login' })],
                    });
                    props.navigation.dispatch(resetAction);
				}else{
					dispatch(getJobAppliedList(user_id, job_id[0]));
				}
			})
       
        return () => {
            //cleanup
        }
    }, []);

    const fetchAgain = () => {

		dispatch(checkuserAuthentication(user_id,device_token))
			.then(response => {
				if(response.data.error){

					showMessage(0, 'Session Expired! Please Login.', 'Practitioners List', true, false);
					dispatch(logoutUser())
                    props.navigation.navigate("Login");
                   
                    const resetAction = StackActions.reset({
                        index: 0,
                        key: 'Login',
                        actions: [NavigationActions.navigate({ routeName: 'Login' })],
                    });
                    props.navigation.dispatch(resetAction);
				}else{
					dispatch(getJobAppliedList(user_id, job_id[0]));
				}
			})
       
       
    }
 

    const acceptPractitioner = (id) => {


		NetInfo.isConnected.fetch().then(async isConnected => {
			if (!isConnected) {
				this.props.navigation.navigate("NoNetwork")
				return;
			} else {

				dispatch(checkuserAuthentication(user_id,device_token))
				.then(response => {
					if(response.data.error){

						showMessage(0, 'Session Expired! Please Login.', 'Practitioners List', true, false);
						dispatch(logoutUser())
						props.navigation.navigate("Login");
					
						const resetAction = StackActions.reset({
							index: 0,
							key: 'Login',
							actions: [NavigationActions.navigate({ routeName: 'Login' })],
						});
						props.navigation.dispatch(resetAction);
					}else{
						dispatch(acceptApplication(id, job_id[0], 1,props.navigation,1))
					}
				})

				
			}
		});

	}


	const removePractitioner = (id) => {

		NetInfo.isConnected.fetch().then(async isConnected => {
			if (!isConnected) {
				this.props.navigation.navigate("NoNetwork")
				return;
			} else {

				dispatch(checkuserAuthentication(user_id,device_token))
				.then(response => {
					if(response.data.error){

						showMessage(0, 'Session Expired! Please Login.', 'Practitioners List', true, false);
						dispatch(logoutUser())
						props.navigation.navigate("Login");
					
						const resetAction = StackActions.reset({
							index: 0,
							key: 'Login',
							actions: [NavigationActions.navigate({ routeName: 'Login' })],
						});
						props.navigation.dispatch(resetAction);
					}else{
						// last parameter to check passing from list or details , to refresh the UI =  1 , 
						dispatch(acceptApplication(id, 2,props.navigation,1))
					}
				})

				
				
			}
		});


	}



	const onRemoveAlert = (key) => {

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
					onPress: () => {removePractitioner(key)}
				}
			],
			{
				cancelable: false
			}
		);
	}

	const onAcceptAlert = (key) => {

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
					onPress: () => {acceptPractitioner(key)}
				}
			],
			{
				cancelable: false
			}
		);
	}

    const nextDetails = (item) => {

        let result = {}
        result["id"] = item.user_name.id //practiiontre_id
        result["about"] =item.user_name.about
        result["name"] =  item.user_name.name
        result["description"] = item.user_name.description
        result["experience"] = item.user_name.experience
        result["profession"] = item.user_name.profession
        result["contact"] = item.user_name.mobile
        result["email"] = item.user_name.email
        result["image"] = item.user_name.user_image
        result["degree"] = item.user_name.degree
        result['application_status'] = item.application_status
		result["appid"] = item.id //application_id
		result['mmc_no'] = item.user_name.mmc_no,
		result['apc_no'] = item.user_name.apc_no,
		result['ic_no'] = item.user_name.ic_no,
		result['street_1'] = item.user_name.street_1,
		result['street_2'] = item.user_name.street_2,
		result['city'] = item.user_name.city.name,
		result['state'] = item.user_name.state.name,
		result['profession'] = item.user_name.profession.name,
		result['speciality'] = item.user_name.speciality.name,
		result['post_code'] = item.user_name.post_code,
		//result['street_2'] = item.user_name.street_2,
		
		result['fetch'] = 1 // to function fectch again

        props.navigation.navigate('PractitionersDetails', { result: result, fetch: fetchAgain });

    }

    if(loading_status){
        return(<MyActivityIndicator />)
    }

    return(
        <KeyboardAwareScrollView>
            <View style={styles.container}>

            {practioners_list.length > 0
						?
						// <KeyboardAwareScrollView style={{ paddingBottom: 15 }}>
							<View style={{ padding: 1 }}>
								<FlatList
									style={{ marginBottom: 20, width: '100%' }}
									data={practioners_list}
									showsVerticalScrollIndicator={false}
									scrollEnabled={false}
									renderItem={({ item }) =>

                                        <TouchableOpacity onPress={() => {console.log(item);nextDetails(item)}}
                                        >
											<View style={{ width: '100%' }}>
												<Card containerStyle={{ padding: 10, borderRadius: 5, width: '95%', alignSelf: "center" }} >
													<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
														<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
															{(item.user_name.image == "" || item.user_name.user_image == null)
																?
																<Image source={require('../assets/doctor/avatar1.png')} style={{ height: 50, width: 50, borderRadius: 50 / 2, marginRight: 10 }} />
																:
																<Image source={{ uri:ApiUrl.image_url + item.user_name.user_image }} style={{ height: 50, width: 50, borderRadius: 50 / 2, marginRight: 10 }} />
															}



															<View style={{ justifyContent: 'space-around', alignItems: 'flex-start', marginLeft: 5, marginRight: 10 }}>
																<Text style={{fontFamily:"roboto-light",  color: 'black', fontSize: 15, }}>{item.user_name.name}</Text>
																<Text style={{fontFamily:"roboto-light", width:170, }}>{item.user_name.description}</Text>
															</View>

														</View>

														{item.application_status == 0
															?
															<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                                                <TouchableOpacity onPress={() => { onAcceptAlert(item.id) }}
                                                                >
																	<Image source={require('../assets/clinic/accept.jpg')} style={{ height: 25, width: 25, marginRight: 5 }} />
																</TouchableOpacity>
																<TouchableOpacity onPress={() => {
																	onRemoveAlert(item.id)
																	
																}}>
																	<Image source={require('../assets/clinic/reject.jpg')} style={{ height: 25, width: 25 }} />
																</TouchableOpacity>
															</View>

															:
															(item.application_status == 1
																?
																<Text style={{fontFamily:"roboto-bold",  fontSize: 13, marginBottom: 10,  marginTop: 5, color: "#5AA86C", textAlign: "center" }}>Approved</Text>
																:
																<Text style={{fontFamily:"roboto-bold",  fontSize: 13, marginBottom: 10, marginTop: 5, color: "red", textAlign: "center" }}>Rejected</Text>
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
						// </KeyboardAwareScrollView>
						:
						<Text style={{fontFamily:"roboto-light",  textAlign: "center", justifyContent: "center", flex: 1, marginTop: 20, fontSize: 14 }}>No Practitioners Applied.</Text>
					}

            </View>
        </KeyboardAwareScrollView>
    )



}

export default PractionersList;
const styles = StyleSheet.create({
    container: {
		flex: 1,
		backgroundColor: 'white',

	},


});

