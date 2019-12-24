import React ,  {Component}from 'react';
import { Text, View, Button, StyleSheet,SafeAreaView, Dimensions, ScrollView, Image, FlatList, TouchableOpacity,ToastAndroid,AsyncStorage ,TouchableWithoutFeedback} from 'react-native';
// import { TextField } from 'react-native-material-textfield';
// import ScrollView, { ScrollViewChild } from 'react-native-directed-scrollview';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
		this.state = {
			oldpass:'',
			newpass:'',
			cnfpass:'',


		};

    }



    render() {
        return (


		<View style ={styles.container}>
			{/*for header*/}
			 <View style = {{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'100%',height:'09%',backgroundColor: '#009AFF'}}>

						<TouchableWithoutFeedback onPress={() =>this.props.navigation.goBack()}>
									 <Image style={{width: 25, height: 25,margin:10}}  source={require('../assets/clinic/left-arrow.png')} />
						 </TouchableWithoutFeedback>

						 <View>
						  <Text style={{fontSize: 21,fontWeight: 'bold', color: "white",paddingRight:25}}>Dummy</Text>
						 </View>

						<View>
						</View>

			 </View>

			 {/*for main content*/}


			 <ScrollView style={{width:'100%',flex:1,height:'100%'}}>



			<View style = {{width:'100%',height:'50%',backgroundColor: '#009AFF',justifyContent:'center',alignItems: 'center',flex:3,flexGrow:1}}>
				{/*change margin top and bottom to make view hirht flexible in below header vieww */}
			<Text style={{fontSize: 18,fontWeight: 'bold', color: "white",marginBottom:'25%',marginTop:'10%',paddingTop:-35}}>John Alison</Text>
			 </View>
			
			
				
									
													<View style={{backgroundColor: 'white', borderRadius:60,padding:20,alignSelf:'center',flex:1}}>
																<Image
																source={require('../assets/doctor/camera.png')} 
																style={{
																position: 'absolute',
																overflow:'hidden',
																top: -60,
																borderRadius: 120 / 2,
																right:-30,
																height: 120,
																width: 120}} 
																	/>
													</View>
													
													
			 <TouchableOpacity
				style={styles.submitButton}>
						<Text style={styles.submitText}>Update</Text>
			</TouchableOpacity>
			 <TouchableOpacity
				style={styles.submitButton}>
						<Text style={styles.submitText}>Update</Text>
			</TouchableOpacity>
			 <TouchableOpacity
				style={styles.submitButton}>
						<Text style={styles.submitText}>Update</Text>
			</TouchableOpacity>

			<Text style={{fontSize: 18,fontWeight: 'bold', color: "black",paddingRight:25,margin:10,flex:1}}>John Alison</Text>
		<Text style={{fontSize: 18,fontWeight: 'bold', color: "black",paddingRight:25,margin:10,flex:1}}>John Alison</Text>
    <Text style={{fontSize: 18,fontWeight: 'bold', color: "black",paddingRight:25,margin:10,flex:1}}>John Alison</Text>
  <Text style={{fontSize: 18,fontWeight: 'bold', color: "black",paddingRight:25,margin:10,flex:1}}>John Alison</Text>
  <Text style={{fontSize: 18,fontWeight: 'bold', color: "black",paddingRight:25,margin:10,flex:1}}>John Alison</Text>
<Text style={{fontSize: 18,fontWeight: 'bold', color: "black",paddingRight:25,margin:10,flex:1}}>John Alison</Text>
<Text style={{fontSize: 18,fontWeight: 'bold', color: "black",paddingRight:25,margin:10,flex:1}}>John Alison</Text>
<Text style={{fontSize: 18,fontWeight: 'bold', color: "black",paddingRight:25,margin:10,flex:1}}>John Alison</Text>




      </ScrollView>

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
      flex:1,
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
