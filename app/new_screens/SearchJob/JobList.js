import React ,{ useState, useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useSelector ,useDispatch } from 'react-redux';
import {
	Text, View, StyleSheet, FlatList,
	TouchableOpacity,
} from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import {getJobList} from '../redux/stores/actions/search_job_action';
import { getday,getWeekday,getMonth,getYear} from '../Globals/Globals';
import MyActivityIndicator from '../CustomUI/MyActivityIndicator';

const JobList = (props) => {

    const dispatch = useDispatch();
    const searched_job_list = useSelector(state => state.search_job.search_jobs_list);
    const loading_status = useSelector(state => state.register.loading_status);
    
    const user = useSelector(state => state.register.user);

    useEffect(()=> {

       dispatch(getJobList(user.id));

    },[]);


    if(loading_status){
        return(
            <MyActivityIndicator />
        )
    }

    return(
        <KeyboardAwareScrollView>

      
            <View style={styles.container}>
                    {searched_job_list.length > 0 
                    ?
                    <FlatList
                            contentContainerStyle={{ paddingBottom:10}}
                            
							data={searched_job_list}
							showsVerticalScrollIndicator={false}
							scrollEnabled={false}
							renderItem={({ item }) =>

								<TouchableOpacity onPress={()=> {
                                    console.log("it",item);
                                    props.navigation.navigate('JobDetails',{"id" :item.id ,
                                        "profile" : item.name , "experience" :item.exp_required , "location": item.job_location,
                                        "date" : item.required_date , "description" : item.job_desc , "cid" : item.cid ,
                                         "from" : item.from_time , "to" : item.to_time,

                                     })}}>
								
                                    <Card containerStyle={{ borderColor:'#ececec',padding:1,borderRadius: 5,  elevation:5,}}
                                    wrapperStyle={{flexDirection:'row',}}
                                    >
                                     
                                            <View style={styles.purpleView}>
                                                <Text style={{fontFamily:'roboto-bold', color: 'white',fontSize:15, }}> {getWeekday(item.required_date)}</Text>
                                                <Text style={{fontFamily:'roboto-bold', color: 'white' ,fontSize:20}}> {getday(item.required_date)}</Text>
                                                <Text style={{fontFamily:'roboto-bold', color: 'white' ,fontSize:15,}}> {getMonth(item.required_date)} {getYear(item.required_date)}</Text>
                                                {
                                                item.from_time !== "" 
                                                ?
                                                <Text style={{fontFamily:'roboto-bold',fontSize:15, color: 'white',marginTop:10 }}>{item.from_time}</Text>
                                                :
                                                <View/>
                                                }

                                            </View>
                                            <View style={styles.whiteView}>
                                                <Text numberOfLines={2} style={styles.detailsText}>Location : {item.job_location}</Text>
                                                <Text numberOfLines={2} style={styles.detailsText}>Description : {item.job_desc}</Text>
                                            </View>

                                      
                                       
                                        {/* <Text style={{fontFamily:'roboto-bold', color: '#009AFF',textAlign:'right' ,marginBottom:3}}>Apply</Text> */}

                                    </Card>
									
								</TouchableOpacity>
							}
							keyExtractor={item => item.id}
                    	/>
                   
                    :
                        <Text style={{flex:1,fontFamily:'roboto-bold',fontSize:15,color:'grey',alignSelf:'center',margin:10}}>No Jobs Found</Text>
                    }
                    

            </View>
        </KeyboardAwareScrollView>
       
    )
}

const styles = StyleSheet.create({

    container: {
        width:"100%",
        height:"100%",
        backgroundColor: '#F2F2F2',
    },
    cardContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    purpleView:{
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
        padding:5,
        flex:1.5,
        height:null,
        backgroundColor:'#4C74E6',
        justifyContent:'center',
        alignItems:'center'

    },
    whiteView:{
        paddingLeft:10,
        paddingTop:10,
        paddingRight:5, 
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
        fontSize:14,
        fontFamily:'roboto-bold',
        marginBottom:5,
        lineHeight:20
    }



});

export default JobList;