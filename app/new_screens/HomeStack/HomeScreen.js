import React ,{ useState, useEffect } from 'react';
import {View , Text ,StyleSheet,Image,TouchableOpacity} from 'react-native';
import { Card } from 'react-native-elements';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { useDispatch, useSelector } from "react-redux";
import {fetchJobCategories,upadetUserData,updateUserId, showSpinner, hideSpinner} from '../redux/stores/actions/register_user';
import {
	StackActions, NavigationActions
} from 'react-navigation';
import {userDevicetoken,} from '../redux/stores/actions/auth_action';
import { showMessage } from '../Globals/Globals';
import Axios from 'axios';
import ApiUrl from '../Globals/ApiUrl';
import MyActivityIndicator from '../CustomUI/MyActivityIndicator';
import PushNotificaton from './PushNotificaton';
import {Notifications} from 'react-native-notifications';
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen =(props)  => {

    const token = useSelector(state => state.auth.device_token);
    const user = useSelector(state => state.register.user);
    const verify = useSelector(state => state.register.user.verify);
    const post_available =  useSelector(state => state.register.user.jobs_remaining)
    const wallet_balance =  useSelector(state => state.register.user.wallet_balance)
    console.log("wallet_balance",wallet_balance);
    console.log("post _avail",post_available);
    const loading_status = useSelector(state => state.register.loading_status);

    const dispatch =  useDispatch();
   
    async function checkApplicationPermission () {
        const authorizationStatus = await messaging().requestPermission()
    
        if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
          getToken()
        } else if ( authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL ) {
          requestUserPermission()
        } else {
        }
      }
    
      async function getToken () {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        // console.log("fcmToken", fcmToken);
        if (!fcmToken) {
          fcmToken = await firebase.messaging().getToken()
          console.log("fcmToken", fcmToken);
          if (fcmToken) {
            dispatch(userDevicetoken(fcmToken));
            // await saveFcmToken({fcm_token: fcmToken}, user.userId);
          }
        }
       
      }

      async function requestUserPermission () {
        const authorizationStatus = await messaging().requestPermission()
    
        if (authorizationStatus) {
          getToken()
        }
      }
      

   
    useEffect(() => {
        checkApplicationPermission()
        dispatch(showSpinner())
        console.log("get fcmtoken123ss");
        Axios.post(ApiUrl.base_url+"home?user_id="+user.id)
        .then(response =>{

            dispatch(hideSpinner())
            if(response.data.status){
                
                // console.log("respone",response.data)
                dispatch(updateUserId(response));
                dispatch(upadetUserData(response));
            }else{
                console.log("error in else");
            }
        })
        .catch(error => {
            console.log(error);
            showMessage(0,"Something went wrong ! Please try again later.", 'Home', true, false);

        });


          // Assume a message-notification contains a "type" property in the data payload of the screen to open
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('on notification Message Sync '+JSON.stringify(remoteMessage))
        // console.log('on notification Message Sync '+remoteMessage)
  
        if(Platform.OS=='ios'){
  
            Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
              console.log("Notification Received - Foreground", notification.payload);
        
              // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
             completion({alert: true, sound: true, badge: false});
            });
              console.log("Into ABC====>", remoteMessage);
  
         
              Notifications.events().registerNotificationReceivedBackground((notification, completion) => {
                console.log("Notification Received - Background", notification.payload);
          
                // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
                
                completion({alert: true, sound: true, badge: false});
              });
              

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
          
                     
      
                      Notifications.postLocalNotification({
                          title: remoteMessage.notification.title,
                          body: remoteMessage.notification.body,
                          data:{
                              item1
                          },
                          silent: false,
                          category: "SOME_CATEGORY",
                          userInfo: { }
                        });
          
                }
             
            
            
    
        
  
        
        }else{
          console.log('on notification Message Sync ',remoteMessage.data);
  
             
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
      
                 
  
                  Notifications.postLocalNotification({
                      title: remoteMessage.notification.title,
                      body: remoteMessage.notification.body,
                      data:{
                          item1
                      },
                      silent: false,
                      category: "SOME_CATEGORY",
                      userInfo: { }
                    });
      
               }
         
        }
        
    
        Notifications.events().registerNotificationOpened((notification, completion) => {
          console.log(`Notification opened: `+JSON.stringify(notification.payload));
         
          // console.log(`Notification opened: `+JSON.stringify(notification));
          const myRemote = remoteMessage.data.result;
  
          let item1 = JSON.parse(myRemote);
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
          }
  
          //completion();
        });
      })
     
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('on notification Open HEY'+JSON.stringify(remoteMessage));
        const myRemote = remoteMessage.data.result;
  
        let item1 = JSON.parse(myRemote);
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
        }
  
      })
  
      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if(remoteMessage !== null && remoteMessage !== undefined){
  
            console.log('Initial notification '+JSON.stringify(remoteMessage));
  
            const myRemote = remoteMessage.data.result;
     
             let item1 = JSON.parse(myRemote);
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
             }
            
          }
         
          //setLoading(false)
        })
      return unsubscribe
       
    

    },[]);


    if(loading_status){

        return <MyActivityIndicator /> 
    }


  
    return (
        
        // <View style={styles.container}>
          
        <View style={styles.container}>
            {/* <PushNotificaton {...props}/> */}
           {/* <Image source={require('../assets/clinic/banner.jpg')}  style={styles.bannerImage} />  */}

           <View style={styles.viewRow}>
                <Card  containerStyle={styles.cardContainerStyle}>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('Packages');
                    //below is used to reset stacki navigator so that goes infirst screen only
                    const resetAction = StackActions.reset({
                        index: 0,
                        key: 'Packages',
                        actions: [NavigationActions.navigate({ routeName: 'Packages' })],
                    })}}>
                            <Image style={styles.imageStyle1} source={require('../assets/doctor/package.png')} />
                            <Text style={styles.textStyle}>Buy Packages</Text>
                    </TouchableOpacity>
                </Card>
                <Card  containerStyle={styles.cardContainerStyle}>
                    <TouchableOpacity onPress={() => 
                   { props.navigation.navigate('Wallet');
                    //below is used to reset stacki navigator so that goes infirst screen only
                    const resetAction = StackActions.reset({
                        index: 0,
                        key: 'Wallet',
                        actions: [NavigationActions.navigate({ routeName: 'Wallet' })],
                    });
                    props.navigation.dispatch(resetAction);
                    }}
                    >
                            <Image style={styles.imageStyle1} source={require('../assets/doctor/package.png')} />
                            <Text style={styles.textStyle}>Wallet</Text>
                    </TouchableOpacity>
                </Card>
           
             </View>  
                    <View style={styles.viewRow}>


							<Card  containerStyle={styles.cardContainerStyle}>
								<TouchableOpacity onPress={() => {

                                    if(verify == 0){
                                        showMessage(0,"Your account is under inspection by admin. Please wait !", 'Home', true, false);
                                        return;
                                    }
                                    
                                   if(wallet_balance == 0 && post_available == 0){

                                        showMessage(0,"Please add money and buy packages to post a new job.", 'Home', true, false);

                                    }else if(post_available == 0){

                                        showMessage(0,"Please buy packages to post a new job.", 'Home', true, false);
                
                                    }else{
                                        props.navigation.navigate("SearchJob")
                                    }
                                  
                                    }}>
										<Image style={styles.imageStyle1} source={require('../assets/clinic/1.png')} />
										<Text style={styles.textStyle}>Add Post</Text>
								</TouchableOpacity>
							</Card>
							<Card  containerStyle={styles.cardContainerStyle}>
                                <TouchableOpacity onPress={() =>{ props.navigation.navigate("JobList");
                                const resetAction = StackActions.reset({
                                    index: 0,
                                    key: 'JobList',
                                    actions: [NavigationActions.navigate({ routeName: 'JobList' })],
                                });
                                props.navigation.dispatch(resetAction);
                                }}>
										<Image style={styles.imageStyle1} source={require('../assets/clinic/2.png')} />
										<Text style={styles.textStyle}>Listings</Text>
								</TouchableOpacity>
							</Card>
						</View>


						<View style={styles.viewRow}>
							<Card  containerStyle={styles.cardContainerStyle}>
								<TouchableOpacity onPress={()=>{props.navigation.navigate("FrequentlyAskedQues")
									const resetAction = StackActions.reset({
										index: 0,
										key: 'FrequentlyAskedQues',
										actions: [NavigationActions.navigate({ routeName: 'FrequentlyAskedQues' })],
									});
									props.navigation.dispatch(resetAction);}}>
										<Image style={styles.imageStyle1} source={require('../assets/clinic/3.png')} />
										<Text style={styles.textStyle}>FAQs</Text>
								</TouchableOpacity>
							</Card>
							<Card containerStyle={styles.cardContainerStyle}>
								<TouchableOpacity onPress={() => props.navigation.navigate("ContactAdmin")}>
										<Image style={styles.imageStyle1} source={require('../assets/clinic/4.png')} />
										<Text style={styles.textStyle}>Feedback</Text>
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
        //flex:1

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
    imageStyle1:{
        width:50,
        height:50,
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