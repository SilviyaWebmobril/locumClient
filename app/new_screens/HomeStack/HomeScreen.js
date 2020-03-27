import React ,{ useState, useEffect } from 'react';
import {View , Text ,StyleSheet,Image,TouchableOpacity} from 'react-native';
import { Card } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { useDispatch, useSelector } from "react-redux";
import {userDevicetoken,fetchJobCategories} from '../redux/stores/actions/register_user';
import {
	StackActions, NavigationActions
} from 'react-navigation';


const HomeScreen =(props)  => {

    const token = useSelector(state => state.auth.device_token);
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
       console.log('FOREGROUND NOTIFICATION LISTENER: \n', notification_to_be_displayed);

    //    const notification_to_be_displayed = new firebase.notifications.Notification()
    //         .setNotificationId('notificationId')
    //         .setTitle(notification.data.title)
    //         .setBody(notification.data.body)
    //         .setData(notification.data);

    //         notification_to_be_displayed.android
    //         .setChannelId('test-channel')
    //         .android.setSmallIcon('ic_launcher');

       firebase.notifications().displayNotification(notification_to_be_displayed);

      console.log("notification.data.status",notification.data.status);
        // if(notification.data.status == 'true'){

        //     this.razorPayCheckout();
        // }else{

        //     this.props.changeAvailabilityStatus();
        //     Alert.alert(
        //         'Verify Address',
        //         'Sorry for the inconvience. This address is not available ,try using another address.',
        //         [
             
               
        //         {text: 'Ok', onPress: () => console.log("ok")},
        //         ], 
        //         { cancelable: false }
        //         )
        // }

        displayNotification = (notification) => {
            console.log("on dispaly notification")
          if (Platform.OS === 'android') {
              const localNotification = new firebase.notifications.Notification({
                  sound: 'default',
                  show_in_foreground: true,
              }).setNotificationId(notification._from)
              .setTitle(notification._data.title)
              .setSubtitle(notification.subtitle)
              .setBody(notification._data.content)
              .setData(notification.data)
                  .android.setChannelId('notification_channel_name') // e.g. the id you chose above
                  .android.setSmallIcon('logo') // create this icon in Android Studio
                  .android.setColor('#D3D3D3') // you can set a color here
                  .android.setPriority(firebase.notifications.Android.Priority.High);
    
              firebase.notifications()
                  .displayNotification(localNotification)
                  .catch(err => console.error(err));
    
          }
          else if (Platform.OS === 'ios') {
            console.log(notification);
            const localNotification = new firebase.notifications.Notification()
                .setNotificationId(notification._from)
                .setTitle(notification._data.title)
                .setSubtitle(notification.subtitle)
                .setBody(notification._data.content)
                .setData(notification.data)
                .ios.setBadge(notification.ios.badge);
    
            firebase.notifications()
                .displayNotification(localNotification)
                .catch(err => console.error(err));
    
        }
      }
  
  

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
        createNotificationListeners();
        onTokenRefreshListener();
        if(token === null){
          
            getFcmToken();
        }
    
       
        return () => {
            onTokenRefreshListener();
        };

    },[]);

  
    return (
        
        // <View style={styles.container}>
          
        <View style={styles.container}>
           <Image source={require('../assets/clinic/banner.jpg')}  style={styles.bannerImage} /> 
           
               
           <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
							<Card containerStyle={{flex:1.5 ,height:null}}>
								<TouchableOpacity onPress={() => props.navigation.navigate("SearchJob")}>
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
										<Text style={{fontFamily:"roboto-light", fontWeight: 'bold', fontSize: 18, color: 'black' }}>Contact</Text>
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