import React ,{ useState, useEffect } from 'react';
import {View , Text ,StyleSheet,Image,TouchableOpacity} from 'react-native';
import { Card } from 'react-native-elements';
import firebase from 'react-native-firebase/';
import { useDispatch, useSelector } from "react-redux";
import {userDevicetoken,fetchJobCategories} from '../redux/stores/actions/register_user';
import {
	StackActions, NavigationActions
} from 'react-navigation';
import { showMessage } from '../Globals/Globals';


const HomeScreen =(props)  => {

    const token = useSelector(state => state.auth.device_token);
    const post_available =  useSelector(state => state.register.user.jobs_remaining)
    const wallet_balance =  useSelector(state => state.register.user.wallet_balance)
    console.log("wallet_balance",wallet_balance);
    console.log("post _avail",post_available);
    const dispatch =  useDispatch();
   
    const  onTokenRefreshListener =()=>  firebase.messaging().onTokenRefresh(fcmToken => {
        // Process your token as required
        if(fcmToken){
          console.log("get fcmtoken123",fcmToken);
            dispatch(userDevicetoken(fcmToken));
        }
    });

    const  createNotificationListeners = async() => {
        /*
        * Triggered when a particular notification has been received in foreground
        * */
        notificationListener = firebase.notifications().onNotification((notification) => {

            console.log("notifaication log1",notification);
            
            getNotificationData(notification);
        });
      
      
        messageListener = firebase.messaging().onMessage((message) => {
          //process data message

          console.log("get message",JSON.stringify(message));
         
          getNotificationData(message);
        });

         
        const notificationOpen = await firebase.notifications().getInitialNotification();

			if (notificationOpen) {
             const {  _body ,_data } = notificationOpen.notification;
             console.log("_data",_data);
             let item = JSON.parse(_data.result);
             console.log("itemmm",item);
                if(item !== null && item !== undefined){

                    let result = {}
                    result["id"] = item.job_detail.id //practiiontre_id
                    result["about"] = ""
                    result["name"] =  item.job_detail.user_name.name
                    result["description"] = item.job_detail.job_detail.job_desc 
                    result["experience"] = item.job_detail.job_detail.exp_required
                    result["profession"] = ""
                    result["contact"] = item.job_detail.user_name.mobile
                    result["email"] = item.job_detail.user_name.email
                    result["image"] = item.job_detail.user_name.user_image
                    result["degree"] = item.job_detail.user_name.degree
                    result['application_status'] = item.job_detail.application_status
                    result["appid"] = item.job_detail.id //application_id
                    result['fetch'] = 0 // to function fectch again
    
                    props.navigation.navigate('PractitionersDetails', { result: result});
               
                }
            
            }


            notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOp) =>{

               console.log("open",notificationOp);
                if (notificationOp) {
                  //  const {  _body ,_data } = notificationOp.notification;
                    //console.log("_data notificationOpenedListener",_data);
                    // let item = JSON.parse(_data.result);
                    // console.log("itemmm",item);
                    //    if(item !== null && item !== undefined){
       
                    //        let result = {}
                    //        result["id"] = item.job_detail.id //practiiontre_id
                    //        result["about"] = ""
                    //        result["name"] =  item.job_detail.user_name.name
                    //        result["description"] = item.job_detail.job_detail.job_desc 
                    //        result["experience"] = item.job_detail.job_detail.exp_required
                    //        result["profession"] = ""
                    //        result["contact"] = item.job_detail.user_name.mobile
                    //        result["email"] = item.job_detail.user_name.email
                    //        result["image"] = item.job_detail.user_name.user_image
                    //        result["degree"] = item.job_detail.user_name.degree
                    //        result['application_status'] = item.job_detail.application_status
                    //        result["appid"] = item.job_detail.id //application_id
                    //        result['fetch'] = 0 // to function fectch again
           
                    //        props.navigation.navigate('PractitionersDetails', { result: result});
                      
                    //    }
                }
    
            })
    
            
           
            firebase.notifications().removeAllDeliveredNotifications()
    
      }


      const getNotificationData = (notification) => {

        const { _title, _body } = notification;
        const channelId = new firebase.notifications.Android.Channel(
            'Default',
            'Default',
            firebase.notifications.Android.Importance.High
        );
        firebase.notifications().android.createChannel(channelId);

        let notification_to_be_displayed = new firebase.notifications.Notification({
            data: notification._android._body,
            sound: 'default',
            show_in_foreground: true,
            title: _title,
            body: _body,
        });

        if (Platform.OS == 'android') {
            notification_to_be_displayed.android
                .setPriority(firebase.notifications.Android.Priority.High)
                .android.setChannelId('Default')
                .android.setVibrate(1000);
        }
      
       firebase.notifications().displayNotification(notification_to_be_displayed);

     

      }

    

    const getFcmToken =  () => firebase.messaging().getToken()
    .then(fcmToken => {
        if (fcmToken) {
            dispatch(userDevicetoken(fcmToken));
            
        } else {
            console.log("get fcmtoken111");
            
            onTokenRefreshListener();
        } 
    })

    useEffect(() => {

        console.log("get fcmtoken123ss");
       
        onTokenRefreshListener();
        if(token === null){
          
            getFcmToken();
        }
        createNotificationListeners();
       
        return () => {
            createNotificationListeners();
            onTokenRefreshListener();
        };

    },[]);

  
    return (
        
        // <View style={styles.container}>
          
        <View style={styles.container}>
           <Image source={require('../assets/clinic/banner.jpg')}  style={styles.bannerImage} /> 
           
               
           <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
							<Card containerStyle={{flex:1.5 ,height:null}}>
								<TouchableOpacity onPress={() => {
                                    if(post_available == 0 && wallet_balance == 0){

                                        showMessage(0,"Please add money and buy packages to post a new job.", 'Profile', true, false);

                                    }else{
                                        props.navigation.navigate("SearchJob")
                                    }
                                  
                                    }}>
									<View style={{ justifyContent: 'center', alignItems: 'center' }}>
										<Image style={{ width: 40, height: 40 }} source={require('../assets/clinic/1.png')} />
										<Text style={{fontFamily:"Roboto-Light", fontWeight: 'bold', fontSize: 18, color: 'black' }}>Add Post</Text>
									</View>
								</TouchableOpacity>
							</Card>
							<Card containerStyle={{flex:1.5 ,height:null}}>
                                <TouchableOpacity onPress={() =>{ props.navigation.navigate("JobList");
                                const resetAction = StackActions.reset({
                                    index: 0,
                                    key: 'JobList',
                                    actions: [NavigationActions.navigate({ routeName: 'JobList' })],
                                });
                                props.navigation.dispatch(resetAction);
                                }}>
									<View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
										<Image style={{ width: 40, height: 40 }} source={require('../assets/clinic/2.png')} />
										<Text style={{fontFamily:"Roboto-Light", fontWeight: 'bold', fontSize: 18, color: 'black' }}>Listings</Text>
									</View>
								</TouchableOpacity>
							</Card>
						</View>


						<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',flex:0.3, }}>
							<Card containerStyle={{flex:1.5 ,height:null}}>
								<TouchableOpacity onPress={()=>{props.navigation.navigate("FrequentlyAskedQues")
									const resetAction = StackActions.reset({
										index: 0,
										key: 'FrequentlyAskedQues',
										actions: [NavigationActions.navigate({ routeName: 'FrequentlyAskedQues' })],
									});
									props.navigation.dispatch(resetAction);}}>
									<View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', marginLeft: 3, marginRight: 3 }}>
										<Image style={{ width: 40, height: 40 }} source={require('../assets/clinic/3.png')} />
										<Text style={{ fontFamily:"roboto-light",fontWeight: 'bold', fontSize: 18, color: 'black' }}>FAQs</Text>
									</View>
								</TouchableOpacity>
							</Card>
							<Card containerStyle={{flex:1.5 ,height:null}}>
								<TouchableOpacity onPress={() => props.navigation.navigate("ContactAdmin")}>
									<View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
										<Image style={{ width: 40, height: 40 }} source={require('../assets/clinic/4.png')} />
										<Text style={{fontFamily:"roboto-light", fontWeight: 'bold', fontSize: 18, color: 'black' }}>Feedback</Text>
									</View>
								</TouchableOpacity>
							</Card>
					
           </View>
        
        </View>
    )
}


const styles = StyleSheet.create({

    container :{ 
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        flex:1
    },

    bannerImage : {
        width: '100%', 
        height:null,
        flex:0.4
     
    },
    viewRow:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        flex:1

    },
    cardContainerStyle:{
        width:'40%',
        height:null,
        paddingTop:20,
        paddingBottom:20,
        elevation:5,
        borderColor:'#a7bbfa',
        alignItems:'center',
        justifyContent:"center"
    },
    imageStyle:{
        width:60,
        height:60,
        alignSelf:'center'
    },
    textStyle:{
        alignSelf:'center',
        fontSize:17,
        fontFamily:'roboto-bold',
        alignSelf:'center'
    }
})

export default HomeScreen ;