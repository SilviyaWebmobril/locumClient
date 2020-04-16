import React ,{useState, useEffect} from 'react';
import {View, Text,TouchableOpacity,TextInput ,StyleSheet, Keyboard,ToastAndroid,Alert} from 'react-native';
import IPay88, { Pay } from "ipay88-sdk";
import { TextField } from 'react-native-material-textfield';
import {showMessage} from '../Globals/Globals';
import NetInfo from "@react-native-community/netinfo";
import { useSelector, useDispatch } from 'react-redux';
import MyActivityIndicator from '../CustomUI/MyActivityIndicator';
import { checkuserAuthentication,logoutUser } from '../redux/stores/actions/auth_action';
import {
	StackActions, NavigationActions
} from 'react-navigation';

const AddMoney = (props) => {

    const [amount,setAmount] = useState("");
    const dispatch = useDispatch();
    const device_token  = useSelector(state => state.auth.device_token)
    const [onFocusKeyboard, setOnFocusKeyboard]  = useState('');
    const user_id = useSelector(state => state.auth.user_id);
    const loading_status = useSelector(state =>state.register.loading_status);



  const isValid = () =>{

    var isnum = /^\d+$/.test(amount);


    let valid = false;

    if (amount.toString().trim().length > 0) {
      valid = true;
    }

    if (amount.toString().trim().length === 0) {

      showMessage(0, 'You must enter Amount', 'Add Money', true, false);

      return false
    }
    else if (!isnum) {
      showMessage(0, 'Please Enter Valid Amount ', 'Add Money', true, false);

      return false;
    }




    return valid;
  }

  if(loading_status){

    return <MyActivityIndicator /> 
}




  const ipay88Payment = async (data) => {

    
    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected) {
        props.navigation.navigate("NoNetwork")
        return;
      }
      else {

        dispatch(checkuserAuthentication(user_id,device_token))
          .then(response => {

              if(response.data.error){
                showMessage(0, 'Session Expired! Please Login.', 'Add Money', true, false);
                dispatch(logoutUser())
                props.navigation.navigate("Login");
              
                const resetAction = StackActions.reset({
                  index: 0,
                  key: 'Login',
                  actions: [NavigationActions.navigate({ routeName: 'Login' })],
                });
                props.navigation.dispatch(resetAction);

              }else{

                var formData = new FormData();
                //txnid and payal id should have same value
                formData.append('userid', user_id);
                formData.append('txn_status', "approved");
                if(Platform.OS == "ios"){
                  formData.append('txn_id', data.transactionID.toString());
                }else{
                  formData.append('txn_id', data.transactionId.toString());
                }
                formData.append('amt', data.amount.toString());
                //formData.append('paypal_id',pid.toString());
                formData.append('role', 2);
                console.log("formdata id",formData);
        
                
                fetch('http://webmobril.org/dev/locum/api/recharge_wallet', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                  },
                  body: formData
        
                }).then((response) => response.json())
                  .then((responseJson) => {
                    
                    console.log("res... ipay",responseJson)
                    //ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.SHORT);
        
                    if (responseJson.status === 'success') {
                      //success in inserting data
        
                      showMessage(1, responseJson.message, 'Add Money', true, false);
        
        
                      if (props.navigation.getParam('buy_package') == 1) {
        
                        var result = props.navigation.getParam('result');
                        var price = result["price"];
                        var packageid = result["package_id"];
                        var count = result['job_count'];
                        var coupon = result['coupon_applied'];
                        props.navigation.state.params.payAgain(packageid, price, count,coupon);
                        props.navigation.pop();
        
        
        
                      } else {
        
                        props.navigation.navigate('Wallet');
                        const resetAction = StackActions.reset({
                          index: 0,
                          key: 'Wallet',
                          actions: [NavigationActions.navigate({ routeName: 'Wallet' })],
                        });
                        props.navigation.dispatch(resetAction);
        
        
                      }
        
        
        
                    } else {
        
                      showMessage(0, responseJson.message, 'Add Money', true, false);
        
                    }
        
        
                  }).catch((error) => {
                    console.error(error);
                  });
        
        
        
        

              }

          })

      

      }

    })


  }

  const successNotify = data => {

    if (Platform.OS === "ios") {
      ipay88Payment(data)
      
      Alert.alert("Message", `Payment Completed Successfully!`, {
        cancelable: true
      });
    } else {

      console.log("my data is",data);
      ipay88Payment(data);
     
     
      showMessage(1, `Payment Completed Successfully!`, 'Add Money', true, false);
     
    }
    
  };

  const cancelNotify = data => {
    const { transactionId, referenceNo, amount, remark, error } = data;

    if (Platform.OS === "ios") {
      Alert.alert("Message", `${error}`, { cancelable: true });
    } else {
      ToastAndroid.show(`${error}`, ToastAndroid.LONG);
    }
  };

  const failedNotify = data => {
    const { transactionId, referenceNo, amount, remark, error } = data;

    if (Platform.OS === "ios") {
      Alert.alert("Message", `${error}`, { cancelable: true });
    } else {

      console.log("ERROR", JSON.stringify(data))
      ToastAndroid.show(`${error}`, ToastAndroid.LONG);
    }
  };

  const pay = async() => {

    Keyboard.dismiss();
   
    if (isValid()) {

      dispatch(checkuserAuthentication(user_id,device_token))
        .then(response => {
          
          if(response.data.error){

            showMessage(0, 'Session Expired! Please Login.', 'Add Money', true, false);
            dispatch(logoutUser())
            props.navigation.navigate("Login");
          
            const resetAction = StackActions.reset({
              index: 0,
              key: 'Login',
              actions: [NavigationActions.navigate({ routeName: 'Login' })],
            });
            props.navigation.dispatch(resetAction);


          }else{

            try {
              const data = {};
              data.paymentId = "2"; // refer to ipay88 docs
              data.merchantKey = "QrB9d97iae";
              data.merchantCode = "M05194";
              //data.referenceNo = (Math.floor(100000 + Math.random() * 900)).toString();
              data.referenceNo =  Math.floor(100000 + Math.random() * 900000).toString();
              data.amount = amount.toString();
              data.currency = "MYR";
              data.productDescription = "Payment";
              data.userName = "locum";
              data.userEmail = "test123@gmail.com";
              data.userContact = "0123456789";
              data.remark = "me";
              data.utfLang = "UTF-8";
              data.country = "MY";
              data.backendUrl = "http://webmobril.com";
              const errs = Pay(data);
              // if (Object.keys(errs).length > 0) {
              //   console.log(JSON.stringify(errs));
              // }
            } catch (e) {
              console.log("hi",e);
            }

          }
        })
      
    }
  };



    return(
        <View style={styles.container}>
            <IPay88
            successNotify={successNotify}
            failedNotify={failedNotify}
            cancelNotify={cancelNotify}
          />



          <TextField
            style={{ width: '100%' }}
            onBlur={()=>{onFocusKeyboard}}
            label='Enter Amount '
            value={amount}
            keyboardType='numeric'
            maxLength={8}
            textContentType='telephoneNumber'
            onChangeText={(amount) => {
              var a = amount.replace(/[^0-9.]/g, '')
              setAmount(amount);
              setOnFocusKeyboard(true);
             
            }}
          />


          <TouchableOpacity
            //  onPress={()=>{Keyboard.dismiss(); this.paypal()}}
            onPress={()=>pay()}
            style={styles.submitButton}>
            <Text style={styles.submitText}>Add</Text>
          </TouchableOpacity>

        </View>
    )
}



let styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      marginLeft:20,
      marginRight:20
    
  
    },
    submitButton: {
      width: '100%',
      marginTop: 30,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: '#4C74E6',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#fff',
      marginTop: 40,
  
    },
    submitText: {
      color: 'white',
      textAlign: 'center',
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 17,
      fontFamily:'roboto-bold'
    },
    indicator: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 80
    }
  
  })
  

export default AddMoney ;