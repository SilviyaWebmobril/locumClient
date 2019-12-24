import React, { Component } from 'react';
import {
  Text, View, Button, TextInput, StyleSheet, Dimensions, ScrollView, Image, FlatList, TouchableOpacity,SafeAreaView,
  ToastAndroid, Alert, ActivityIndicator, BackHandler, TouchableWithoutFeedback
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import PasswordInputText from 'react-native-hide-show-password-input';
//import FormData from 'FormData';
import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems, StackActions, NavigationActions } from 'react-navigation';
import PayPal from 'react-native-paypal-wrapper';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import Wallet from './Wallet';
import { showMessage } from './Globals';
import { Card } from 'react-native-elements';




export default class ApplyPromo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promo: '',
      amount: 0,
      loading_status: false,
      coupons: [],
      error: false,
      errorMsg: "Invalid Promo Code",
      promo_price:0,
      statusError:""
    };

  }










  isValid() {


    let valid = false;

    if (this.state.promo.length > 0 && this.state.promo.length > 0) {
      valid = true;
    }

    if (this.state.promo.length === 0) {

      showMessage(0, "You must enter promo code", "Apply Promo", true, false);
    }


    return valid;
  }

  paypal(price) {
    //ToastAndroid.show("Initializing paypal",ToastAndroid.LONG)

    PayPal.initialize(PayPal.SANDBOX, "ARFiHtTEV2P17X4Hdei6M4vqoLx_UVGAvELcTpNprLC4hNklLmNq7cl_z5OqhRGoBzzVRmS9sG-RfhXx");
    PayPal.pay({
      price: price.toString(),
      currency: 'USD',
      description: 'Payment for sign up',
    }).then(confirm => {

      var pid = confirm.response.id

      var result = this.props.navigation.getParam('result')
      var id = result["user_id"]
      var packageid = result["package_id"]

      var formData = new FormData();
      //txnid and payal id should have same value
      // formData.append('role', 5);
      // formData.append('user_id',id );
      // formData.append('amt',price.toString());
      // formData.append('txn_status',"approved");

      formData.append('userid', id);
      formData.append('txn_status', "approved");
      formData.append('txn_id', pid.toString());
      formData.append('amt', this.state.amount.toString());
      formData.append('paypal_id', pid.toString());
      formData.append('role', 5);
      formData.append('buy_packages', 1);
      formData.append('package_id', packageid);
      formData.append('job_count', result['job_count']);

      //formData.append('paypal_id',pid.toString());


      this.setState({ loading_status: true })
      fetch('http://webmobril.org/dev/locum/api/recharge_wallet', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData

      }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({ loading_status: false })
          //ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.SHORT);

          if (responseJson.status === 'success') {
            //success in inserting data
            showMessage(1, responseJson.message, "Apply Promo", true, false);

            this.props.navigation.navigate('Wallet');
            const resetAction = StackActions.reset({
              index: 0,
              key: 'Wallet',
              actions: [NavigationActions.navigate({ routeName: 'Wallet' })],
            });
            this.props.navigation.dispatch(resetAction);


          } else {

            showMessage(0, responseJson.message, "Apply Promo", true, false);

          }


        }).catch((error) => {
          console.error(error);
        });





      //ToastAndroid.show("price"+price+"bokingid...."+bookingId+"uiddd..."+pid+"date..."+date+"....pid"+pid, ToastAndroid.SHORT);
    })
      .catch(error => {
        showMessage(0, "Transaction declined by user", "Apply Promo", true, false);

        //  this.setState({quantity:1.0,  cash_status:'cash'})

      })


  }

  onApply() {

    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected) {
        this.props.navigation.navigate("NoNetwork")
        return;
      }
      else {

        if (this.isValid()) {
          var formData = new FormData();
          var result = this.props.navigation.getParam('result')
          var id = result["user_id"]
          var packageid = result["package_id"]
          //2 for clinic 5 for practitioner
          formData.append('user_id', id);
          formData.append('role', 5);
          formData.append('amt', this.state.amount);
          formData.append('coupon_code', this.state.promo);
          formData.append('package_id', packageid);
          formData.append('job_count', result['job_count']);
    
    
          if (this.isValid()) {
            NetInfo.isConnected.fetch().then(isConnected => {
              if (!isConnected) {
                this.props.navigation.navigate("NoNetwork")
                return;
              }
              else {
                this.setState({ loading_status: true })
    
                fetch('http://webmobril.org/dev/locum/api/apply_promo', {
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
                      showMessage(0, responseJson.message, "Apply Promo", true, false);
    
                      // Commented not getting now..
                      // var fees = responseJson.amt_to_pay
                      // this.setState({ amount: fees })
                      // if (fees == 0) {
                      //   //navigate to home
                      // }
                      // else {
                      //   this.paypal(fees)
                      // }
                      this.props.navigation.state.params.checkcouponvalidity(packageid,this.state.promo_price);
                      this.props.navigation.pop();
    
                    }
                    else {
    
                     // this.props.navigation.state.params.checkcouponvalidity(packageid);
                     
                      showMessage(0, responseJson.message, "Apply Promo", true, false);
    
                    }
                  }).catch((error) => {
                    console.error(error);
                  });
    
              }
    
            })
    
          }
        }

      }

    });
  
  }


  onSkip() {

    this.paypal(this.state.amount)

  }



  componentWillMount() {
    var result = this.props.navigation.getParam('result')

    var id = result["user_id"]
    var price = result['price']
    this.setState({ amount: price })
  }

  componentDidMount() {

    NetInfo.isConnected.fetch().then(isConnected => {
      if(!isConnected)
      {
        this.props.navigation.navigate("NoNetwork")
        return;
      }
      else{

        var result = this.props.navigation.getParam('result')

        var id = result["user_id"];
    
        this.setState({loading_status:true});
        fetch('http://webmobril.org/dev/locum/api/coupons_list?user_id='+id, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
    
        }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({ loading_status: false })
              
              if(responseJson.error){
    
                this.setState({statusError:responseJson.message})
              }else{
                this.setState({ coupons: responseJson.data });
              }
           
    
    
          }).catch((error) => {
            console.error(error);
          });

      }

    });

   
  }

  checkPromoCode = (promo) => {

    this.setState({ error: true })
    this.setState({ errorMsg: 'Invalid Promo Code' })

    this.setState({ promo: promo.trim() }, () => {

      let coupons = [...this.state.coupons];

      coupons.forEach(element => {


        if (this.state.promo === element.name) {
          this.setState({promo_price:element.price})
          console.log("cou", this.state.promo)
          this.setState({ error: false })
          this.setState({ errorMsg: '' })

        }

      });

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
      <View style={styles.container}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '09%', backgroundColor: '#4C74E6' }}>

          <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
            <Image style={{ width: 20, height: 20, margin: 10 }} source={require('../assets/clinic/left-arrow.png')} />
          </TouchableWithoutFeedback>

          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white", paddingRight: 25 }}>Apply Promo</Text>
          </View>

          <View>
          </View>

        </View>

        {this.state.statusError  == ""
        ?
        <View style={{ flex: 1, padding: 10 }}>


        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>

            <TextInput
              style={{ width: '100%', borderBottomColor: 'grey', borderBottomWidth: 1 }}
              label='Promo Code'
              value={this.state.promo}
              placeholder={'Enter Coupon Code Here...'}
              onChangeText={(promo) => this.checkPromoCode(promo)}
            />
            {this.state.error
              ?
              <Text style={{ color: "red", marginTop: 5 }}>{this.state.errorMsg}</Text>
              :
              <View />
            }


            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>

              <View style={{ textAlign:"right", margin: 5 }}>

                <TouchableOpacity
                  style={[styles.submitButton,{width:100}]}
                  onPress={this.onApply.bind(this)}
                  underlayColor='#fff'>
                  <Text style={[styles.submitText,{fontSize:12}]}>APPLY</Text>
                </TouchableOpacity>

              </View>

              {/* <View style={{ flex: 1, margin: 5 }}>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={this.onSkip.bind(this)}
                  underlayColor='#fff'>
                  <Text style={styles.submitText}>SKIP-COUPON</Text>
                </TouchableOpacity>

              </View> */}

            </View>

            <Text style={{ color: 'black', fontWeight: 'bold' }}>Total Amount :$ {this.state.amount}</Text>

            <FlatList

              data={this.state.coupons}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              renderItem={({ item }) =>


                <Card containerStyle={{ padding: 10, borderRadius: 5 }} >
                  <Text style={{ color: 'black', fontSize: 15, marginBottom: 5, fontWeight: "bold", color: "#4C74E6" }}>{item.name}</Text>

                  <Text style={{ marginBottom: 5 }}>Price : $ {item.price}</Text>

                  <TouchableOpacity onPress={() => {
                    this.setState({ promo: item.name })
                    this.setState({promo_price:item.price})
                  }}>
                    <Text style={{ color: '#4C74E6', alignSelf: "flex-end", fontWeight: "bold", fontSize: 12 }}>Apply</Text>
                  </TouchableOpacity>


                </Card>

              }
              keyExtractor={item => item.id}
            />
          </View>
        </ScrollView>



      </View>



      
        :
        <Text style={{textAlign:"center",justifyContent:"center",flex:1,marginTop:20,fontWeight:"bold",fontSize:14}}>{this.state.statusError}</Text>
        }

      </View>
      </View>

    )
  }
}


let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',



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


