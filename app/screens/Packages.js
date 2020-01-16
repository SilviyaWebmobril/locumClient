import React, { Component } from 'react';
import {
  Text, View, Button, StyleSheet, SafeAreaView,
  Dimensions, ScrollView, Image, FlatList, ActivityIndicator,
  TouchableOpacity, ToastAndroid, TouchableWithoutFeedback
} from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import PayPal from 'react-native-paypal-wrapper';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from './Globals';
import { StackActions, NavigationActions } from 'react-navigation';


export default class Packages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
      loading_status: false,
      choosen_package_price:0,
      applied_coupon_status : false,
      coupon_amt:0,
      coupon_applied_package:0


    };

  }

  fetch() {

    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected) {
        this.props.navigation.navigate("NoNetwork")
        return;
      }else{

        this.setState({ loading_status: true })

        fetch('http://webmobril.org/dev/locum/api/packages', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
    
          },
    
    
          }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({ loading_status: false })
    
            //ToastAndroid.show(JSON.stringify(responseJson),ToastAndroid.SHORT)
            if (responseJson.status === 'success') {
              var length = responseJson.data.length
              var temp_arr = []
              if (length > 0) {
    
                for (var i = 0; i < length; i++) {
                  var id = responseJson.data[i].id
                  var jobs_count = responseJson.data[i].jobs_count
                  var amt = responseJson.data[i].amt
    
    
    
                  const array = [...temp_arr];
                  array[i] = { ...array[i], name: responseJson.data[i].name }
                  array[i] = { ...array[i], id: id };
                  array[i] = { ...array[i], jobs_count: jobs_count };
                  array[i] = { ...array[i], amt: amt };
    
                  temp_arr = array
                  // this.setState({ jobs : array });
                  //  ToastAndroid.show("Make id!!! without empty...."+ this.state.selected_make, ToastAndroid.LONG);
                }//end of for
    
                //return true;
                this.setState({ packages: temp_arr })
              }
    
              else {
                let arr = [];
                this.setState({ packages: arr })
                // Alert.alert("No Record Found!!!");
                showMessage(1, "No packages Found!!!", 'Packages', true, false);
    
                // ToastAndroid.show("Make id!!!..with empty.."+ this.state.selected_make, ToastAndroid.LONG);
                return false;
              }
    
            }
            else {
              showMessage(1, "No packages Found!!!", 'Packages', true, false);
    
            }
    
    
    
    
          }).catch((error) => {
            console.error(error);
        });
      }
    
    });
    
   
  }

  pay= async(id, price, count) => {

    NetInfo.isConnected.fetch().then(async isConnected =>  {
      if (!isConnected) {
        this.props.navigation.navigate("NoNetwork")
        return;
      }else{


        let wallet = await AsyncStorage.getItem('avlbal');
        console.log("calling pay again",wallet);
        AsyncStorage.getItem('uname')
          .then((item) => {
            if (item) {
              var formData = new FormData();
              //txnid and payal id should have same value
              formData.append('package_id', id);
              formData.append('user_id', item);
              formData.append('amt', price.toString());
              formData.append('job_count', count);
    
    
              this.setState({ loading_status: true })
              fetch('http://webmobril.org/dev/locum/api/get_package', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'multipart/form-data',
                },
                body: formData
    
              }).then((response) => response.json())
                .then((responseJson) => {
                  this.setState({ loading_status: false })
                  
                  if (responseJson.status === 'success') {
                    //success in inserting data
                    
                    let new_price = parseFloat(wallet) - parseFloat(price);
                    console.log("res.........",responseJson);
                    AsyncStorage.setItem("avlbal", new_price.toString());
                   AsyncStorage.setItem('job_remaining',responseJson.jobs_remaining.toString())
                    showMessage(1, responseJson.message, 'Packages', true, false);
                    this.setState({coupon_applied_package:0,coupon_amt:0,applied_coupon_status:false})
                   
                    this.props.navigation.navigate('Transactions');
                    const resetAction = StackActions.reset({
                      index: 0,
                      key: 'Transactions',
                      actions: [NavigationActions.navigate({ routeName: 'TransactionsList' })],
                    });
                    this.props.navigation.dispatch(resetAction);
                    
                   // this.onRefresh();
    
                  } else {
    
                    let obj = {
                      'user_id': item,
                      'price': price,
                      'package_id': id,
                      'job_count': count
                    }
    
    
                    if (parseFloat(wallet) <= 0 || parseFloat(wallet) <  (parseFloat(this.state.choosen_package_price) - parseFloat(this.state.coupon_amt))) {
                      this.props.navigation.navigate("AddMoney", { buy_package: 1, result: obj,payAgain:this.pay })
                      const resetAction = StackActions.reset({
                        index: 0,
                        key: 'AddMoney',
                        actions: [NavigationActions.navigate({ routeName: 'AddMoney' })],
                      });
                      this.props.navigation.dispatch(resetAction);
                    } 
                    showMessage(1, responseJson.message, 'Packages', true, false);
    
                  }
    
    
                }).catch((error) => {
                  console.error(error);
                });
    
            }
            else { }
          });

      }
    });
   
  }

  paypal(id, price) {
   
    PayPal.initialize(PayPal.SANDBOX, "ARFiHtTEV2P17X4Hdei6M4vqoLx_UVGAvELcTpNprLC4hNklLmNq7cl_z5OqhRGoBzzVRmS9sG-RfhXx");
    PayPal.pay({
      price: price.toString(),
      currency: 'USD',
      description: 'Payment for purchasing packages',
    }).then(confirm => {

      var pid = confirm.response.id
      AsyncStorage.getItem('uname')
        .then((item) => {
          if (item) {
            var formData = new FormData();
            //txnid and payal id should have same value
            formData.append('package_id', id);
            formData.append('user_id', item);
            formData.append('amt', price.toString());
            formData.append('txn_status', "approved");
            formData.append('txn_id', pid.toString());
            formData.append('paypal_id', pid.toString());


            this.setState({ loading_status: true })
            fetch('http://webmobril.org/dev/locum/api/get_package', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
              },
              body: formData

            }).then((response) => response.json())
              .then((responseJson) => {

                console.log("response... ",responseJson);
                this.setState({ loading_status: false })
                //ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.SHORT);

                if (responseJson.status === 'success') {
                  //success in inserting data
                  showMessage(1,responseJson.message,"Packages",true,false);
                 
                  // this.props.navigation.navigate('Wallet');
                  // const resetAction = StackActions.reset({
                  //   index: 0,
                  //   actions: [NavigationActions.navigate({ routeName: 'Wallet' })],
                  // });
                  // this.props.navigation.dispatch(resetAction);

                } else {

                  showMessage(0,responseJson.message,"Packages",true,false);
                
                }


              }).catch((error) => {
                console.error(error);
              });

          }
          else { }
        });





      //ToastAndroid.show("price"+price+"bokingid...."+bookingId+"uiddd..."+pid+"date..."+date+"....pid"+pid, ToastAndroid.SHORT);
    })
      .catch(error => {
        showMessage(0,"Transaction declined by user","Packages",true,false);
       
        //  this.setState({quantity:1.0,  cash_status:'cash'})

      })


  }

  applyPromo = async(id) =>{

    const item = await AsyncStorage.getItem('uname');
    console.log("item",item);
  

    if (this.state.packages.length > 0) {
      //var jobs = this.state.jobs
      for (var i = 0; i < this.state.packages.length; i++) {
        if (this.state.packages[i].id == id) {
         

          let obj = {
            'user_id': item,
            'price': this.state.packages[i].amt,
            'package_id': this.state.packages[i].id,
            'job_count': this.state.packages[i].jobs_count
          }
          this.setState({choosen_package_price:this.state.packages[i].amt},()=>{

            console.log("choose pack price",this.state.choosen_package_price);
            this.props.navigation.navigate("ApplyPromo", { checkcouponvalidity: this.checkcoupoun ,result:obj}) 
            const resetAction = StackActions.reset({
              index: 0,
              key: 'ApplyPromo',
              actions: [NavigationActions.navigate({ routeName: 'ApplyPromo' })],
            });
            this.props.navigation.dispatch(resetAction);


          });
         
         
        }
      }
    }




  }
  checkcoupoun = (id,coupon_amt) =>{
    console.log("coupon",id);
    if(parseFloat(this.state.choosen_package_price) > parseFloat(coupon_amt)){

      this.setState({applied_coupon_status:true,coupon_amt:coupon_amt,coupon_applied_package : id});
    }

  }




  next(id) {
    if (this.state.packages.length > 0) {
      //var jobs = this.state.jobs
      for (var i = 0; i < this.state.packages.length; i++) {
        if (this.state.packages[i].id == id) {
          let result = {}
          result["id"] = this.state.packages[i].id
          result["amount"] = this.state.packages[i].amt

          this.setState({choosen_package_price:this.state.packages[i].amt})
          this.pay(this.state.packages[i].id, (parseFloat(this.state.packages[i].amt) - parseFloat(this.state.coupon_amt)), this.state.packages[i].jobs_count)
        }
      }
    }
  }

  async componentDidMount() {
    //	let user_id = await this._getStorageValue()

    this.fetch()
  }

  render() {


    //  if (this.state.loading_status) {
    //    return (
    //      <ActivityIndicator
    //      animating={true}
    //      style={styles.indicator}
    //      size="large"
    //      />
    //    );
    //  }



    //         return (


    // 		<View style ={styles.container}>
    // 			{/*for header*/}
    // 			 <View style = {{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'100%',height:'09%',backgroundColor: '#4C74E6'}}>

    // 						<TouchableWithoutFeedback onPress={() =>this.props.navigation.navigate("HomeScreen")}>
    // 									 <Image style={{width: 25, height: 25,margin:10}}  source={require('../assets/clinic/left-arrow.png')} />
    // 						 </TouchableWithoutFeedback>

    // 						 <View>
    // 						  <Text style={{fontSize: 21,fontWeight: 'bold', color: "white",paddingRight:25}}>Packages</Text>
    // 						 </View>

    // 						<View>
    // 						</View>

    // 			 </View>

    // 			 {/*for main content*/}
    // 			 <ScrollView style={{paddingBottom:15,width:'100%'}}>
    // 			 <View style={{padding:1,width:'100%'}}>
    // 						  <FlatList
    // 							  style={{marginBottom:20}}
    // 							  data={this.state.packages}
    // 							  showsVerticalScrollIndicator={false}
    // 							  scrollEnabled={false}
    // 							  renderItem={({item}) =>

    // 							   <TouchableOpacity  onPress={() => this.next(item.id)}>
    // 									  <View>
    // 											<Card containerStyle={{padding: 10,borderRadius:10}} >
    // 											  <Text style={{color:'black',fontSize:18,marginBottom:5}}>Total Jobs : {item.jobs_count}</Text>
    // 											  <Text style={{marginBottom:5}}>$ {item.amt}</Text>
    // 											  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    //                         <Text></Text>
    // 											  <Text style={{color:'#4C74E6'}}>BUY NOW</Text>
    // 											  </View>
    // 											</Card>
    // 								</View>
    // 							  </TouchableOpacity>
    // 							  }
    // 							  keyExtractor={item => item.id}
    // 							/>
    // 			 </View>
    // 			</ScrollView>
    // 		</View>

    //         )


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
        {/*for header*/}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '09%', backgroundColor: '#4C74E6' }}>

          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("HomePage")}>
            <Image style={{ width: 20, height: 20, margin: 10 }} source={require('../assets/clinic/left-arrow.png')} />
          </TouchableWithoutFeedback>

          <View>
            <Text style={{fontFamily:"Roboto-Light",  fontSize: 20, fontWeight: 'bold', color: "white", paddingRight: 25 }}>Packages</Text>
          </View>

          <View>
          </View>

        </View>

        {/*for main content*/}
        <ScrollView style={{ paddingBottom: 15, width: '100%' }}>
          <View style={{ padding: 1, width: '100%' }}>
            <FlatList
              style={{ marginBottom: 20 }}
              data={this.state.packages}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              renderItem={({ item }) =>


                <View style={{ width: '100%' }}>
                  <Card containerStyle={{ padding: 10, borderRadius: 5 }} >
                    <Text style={{fontFamily:"Roboto-Light",  color: 'black', fontSize: 18, marginBottom: 5, fontWeight: "bold", color: "#4C74E6" }}>{item.name}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                      <Text style={{fontFamily:"Roboto-Light",  color: 'black', fontSize: 15, marginBottom: 5, }}>Total Jobs </Text>
                      <Text style={{fontFamily:"Roboto-Light",  marginBottom: 5, fontWeight: "bold" }}>{item.jobs_count}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                      <Text style={{fontFamily:"Roboto-Light",  color: 'black', fontSize: 15, marginBottom: 5, }}>Cost </Text>
                      <Text style={{fontFamily:"Roboto-Light",  marginBottom: 5, fontWeight: "bold" }}> $ {item.amt}</Text>
                    </View>

                    {!this.state.applied_coupon_status
                      ?
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                        <TouchableOpacity onPress={() => this.applyPromo(item.id)}>
                          <Text style={{fontFamily:"Roboto-Light",  color: '#4C74E6', alignSelf: "flex-start", fontWeight: "bold", fontSize: 12 }}>APPLY COUPON</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.next(item.id)}>
                          <Text style={{fontFamily:"Roboto-Light",  color: '#4C74E6', alignSelf: "flex-end", fontWeight: "bold", fontSize: 12 }}>BUY NOW</Text>
                        </TouchableOpacity>

                      </View>


                      :
                      (this.state.coupon_applied_package == item.id

                        ?
                        <View >
                          <View style={{ width: "100%", height: 1, backgroundColor: "#808080", marginBottom: 2 }}></View>
                          <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: "space-between" }}>
                            <Text style={{fontFamily:"Roboto-Light", }}>Coupon Price</Text>
                            <Text style={{fontFamily:"Roboto-Light",  color: 'black', fontSize: 15, marginBottom: 2, fontWeight: "bold" }}>$ {this.state.coupon_amt}</Text>
                          </View>
                          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                            <Text style={{fontFamily:"Roboto-Light", }}>Amount Left To Pay</Text>
                            <Text style={{fontFamily:"Roboto-Light",  color: 'black', fontSize: 15, fontWeight: "bold" }}>$ {parseFloat(this.state.choosen_package_price) - parseFloat(this.state.coupon_amt)}</Text>
                          </View>
                          <TouchableOpacity onPress={() => this.next(item.id)}>
                            <Text style={{fontFamily:"Roboto-Light",  color: '#4C74E6', alignSelf: "flex-end", fontWeight: "bold", fontSize: 12, marginTop: 10 }}>BUY</Text>
                          </TouchableOpacity>
                        </View>
                        :
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                          <TouchableOpacity onPress={() => this.applyPromo(item.id)}>
                            <Text style={{ fontFamily:"Roboto-Light", color: '#4C74E6', alignSelf: "flex-start", fontWeight: "bold", fontSize: 12 }}>APPLY COUPON</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => this.next(item.id)}>
                            <Text style={{fontFamily:"Roboto-Light",  color: '#4C74E6', alignSelf: "flex-end", fontWeight: "bold", fontSize: 12 }}>BUY NOW</Text>
                          </TouchableOpacity>

                        </View>
                      )

                    }

                  </Card>
                </View>

              }
              keyExtractor={item => item.id}
            />
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
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
  },
  submitButton: {
    width: '100%',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#009AFF',
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
    fontSize: 20,
    fontWeight: 'bold'
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }

})
