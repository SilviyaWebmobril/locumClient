import React ,{useState, useEffect } from 'react';
import {View,Text,TouchableOpacity,ScrollView,Image,StyleSheet,Alert} from 'react-native';
import {Card} from 'react-native-elements';
import {checkuserAuthentication ,logoutUser} from '../redux/stores/actions/auth_action'
import {
	StackActions, NavigationActions,
} from 'react-navigation';
import { useSelector ,useDispatch } from 'react-redux';
import {showMessage} from '../Globals/Globals';
import MyActivityIndicator from '../CustomUI/MyActivityIndicator';
import {cancelJobPost} from '../redux/stores/actions/search_job_action';

const JobDetails =(props) => {

    const dispatch = useDispatch();
    const id = useState(props.navigation.getParam('id'));
    console.log("idd",id);
    const loading_status = useSelector(state => state.register.loading_status);
    const [profile,setProfile]  = useState(props.navigation.getParam('profile'));
    const experience = useState(props.navigation.getParam('experience'));
    const [description,setDescription] = useState(props.navigation.getParam('description'));
    const [joblocation,setJobLocation] = useState(props.navigation.getParam('location'));
    const [from,setFrom]  = useState(props.navigation.getParam('from'));
    const [to,setTo] = useState(props.navigation.getParam('to'));
    const [date,setDate] =  useState(props.navigation.getParam('date'));
    const [job_scope,setJobScope] =  useState(props.navigation.getParam("job_scope"));
    const [clinic_requirement,setClinicRequirement] = useState(props.navigation.getParam("clinic_requirement"));
    const [rm_hour,setRMHour] = useState(props.navigation.getParam("rm_hour"));
    const [dayorhour,setDayOrHour] =  useState(props.navigation.getParam("dayorhour"))
    const [state,setState] =  useState(props.navigation.getParam("state"))
    const [city,setCity] =  useState(props.navigation.getParam("city"))
    const no_of_applicants =  useState(props.navigation.getParam('no_of_applicants'));
    console.log("applicantsscdf",no_of_applicants);
    const user = useSelector(state => state.register.user);
    const device_token  = useSelector(state => state.auth.device_token);



    const onCancelAlert =()=>{

		Alert.alert(
			'Cancel Job Post',
			'Are you sure you want to cancel the post?',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				},
				{
					text: 'OK',
					onPress: () => onCancelJob()
				}
			],
			{
				cancelable: false
			}
		);
	}

    const onCancelJob = () => {

        dispatch(checkuserAuthentication(user.id,device_token))
            .then(response => {
                if(response.data.error){
                    showMessage(0, 'Session Expired! Please Login.', 'Job List', true, false);
                    dispatch(logoutUser())
                    props.navigation.navigate("Login");
                   
                    const resetAction = StackActions.reset({
                        index: 0,
                        key: 'Login',
                        actions: [NavigationActions.navigate({ routeName: 'Login' })],
                    });
                    props.navigation.dispatch(resetAction);

                }else{
                   dispatch(cancelJobPost(id[0],user.id))
                    .then(response =>{
                        if(response == 1){
                            props.navigation.goBack();
                        }
                    })
                }
            })
    }


    const updateValues = (response ) => {

        console.log("update values...12222",response.city.name);
        setCity(response.city.name);
        setState(response.state.name);
        setFrom(response.from_time);
        setTo(response.to_time);
        setDate(response.required_date);
        setClinicRequirement(response.clinic_requirement);
        setJobScope(response.job_scope);
        setRMHour(response.rm_hour);
        setDescription(response.job_desc);
        setJobLocation(response.job_location)

    }
    

    if(loading_status){
        return(
            <MyActivityIndicator />
        )
    }

    return(
        <ScrollView>

       
        <View style={styles.container}>
            <View style={styles.details}>
                <View style={styles.viewRow}>
                    {/* <Image source={require('../assets/clinic/manager-avatar.png')}  style={styles.imageStyle} /> */}

                    {/* <View style={{flexDirection:'row',flex:1}}> */}
                        <Text style={styles.textHeading}>Profile :</Text>
                        <Text style={styles.textSubheading}>{profile}</Text>
                    {/* </View> */}
                    
                </View>
                <View style={styles.viewRow}>
                    {/* <Image source={require('../assets/clinic/clock2.png')}  style={styles.imageStyle} /> */}
                    {/* <View style={{flexDirection:'row'}}> */}
                        <Text style={styles.textHeading}>RM Hour : </Text>
                        <Text style={styles.textSubheading}>{rm_hour} {dayorhour[0]  == 1 ? "Hour" : "Day"}</Text>
                    {/* </View> */}
                </View>
                
                <View style={styles.viewRow}>
                    {/* <Image source={require('../assets/clinic/manager-avatar.png')}  style={styles.imageStyle} /> */}
                    {/* <View style={{flexDirection:'row'}}> */}
                        <Text style={styles.textHeading}>Required {'\n'} Date : </Text>
                        <Text style={styles.textSubheading}>{date}</Text>
                    {/* </View> */}
                </View>
                {(from[0] !== "" && to[0] !== "")
                ?
                <View style={[styles.viewRow,{justifyContent:'space-between',alignItems:"center"}]}>
                        
                    <View style={{flexDirection:'row',alignSelf:"flex-start"}}>
                    {/* <Image source={require('../assets/clinic/manager-avatar.png')}  style={styles.imageStyle} /> */}
                        <Text style={styles.textHeading}>From : </Text>
                        <Text style={styles.textSubheading}>{from}</Text>
                    </View>
                
                    <View style={{flexDirection:'row',alignSelf:"flex-end"}}>
                        {/* <Image source={require('../assets/clinic/manager-avatar.png')}  style={styles.imageStyle} /> */}
                        <Text style={styles.textHeading}>To : </Text>
                        <Text style={styles.textSubheading}>{to}</Text>
                    </View>
                </View>
                :
                <View/>
                }

                <View style={styles.viewRow}>
                    
                    {/* <View style={{flexDirection:'row'}}> */}
                    {/* <Image source={require('../assets/clinic/map.png')}  style={styles.imageStyle} /> */}
                        <Text style={styles.textHeading}>State : </Text>
                        <Text style={styles.textSubheading} >{state}</Text>
                    {/* </View> */}
                    
                </View>
                <View style={styles.viewRow}>
                    
                    {/* <View style={{flexDirection:'row'}}> */}
                    {/* <Image source={require('../assets/clinic/map.png')}  style={styles.imageStyle} /> */}
                        <Text style={styles.textHeading}>City : </Text>
                        
                    {/* </View> */}
                    {city[0] == ""
                    ?
                    <Text style={styles.textSubheading} >{state}</Text>
                    :
                    <Text style={styles.textSubheading} >{city}</Text>
                    }
                   
                </View>
               
            </View>
            <Card 
            title="Other Details"
            containerStyle={{width:'97%',height:null,elevation:5,borderColor:'#a7bbfa',borderRadius:4}} >
                 <View style={{flexDirection:"row"}}>
                    <Text style={styles.despHeading}>Job Location : </Text>
                    <Text numberOfLines={20} style={styles.dsepText}>{joblocation}</Text>
                </View>
                <View style={{width:"100%",borderWidth:0.25,marginTop:10,marginBottom:10,backgroundColor:"#ececec"}}></View>
                <View style={{flexDirection:"row"}}>
                    <Text style={styles.despHeading}>Description : </Text>
                    <Text numberOfLines={20} style={styles.dsepText}>{description}</Text>
                </View>
               
                {
                    job_scope[0] !== ""
                    ?
                    <>
                     <View style={{width:"100%",borderWidth:0.25,marginTop:10,marginBottom:10,backgroundColor:"#ececec"}}></View>
                    <View style={{flexDirection:"row"}}>
                        <Text style={styles.despHeading}>Job Scope : </Text>
                        <Text numberOfLines={20} style={styles.dsepText}>{job_scope}</Text>
                    </View>
                    
                     </>
                    :
                    <View/>
                }

                {
                    clinic_requirement[0] !== ""
                    ?
                    <>
                     <View style={{width:"100%",borderWidth:0.25,marginTop:10,marginBottom:10,backgroundColor:"#ececec"}}></View>
                    <View style={{flexDirection:"row"}}>
                        <Text style={styles.despHeading}>Clinic / {'\n'} Hospital {'\n'} Requirement : </Text>
                        <Text numberOfLines={20} style={styles.dsepText}>{clinic_requirement}</Text>
                    </View>
                   
                    </>
                    :
                    <View/>
                }
                
            </Card>
            {no_of_applicants[0] == 0 
            ?
            <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
                <TouchableOpacity  onPress={() => { props.navigation.navigate("EditJobPost",{job_id:id[0],updateValues: updateValues})}}
                    style={styles.editButton}>
                    <Text style={styles.editBtnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => {onCancelAlert()}}
                    style={styles.cancelButton}>
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>

            </View>
            :
                <View/>
            }
           
            <TouchableOpacity  onPress={() => props.navigation.navigate("PractionersList",{job_id:id[0]})}
                style={styles.suggestButton}>
                <Text style={styles.suggestText}>See who Applied</Text>
            </TouchableOpacity>




        </View>
        </ScrollView>
    )
}




let styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F2F2',
	  alignItems:'center',
		
    },
    imageStyle:{

        width:20,
        height:20,
        paddingRight:10

    },
    viewRow:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom:7,
        flex:1
    },
    details:{

        width:"100%",
        height:null,
        backgroundColor:'#6B579F',
        padding: 10,


    },
    textHeading:{
        color:'white',
        fontSize:13,
        fontFamily:"roboto-bold",
        paddingLeft:5,
      
    },
    locationText:{
        fontFamily:'roboto-bold',
        fontSize:15,
        color:"white",
        paddingLeft:10,
        lineHeight:20,
        //flex:1
    },
    textSubheading:{
        color:'white',
        fontSize:14,
        fontFamily:'roboto-light',
        paddingLeft:5,
        flex:0.7
    },
    dsepText:{
        fontSize:14,
        color:"black",
        fontFamily:'roboto-light',
        lineHeight:20,
        flex :4
    },
    despHeading:{
        fontSize:13,
        color:"grey",
        fontFamily:'roboto-bold',
        flex:2
    },
	submitButton:{
      width :'90%',
	  padding:10,
      backgroundColor:'#4C74E6',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff',

	  alignSelf:'center'

    },
    submitText:{
		fontFamily:'roboto-light',
        color:'white',
        textAlign:'center',
        fontSize :15,
	},
	suggestButton:{
		width :'80%',
		marginTop:10,
		paddingTop:10,
		paddingBottom:10,
		backgroundColor:'#4C74E6',
		borderRadius:10,
		borderWidth: 1,
		borderColor: '#fff',
		marginBottom:10,
	alignSelf:'center'

	},
	suggestText:{
		fontFamily:'roboto-bold',
			color:'white',
			textAlign:'center',
			fontSize :15,
},
	indicator: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 80
      },
      editButton:{
        width:120,
        margin:10,
		paddingTop:10,
		paddingBottom:10,
		backgroundColor:'#4C74E6',
		borderRadius:4,
		borderWidth: 2,
		borderColor: '#fff',
		marginBottom:10,
	    alignSelf:'flex-start'

      },
      editBtnText:{
        fontSize:15,
        color:"white",
        alignSelf:"center",
        fontFamily:"roboto-bold",

      },
      cancelBtnText:{
        color:"red",
        fontSize:15,
        alignSelf:"center",
        fontFamily:"roboto-bold",
      },
      cancelButton:{

        width:110,
        margin:10,
		paddingTop:10,
		paddingBottom:10,
		backgroundColor:'#f2f2f2',
		borderRadius:4,
		borderWidth: 2,
		borderColor: 'red',
	    alignSelf:'flex-end'

      }

})



export default JobDetails;