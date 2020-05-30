import React ,{ useState, useEffect } from 'react';
import {View , Text ,StyleSheet,Image,TouchableOpacity} from 'react-native';
import { Card } from 'react-native-elements';
import messaging from '@react-native-firebase/messaging';
import firebase from 'react-native-firebase/';
import { useDispatch, useSelector } from "react-redux";
import {userDevicetoken,fetchJobCategories} from '../redux/stores/actions/register_user';
import {
	StackActions, NavigationActions
} from 'react-navigation';
import { showMessage } from '../Globals/Globals';


const HomeScreen =(props)  => {

    const token = useSelector(state => state.auth.device_token);
    const verify = useSelector(state => state.register.user.verify);
    const post_available =  useSelector(state => state.register.user.jobs_remaining)
    const wallet_balance =  useSelector(state => state.register.user.wallet_balance)
    console.log("wallet_balance",wallet_balance);
    console.log("post _avail",post_available);
    const dispatch =  useDispatch();
   
    const  onTokenRefreshListener =()=>  messaging().onTokenRefresh(fcmToken => {
        // Process your token as required
        if(fcmToken){
          console.log("get fcmtoken123",fcmToken);
            dispatch(userDevicetoken(fcmToken));
        }
    });


    const getNotificationData = (notification,data) => {

        const { title, body } = notification;
        const channelId = new firebase.notifications.Android.Channel(
            'Default',
            'Default',
            firebase.notifications.Android.Importance.High
        );
        firebase.notifications().android.createChannel(channelId);

        let notification_to_be_displayed = new firebase.notifications.Notification({
            data: ata,
            sound: 'default',
            show_in_foreground: true,
            title:  title  ,
            body:  body,
        });

        if (Platform.OS == 'android') {
            notification_to_be_displayed.android
                .setPriority(firebase.notifications.Android.Priority.High)
                .android.setChannelId('Default')
                .android.setVibrate(1000)
                .android.setSmallIcon('ic_launcher');
        }
      
       firebase.notifications().displayNotification(notification_to_be_displayed);

       

      }



    const createNotificationListeners = () => {


        messaging().onMessage(async remoteMessage => {

           console.log("message rece",remoteMessage);
          // alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
          getNotificationData(remoteMessage.notification,remoteMessage.data);
        
         });

         messaging().setBackgroundMessageHandler(async remoteMessage => {
           console.log('Message handled in the background!', remoteMessage);

         
         
   
         });

         const notificationOpened =  messaging().onNotificationOpenedApp(remoteMessage => {
           console.log(
             'Notification caused app to open from background state:',
             remoteMessage,
           );


                let item1 = JSON.parse(remoteMessage.data.result);
                console.log("itemmm111",item1);
                console.log("itemmm222",item1.job_detail);
                let item = item1.job_detail;
                if(item !== null && item !== undefined){

                  
                    // clinic details in users object
                    let clinic = {};
                    if(item.users !== null) {
                        Object.assign(clinic,item.users)
                    }
                    let clinic_requirement =  "";
                    if(item.clinic_requirement !== null){
                        clinic_requirement = item.clinic_requirement;
                    }
                    let job_scope = "";
                    if(item.job_scope !== null){
                        job_scope = item.job_scope;
                    }
                    let city = "";
                    if(item.city !== null){
                        // Object.assign(city,item.job_detail.city)
                        city = item.city.name;
                    }



                    props.navigation.navigate('JobDetails',{"id" :item.id ,
                    "profile" : item.profile.name ,"location": item.job_location,
                    "date" : item.required_date , "description" : item.job_desc , "cid" : item.cid ,
                    "from" : item.from_time , "to" : item.to_time, "job_scope" : job_scope,"clinic_requirement" : clinic_requirement,
                    "rm_hour" :item.rm_hour ,"dayorhour": item.dayorhour,"no_of_applicants" : 1, "state": item.state.name ,
                    "city" : city,

                })

                    // let result = {}
                    // result["id"] = item.job_detail.id //practiiontre_id
                    // result["about"] = ""
                    // result["name"] =  item.job_detail.user_name.name
                    // result["description"] = item.job_detail.job_detail.job_desc 
                    // result["experience"] = item.job_detail.job_detail.exp_required
                    // result["profession"] = ""
                    // result["contact"] = item.job_detail.user_name.mobile
                    // result["email"] = item.job_detail.user_name.email
                    // result["image"] = item.job_detail.user_name.user_image
                    // result["degree"] = item.job_detail.user_name.degree
                    // result['application_status'] = item.job_detail.application_status
                    // result["appid"] = item.job_detail.id //application_id
                    // result['fetch'] = 0 // to function fectch again


                    // result["id"] = item.user_name.id //practiiontre_id
                    // result["about"] =item.user_name.about
                    // result["name"] =  item.user_name.name
                    // result["description"] = item.user_name.description
                    // result["experience"] = item.user_name.experience
                    // result["profession"] = item.user_name.profession
                    // result["contact"] = item.user_name.mobile
                    // result["email"] = item.user_name.email
                    // result["image"] = item.user_name.user_image
                    // result["degree"] = item.user_name.degree
                    // result['application_status'] = item.application_status
                    // result["appid"] = item.id //application_id
                    // result['mmc_no'] = item.user_name.mmc_no,
                    // result['apc_no'] = item.user_name.apc_no,
                    // result['ic_no'] = item.user_name.ic_no,
                    // result['street_1'] = item.user_name.street_1,
                    // result['street_2'] = item.user_name.street_2,
                    // result['city'] = item.user_name.city.name,
                    // result['state'] = item.user_name.state.name,
                    // result['profession'] = item.user_name.profession.name,
                    // result['speciality'] = item.user_name.speciality.name,
                    // result['post_code'] = item.user_name.post_code,
                    // //result['street_2'] = item.user_name.street_2,
                    
                    // result['fetch'] = 1 // to function fectch again

    
                    // props.navigation.navigate('PractitionersDetails', { result: result});
               
                }
          
         });


       
         
   }


    // const  createNotificationListeners = async() => {
    //     /*
    //     * Triggered when a particular notification has been received in foreground
    //     * */
    //     notificationListener = firebase.notifications().onNotification((notification) => {

    //         console.log("notifaication log1",notification);
            
    //         getNotificationData(notification);
    //     });
      
      
    //     messageListener = firebase.messaging().onMessage((message) => {
    //       //process data message

    //       console.log("get message",JSON.stringify(message));
         
    //       getNotificationData(message);
    //     });

         
    //     const notificationOpen = await firebase.notifications().getInitialNotification();

	// 		if (notificationOpen) {
    //          const {  _body ,_data } = notificationOpen.notification;
    //          console.log("_data",_data);
    //          let item = JSON.parse(_data.result);
    //          console.log("itemmm",item);
    //             if(item !== null && item !== undefined){

    //                 let result = {}
    //                 result["id"] = item.job_detail.id //practiiontre_id
    //                 result["about"] = ""
    //                 result["name"] =  item.job_detail.user_name.name
    //                 result["description"] = item.job_detail.job_detail.job_desc 
    //                 result["experience"] = item.job_detail.job_detail.exp_required
    //                 result["profession"] = ""
    //                 result["contact"] = item.job_detail.user_name.mobile
    //                 result["email"] = item.job_detail.user_name.email
    //                 result["image"] = item.job_detail.user_name.user_image
    //                 result["degree"] = item.job_detail.user_name.degree
    //                 result['application_status'] = item.job_detail.application_status
    //                 result["appid"] = item.job_detail.id //application_id
    //                 result['fetch'] = 0 // to function fectch again
    
    //                 props.navigation.navigate('PractitionersDetails', { result: result});
               
    //             }
            
    //         }


    //         notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOp) =>{

    //            console.log("open",notificationOp);
    //             if (notificationOp) {
    //               //  const {  _body ,_data } = notificationOp.notification;
    //                 //console.log("_data notificationOpenedListener",_data);
    //                 // let item = JSON.parse(_data.result);
    //                 // console.log("itemmm",item);
    //                 //    if(item !== null && item !== undefined){
       
    //                 //        let result = {}
    //                 //        result["id"] = item.job_detail.id //practiiontre_id
    //                 //        result["about"] = ""
    //                 //        result["name"] =  item.job_detail.user_name.name
    //                 //        result["description"] = item.job_detail.job_detail.job_desc 
    //                 //        result["experience"] = item.job_detail.job_detail.exp_required
    //                 //        result["profession"] = ""
    //                 //        result["contact"] = item.job_detail.user_name.mobile
    //                 //        result["email"] = item.job_detail.user_name.email
    //                 //        result["image"] = item.job_detail.user_name.user_image
    //                 //        result["degree"] = item.job_detail.user_name.degree
    //                 //        result['application_status'] = item.job_detail.application_status
    //                 //        result["appid"] = item.job_detail.id //application_id
    //                 //        result['fetch'] = 0 // to function fectch again
           
    //                 //        props.navigation.navigate('PractitionersDetails', { result: result});
                      
    //                 //    }
    //             }
    
    //         })
    
            
           
    //         firebase.notifications().removeAllDeliveredNotifications()
    
    //   }


    //   const getNotificationData = (notification) => {

    //     const { _title, _body } = notification;
    //     const channelId = new firebase.notifications.Android.Channel(
    //         'Default',
    //         'Default',
    //         firebase.notifications.Android.Importance.High
    //     );
    //     firebase.notifications().android.createChannel(channelId);

    //     let notification_to_be_displayed = new firebase.notifications.Notification({
    //         data: notification._android._body,
    //         sound: 'default',
    //         show_in_foreground: true,
    //         title: _title,
    //         body: _body,
    //     });

    //     if (Platform.OS == 'android') {
    //         notification_to_be_displayed.android
    //             .setPriority(firebase.notifications.Android.Priority.High)
    //             .android.setChannelId('Default')
    //             .android.setVibrate(1000);
    //     }
      
    //    firebase.notifications().displayNotification(notification_to_be_displayed);

     

    //   }

    

    const getFcmToken =  () => messaging().getToken()
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

                                   if(wallet_balance == 0 && post_available == 0){

                                        showMessage(0,"Please add money and buy packages to post a new job.", 'Home', true, false);

                                    }else if(post_available == 0){

                                        showMessage(0,"Please buy packages to post a new job.", 'Home', true, false);
                
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