import React ,{useState, useEffect} from 'react';
import {View,Text, TouchableOpacity,FlatList ,StyleSheet,ScrollView,TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {get_coupons} from '../redux/stores/actions/packages_coupon_action';
import MyActivityIndicator from '../CustomUI/MyActivityIndicator';
import {Card } from 'react-native-elements';
import { checkuserAuthentication} from '../redux/stores/actions/auth_action';
import { applyCoupons,updateRemainingJobs,buy_packages} from '../redux/stores/actions/packages_coupon_action';
import NetInfo from "@react-native-community/netinfo";
import { StackActions, NavigationActions } from 'react-navigation';


const ApplyCoupon = (props) => {

    const couponList  = useSelector(state => state.packages_and_coupons.coupons);
    
    const dispatch = useDispatch();
    const userid  = useSelector(state =>state.auth.user_id);
    const loading_status =  useSelector(state => state.register.loading_status);

    const user = useSelector(state => state.register.user);
    
    const [promo_name ,setPromoName] = useState("");
    const [promo_price ,setPromoPrice ] = useState("");
    const coupon_error = useSelector(state => state.packages_and_coupons.coupoun_error);
   
    const [error,setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("No Coupons Available");
    const amount = useState(props.navigation.getParam('result')['price']);
  
    const authenticated = useSelector(state => state.auth.authenticated);
   
    const user_job_remaining = useSelector(state => state.register.user.jobs_remaining);
    console.log(user_job_remaining);
    
    const [couponApplied ,setCouponApplied] = useState("");
  
    useEffect(()=> {

      
        dispatch(get_coupons(userid));
    },[]);


    const checkPromoCode = (promo) => {

        setError(true);
        setErrorMsg('Invalid Promo Code');
        setPromoName(promo);
        if(couponList.length > 0){

          let coupons = [...couponList];
    
          coupons.forEach(element => {
    
    
            if (promo_name === element.name) {

                  setPromoPrice(element.price);
                  setError(false);
                  setErrorMsg('');
            
            }
    
          });

        }
        
      
    
    
    }


  const isValid = () => {


    let valid = false;

    if (promo_name.length > 0 && promo_name.length > 0) {
      valid = true;
    }

    if (promo_name.length === 0) {

      showMessage(0, "You must enter promo code", "Apply Promo", true, false);
    }


    return valid;
  }

      const onApplyCoupon =() => {
        // let result = props.navigation.getParam('result')
        // console.log('resulttt',result);
        // return;

        if(isValid()){
          NetInfo.isConnected.fetch().then(isConnected => {
            if(isConnected) {
                dispatch(checkuserAuthentication(userid, props.navigation))
                if(authenticated){
                  //user_id ,package_id,amount ,coupon_code,job_count,
                  var result = props.navigation.getParam('result')
                  dispatch(applyCoupons(userid,result["package_id"],result["price"],promo_name,result['job_count']))
                    .then(response => {

                      console.log("final response",response);
                      if(response.data.amt_to_pay == 0){
                        // 1 then send to transaction and chage remaining job

                        let result = props.navigation.getParam('result')

                         let TotalJobs  = parseInt(user_job_remaining) + parseInt(result['job_count']);
                         console.log("job count222",TotalJobs);
                         dispatch(updateRemainingJobs(TotalJobs))
                         props.navigation.state.params.checkcouponvalidity(result["package_id"],promo_price);
                         props.navigation.pop();
                         props.navigation.navigate('TransactionList');
                           const resetAction = StackActions.reset({
                             index: 0,
                             key: 'Transactions',
                             actions: [NavigationActions.navigate({ routeName: 'TransactionList' })],
                           });
                           props.navigation.dispatch(resetAction);
   
   

                      }else{

                        // send to wallet to add money

                         // this.props.navigation.state.params.checkcouponvalidity(packageid);
                        let result = props.navigation.getParam('result')
                        setCouponApplied(response.data.coupon_applied)
                        buyNowHandler(result["package_id"],(parseFloat(amount) - parseFloat(promo_price)))
                        // this.setState({coupon_applied:responseJson.coupon_applied},()=>{
                        // this.pay(packageid,(parseFloat(this.state.amount) - parseFloat(this.state.promo_price)),result['job_count'] )
                      
                      //})
                      

                      }
                    })

                }

            }else{
              props.navigation.navigate('NoNetwork')
            }
            
          });
        }

      }


      const buyNowHandler = (id ,package_price , jobs_count) => {

        console.log('jobs_count',jobs_count);
  
  
        NetInfo.isConnected.fetch().then(isConnected => {
  
          if(isConnected){
  
              dispatch(checkuserAuthentication(userid,props.navigation));
              
              if(authenticated){
              
                let net_price = parseFloat(package_price)-parseFloat(promo_price);
                  dispatch(buy_packages(id ,user.id,net_price,jobs_count,props.navigation))
                    .then(response => {
  
                      console.log("hi",response);
                      if(response ==  1){
  
                        setAppliedCouponStatus(false);
                        setAppliedCouponAmount(0)
                        props.navigation.navigate('TransactionList');
                        const resetAction = StackActions.reset({
                          index: 0,
                          key: 'Transactions',
                          actions: [NavigationActions.navigate({ routeName: 'TransactionList' })],
                        });
                        props.navigation.dispatch(resetAction);
  
                      }else{
                        let obj = {
                          'user_id': userid,
                          'price': net_price,
                          'package_id': id,
                          'job_count': jobs_count
                        }
        
        
                        console.log("wallet",user.wallet_balance);
                        if (parseFloat(user.wallet_balance) <= 0 || parseFloat(user.wallet_balance) <  parseFloat(net_price) ) {
                          props.navigation.navigate("Wallet", { buy_package: 1, result: obj,payAgain:buyNowHandler })
                          const resetAction = StackActions.reset({
                            index: 0,
                            key: 'Wallet',
                            actions: [NavigationActions.navigate({ routeName: 'Wallet' })],
                          });
                          props.navigation.dispatch(resetAction);
                        } 
                      }
                  })
              
              }
  
          }else{
            props.navigation.navigate('NoNetwork');
          }
  
      });

      }
  

      if(loading_status){
        return (
          <MyActivityIndicator />
        )
      }
    
    return (
     
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1,margin:10 }}>
          {coupon_error  && couponList.length == 0
            ?
                <Text style={{justifyContent:"center",alignItems:"center",color:"grey",fontFamily:"roboto-bold",textAlign:'center'}}>No Coupons Available</Text>
            :
            <>

            <TextInput
              style={{ width: '100%', borderBottomColor: 'grey', borderBottomWidth: 1 }}
              label='Promo Code'
              value={promo_name}
              placeholder={'Enter Coupon Code Here...'}
              onChangeText={(promo) =>checkPromoCode(promo)}
            />
            {error
              ?
              <Text style={{ color: "red", marginTop: 5 ,fontFamily:'roboto-light'}}>{errorMsg}</Text>
              :
              <View />
            }


            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',textAlign:"right",margin: 5 }}>

                <TouchableOpacity
                  style={[styles.submitButton,{width:100,borderRadius:4}]}
                  onPress={onApplyCoupon}
                  underlayColor='#fff'>
                  <Text style={[styles.submitText,{fontSize:12,fontFamily:'roboto-light'}]}>APPLY</Text>
                </TouchableOpacity>

            </View>

            <Text style={{ color: 'black', fontFamily:'roboto-bold' }}>Total Amount :$ {amount}</Text>

           
                <FlatList

                data={couponList}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                renderItem={({ item }) =>


                    <Card containerStyle={{ padding: 10, borderRadius: 5 }} >
                    <Text style={{fontFamily:'roboto-light', color: 'black', fontSize: 15, marginBottom: 5, fontWeight: "bold", color: "#4C74E6" }}>{item.name}</Text>

                    <Text style={{fontFamily:'roboto-light', marginBottom: 5 }}>Price : $ {item.price}</Text>

                    <TouchableOpacity onPress={() => {
                        setPromoName(item.name);
                        setPromoPrice(item.price);
                    
                    }}>
                        <Text style={{fontFamily:'roboto-light', color: '#4C74E6', alignSelf: "flex-end", fontWeight: "bold", fontSize: 12 }}>Apply</Text>
                    </TouchableOpacity>


                    </Card>

                }
                keyExtractor={item => item.id}
                />
            </>
            }
           
          </View>
        </ScrollView>

    )
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
      fontFamily:'Roboto-Light',
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
  
  
  

export default ApplyCoupon;