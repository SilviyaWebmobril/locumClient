import React ,  {Component}from 'react';
import { Text, View, Button, StyleSheet,SafeAreaView, Dimensions, ScrollView, Image, FlatList, TouchableOpacity,ToastAndroid,AsyncStorage ,TouchableWithoutFeedback} from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';

export default class Today extends Component {
    constructor(props) {
        super(props);
		this.state = {
			jobs:
        [
            {
                "key" :0,
                "name": "Alison",
                "price": "40",
				"time":"5:49 p.m.",
				"payedby":'cash',
				"icon":require('../assets/clinic/doctor1.jpg')
            },
			 {
                "key" :0,
                "name": "Alison",
                "price": "567",
				"time":"2:49 p.m.",
				"payedby":'online',
				"icon":require('../assets/clinic/doctor4.jpg')
            },
			 {
				"key" :0,
                "name": "Angel",
                "price": "21",
				"time":"5:11 a.m.",
				"payedby":'cash',
				"icon":require('../assets/clinic/doctor3.jpg')
            },
			 {
				"key" :0,
                "name": "Angel",
                "price": "21",
				"time":"5:11 a.m.",
				"payedby":'cash',
				"icon":require('../assets/clinic/doctor2.jpg')
            },
			 {
				"key" :0,
                "name": "Angel",
                "price": "21",
				"time":"5:11 a.m.",
				"payedby":'cash',
				"icon":require('../assets/clinic/doctor1.jpg')
            },
            

          ]
			
			
		};
       
    }



    render() {
        return (
		
			
		<View style ={styles.container}>	
		
			 
			 {/*for main content*/}
			 <ScrollView style={{paddingBottom:15}}>
			 <View style={{padding:1,width:'100%'}}> 
						  <FlatList
							  style={{marginBottom:20,width:'100%'}}
							  data={this.state.jobs}
							  showsVerticalScrollIndicator={false}
							  scrollEnabled={false}
							  renderItem={({item}) =>

							   <TouchableOpacity  onPress={() => this.props.navigation.navigate("TransactionDetails")}>
									  <View style={{width:'100%'}}>
											
									  <Card containerStyle={{padding: 10,borderRadius:10,width:'100%'}} >
									  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
										   <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
												  <Image style={{width:40,height:40,marginRight:10}} source={item.icon}/>
												  <View>
													  <Text stle={{color:'black'}}>{item.name}</Text>
													  <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
															  <Image style={{width:20,height:20,marginRight:5}} source={require('../assets/clinic/clock2.png')}/>
															  <Text>{item.time}</Text>
													  </View>
												  </View>
											  </View>
								  
											  <View style={{alignItems:'center'}}>
												  <Text>${item.price}</Text>
												  <Text>{item.payedby}</Text>
											  </View>
									  </View>
								  </Card>
								</View>
							  </TouchableOpacity>
							  }
							  keyExtractor={item => item.name}
							/>
			 </View>
			</ScrollView>  
		</View>

        )
    }
}


let styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
		alignItems:'center',
		width:'100%'
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
