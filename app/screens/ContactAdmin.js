import React ,  {Component}from 'react';
import { Text, View, Button, StyleSheet,
  Dimensions, StatusBar,ScrollView, Image, FlatList,SafeAreaView,
  TouchableOpacity,ToastAndroid ,TouchableWithoutFeedback,
  ActivityIndicator,KeyboardAvoidingView} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Header } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from './Globals'

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
		this.state = {
			subject:'',
			message:'',
			loading_status:false


		};

    }

	  componentDidMount() {

     StatusBar.setBackgroundColor('#0040FF')
 }

 async getUserId(){
  var id = await AsyncStorage.getItem('uname')
  return id
}



async componentWillMount(){

let user_id = await this.getUserId()
this.setState({id:user_id})

}

     isValid() {


      let valid = false;

      if (this.state.subject.trim().length > 0 && this.state.message.trim().length > 0) {
        valid = true;
      }

      if (this.state.subject.trim().length === 0) {

       
        showMessage(0, "Enter subject", "Contact Admin", true, false);
        return false
      }
      else if(this.state.message.length === 0) {
         
          showMessage(0, "Enter subject", "Contact Admin", true, false);
          return false
      }


      return valid;
  }


		onContact(){

      NetInfo.isConnected.fetch().then(isConnected => {
        if (!isConnected) {
          this.props.navigation.navigate("NoNetwork")
          return;
        }
        else {


          var formData = new FormData();


          formData.append('subject', this.state.subject);
          formData.append('message', this.state.message);
          formData.append('role', 2);
          formData.append('userid', this.state.id);
          if(this.isValid()){
    
              this.setState({loading_status:true})
                      fetch('http://webmobril.org/dev/locum/api/contact_admin', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                      },
                   body: formData
    
                    }).then((response) => response.json())
                          .then((responseJson) => {
                  this.setState({loading_status:false})
              
                if(responseJson.status === "success"){
                  showMessage(0, responseJson.message, "Contact Admin", true, false);
                
                this.props.navigation.navigate("HomeScreen");
                }
                else{
                  showMessage(0, responseJson.message, "Contact Admin", true, false);
                  
                }
                          }).catch((error) => {
                            console.error(error);
                          });
          }

        }
      });

		 
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

          <View style={{flex:1}}>
          <SafeAreaView style={{  backgroundColor: '#4C74E6'}} />
		<View style ={styles.container}>
			{/*for header*/}
			<KeyboardAvoidingView behavior="padding" enabled   style={{'width':'100%','height':"9%"}}>
			 <View style = {{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'100%',height:'100%',backgroundColor: '#4C74E6'}}>

						<TouchableWithoutFeedback onPress={() =>this.props.navigation.goBack()}>
									 <Image style={{width: 20, height: 20,margin:10}}  source={require('../assets/clinic/left-arrow.png')} />
						 </TouchableWithoutFeedback>

						 <View>
						  <Text style={{fontSize: 20,fontWeight: 'bold', color: "white",paddingRight:25}}>Contact Admin</Text>
						 </View>

						<View>
						</View>

			 </View>
			 </KeyboardAvoidingView>


			 {/*for main content*/}

			 <View style={{padding:10,width:'90%'}}>



			  <TextField
				style = {{width:'100%'}}
				label='Subject '
				value={this.state.subject}
				onChangeText={ (subject) => this.setState({subject:subject}) }
			/>
			<TextField
				style = {{width:'100%'}}
				label='Message '
				value={this.state.message}
				onChangeText={ (message) => this.setState({message:message}) }
			/>

			 <TouchableOpacity
			 onPress={this.onContact.bind(this)}
				style={styles.submitButton}>
						<Text style={styles.submitText}>Send</Text>
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
      width :'100%',
      marginTop:10,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#4C74E6',
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
