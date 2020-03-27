import React ,{useState, useEffect } from 'react';
import {View ,Text,ScrollView,FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {Card} from 'react-native-elements'
import {wallet_history} from '../redux/stores/actions/transaction_action';
import MyActivityIndicator from '../CustomUI/MyActivityIndicator';


const Wallet = (props) => {

    const dispatch = useDispatch();
    const loading_status = useSelector(state => state.register.loading_status);
    const wallets = useSelector(state => state.transactions.wallet_history);
    const user_id  = useSelector(state => state.auth.user_id);


    useEffect(()=> {

        dispatch(wallet_history(user_id));

    },[]);

    if(loading_status) {
        return <MyActivityIndicator />
    }

    return(
        <ScrollView>
             <View style={{flex:1}}>

                <TouchableOpacity 
                onPress={()=>{ props.navigation.navigate("AddMoney")}}
                style={{justifyContent:'flex-end',alignItems:"flex-end",paddingTop:25,paddingLeft:20,paddingRight:20}}>
                    <Text style={{color:"#4C74E6",fontSize:15,fontFamily:'roboto-bold'}}>+ ADD MONEY</Text>
                </TouchableOpacity>

                <FlatList
                    style={{ marginBottom: 20, marginTop: 25 }}
                    data={wallets}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    renderItem={({ item }) =>

                        <TouchableOpacity>
                            <View>

                                <Card containerStyle={{ padding: 15, borderRadius: 10 }} >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                                        <Text style={{ fontFamily:'Roboto-Light', fontSize: 15, color: 'black', fontWeight: 'bold' }}>Date : {item.created_at.split(" ")[0]}</Text>


                                        <Text style={{ fontFamily:'roboto-light', color: '#4C74E6', fontSize: 15 }}>${item.amt}</Text>
                                    </View>
                                </Card>
                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor={item => item.name}
                />



            </View>

        </ScrollView>
       
    )
} ;

const styles = StyleSheet.create({


})

export default Wallet;