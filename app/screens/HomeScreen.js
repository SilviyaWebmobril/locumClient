import React ,  {Component}from 'react';
import { Text, View, Button, StyleSheet,SafeAreaView,
   Dimensions, ScrollView, Image, FlatList, TouchableOpacity,ToastAndroid,TouchableWithoutFeedback} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";


export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
		this.state = {



		};

    }


	next(){
	this.props.navigation.navigate("Dummy");
	}
    render() {
        return (


		<View style ={styles.container}>
			{/*for header*/}
			 <View style = {{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'100%',height:'09%',backgroundColor: '#686BE4'}}>

						<TouchableWithoutFeedback onPress={() => this.props.navigation.toggleDrawer()}>
									 <Image style={{width: 25, height: 25,margin:10}}  source={require('../assets/clinic/menu-options.png')} />
						 </TouchableWithoutFeedback>

						 <View>
						  <Text style={{fontSize: 21,fontWeight: 'bold', color: "white",paddingRight:25}}>Home</Text>
						 </View>

						<View>
						</View>

			 </View>

			 {/*for main content*/}

			 <View style={{padding:10,width:'60%',margin:20}}>

				<Button
				  onPress={this.next.bind(this)}
				  title="Logout"
				  color="#841584"

				/>




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
      width :'100%',
      marginTop:10,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#009AFF',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff',
      marginTop:40,

    },
    submitText:{
        color:'white',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        fontSize :20,
        fontWeight : 'bold'
    },

})
