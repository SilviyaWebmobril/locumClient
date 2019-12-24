import React, { Component } from 'react';
import {
  Text, View, Button, StyleSheet, SafeAreaView, Dimensions, ScrollView, Image, FlatList,
  TouchableOpacity, ToastAndroid, Alert, ActivityIndicator, BackHandler
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import PasswordInputText from 'react-native-hide-show-password-input';

import { StackActions, NavigationActions, withNavigationFocus } from 'react-navigation';
// import { LoginManager,AccessToken,GraphRequest,GraphRequestManager} from "react-native-fbsdk";
import { showMessage } from './Globals'
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading_status: false,
      uid: 0
    };

  }

  signup() {
    this.props.navigation.navigate('Register');
  }
  forgot() {
    this.props.navigation.navigate("ForgotPassword")
  }



  handleBackWithAlert = () => {
    if (this.props.isFocused) {

      if (this.state.loading_status) {
        this.setState({ loading_status: false })
      }
      else {
        Alert.alert(
          'Exit App',
          'Exiting the application?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            },
            {
              text: 'OK',
              onPress: () => BackHandler.exitApp()
            }
          ],
          {
            cancelable: false
          }
        );
      }

      return true;
    }
  }
  handleBackButton = () => {

    if (this.props.isFocused) {

      if (this.state.loading_status) {
        this.setState({ loading_status: false })
      }
      else {
        BackHandler.exitApp()
      }

      return true;
    }

  };


  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

  }


  _fb() {



    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      function (result) {

        if (result.isCancelled) {
          console.log('Login cancelled')
          showMessage(0, "Login cancelled", "Login", true, false);

        } else {

          AccessToken.getCurrentAccessToken().then(
            (data) => {
              let accessToken = data.accessToken
              //Alert.alert(accessToken.toString())

              const responseInfoCallback = (error, result) => {
                if (error) {
                  console.log(error)
                  //Alert.alert('Error fetching data: ' + error.toString());
                  // ToastAndroid.show('Error  fetching data: ' + JSON.stringify(result) ,ToastAndroid.LONG)
                } else {
                  //console.log(result)
                  // Alert.alert('Success fetching data: ' + JSON.stringify(result));
                  //when success this will call
                  // ToastAndroid.show('Success fetching data: ' + JSON.stringify(result) ,ToastAndroid.LONG)
                  let id = result["id"]
                  let name = result["name"]
                  let email = result["email"]
                  //this.loginwithfb(id,name,email)
                  //ToastAndroid.show('Success fetching data: ' + id+"...."+"name"+name ,ToastAndroid.LONG)
                  var formData = new FormData();

                  formData.append('name', name);
                  formData.append('email', email);
                  formData.append('fb_id', id)
                  formData.append('role', 2);

                  fetch('http://webmobril.org/dev/locum/api/fb_login', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'multipart/form-data',
                    },
                    body: formData

                  }).then((response) => response.json())
                    .then((responseJson) => {

                      if (!responseJson.error) {
                        showMessage(0, responseJson.message, "Login", true, false);
                        //success in inserting data

                        var id = responseJson.result.id
                        var name = responseJson.result.name
                        var email = responseJson.result.email
                        var address = responseJson.result.address
                        var doc_one = responseJson.result.userdoc_1
                        var doc_two = responseJson.result.userdoc_2
                        var doc_three = responseJson.result.userdoc_3
                        var doc_four = responseJson.result.userdoc_4
                        var phone = responseJson.result.mobile
                        var user_pic = responseJson.result.user_image

                        //checking if document uploaded or not

                        if (address == null) {
                          AsyncStorage.clear()
                          AsyncStorage.setItem('temp_id', id.toString());
                          AsyncStorage.setItem("name", name)
                          AsyncStorage.setItem("email", email)
                          AsyncStorage.setItem("phone", responseJson.result.mobile.toString())
                          this.props.navigation.navigate('CreateProfile');
                        }
                        else if (doc_one == null && doc_two == null && doc_three == null && doc_four == null) {
                          AsyncStorage.clear()
                          AsyncStorage.setItem('temp_id', id.toString());
                          AsyncStorage.setItem("name", name)
                          AsyncStorage.setItem("phone", responseJson.result.mobile.toString())
                          this.props.navigation.navigate('UploadDocuments');
                        }
                        else if (doc_one != null && address != null) {
                          AsyncStorage.clear()

                          AsyncStorage.setItem('name', name.toString());
                          AsyncStorage.setItem('uname', id.toString());
                          AsyncStorage.setItem('user_image', user_pic);
                          // this.props.navigation.navigate('Home');

                          this.props.navigation.navigate("Home");
                          // const resetAction = StackActions.reset({
                          //   index: 0,
                          //   key:'HomeScreen',
                          //   actions: [NavigationActions.navigate({ routeName: 'HomePage' })],
                          // });
                          // this.props.navigation.dispatch(resetAction);


                        }




                        this.setState({ email: "", password: '' })


                        //  this.props.navigation.navigate('Home');
                        // LoginManager.logout()

                      } else {

                        //this.setState({error:responseJson.message,showProgress:false})
                        showMessage(0, responseJson.message, "Login", true, false);
                        // ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
                      }


                    }).catch((error) => {
                      console.error(error);
                    });
                }
              }

              const infoRequest = new GraphRequest(
                '/me',
                {
                  accessToken: accessToken,
                  parameters: {
                    fields: {
                      string: 'email,name,id'
                    }
                  }
                },
                responseInfoCallback
              );

              // Start the graph request.
              let a = new GraphRequestManager().addRequest(infoRequest).start()
              //ToastAndroid.show("Result ..."+ a.toString(),ToastAndroid.LONG)

            }
          )
        }

      }.bind(this),
      function (error) {
        console.log('Login fail with error: ' + error)
        // ToastAndroid.show('Login fail with error: ' + JSON.stringify(error),ToastAndroid.LONG)
      }
    )
  }


  isValid() {


    let valid = false;

    if (this.state.email.length > 0 && this.state.password.length > 0) {
      valid = true;
    }

    if (this.state.email.length === 0) {
      showMessage(0, 'You must enter an email', "Login", true, false);

    }
    else if (this.state.email.indexOf("@") < 0 || this.state.email.indexOf(".") < 0) {
      showMessage(0, 'You must enter a valid email', "Login", true, false);

      return false;
    }
    else if (this.state.password.length === 0) {
      showMessage(0, 'You must enter a password', "Login", true, false);

    }

    return valid;
  }

  _storeData = async (id) => {
    this.setState({ uid: id }, () => {
      try {
        AsyncStorage.setItem('uname', this.state.uid);
        showMessage(0, "Saved" + this.state.uid, "Login", true, false);


      } catch (error) {
        showMessage(0, "Failed", "Login", true, false);

      }
    })
  };

  onLogin() {

    NetInfo.isConnected.fetch().then(isConnected => {
      if(!isConnected)
      {
        this.props.navigation.navigate("NoNetwork")
        return;
      }
      else{


        var formData = new FormData();

        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
        //2 for clinic 3 for practitioner
        formData.append('role', 2);
    
        if (this.isValid()) {
          this.setState({ loading_status: true })
    
          fetch('http://webmobril.org/dev/locum/api/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            body: formData
    
          }).then((response) => response.json())
            .then((responseJson) => {
              this.setState({ loading_status: false })
              if (responseJson.status === "success") {
                //	ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
    
                console.log("response",responseJson);
    
                var id = responseJson.result.id
                var name = responseJson.result.name
                var address = responseJson.result.address
                var doc_one = responseJson.result.userdoc_1
                var doc_two = responseJson.result.userdoc_2
                var doc_three = responseJson.result.userdoc_3
                var doc_four = responseJson.result.userdoc_4
                var phone = responseJson.result.mobile
                var email = responseJson.result.email
                let pic = "";
                if(responseJson.result.user_image !== null ){

                  pic = responseJson.result.user_image
                }
               
                //checking if document uploaded or not
    
                if (address == null) {
                  AsyncStorage.clear()
                  AsyncStorage.setItem('temp_id', id.toString());
                  AsyncStorage.setItem("name", name)
                  AsyncStorage.setItem("email", email)
                  AsyncStorage.setItem("phone", responseJson.result.mobile.toString())
                  this.props.navigation.navigate('CreateProfile');
                }
                else if (doc_one == null && doc_two == null && doc_three == null && doc_four == null) {
                  AsyncStorage.clear()
                  AsyncStorage.setItem('temp_id', id.toString());
                  AsyncStorage.setItem("name", name)
                  AsyncStorage.setItem("phone", responseJson.result.mobile.toString())
                  this.props.navigation.navigate('UploadDocuments');
                }
                // else if(doc_one != null && address != null){
                else {
    
                  AsyncStorage.clear()
                 
                  AsyncStorage.setItem('name', name.toString());
                  AsyncStorage.setItem('uname', id.toString());
                  AsyncStorage.setItem('user_image', pic);
                  AsyncStorage.setItem('verify',responseJson.result.verify.toString());
                  AsyncStorage.setItem('job_remaining',responseJson.result.jobs_remaining.toString())
    
                  let balnc = 0.0;
                 
                  if (responseJson.result.wallet_balance == null) {
                    balnc = 0.0
                    AsyncStorage.setItem("avlbal",balnc.toString())
                    //this sis tthe fgrof th gi
                  }
                  else {
                    balnc = responseJson.result.wallet_balance ;
                    AsyncStorage.setItem("avlbal",balnc.toString())
                   
                  }
    
    
                  try {
    
                    // code...
    
                    this.props.navigation.navigate('Home');
                    const resetAction = StackActions.reset({
                      index: 0,
                      key: 'HomeScreen',
                      actions: [NavigationActions.navigate({ routeName: 'HomePage' })],
                    });
                    this.props.navigation.dispatch(resetAction);
    
                  } catch (err) {
    
                    // error handling
                    showMessage(0, err.message, "Login", true, false);
    
                  }
    
    
    
    
    
                }
    
    
    
    
                this.setState({ email: "", password: '' })
    
              }
              else {
                showMessage(0, responseJson.message, "Login", true, false);
    
              }
            }).catch((error) => {
              showMessage(0, error.message, "Login", true, false);
    
    
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

      <KeyboardAwareScrollView >
      <View style={styles.container}>

        <Image source={require('../assets/clinic/clinic-logo.png')} 
         	style={{
            alignSelf: 'center',
            marginTop: 60,
            width: Dimensions.get('window').width / 2,
            height: Dimensions.get('window').height * 0.2
          }}  />

      <View style={{ width: Dimensions.get('window').width * 0.9,alignSelf:'center'}}>

        <TextField
          style={{ width: '100%' ,alignSelf: "center",marginTop:10 }}
          label='Email'
          value={this.state.email}
          onChangeText={(email) => this.setState({ email: email.trim() })}
        />

        <PasswordInputText
          style={{ width: '100%',alignSelf: "center",}}
          label='Password'
          maxLength={25}
          value={this.state.password}
          onChangeText={(password) => this.setState({ password: password.trim() })}
        />




        <Text onPress={this.forgot.bind(this)} style={{ alignSelf: 'flex-end', marginBottom: 5, marginTop: 5 }}>Forgot Password?</Text>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.onLogin.bind(this)}
          underlayColor='#fff'>
          <Text style={styles.submitText}>Login</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text style={{ color: 'black' }}>Don't have an account ? </Text>

          <Text onPress={this.signup.bind(this)} style={{ textDecorationLine: 'underline', color: 'black', fontWeight: 'bold' }}>SIGN UP</Text>

        </View>
      </View>
      </View>
      </KeyboardAwareScrollView>

    )
  }
}


let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    marginTop:Platform.OS == "android" ? Dimensions.get('window').width * 0.10 : Dimensions.get('window').width * 0.20,

  },
  submitButton: {
    width: '100%',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#4C74E6',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 15
  },
  submitText: {
    color: 'white',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 17,
    fontWeight: 'bold'
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }

})


export default withNavigationFocus(Login);
