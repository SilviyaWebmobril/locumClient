import React ,{useState, useEffect} from 'react';
import {View ,Text, TouchableOpacity,StyleSheet,Image,Alert} from 'react-native';
import {useDispatch , useSelector} from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import MyActivityIndicator from '../CustomUI/MyActivityIndicator';
import {getJobAppliedList,acceptApplication} from '../redux/stores/actions/search_job_action';
import { checkuserAuthentication,logoutUser} from '../redux/stores/actions/auth_action';
import NetInfo from '@react-native-community/netinfo';
import {
	StackActions, NavigationActions
} from 'react-navigation';
import HeaderComponentt from '../CustomUI/HeaderComponentt';
import {showMessage} from '../Globals/Globals';

const PractitionersDetails = (props) => {

	
	const device_token  = useSelector(state => state.auth.device_token)
	const user =  useSelector(state => state.register.user);
	const dispatch = useDispatch();
	const authenticated = useSelector(state =>state.auth.authenticated);
    const id = useState(props.navigation.getParam('result')['id']); // user's id // practitioner
    console.log("idd",id);
    const about  = useState(props.navigation.getParam('result')['about']);
    const name = useState(props.navigation.getParam('result')['name']);
	const description = useState(props.navigation.getParam('result')['description']);
	console.log("des",props.navigation.getParam('result')['mmc_no']);
    const experience = useState(props.navigation.getParam('result')['experience']);
    const profession  = useState(props.navigation.getParam('result')['profession']);
    const contact = useState(props.navigation.getParam('result')['contact']);
    const email =  useState(props.navigation.getParam('result')['email']);
    const image =  useState(props.navigation.getParam('result')['image']);
    const degree =  useState(props.navigation.getParam('result')['degree']);
	const application_status =  useState(props.navigation.getParam('result')['application_status']);
	console.log(application_status);
	const appid = useState(props.navigation.getParam('result')['appid']);
	const loading_status = useSelector(state =>  state.register.loading_status);


    const acceptPractitioner = (id) => {


		NetInfo.isConnected.fetch().then(async isConnected => {
			if (!isConnected) {
				props.navigation.navigate("NoNetwork")
				return;
			} else {

				dispatch(checkuserAuthentication(user.id,device_token))
					.then(response => {
						if(response.data.error){
							showMessage(0, 'Session Expired! Please Login.', 'Practitioners Details', true, false);
							dispatch(logoutUser())
							props.navigation.navigate("Login");
						
							const resetAction = StackActions.reset({
								index: 0,
								key: 'Login',
								actions: [NavigationActions.navigate({ routeName: 'Login' })],
							});
							props.navigation.dispatch(resetAction);
						}else{
							dispatch(acceptApplication(id, 1,props.navigation,0))
						}
				})

				
			}
		});

	}


	const removePractitioner = (id) => {

		NetInfo.isConnected.fetch().then(async isConnected => {
			if (!isConnected) {
				props.navigation.navigate("NoNetwork")
				return;
			} else {

				dispatch(checkuserAuthentication(user.id,device_token))
					.then(response => {
						if(response.data.error){
							showMessage(0, 'Session Expired! Please Login.', 'Practitioners Details', true, false);
							dispatch(logoutUser())
							props.navigation.navigate("Login");
						
							const resetAction = StackActions.reset({
								index: 0,
								key: 'Login',
								actions: [NavigationActions.navigate({ routeName: 'Login' })],
							});
							props.navigation.dispatch(resetAction);
						}else{
							dispatch(acceptApplication(id, 2,props.navigation,0))
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

	if(loading_status){
        return(<MyActivityIndicator />)
    }

	
    return(
        <KeyboardAwareScrollView>
            <View style={{flex: 1,marginLeft:10,marginTop:20}}>
						<View style={{ margin: 5, justifyContent: 'space-between' ,marginTop:20}}>
							<Text style={{fontFamily:"roboto-light",  fontWeight: "bold" }}>Email ID</Text>
							<Text style={{fontFamily:"roboto-light",  color: 'black', fontSize: 15 }}>{email}</Text>
						</View>
						<View style={{ margin: 5, justifyContent: 'space-between' }}>
							<Text style={{fontFamily:"roboto-light",  fontWeight: "bold" }}>Contact</Text>
							<Text style={{fontFamily:"roboto-light",  color: 'black', fontSize: 15 }}>{contact}</Text>
						</View>
						
						<View style={{ margin: 5, justifyContent: 'space-between', }}>
							<Text style={{fontFamily:"roboto-light",  fontWeight: "bold" }}>Profession</Text>
							<Text style={{fontFamily:"roboto-light",  color: 'black', fontSize: 15 }}>{props.navigation.getParam('result')['profession']}</Text>
						</View>
						<View style={{ margin: 5, justifyContent: 'space-between', }}>
							<Text style={{fontFamily:"roboto-light",  fontWeight: "bold" }}>Speciality</Text>
							<Text style={{fontFamily:"roboto-light",  color: 'black', fontSize: 15 }}>{props.navigation.getParam('result')['speciality']}</Text>
						</View>

						<View style={{ margin: 5, justifyContent: 'space-between', }}>
							<Text style={{fontFamily:"roboto-light",  fontWeight: "bold" }}>Qualifications</Text>
							<Text style={{fontFamily:"roboto-light",  color: 'black', fontSize: 15 }}>{degree}</Text>
						</View>
						<View style={{ margin: 5, justifyContent: 'space-between', }}>
							<Text style={{fontFamily:"roboto-light",  fontWeight: "bold" }}>Country</Text>
							<Text style={{fontFamily:"roboto-light",  color: 'black', fontSize: 15 }}>Malaysia</Text>
						</View>
						<View style={{ margin: 5, justifyContent: 'space-between', }}>
							<Text style={{fontFamily:"roboto-light",  fontWeight: "bold" }}>State</Text>
							<Text style={{fontFamily:"roboto-light",  color: 'black', fontSize: 15 }}>{props.navigation.getParam('result')['state']}</Text>
						</View>
						<View style={{ margin: 5, justifyContent: 'space-between', }}>
							<Text style={{fontFamily:"roboto-light",  fontWeight: "bold" }}>City</Text>
							<Text style={{fontFamily:"roboto-light",  color: 'black', fontSize: 15 }}>{props.navigation.getParam('result')['city']}</Text>
						</View>
						<View style={{ margin: 5, justifyContent: 'space-between', }}>
							<Text style={{fontFamily:"roboto-light",  fontWeight: "bold" }}>Street 1</Text>
							<Text style={{fontFamily:"roboto-light",  color: 'black', fontSize: 15 }}>{props.navigation.getParam('result')['street_1']}</Text>
						</View>
						<View style={{ margin: 5, justifyContent: 'space-between', }}>
							<Text style={{fontFamily:"roboto-light",  fontWeight: "bold" }}>Street 2</Text>
							<Text style={{fontFamily:"roboto-light",  color: 'black', fontSize: 15 }}>{props.navigation.getParam('result')['street_2']}</Text>
						</View>
						<View style={{ margin: 5, justifyContent: 'space-between', }}>
							<Text style={{fontFamily:"roboto-light",  fontWeight: "bold" }}>Postcode</Text>
							<Text style={{fontFamily:"roboto-light",  color: 'black', fontSize: 15 }}>{props.navigation.getParam('result')['post_code']}</Text>
						</View>
						<View style={{ margin: 5, justifyContent: 'space-between', }}>
							<Text style={{fontFamily:"roboto-light",  fontWeight: "bold" }}>MMC/MDC/NBM/PBM Number</Text>
							<Text style={{fontFamily:"roboto-light",  color: 'black', fontSize: 15 }}>{props.navigation.getParam('result')['mmc_no']}</Text>
						</View>

						<View style={{ margin: 5, justifyContent: 'space-between' }}>
							<Text style={{fontFamily:"roboto-light",  fontWeight: "bold" }}>Valid APC Number</Text>
							<Text style={{fontFamily:"roboto-light",  color: 'black', fontSize: 15 }}>{props.navigation.getParam('result')['apc_no']}</Text>
						</View>

						<View style={{ margin: 5, justifyContent: 'space-between' }}>
							<Text style={{fontFamily:"roboto-light",  fontWeight: "bold" }}>IC Number</Text>
							<Text style={{fontFamily:"roboto-light",  color: 'black', fontSize: 15 }}>{props.navigation.getParam('result')['ic_no']}</Text>
						</View>
						<View style={{ margin: 5, justifyContent: 'space-between' }}>
							<Text style={{fontFamily:"roboto-light",  fontWeight: "bold" }}>Experience</Text>
							<Text style={{fontFamily:"roboto-light",  color: 'black', fontSize: 15 }}>{experience}</Text>
						</View>
					

						<View style={{ marginLeft: 10, marginTop: 0, marginBottom: 10, justifyContent: 'space-between' }}>
							<Text style={{fontFamily:"roboto-light",  fontWeight: "bold" }}>Description</Text>
							<Text style={{fontFamily:"roboto-light",  color: 'black', fontSize: 15 }}>{description}</Text>
						</View>

						{application_status[0] == 0
							?
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
								<TouchableOpacity onPress={()=>onAcceptAlert(appid[0])}
									style={{ width: '40%', borderRadius: 10, borderWidth: 2, borderColor: '#686BE4', backgroundColor: 'white', margin: 10 }}>
									<Text style={{ fontFamily:"roboto-light", textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#686BE4', margin: 15 }}>Accept</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={()=>onRemoveAlert(appid[0])}
									style={{ width: '40%', borderRadius: 10, borderWidth: 1, borderColor: '#686BE4', backgroundColor: '#686BE4', margin: 10, alignSelf: 'flex-end' }}>
									<Text style={{ fontFamily:"roboto-light", textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: 'white', margin: 15 }}>Reject</Text>
								</TouchableOpacity>
							</View>

							:
							(application_status[0] == 1
								?
								<Text style={{fontFamily:"roboto-bold",  fontSize: 17, marginLeft: 10,  marginTop: 5, color: "#5AA86C", }}>Approved</Text>
								:
								<Text style={{fontFamily:"roboto-bold",  fontSize: 17, marginLeft: 10, marginTop: 5, color: "red", }}>Rejected</Text>
							)
						}

            </View>
        </KeyboardAwareScrollView>
	)
	
	
	
}

PractitionersDetails.navigationOptions = (props) => ({
	header :  <HeaderComponentt 
					name={props.navigation.getParam('result')['name']} 
					user_image={props.navigation.getParam('result')['image']} 
					{...props} />
})





export default PractitionersDetails;