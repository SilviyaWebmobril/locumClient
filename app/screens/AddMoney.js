import React ,  {Component}from 'react';
import { Text, View, Button, StyleSheet, Dimensions, StatusBar,ScrollView, Image, FlatList,SafeAreaView,Alert,
  TouchableOpacity,ToastAndroid,TouchableWithoutFeedback,ActivityIndicator,Keyboard,
  KeyboardAvoidingView,Platform} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import PayPal from 'react-native-paypal-wrapper';
import { Header } from 'react-navigation';
import {  StackActions, NavigationActions} from 'react-navigation';
import IPay88, { Pay } from "ipay88-sdk";
import { showMessage  }  from './Globals';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";

export default class AddMoney extends Component {
    constructor(props) {
        super(props);
		this.state = {
			amount:'',
			id:'',
      loading_status:false,
      onFocusKeyboard:false


		};

    }



    ipay88Payment= async(data) =>{
      let user_id = await this.getUserId()
     if(this.isValid()){
      NetInfo.isConnected.fetch().then(isConnected => {
        if(!isConnected)
        {
          this.props.navigation.navigate("NoNetwork")
          return;
        }
        else{

          
          
          console.log("user id",user_id);



            var formData = new FormData();
                //txnid and payal id should have same value
                formData.append('userid', user_id);
                formData.append('txn_status',"approved");
                if(Platform.OS == "ios"){
                  formData.append('txn_id', data.transactionID.toString());
                }else{
                  formData.append('txn_id', data.transactionId.toString());
                }
               
                formData.append('amt',data.amount.toString());
                //formData.append('paypal_id',pid.toString());
                formData.append('role',2);

                console.log("formdata",formData);
                this.setState({loading_status:true})
                fetch('http://webmobril.org/dev/locum/api/recharge_wallet', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type':  'multipart/form-data',
                },
                body: formData

              }).then((response) => response.json())
                    .then((responseJson) => {
                      this.setState({loading_status:false})
                   
                    if(responseJson.status === 'success'){
                         
                          showMessage(0, responseJson.message, 'Add Money', true, false);

                          if (this.props.navigation.getParam('buy_package') == 1) {

                            console.log("buying package again");

                            var result = this.props.navigation.getParam('result');
                            var price = result["price"];
                            var packageid = result["package_id"];
                            var count = result['job_count'];
                            this.props.navigation.state.params.payAgain(packageid, price, count);
                            this.props.navigation.pop();
        
        
        
                          } else {
        
                            this.props.navigation.navigate('Wallet');
                            const resetAction = StackActions.reset({
                              index: 0,
                              key: 'Wallet',
                              actions: [NavigationActions.navigate({ routeName: 'Wallet' })],
                            });
                            this.props.navigation.dispatch(resetAction);
        
        
                          }


                  }else{

                        showMessage(0, responseJson.message, 'Add Money', true, false);

                      
                    }


                    }).catch((error) => {
                      console.error(error);
                    });





        }

       })

     }
    }


    successNotify = data => {

      if (Platform.OS === "ios") {
        console.log("my data is in ios",data);
        this.ipay88Payment(data)
        
        Alert.alert("Message", "Payment Completed Successfully!", {
          cancelable: true
        });
      } else {
  
        console.log("my data is",data);
        this.ipay88Payment(data);
       
       
        showMessage(1, `Message: Payment Completed Successfully!`, 'Add Money', true, false);
       
      }
      
    };

    cancelNotify = data => {

      console.log("Cancel...",data);
      const { transactionID, referenceNo, amount, remark, error } = data;

      if (Platform.OS === "ios") {
        Alert.alert("Message", `${error}`, { cancelable: true });
      } else {
      
        ToastAndroid.show(`Message: ${error}`, ToastAndroid.LONG);
      }
    };

    failedNotify = data => {
      console.log("Failed...",data);
      const { transactionID, referenceNo, amount, remark, error } = data;

      if (Platform.OS === "ios") {
        Alert.alert("Message", `${error}`, { cancelable: true });
      } else {
        ToastAndroid.show(`Message: ${error}`, ToastAndroid.LONG);
      }
    };

    pay = () => {

      Keyboard.dismiss();

      NetInfo.isConnected.fetch().then(isConnected => {
        if (!isConnected) {
          this.props.navigation.navigate("NoNetwork")
          return;
        }
        else {

          try {

            if(this.isValid()){

              const data = {};
              data.paymentId = "2"; // refer to ipay88 docs
              data.merchantKey = "QrB9d97iae";
              data.merchantCode = "M05194";
              //data.referenceNo = (Math.floor(100000 + Math.random() * 900)).toString();
              data.referenceNo =  Math.floor(100000 + Math.random() * 900000).toString();
              data.amount = this.state.amount.toString();
              data.currency = "MYR";
              data.productDescription = "Payment";
              data.userName = "locum";
              data.userEmail = "test@gmail.com";
              data.userContact = "0123456789";
              data.remark = "me";
              data.utfLang = "UTF-8";
              data.country = "MY";
              data.backendUrl = "http://webmobril.com";
              const errs = Pay(data);
              // if (Object.keys(errs).length > 0) {
              //   console.log(errs);
              // }
              
  
              
            }
            } catch (e) {
            console.log(e);
          }

        }
      });
      
    };

	  componentDidMount() {

     StatusBar.setBackgroundColor('#0040FF')
    }

 async getUserId(){
  var id = await AsyncStorage.getItem('uname')
  console.log("id/....",id);
  return id
}



async componentWillMount(){

let user_id = await this.getUserId()
//ToastAndroid.show("lllll"+user_id,ToastAndroid.LONG)
this.setState({id:user_id})

}

     isValid() {

			var isnum = /^\d+$/.test(this.state.amount);


      let valid = false;

      if (this.state.amount.toString().trim().length > 0) {
        valid = true;
      }

      if (this.state.amount.toString().trim().length === 0) {
        showMessage(0,'You must enter Amount', 'Add Money', true, false);
        
        return false
			}
			else if(!isnum){
        showMessage(0,"Please Enter Valid Amount ", 'Add Money', true, false);
			
				return false;
			}




      return valid;
  }





	paypal = async() =>{

    let user_id = await this.getUserId()

   if(this.isValid()){
    NetInfo.isConnected.fetch().then(isConnected => {
      if(!isConnected)
      {
        this.props.navigation.navigate("NoNetwork")
        return;
      }
      else{
        PayPal.initialize(PayPal.SANDBOX, "ARFiHtTEV2P17X4Hdei6M4vqoLx_UVGAvELcTpNprLC4hNklLmNq7cl_z5OqhRGoBzzVRmS9sG-RfhXx");
        PayPal.pay({
          price: this.state.amount.toString(),
          currency: 'USD',
          description: 'Adding money in wallet',
        }).then(confirm => {

          var pid = confirm.response.id
          var formData = new FormData();
              //txnid and payal id should have same value
              formData.append('userid', user_id);
              formData.append('txn_status',"approved");
              formData.append('txn_id', pid.toString());
              formData.append('amt',this.state.amount.toString());
              formData.append('paypal_id',pid.toString());
              formData.append('role',2);

              this.setState({loading_status:true})
              fetch('http://webmobril.org/dev/locum/api/recharge_wallet', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type':  'multipart/form-data',
              },
              body: formData

            }).then((response) => response.json())
                  .then((responseJson) => {
                    this.setState({loading_status:false})
                    //ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.SHORT);
                    showMessage(1, responseJson.message, 'Add Money', true, false);
                 
                    if (this.props.navigation.getParam('buy_package') == 1) {

                      var result = this.props.navigation.getParam('result');
                      var price = result["price"];
                      var packageid = result["package_id"];
                      var count = result['job_count'];
                      this.props.navigation.state.params.payAgain(packageid, price, count);
                      this.props.navigation.pop();
  
  
  
                    } else {
  
                      this.props.navigation.navigate('Wallet');
                      const resetAction = StackActions.reset({
                        index: 0,
                        key: 'Wallet',
                        actions: [NavigationActions.navigate({ routeName: 'Wallet' })],
                      });
                      this.props.navigation.dispatch(resetAction);
  
  
                    }

                  }).catch((error) => {
                    console.error(error);
                  });



        })
          .catch(error =>{
            showMessage(0,"Transaction declined by user", 'Add Money', true, false);
          
          })

      }

     })

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
                  <Text style={{fontFamily:"Roboto-Light",fontSize: 20,fontWeight: 'bold', color: "white",paddingRight:25}}>Add Money</Text>
                </View>

                <View>
                </View>

          </View>
          </KeyboardAvoidingView>


          {/*for main content*/}

          <View style={{padding:10,width:'90%'}}>


          <IPay88
            successNotify={this.successNotify}
            failedNotify={this.failedNotify}
            cancelNotify={this.cancelNotify}
          />





            <TextField
            style = {{width:'100%'}}
            onBlur={()=>{this.state.onFocusKeyboard}}
            label='Enter Amount '
            value={this.state.amount}
            keyboardType = 'numeric'
            maxLength={5}
            textContentType='telephoneNumber'
            onChangeText={ (amount) => {
              var a = amount.replace(/[^0-9.]/g, '')
              this.setState({amount:a})
            } }
          />


          <TouchableOpacity
           onPress={() => {Keyboard.dismiss(); this.pay()}}
            style={styles.submitButton}>
                <Text style={styles.submitText}>Add</Text>
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
      fontFamily:"Roboto-Light",
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

//   NetInfo.isConnected.fetch().then(isConnected => {
//   if(!isConnected)
//   {
//     this.props.navigation.navigate("NoNetwork")
//     return;
//   }
//   else{


//   }

//  })
