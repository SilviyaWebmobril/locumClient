import React ,  {Component}from 'react';
import { Text, View, Button, StyleSheet,SafeAreaView, Dimensions, ScrollView, Image, FlatList, TouchableOpacity,ToastAndroid,AsyncStorage ,TouchableWithoutFeedback} from 'react-native';
import { TextField } from 'react-native-material-textfield';

export default class CreateProfile extends Component {
    constructor(props) {
        super(props);
		this.state = {
			f_name:'',
			l_name:'',
			profession:'',
			mobile:'',
			degree:'',
			experience:'',
			
			
		};
       
    }



    render() {
        return (
		
			<View style={{flex:1}}>
			<SafeAreaView style={{  backgroundColor: '#4C74E6'}} />
		<View style ={styles.container}>	
			{/*for header*/}
			 <View style = {{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'100%',height:'08%',backgroundColor: '#009AFF',padding:1}}>
				  
						<TouchableWithoutFeedback onPress={() =>this.props.navigation.goBack()}>
									 <Image style={{width: 20, height: 20,margin:10}}  source={require('../assets/clinic/left-arrow.png')} />
						 </TouchableWithoutFeedback>
						 
						 <View></View>
						 
						<View>
						</View>
						 
			 </View>
			 
			 {/*for main content*/}
			  <ScrollView nestedScrollEnabled={true} >
				  <View
					style={{
					  alignItems: 'center',
					  marginBottom: 20,
					  paddingBottom:59,
					  width: (Dimensions.get('window').width * 100) / 100,
					}}>
								<View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#009AFF',height:'40%',width:'100%'}}>
									<Text style={{color:'white',fontSize:20,alignSelf:'center',paddingBottom:5,paddingTop:10}}>John Alison</Text>
									<Text style={{marginBottom:20,color:'white',fontSize:20,alignSelf:'center',paddingBottom:45}}>NeuroSurgoen</Text>
									
								</View>
									
									
								<View style={{backgroundColor: 'white',width:'100%',flexGrow: 1,padding:20}}>
									
									<View style={{flexDirection:'row',justifyContent:'space-between'}}>
													
													<View style={{flexDirection:'row'}}>
													<Image style={{width:20,height:20}} source={require('../assets/clinic/small-mark.png')}/>
													<Text>4.0</Text>
													</View>
													
													
													<View style={{backgroundColor: 'white', borderRadius:50,padding:20,alignSelf:'center'}}>
																<Image
																source={require('../assets/doctor/doctor1.jpg')} 
																style={{
																position: 'absolute',
																overflow:'hidden',
																top: -70,
																right:70,
																borderRadius: 100 / 2,
																right:-30,
																height: 100,
																
																width: 100}} 
																	/>
													</View>			
																	
													<View style={{flexDirection:'row'}}>
													<Image style={{width:20,height:20}} source={require('../assets/clinic/small-mark.png')}/>
													<Text>London</Text>
													</View>
																	
										
									</View>
						 
						 
						
						
										
									
										
											
										  <TouchableOpacity
												style={styles.submitButton}
																		   >
											<Text style={styles.submitText}>Create</Text>
												</TouchableOpacity>
						
							
							
					</View>
							
			</View>
			</ScrollView>	
			</View>
			</View>

        )
    }
}


let styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
		alignItems:'center'
    },
	submitButton:{
      width :'100%',
      marginTop:10,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#009AFF',
      borderRadius:1,
      borderWidth: 1,
      borderColor: '#fff',
      marginTop:20
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
