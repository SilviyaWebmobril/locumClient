import React ,  {Component}from 'react';
import { Text, View, Button, StyleSheet,SafeAreaView, Dimensions, ScrollView, Image,
  FlatList, TouchableOpacity,ToastAndroid,AsyncStorage ,TouchableWithoutFeedback} from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';

export default class TransactionDetails extends Component {
    constructor(props) {
        super(props);
		this.state = {
		};

    }


	static navigationOptions = {
		tabBarVisible: false,
	  };



    render() {
        return (

			<View style={{flex:1}}>
			<SafeAreaView style={{  backgroundColor: '#4C74E6'}} />
		<View style ={styles.container}>
			{/*for header*/}

			 {/*for main content*/}
			 <ScrollView style={{paddingBottom:15}}>
			 <Card containerStyle={{padding: 10,borderRadius:10}}>
			 <View>
			 {/*header*/}
			 <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:30}}>
				  <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
						 <Image style={{width:40,height:40,marginRight:10}} source={require('../assets/clinic/member1.jpg')}/>
						 <View>
							 <Text stle={{color:'black'}}>John Adam</Text>
							 <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
									 <Image style={{width:20,height:20,marginRight:10}} source={require('../assets/clinic/clock2.png')}/>
									 <Text>%:45 p.m.</Text>
							 </View>
						 </View>
					 </View>

				  <View style={{alignItems:'center'}}>
						 <Text style={{fontSize:18,color:'green'}}>$125 Paid</Text>
						 <Text>Card</Text>
					 </View>

			 </View>

			 {/*middle*/}
			 <View style={{marginBottom:20}}>
				 <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
				 <Text style={{color:'black'}}>Location</Text>
				 <Text style={{color:'black'}}>New Delhi</Text>
				 </View>
				  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
				 <Text style={{color:'black'}}>Date</Text>
				 <Text style={{color:'black'}}>15-03-2019</Text>
				 </View>
				  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
				 <Text style={{color:'black'}}>Mode of Payment</Text>
				 <Text style={{color:'black'}}>Card</Text>
				 </View>
			 </View>

			  {/*border*/}
			  <View style={{width:'100%',height:1,borderWidth:1,borderColor:'black',marginBottom:15}}/>
			 <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
				 <Text style={{color:'green'}}>Total</Text>
				 <Text style={{color:'green'}}>$ 123</Text>
				 </View>


		 </View>
			 </Card>
			</ScrollView>
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
      backgroundColor:'#009AFF',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff',
      marginTop:40,

    },
    submitText:{
        color:'white',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        fontSize :20,
        fontWeight : 'bold'
    },

})
