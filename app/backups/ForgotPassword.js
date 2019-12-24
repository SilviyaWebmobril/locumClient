import React ,  {Component}from 'react';
import { Text, View, Button, StyleSheet,SafeAreaView, Dimensions, StatusBar,ScrollView, Image, FlatList, TouchableOpacity,ToastAndroid,AsyncStorage ,TouchableWithoutFeedback,ActivityIndicator} from 'react-native';
import { TextField } from 'react-native-material-textfield';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
		this.state = {
			email:'',
			loading_status:false
			
			
		};
       
    }
	
	  componentDidMount() {

     StatusBar.setBackgroundColor('#0040FF')
 }
 
     isValid() {
      

      let valid = false;

      if (this.state.email.length > 0) {
        valid = true;
      }

      if (this.state.email.length === 0) {
        
        ToastAndroid.show('You must enter an email', ToastAndroid.SHORT);
      } 

      return valid;
  }
  
  
		onForgot(){
		
		    var formData = new FormData();
			
			
			formData.append('email', this.state.email);
			if(this.isValid()){
			
					this.setState({loading_status:true})
                  fetch('http://webmobril.org/dev/locum/api/forget_password.php?', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                  },
               body: formData

                }).then((response) => response.json())
                      .then((responseJson) => {
						  this.setState({loading_status:false})
						 // ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.SHORT);
						if(responseJson.status === "success"){
							
							ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
							//this.props.navigation.navigate("Home");
						}
						else{
							
							ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
						}
                      }).catch((error) => {
                        console.error(error);
                      });
			}
	}



    render() {
		
		 if (this.state.loading_status) {
				  return (
					<ActivityIndicator
					  animating={true}
					  style={styles.indicator}
					  size="large"
					/>
				  );
			}
			
			
        return (
		
			
		<View style ={styles.container}>	
			{/*for header*/}
			 <View style = {{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'100%',height:'09%',backgroundColor: '#009AFF'}}>
				  
						<TouchableWithoutFeedback onPress={() =>this.props.navigation.goBack()}>
									 <Image style={{width: 25, height: 25,margin:10}}  source={require('../assets/clinic/left-arrow.png')} />
						 </TouchableWithoutFeedback>
						 
						 <View>
						  <Text style={{fontSize: 21,fontWeight: 'bold', color: "white",paddingRight:25}}>Forgot Password</Text>
						 </View>
						 
						<View>
						</View>
						 
			 </View>
			 
			 {/*for main content*/}
			 
			 <View style={{padding:10,width:'90%'}}> 
			 
			 <Text style={{fontSize: 17, color: "black",marginTop:15,marginBottom:15}}>Don't worry! Just enter yout Email Id or Phone below and we will send you the password reset instructions</Text>
				 
			  <TextField
				style = {{width:'100%',marginBottom:35}}
				label='Email or Phone'
				value={this.state.email}
				onChangeText={ (email) => this.setState({email}) }
			/>
			
			 <TouchableOpacity
			 onPress={this.onForgot.bind(this)}
				style={styles.submitButton}>
						<Text style={styles.submitText}>Sent</Text>
			</TouchableOpacity>
			 
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
	indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }
   
})
