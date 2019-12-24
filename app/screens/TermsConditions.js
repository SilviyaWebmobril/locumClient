import React ,  {Component}from 'react';
import { Text, View, Button, StyleSheet,SafeAreaView, Dimensions, ScrollView,
   Image, FlatList, TouchableOpacity,ToastAndroid,Alert, 
   ActivityIndicator,BackHandler,TouchableWithoutFeedback} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import PasswordInputText from 'react-native-hide-show-password-input';
//import FormData from 'FormData';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { WebView } from 'react-native-webview';
import PayPal from 'react-native-paypal-wrapper';

export default class TermsCondition extends Component {
    constructor(props) {
        super(props);
		this.state = {
      loading:true,
			
		};

    }

  componentWillMount(){
    
  }

  hideSpinner() {
    this.setState({ loading: false });
  }

  render() {
    return (
      <View style={{flex:1}}>
			<SafeAreaView style={{  backgroundColor: '#4C74E6'}} />
       <View style = {styles.container}>
       {/*for header*/}
			 <View style = {{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'100%',height:'09%',backgroundColor: '#4C74E6'}}>

       <TouchableWithoutFeedback onPress={() =>this.props.navigation.pop()}>
              <Image style={{width: 20, height: 20,margin:10}}  source={require('../assets/clinic/left-arrow.png')} />
        </TouchableWithoutFeedback>

        <View>
         <Text style={{fontSize: 20,fontWeight: 'bold', color: "white",marginLeft:-10}}>Terms & Condition</Text>
        </View>

       <View>
       </View>

  </View>

      <View style={{flex:1}}>
          <WebView
              onLoad={() => this.hideSpinner()}
              source={{ uri:'http://webmobril.org/dev/locum/api/api_pages?page_id=2'}}
              style={{ marginTop: 10 }}
              
          />
          {this.state.loading && (
              <View
              style={[
              StyleSheet.absoluteFill,
              { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
              ]}
              >
                  <ActivityIndicator size="large" />
              </View>
          )}
      </View>

       
      </View>
      </View>
    );
  }
}


let styles = StyleSheet.create({
  container: {
    height: '100%',
   
 }


})


