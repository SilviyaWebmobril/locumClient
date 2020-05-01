import React ,{ useState, useEffect } from 'react';

import { useSelector ,useDispatch } from 'react-redux';
import {
	Text, View, StyleSheet, FlatList,
	TouchableOpacity,
} from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import {getJobList} from '../redux/stores/actions/search_job_action';
import { getday,getWeekday,getMonth,getYear} from '../Globals/Globals';
import MyActivityIndicator from '../CustomUI/MyActivityIndicator';
import {checkuserAuthentication ,logoutUser} from '../redux/stores/actions/auth_action'
import {
	StackActions, NavigationActions,
} from 'react-navigation';
import {showMessage} from '../Globals/Globals';
const JobList = (props) => {

    const dispatch = useDispatch();
    const device_token  = useSelector(state => state.auth.device_token)
    const searched_job_list = useSelector(state => state.search_job.search_jobs_list);
    
    const loading_status = useSelector(state => state.register.loading_status);
    
    const user = useSelector(state => state.register.user);

    useEffect(()=> {

        console.log(searched_job_list);
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
                   dispatch(getJobList(user.id));
                }
            })
    

    },[]);


    if(loading_status){
        return(
            <MyActivityIndicator />
        )
    }

    const FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              justifyContent:"center",
              backgroundColor: "#000",
            }}
          />
        );
      }

      const ListEmpty = () => {
        return (
          //View to show when list is empty
          <View style={styles.container}>
           <Text style={{flex:1,fontFamily:'roboto-bold',fontSize:15,color:'grey',alignSelf:'center',margin:10}}>No Jobs Found</Text>
          </View>
        );
      };

    return(
           <View style={styles.container}>
                   
                    <FlatList
                            contentContainerStyle={{ paddingBottom: 10,}}
							data={searched_job_list}
							showsVerticalScrollIndicator={false}
                            //ItemSeparatorComponent = { FlatListItemSeparator }
                            ListEmptyComponent={ListEmpty}
                            keyExtractor={(item, index) => index.toString()}
							renderItem={({ item,index }) =>

								
                                    <View style={{ borderColor:'#ececec',width:"95%",borderRadius:2,marginTop:5,marginBottom:5,  elevation:2,padding:1,alignSelf:"center",margin:5}}
                                    >
                                     <TouchableOpacity style={{alignSelf:"center",flexDirection:"row"}} onPress={()=> {
                                        console.log("it",index);
                                        console.log("it",item);
                                        props.navigation.navigate('JobDetails',{"id" :item.id ,
                                            "profile" : item.profile.name ,"location": item.job_location,
                                            "date" : item.required_date , "description" : item.job_desc , "cid" : item.cid ,
                                            "from" : item.from_time , "to" : item.to_time, "job_scope" : item.job_scope,"clinic_requirement" : item.clinic_requirement,
                                            "rm_hour" :item.rm_hour ,"dayorhour": item.dayorhour,"no_of_applicants" : item.no_of_applicants, "state": item.state.name ,
                                            "city" : item.city.name,

                                        })}}>

                                            <View style={styles.purpleView}>
                                                <Text style={{fontFamily:'roboto-bold', color: 'white',fontSize:14,marginBottom:2 }}>#JOB{item.job_id}</Text>
                                                <Text style={[styles.detailsText,{fontSize:12,color:"white"}]}> {getday(item.required_date)}, {getMonth(item.required_date)} {getYear(item.required_date)}</Text>
                                            </View>
                                            <View style={styles.whiteView}>
                                            
                                                {
                                                item.from_time !== "" 
                                                ?
                                                <Text style={styles.detailsText}>Time : {item.from_time} - {item.to_time}</Text>
                                                :
                                                <View/>
                                                }
                                                <Text style={styles.detailsText}>Rates : RM {item.rm_hour}/{item.dayorhour == 1 ? "Hour" : "Day"}</Text>
                                                <Text style={[styles.detailsText]}>Applicants : {item.no_of_applicants}</Text>
                                                {/* <Text style={[styles.detailsText]}>Applicants : {item.no_of_applicants}</Text> */}
                                                {/* <Text style={{color:'#4C74E6',fontSize:15,textAlign:"left",textDecorationLine:'underline',fontFamily:"roboto-bold"}}>Edit</Text> */}
                                                {/* <Text numberOfLines={2} style={styles.detailsText}>Location : {item.job_location}</Text>
                                                <Text numberOfLines={2} style={styles.detailsText}>Description : {item.job_desc}</Text> */}
                                            </View>
                                        </TouchableOpacity>
                                      
                                    </View>
									
								
							}
							keyExtractor={item => item.id}
                    	/>

            </View>
        
       
    )
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: '#F2F2F2',
        justifyContent:"center",
       
    },
  
    purpleView:{
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
        //padding:10,
        flex:2.5,
        height:null,
        backgroundColor:'#4C74E6',
        justifyContent:'center',
        alignItems:'center'

    },
    whiteView:{
        paddingLeft:10,
        paddingTop:5,
        paddingRight:5,
        paddingBottom:2, 
        borderBottomRightRadius:5,
        borderTopRightRadius:5,
        flex:3,
        height:null,

    },
	submitButton: {
		width: '100%',
		marginTop: 10,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: '#4C74E6',
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
    detailsText:{
        color:'grey',
        fontSize:12,
        fontFamily:'roboto-bold',
        //marginBottom:5,
        lineHeight:20
    },
   

});

export default JobList;