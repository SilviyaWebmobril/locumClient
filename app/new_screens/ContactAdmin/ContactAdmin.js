import React ,  {useState, useEffect}from 'react';
import { Text, View, Button, StyleSheet,
  TouchableOpacity,ActivityIndicator,KeyboardAvoidingView} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import NetInfo from "@react-native-community/netinfo";
import { checkuserAuthentication ,logoutUser} from '../redux/stores/actions/auth_action';
import { showMessage } from '../Globals/Globals'
import {useSelector ,useDispatch} from 'react-redux';
import Axios from 'axios';
import ApiUrl from '../Globals/ApiUrl';
import MyActivityIndicator from '../CustomUI/MyActivityIndicator'
import {showSpinner ,hideSpinner} from '../redux/stores/actions/register_user'
import {
	StackActions, NavigationActions
} from 'react-navigation';

const ContactAdmin = (props) => {

  const user_id = useSelector(state => state.register.user.id);
  const device_token  = useSelector(state => state.auth.device_token)
  const loading_status = useSelector(state => state.register.loading_status);
  console.log(loading_status);
  const [message ,setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const authenticated = useSelector(state => state.auth.authenticated);
  const dispatch = useDispatch();

    const isValid = () =>{
         let valid = false;

       if (subject.trim().length > 0 && message.trim().length > 0) {
         valid = true;
       }

       if (subject.trim().length === 0) {

       
         showMessage(0, "Enter subject", "Contact Admin", true, false);
         return false
       }
       else if(message.length === 0) {
         
           showMessage(0, "Enter Message", "Contact Admin", true, false);
           return false
       }


       return valid;
   }

    const onContact = () =>{

       NetInfo.isConnected.fetch().then(isConnected => {
         if (!isConnected) {
           this.props.navigation.navigate("NoNetwork")
           return;
         }
         else {
          if(isValid()){

            dispatch(checkuserAuthentication(user_id,device_token))
              .then(response => {

                if(response.data.error){
                  showMessage(0, 'Session Expired! Please Login.', 'Contact Admin', true, false);
                      props.navigation.navigate("Login");
                      dispatch(logoutUser())
                      const resetAction = StackActions.reset({
                          index: 0,
                          key: 'Login',
                          actions: [NavigationActions.navigate({ routeName: 'Login' })],
                      });
                      props.navigation.dispatch(resetAction);


                }else{

                  dispatch(showSpinner())
                  var formData = new FormData();
                  formData.append('subject',subject);
                  formData.append('message', message);
                  formData.append('role', 2);
                  formData.append('userid',user_id);
                  dispatch(hideSpinner())
                  Axios.post(ApiUrl.base_url+ApiUrl.contact_admin,formData)
                    .then(response=>{
    
                      if(response.data.status === "success"){
                        showMessage(0, response.data.message, "Contact Admin", true, false);
                      
                        props.navigation.navigate("HomeScreen");
                      }else{
                        showMessage(0, responseJson.message, "Contact Admin", true, false);
                        
                      }
    
                    })
                    .catch(error => {
                      showMessage(0, "Something went wrong ! Please try again later.", "Contact Admin", true, false);
                    })

                }

              })
          

          }
        }
       });

		 
 	}


  if (loading_status) {
    return (
      <MyActivityIndicator />
   );
  }

  return(
      <View style={styles.container}>
        <View style={{width:'90%'}}>

        <TextField
        style = {{width:'100%'}}
        label='Subject '
        value={subject}
        onChangeText={ (subject) => {setSubject(subject)} }
      />
      <TextField
        style = {{width:'100%'}}
        label='Message '
        value={message}
        onChangeText={ (message) => {setMessage(message)} }
      />

      <TouchableOpacity
      onPress={onContact}
        style={styles.submitButton}>
            <Text style={styles.submitText}>Send</Text>
      </TouchableOpacity>
      </View>

    </View>
  )

}

export default ContactAdmin;

// export default class ContactAdmin extends Component {
//     constructor(props) {
//         super(props);
// 		this.state = {
// 			subject:'',
// 			message:'',
// 			loading_status:false


// 		};

//     }

// 	  componentDidMount() {

//      StatusBar.setBackgroundColor('#0040FF')
//  }

//  async getUserId(){
//   var id = await AsyncStorage.getItem('uname')
//   return id
// }



// async componentWillMount(){

// let user_id = await this.getUserId()
// this.setState({id:user_id})

// }

//      isValid() {


//       let valid = false;

//       if (this.state.subject.trim().length > 0 && this.state.message.trim().length > 0) {
//         valid = true;
//       }

//       if (this.state.subject.trim().length === 0) {

       
//         showMessage(0, "Enter subject", "Contact Admin", true, false);
//         return false
//       }
//       else if(this.state.message.length === 0) {
         
//           showMessage(0, "Enter subject", "Contact Admin", true, false);
//           return false
//       }


//       return valid;
//   }


// 		onContact(){

//       NetInfo.isConnected.fetch().then(isConnected => {
//         if (!isConnected) {
//           this.props.navigation.navigate("NoNetwork")
//           return;
//         }
//         else {


//           var formData = new FormData();
//           formData.append('subject', this.state.subject);
//           formData.append('message', this.state.message);
//           formData.append('role', 2);
//           formData.append('userid', this.state.id);
//           if(this.isValid()){
    
//               this.setState({loading_status:true})
//                       fetch('http://webmobril.org/dev/locum/api/contact_admin', {
//                       method: 'POST',
//                       headers: {
//                         'Accept': 'application/json',
//                         'Content-Type': 'multipart/form-data',
//                       },
//                    body: formData
    
//                     }).then((response) => response.json())
//                           .then((responseJson) => {
//                   this.setState({loading_status:false})
              
//                 if(responseJson.status === "success"){
//                   showMessage(0, responseJson.message, "Contact Admin", true, false);
                
//                 this.props.navigation.navigate("HomeScreen");
//                 }
//                 else{
//                   showMessage(0, responseJson.message, "Contact Admin", true, false);
                  
//                 }
//                           }).catch((error) => {
//                             console.error(error);
//                           });
//           }

//         }
//       });

		 
// 	}



//     render() {

// 		 if (this.state.loading_status) {
// 				  return (
// 					<ActivityIndicator
// 					  animating={true}
// 					  style={styles.indicator}
// 					  size="large"
// 					/>
// 				  );
// 			}


//         return (
//           <View style={styles.container}>
//               <View style={{width:'90%'}}>

//               <TextField
//               style = {{width:'100%'}}
//               label='Subject '
//               value={this.state.subject}
//               onChangeText={ (subject) => this.setState({subject:subject}) }
//             />
//             <TextField
//               style = {{width:'100%'}}
//               label='Message '
//               value={this.state.message}
//               onChangeText={ (message) => this.setState({message:message}) }
//             />

//             <TouchableOpacity
//             onPress={this.onContact.bind(this)}
//               style={styles.submitButton}>
//                   <Text style={styles.submitText}>Send</Text>
//             </TouchableOpacity>
//             </View>

//           </View>

//         )
//     }
// }


let styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
		  alignItems:'center',
    },
	submitButton:{
    alignSelf :'center',
      width :'90%',
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
      fontFamily:"roboto-bold",
        color:'white',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        fontSize :17,
      
    },
	indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }

})
