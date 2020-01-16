import React ,  {Component}from 'react';
import { Text, View, Button, StyleSheet,SafeAreaView, Dimensions, ScrollView, Image,
  FlatList, TouchableOpacity,ToastAndroid,TouchableWithoutFeedback,PermissionsAndroid} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import MapView , {PROVIDER_GOOGLE} from 'react-native-maps';
import { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from './Globals'

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
		this.state = {
			 markers: [{
				title: 'hello',
				coordinates: {
				  latitude: 3.148561,
				  longitude: 101.652778
				},
			  },
			  {
				title: 'hello',
				coordinates: {
				  latitude: 3.149771,
				  longitude: 101.655449
				},
			  }],
			  region: {
				latitude: 3.148561,
				longitude: 101.652778,
				latitudeDelta: 0.2,
				longitudeDelta: 0.9
		},
		latitude:'',
		longitude:''

		};

    }




  async  requestLocationPermission(){
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Example App',
        'message': 'Example App access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      //alert("You can use the location");
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            region: {
             latitude: position.coords.latitude,
             longitude: position.coords.longitude,
             latitudeDelta: 0.23,
             longitudeDelta: 0.5,

           },
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,

          });
         // this.getaddress()
        },
        error => {
          showMessage(0,"Check your internet speed connection","Location",true,false);
         
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 1000 }
      );


    } else {
      console.log("location permission denied")
      //alert("Location permission denied");
    }
  } catch (err) {
    console.warn(err)
  }
}


 async componentDidMount() {

    await this.requestLocationPermission()

  }


componentWillMount(){


}


    render() {
        return (

          <View style={{flex:1}}>
          <SafeAreaView style={{  backgroundColor: '#4C74E6'}} />
		<View style ={styles.container}>
			{/*for header*/}
			 <View style = {{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'100%',height:'09%',backgroundColor: '#009AFF'}}>

						<TouchableWithoutFeedback onPress={() =>this.props.navigation.goBack()}>
									 <Image style={{width: 25, height: 25,margin:10}}  source={require('../assets/clinic/left-arrow.png')} />
						 </TouchableWithoutFeedback>

						 <View>
						  <Text style={{fontFamily:"Roboto-Light", fontSize: 21,fontWeight: 'bold', color: "white",paddingRight:25}}>Jobs</Text>
						 </View>

						<View>
						</View>

			 </View>

			 {/*for main content*/}

			 <View style={{width:'100%',alignItems:'center'}}>

			  <MapView
				  provider = {PROVIDER_GOOGLE}
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: 'absolute'}}
				  region={this.state.region}
				   showsUserLocation = {true}
				   followUserLocation = {true}
				   zoomEnabled = {true}>

					{this.state.markers.map(marker => (
						<Marker
						  coordinate={marker.coordinates}
						  image={require('../assets/clinic/map-pin.png')}
						  title={marker.title}
						  key={marker.title}
						/>
					  ))}

			</MapView>

			 <TouchableOpacity
			  onPress={() => this.props.navigation.navigate("JobList")}
				style={styles.submitButton}>
						<Text style={styles.submitText}>Update</Text>
			</TouchableOpacity>

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
		alignItems:'center',
    },
	submitButton:{
      width :'80%',
      marginTop:10,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#009AFF',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff',
      marginTop:40,
	  alignSelf:'flex-end',
		position: 'absolute',
		bottom: 65,
		right:35
		//right:(Dimensions.get('window').width * 50) / 100

    },
    submitText:{
      fontFamily:"Roboto-Light", 
        color:'white',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        fontSize :20,
        fontWeight : 'bold'
    },

})
