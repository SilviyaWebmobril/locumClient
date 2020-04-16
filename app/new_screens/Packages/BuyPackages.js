import React , { useState ,useEffect } from 'react';
import {View ,Text,ScrollView , TouchableOpacity , FlatList,StyleSheet} from 'react-native';
import {Card } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import MyActivityIndicator from '../CustomUI/MyActivityIndicator';
import {get_packages,updateRemainingJobs} from '../redux/stores/actions/packages_coupon_action';
import { StackActions, NavigationActions } from 'react-navigation';
import { checkuserAuthentication,logoutUser} from '../redux/stores/actions/auth_action';
import NetInfo from "@react-native-community/netinfo";
import {buy_packages } from '../redux/stores/actions/packages_coupon_action';
import {showMessage} from '../Globals/Globals';


const BuyPackages = (props) => {

    const dispatch = useDispatch();
    const device_token  = useSelector(state => state.auth.device_token)
    const getPackages = useSelector(state =>state.packages_and_coupons.packages);
    const loading_status = useSelector(state =>state.register.loading_status);
    const user_id  = useSelector(state => state.auth.user_id);
    const [choosen_package_price, setChosenPackagePrice] = useState(""); 
    const [applied_coupon_status,setAppliedCouponStatus] = useState (false);
    const [applied_coupon_amount,setAppliedCouponAmount] = useState (0);
    const coupon_applied_package = useState(0);
    const user = useSelector(state => state.register.user)
    const authenticated = useSelector(state => state.auth.authenticated);
    const user_job_remaining = useSelector(state => state.register.user.jobs_remaining);

    useEffect(()=> {

        dispatch(get_packages());

    },[]);


    const applyPromoHandler = (id , amount , jobcount) => {

        let obj = {
            'user_id': user_id,
            'price': amount,
            'package_id': id,
            'job_count': jobcount

          }
          console.log("obj",obj);
          setChosenPackagePrice(amount);
          props.navigation.navigate("ApplyCoupon", {result:{...obj},checkcouponvalidity: checkcoupoun }) 
        //   const resetAction = StackActions.reset({
        //     index: 0,
        //     key: 'ApplyCoupon',
        //     actions: [NavigationActions.navigate({ routeName: 'ApplyCoupon' })],
        //   });
        //   props.navigation.dispatch(resetAction);

    }

    const checkcoupoun = (id,coupon_amt) =>{
      console.log("coupon",id);
      if(parseFloat(choosen_package_price) > parseFloat(coupon_amt)){
  
        setAppliedCouponStatus(true);
        setAppliedCouponAmount(coupon_amt);
       // this.setState({applied_coupon_status:true,coupon_amt:coupon_amt,coupon_applied_package : id});
      }
  
    }

    const buyNowHandler = (id ,package_price , jobs_count,couponApplied) => {

      console.log('jobs_count',jobs_count);


      NetInfo.isConnected.fetch().then(isConnected => {

        if(isConnected){

            dispatch(checkuserAuthentication(user_id,device_token))
              .then(response => {

                if(response.data.error){
                  showMessage(0, 'Session Expired! Please Login.', 'Buy Packages', true, false);
                  dispatch(logoutUser())
                  
                  props.navigation.navigate("Login");
                
                  const resetAction = StackActions.reset({
                    index: 0,
                    key: 'Login',
                    actions: [NavigationActions.navigate({ routeName: 'Login' })],
                  });
                  props.navigation.dispatch(resetAction);

                }else{

                let net_price = parseFloat(package_price)-parseFloat(applied_coupon_amount);
                dispatch(buy_packages(id ,user.id,net_price,jobs_count,couponApplied,props.navigation))
                  .then(response => {

                    console.log("hi",response);
                    if(response ==  1){

                      setAppliedCouponStatus(false);
                      setAppliedCouponAmount(0);
                     
                      props.navigation.navigate('Transactions');
                      const resetAction = StackActions.reset({
                        index: 0,
                        key: 'Transactions',
                        actions: [NavigationActions.navigate({ routeName: 'TransactionList' })],
                      });
                      props.navigation.dispatch(resetAction);

                    }else{
                      let obj = {
                        'user_id': user_id,
                        'price': net_price,
                        'package_id': id,
                        'job_count': jobs_count,
                        'coupon_applied' :couponApplied,
                      }
      
      
                      console.log("wallet",user.wallet_balance);
                      if (parseFloat(user.wallet_balance) <= 0 || parseFloat(user.wallet_balance) <  parseFloat(net_price) ) {
                        props.navigation.navigate("AddMoney", { buy_package: 1, result: obj,payAgain:buyNowHandler })
                        const resetAction = StackActions.reset({
                          index: 0,
                          key: 'AddMoney',
                          actions: [NavigationActions.navigate({ routeName: 'AddMoney' })],
                        });
                        props.navigation.dispatch(resetAction);
                      } 
                    }
                  })

                }
              })
            
         
        }else{
          props.navigation.navigate('NoNetwork');
        }

      });



    }
    const resetLocalState = () => {

      setAppliedCouponAmount(0);
      setAppliedCouponStatus(false)

    }

    if(loading_status){

        return <MyActivityIndicator /> 
    }


    return(
        <View>

            <FlatList
             contentContainerStyle={{ paddingBottom:10}}
              data={getPackages}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              renderItem={({ item }) =>


                
                  <Card containerStyle={{ padding: 10, borderRadius:4, borderColor:"#a7bbfa",elevation:4}} >
                    <Text style={{  fontFamily:'roboto-bold',color: 'black', fontSize: 17, marginBottom: 5,  color: "#4C74E6" }}>{item.name}</Text>
                    <View style={{  fontFamily:'roboto-light',flexDirection: "row", justifyContent: "space-between" }}>

                      <Text style={{ fontFamily:'roboto-light', color: 'black', fontSize: 15, marginBottom: 5, }}>Total Jobs </Text>
                      <Text style={{  fontFamily:'roboto-bold',marginBottom: 5,  }}>{item.jobs_count}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                      <Text style={{  fontFamily:'roboto-light',color: 'black', fontSize: 15, marginBottom: 5, }}>Cost </Text>
                      <Text style={{ fontFamily:'roboto-bold', marginBottom: 5 }}> $ {item.amt}</Text>
                    </View>

                    {applied_coupon_status
                    ?
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        
                        <TouchableOpacity onPress={()=>applyPromoHandler(item.id, item.amt , item.jobs_count)}>
                          <Text style={{ fontFamily:'roboto-light', color: '#4C74E6', alignSelf: "flex-start", fontWeight: "bold", fontSize: 12 }}>APPLY COUPON</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={buyNowHandler(item.id,item.amt , item.jobs_count ,"")}>
                          <Text style={{  fontFamily:'roboto-light',color: '#4C74E6', alignSelf: "flex-end", fontWeight: "bold", fontSize: 12 }}>BUY NOW</Text>
                        </TouchableOpacity>

                      </View>


                    :
                     ( coupon_applied_package == item.id 
                      
                      ?
                      <View >
                        <View style={{width:"100%",height:1,backgroundColor:"#808080",marginBottom:2}}></View>
                        <View style={{flexDirection:'row',marginTop:5,justifyContent: "space-between"}}>
                            <Text style={{ fontFamily:'roboto-light',}}>Coupon Price</Text>
                            <Text style={{ fontFamily:'roboto-light', color: 'black', fontSize: 15, marginBottom:2,fontWeight:"bold" }}>$ {this.state.coupon_amt}</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent: "space-between"}}>
                            <Text style={{ fontFamily:'roboto-light',}}>Amount Left To Pay</Text>
                            <Text style={{ fontFamily:'roboto-light', color: 'black', fontSize: 15,fontWeight:"bold" }}>$ {parseFloat(choosen_package_price) - parseFloat(this.state.coupon_amt)}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>buyNowHandler(item.id,item.amt , item.jobs_count,"")}>
                          <Text style={{ fontFamily:'roboto-light', color: '#4C74E6', alignSelf: "flex-end", fontWeight: "bold", fontSize: 12,marginTop:10 }}>BUY</Text>
                        </TouchableOpacity>
                      </View>
                      :
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        
                        <TouchableOpacity onPress={()=>applyPromoHandler(item.id, item.amt , item.jobs_count)}>
                          <Text style={{ fontFamily:'roboto-bold', color: '#4C74E6', alignSelf: "flex-start", fontSize: 12 }}>APPLY COUPON</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>buyNowHandler(item.id,item.amt , item.jobs_count,"")}>
                          <Text style={{ fontFamily:'roboto-bold', color: '#4C74E6', alignSelf: "flex-end", fontSize: 12 }}>BUY NOW</Text>
                        </TouchableOpacity>

                      </View>
                     )
                    
                    }
                  
                  </Card>
               

              }
              keyExtractor={item => item.id}
            />

        </View>
    )

}

export default BuyPackages;