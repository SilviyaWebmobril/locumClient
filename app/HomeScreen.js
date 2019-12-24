import React ,  {Component}from 'react';
import { Text, View, Button, StyleSheet,SafeAreaView, Dimensions, ScrollView, Image, FlatList, TouchableOpacity,ToastAndroid,AsyncStorage ,TouchableWithoutFeedback} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { showMessage } from './screens/Globals';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
		this.state = {



		};

    }


	next(){
		 AsyncStorage.removeItem('uname', (err) => {

			showMessage(1,"Successfully logged out",true,false);
			
			
			this.props.navigation.navigate("Login")
			});
	}
    render() {
        return (


		<View style ={styles.container}>
			{/*for header*/}
			 <View style = {{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'100%',height:'09%',backgroundColor: '#686BE4'}}>

						<TouchableWithoutFeedback>
							<Image style={{width: 20, height: 20,margin:10}}  source={require('../assets/clinic/menu-options.png')} />
						 </TouchableWithoutFeedback>

						 <View>
						  <Text style={{fontSize: 20,fontWeight: 'bold', color: "white",paddingRight:25}}>Home</Text>
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
