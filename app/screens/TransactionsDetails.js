import React ,  {Component}from 'react';
import { Text, View, Button, StyleSheet,SafeAreaView, Dimensions, ScrollView, Image, FlatList, TouchableOpacity,ToastAndroid,AsyncStorage ,TouchableWithoutFeedback} from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';

export default class TransactionsDetails extends Component {
    constructor(props) {
        super(props);
		this.state = {
			transactions:
        [
            {
                "key" :0,
                "name": "Payment Recieved",
                "from": "SK Labs",
				"date":"20/12/2019",
				"price":"500"
            },
			 {
               "key" :0,
                "name": "Payment Recieved",
                "from": "SK Labs",
				"date":"20/12/2019",
				"price":"500"
            },
			 {
                "key" :0,
                "name": "Payment Recieved",
                "from": "SK Labs",
				"date":"20/12/2019",
				"price":"500"
            },
			 {
               "key" :0,
                "name": "Payment Recieved",
                "from": "SK Labs",
				"date":"20/12/2019",
				"price":"500"
            },
			 {
               "key" :0,
                "name": "Payment Recieved",
                "from": "SK Labs",
				"date":"20/12/2019",
				"price":"500"
            },
            

          ]
			
			
		};
       
    }



    render() {
        return (
		
			
		<View style ={styles.container}>	
			{/*for header*/}
			 <View style = {{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'100%',height:'09%',backgroundColor: '#009AFF'}}>
				  
						<TouchableWithoutFeedback onPress={() =>this.props.navigation.goBack()}>
									 <Image style={{width: 25, height: 25,margin:10}}  source={require('../assets/clinic/left-arrow.png')} />
						 </TouchableWithoutFeedback>
						 
						 <View>
						  <Text style={{fontFamily:"Roboto-Light", fontSize: 21,fontWeight: 'bold', color: "white",paddingRight:25}}>Transactions List</Text>
						 </View>
						 
						<View>
						</View>
						 
			 </View>
			 
			 {/*for main content*/}
			 <ScrollView style={{paddingBottom:15}}>
			 <View style={{padding:1,width:'100%'}}> 
						  <FlatList
							  style={{marginBottom:20}}
							  data={this.state.transactions}
							  showsVerticalScrollIndicator={false}
							  scrollEnabled={false}
							  renderItem={({item}) =>

							   <TouchableOpacity  onPress={() => this.props.navigation.navigate("JobDetails")}>
									  <Card containerStyle={{padding: 10,borderRadius:10}}>

										<View style={{flexDirection:'row',alignItems:'center'}}>
										
										<Image style={{width:30,height:30,marginRight:5}} source = {require('../assets/clinic/small-mark.png')}/>
										<View>
											<Text style ={{fontFamily:"Roboto-Light",  color: 'black', fontSize: 18 ,fontWeight: 'bold' }}>{item.name}</Text>
											<Text style={{fontFamily:"Roboto-Light", }}>From {item.from}</Text>
										</View>
										
										<View style={{alignSelf:'flex-end',marginRight:10}}>
											<Text style ={{fontFamily:"Roboto-Light",  color: 'blue', fontSize: 20 ,fontWeight: 'bold' ,alignSelf:'center'}}>${item.price}</Text>
											<Text style={{fontFamily:"Roboto-Light", }}> Date: {item.date}</Text>
										</View>
										</View>
									</Card>
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
		fontFamily:"Roboto-Light", 
        color:'white',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        fontSize :20,
        fontWeight : 'bold'
    },
   
})
