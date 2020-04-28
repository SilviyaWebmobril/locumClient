import React ,{ useState, useEffect } from 'react';
import {View,Text,StyleSheet,TouchableOpacity ,Image,FlatList,ScrollView} from 'react-native';
import {Card } from 'react-native-elements';
import {transcationHistory} from '../redux/stores/actions/transaction_action';
import {useDispatch ,useSelector } from 'react-redux';
import MyActivityIndicator from '../CustomUI/MyActivityIndicator';
import {checkuserAuthentication ,logoutUser} from '../redux/stores/actions/auth_action'
import {
	StackActions, NavigationActions
} from 'react-navigation';
import {showMessage} from '../Globals/Globals';



const TransactionList  = () => {

    const dispatch = useDispatch();
    const device_token  = useSelector(state => state.auth.device_token)
    const loading_status  = useSelector(state => state.register.loading_status);
    const transactionsList  = useSelector(state => state.transactions.transaction_history);
    const user_id = useSelector(state =>  state.auth.user_id);

    useEffect(()=>{

        dispatch(checkuserAuthentication(user_id,device_token))
            .then(response => {
                if(response.data.error){
                    showMessage(0, 'Session Expired! Please Login.', 'Transaction List', true, false);
                    dispatch(logoutUser())
                    props.navigation.navigate("Login");
                  
                    const resetAction = StackActions.reset({
                      index: 0,
                      key: 'Login',
                      actions: [NavigationActions.navigate({ routeName: 'Login' })],
                    });
                    props.navigation.dispatch(resetAction);

                }else{
                    dispatch(transcationHistory(user_id));
                }
            })
       

    },[]);
    
    if(loading_status){

        return <MyActivityIndicator /> 
    }


    return(
        <ScrollView>

            <View style={styles.container}>

                    <FlatList
                        contentContainerStyle={{ paddingBottom:10}}
                        data={transactionsList}
                        showsVerticalScrollIndicator={true}
                        scrollEnabled={false}
                        renderItem={({ item }) =>


                    
                            <Card containerStyle={{ padding: 12, borderRadius: 5 ,borderColor:"#a7bbfa",elevation:4}} >
                                <Text style={{ fontFamily:'roboto-bold', color: 'black', fontSize: 17, marginBottom: 10,  color: "#4C74E6", }}>{item.package.name}</Text>
                                <View style={{ flexDirection: "row", marginLeft: 10, marginBottom: 10 }}>
                                    <Image source={require('../assets/nav/clock.png')} style={{ width: 15, height: 15 }} />
                                    <Text style={{ fontFamily:'roboto-light', fontSize: 12, marginLeft: 5, marginTop: -2 }}>{item.created_at.split(' ')[1]}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                                    <Text style={{ fontFamily:'roboto-light', alignSelf: "flex-end", fontSize: 15 }}>Date</Text>
                                    <Text style={{ fontFamily:'roboto-light', color: '#4C74E6', alignSelf: "flex-end", fontWeight: "bold", fontSize: 15 }}>{item.created_at.split(' ')[0]}</Text>
                                </View>
                                {/* <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                                    <Text style={{ fontFamily:'roboto-light', alignSelf: "flex-end", fontSize: 15 }}>Mode Of Payment</Text>
                                    <Text style={{ fontFamily:'roboto-light', color: '#4C74E6', alignSelf: "flex-end", fontWeight: "bold", fontSize: 15 }}>Wallet</Text>
                                </View> */}
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                                    <Text style={{ fontFamily:'roboto-light', alignSelf: "flex-end", fontSize: 15 }}>Available Jobs</Text>
                                    <Text style={{ fontFamily:'roboto-light', color: '#4C74E6', alignSelf: "flex-end", fontWeight: "bold", fontSize: 15 }}>{item.package.jobs_count}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                                    <Text style={{ fontFamily:'roboto-bold', alignSelf: "flex-end", fontSize: 15,color:"grey" }}>Package Price</Text>
                                    <Text style={{ fontFamily:'roboto-light', color: '#4C74E6', alignSelf: "flex-end", fontWeight: "bold", fontSize: 15 }}>MYR  {item.package.amt}</Text>
                                </View>

                                <View style={{ width: "100%", height: 1, backgroundColor: "#808080", marginBottom: 5 }}></View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                                    <Text style={{ fontFamily:'roboto-light', alignSelf: "flex-end", fontSize: 15, color: 'grey', fontWeight: "bold" }}>Total</Text>
                                    <Text style={{ fontFamily:'roboto-light', color: 'grey', alignSelf: "flex-end", fontWeight: "bold", fontSize: 15 }}>MYR  {item.package.amt}</Text>
                                </View>
                                {item.coupon !== null 
                                ?
                                    ((item.purchased_using == 2) || (item.purchased_using == 3)
                                        ?
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                                            <Text style={{ fontFamily:'roboto-light', alignSelf: "flex-end", fontSize: 15, color: 'grey', }}>Coupon ({item.coupon.name})</Text>
                                            <Text style={{ fontFamily:'roboto-light', color: 'grey', alignSelf: "flex-end",  fontSize: 15 }}> -MYR  {item.coupon.price}</Text>
                                        </View>
                                        :
                                        <View/>
                                    )
                                :
                                    <View/>
                                }

                                
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                                    <Text style={{ fontFamily:'roboto-light', alignSelf: "flex-end", fontSize: 15, color: 'black',  }}>Paid By Wallet</Text>
                                    <Text style={{ fontFamily:'roboto-light', color: '#4C74E6', alignSelf: "flex-end", fontWeight: "bold", fontSize: 15 }}>{item.purchased_using == 2 ? 'MYR  0' : 'MYR  '+item.amt}</Text>
                                </View>
                                




                            </Card>


                        }
                        keyExtractor={item => item.id}
                    />

            </View>

        </ScrollView>
        
    )

}

const styles = StyleSheet.create({

    container:{
       flex:1
    }
})

export default TransactionList ;