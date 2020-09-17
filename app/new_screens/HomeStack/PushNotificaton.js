import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging'
import firebase from '@react-native-firebase/app'
import AsyncStorage from '@react-native-community/async-storage';
import {Notifications} from 'react-native-notifications';
import {userDevicetoken,fetchJobCategories,} from '../redux/stores/actions/auth_action';
import { useDispatch, useSelector } from "react-redux";
import {updateRemainingJobs} from '../redux/stores/actions/packages_coupon_action'

export default PushNotification =  (props) => {

    const dispatch =  useDispatch();
  useEffect(()=>{
    checkApplicationPermission();
  }, [])
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
    console.log("fcmToken", fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken()
      console.log("fcmToken", fcmToken);
      if (fcmToken) {
        dispatch(userDevicetoken(fcmToken));
        // await saveFcmToken({fcm_token: fcmToken}, user.userId);
      }
    }
    global.fcmToken = fcmToken

  }

  async function requestUserPermission () {
    const authorizationStatus = await messaging().requestPermission()

    if (authorizationStatus) {
      getToken()
    }
  }
  
  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('on notification Message Sync '+JSON.stringify(remoteMessage))
      // console.log('on notification Message Sync '+remoteMessage)

      if(Platform.OS=='ios'){

          Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
            console.log("Notification Received - Foreground", notification.payload);
      
            // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
          // completion({alert: true, sound: true, badge: false});
          });
            console.log("Into ABC====>", remoteMessage);

       
            Notifications.events().registerNotificationReceivedBackground((notification, completion) => {
              console.log("Notification Received - Background", notification.payload);
        
              // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
              
             // completion({alert: true, sound: true, badge: false});
            });
            
  
      

      
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
        if(remoteMessage !== null){

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
  }, [])
  return <></>
}