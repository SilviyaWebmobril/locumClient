import React, {Component} from 'react';
import {Text, View, Image,Dimensions,ToastAndroid,StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";



export default class Splash extends Component {
    constructor(props) {
        super(props);

    }

abc = async () =>{
	//make sure to save every item in string in asycnncstoarage  otheriws it will not store i it
		await AsyncStorage.getItem('uname')
								.then((item) => {
						 if (item) {
              //ToastAndroid.show("ITEMMMM...."+item,ToastAndroid.SHORT)
						   this.props.navigation.navigate('Home')
					   }
					   else {
							  //do something else means go to login

							  this.props.navigation.navigate('Login')
						  }
					});

}
check = async () =>{
	 setTimeout(() => {
            //go to main to check if login or not
			 this.abc()


        }, 1000)


  }

    componentDidMount() {
       StatusBar.setBackgroundColor('#0040FF')
       this.check()
    }

    render() {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
			  height:'100%',
			  backgroundColor:'white'
            }}>

			 <Image source={require('../assets/clinic/clinic-logo.png')} style={{height:'35%', width:'50%',marginTop:-20}} resizeMode='contain'/>

          </View>

        )
    }
}
