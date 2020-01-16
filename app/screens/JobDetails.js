import React ,  {Component}from 'react';
import { Text, View, Button, StyleSheet,SafeAreaView, Dimensions, ScrollView, Image,
  FlatList, TouchableOpacity,ToastAndroid,TouchableWithoutFeedback} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Card, ListItem, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";



export default class JobDetails extends Component {
    constructor(props) {
        super(props);
		this.state = {
			location:'',
			profile:'',
			experience:'',
			date:'',
			description:'',
			job_id:'',
			from:"",
			to:""


		};

    }

componentWillMount(){
	var result  = this.props.navigation.getParam('result')
	console.log("result from",result['from']);
	this.setState({
		job_id : result['job_id'],
		profile : result['profile'],
		location : result['location'],
		description : result['description'],
		date : result['date'],
		experience : result['experience'],
		from:result['from'],
		to:result['to']

	})
}

    render() {
        return (

			<View style={{flex:1}}>
			<SafeAreaView style={{  backgroundColor: '#4C74E6'}} />
		<View style ={styles.container}>
			{/*for header*/}
			 <View style = {{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'100%',height:'09%',backgroundColor: '#4C74E6'}}>

						<TouchableWithoutFeedback onPress={() =>this.props.navigation.goBack()}>
									 <Image style={{width: 20, height: 20,margin:10}}  source={require('../assets/clinic/left-arrow.png')} />
						 </TouchableWithoutFeedback>

						 <View>
						  <Text style={{fontFamily:"Roboto-Light",fontSize: 20,fontWeight: 'bold', color: "white",marginLeft:-15}}>Job details</Text>
						 </View>

						<View>
						</View>

			 </View>

			 {/*for main content*/}

			 <View style={{width:'100%'}}>

				<View style={{backgroundColor:'#604D8F',width:'100%',height:null,justifyContent:'center',padding:12}}>
						<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:5}}>
							<View style={{flexDirection:'row',marginBottom:10}}>
									<Image style={{width:20,height:20,marginRight:5}} source={require('../assets/clinic/manager-avatar.png')}/>
									<Text style={{fontFamily:"Roboto-Light",color:'white',fontSize:16}}>Job Profile : </Text>
									<Text style={{fontFamily:"Roboto-Light",color:'white',fontSize:16}}>{this.state.profile}</Text>
							</View>
							
						</View>
						<View style={{flexDirection:'row',marginBottom:10,margin:5, width:"80%"}}>
								<Image style={{width:20,height:20,marginRight:5}} source={require('../assets/clinic/map.png')}/>
								<Text style={{fontFamily:"Roboto-Light",color:'white',fontSize:16}}>Location : </Text>
								<Text style={{fontFamily:"Roboto-Light",color:'white',fontSize:16,lineHeight:20, width:"80%"}}>{this.state.location}</Text>
						</View>
						<View style={{flexDirection:'row',marginBottom:10,margin:5}}>
								<Image style={{width:20,height:20,marginRight:5}} source={require('../assets/clinic/clock2.png')}/>
								<Text style={{fontFamily:"Roboto-Light",color:'white',fontSize:16}}>Exp required : </Text>
								<Text style={{fontFamily:"Roboto-Light",color:'white',fontSize:16}}>{this.state.experience} years</Text>
						</View>
						<View style={{flexDirection:'row',marginBottom:10,margin:5}}>
							<Text style={{fontFamily:"Roboto-Light",fontFamily:"Roboto-Light",color:'white',fontWeight:'bold',fontSize:14,marginTop:-4}}>Date : {this.state.date}</Text>
						</View>
						{
							this.state.from !== "" 
							?
							<View style={{flexDirection:'row',marginBottom:10,margin:5,justifyContent:"space-between"}}>
								<Text style={{fontFamily:"Roboto-Light",color:'white',fontWeight:'bold',fontSize:14,marginTop:-4}}>From : {this.state.from}</Text>
							</View>
							:
							<View/>
						}
						{this.state.to !== "" 
						?
						<View style={{flexDirection:'row',marginBottom:10,margin:5,justifyContent:"space-between"}}>
							
							<Text style={{fontFamily:"Roboto-Light",color:'white',fontWeight:'bold',fontSize:14,marginTop:-4}}>To : {this.state.to}</Text>
						</View>
						:
						<View/>
						}					
						

				</View>
					<Card containerStyle={{padding: 15,borderRadius:5,height:'20%',margin:10}}>
					<Text style={{fontFamily:"Roboto-Light",color:'black',fontSize:14,fontWeight:'bold',marginBottom:5}}>Description</Text>
					<Text style={{fontFamily:"Roboto-Light",}}>{this.state.description}</Text>
					</Card>

					 <TouchableOpacity onPress={() => this.props.navigation.navigate("PractitionersList",{job_id:this.state.job_id})}
						style={styles.submitButton}>
								<Text style={styles.submitText}>See Who Applied</Text>
					</TouchableOpacity>

			 </View>

		</View>
		</View>

        )
    }
}


let styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F2F2',
		alignItems:'center',
    },
	submitButton:{
      width :'90%',
    
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#4C74E6',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff',
	  marginTop:20,
	  alignSelf:'center'

    },
    submitText:{
		fontFamily:"Roboto-Light",
        color:'white',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        fontSize :17,
        fontWeight : 'bold'
    },

})
