import React ,{ useState, useEffect }  from 'react';
import {View ,Text, TouchableOpacity, StyleSheet ,SafeAreaView,TouchableWithoutFeedback,Image, Dimensions,BackHandler} from 'react-native'
import MyActivityIndicator from '../CustomUI/MyActivityIndicator';
import { TextField } from 'react-native-material-textfield';
import NetInfo from "@react-native-community/netinfo";
import { useSelector , useDispatch} from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import {fetchJobCategories,getStatesList,getCitiesList} from '../redux/stores/actions/register_user';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { searchRequestedJobs } from '../redux/stores/actions/search_job_action';
import {showMessage}  from '../Globals/Globals';
import DatePicker from 'react-native-datepicker';
import {checkuserAuthentication ,logoutUser} from '../redux/stores/actions/auth_action'
import {
	StackActions, NavigationActions
} from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import {editJobPost,editPostJostDetails} from '../redux/stores/actions/search_job_action';
import Geocoder from 'react-native-geocoding';

const EditJobPost = (props) => {


        const  getFormattedDate = (date) => {

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
        return date.getFullYear() + "-" + (date.getMonth()+1) + "-" +date.getDate();
      }
   
      const device_token  = useSelector(state => state.auth.device_token)

    const wallet_balance = useSelector(state => state.register.user.wallet_balance);
    const [location_frame_status ,setLocationFrameStatus ] = useState(false);
    const loading_status  = useSelector(state => state.register.loading_status);
    
    const [job_scope ,setJobScope] = useState("");
    const [clinic_requirements ,setclinicRequirements] = useState("");
    const [experience ,setExperience ] = useState("");
    const [fulladdress , setFullAddress ] = useState("");
    const [latitude ,setLatitude ] = useState("");
    const [longitude ,setLongitude ] = useState("");
    const profession_categories = useSelector(state => state.register.profession_categories);
    const [dropdown_label  ,setDropdownLabel  ] = useState("");
    const [dropdown_value_id , setDropdownId] = useState(0); 
    const [rm_hour ,setRMhour] = useState("");
    const select_time = [
     { label : 'Hour', value : 1},
     { label : 'Day', value : 2}
    ];
    const [select_hour_day ,setHourOrDay ] = useState(1)
    const post_id =  useState(props.navigation.getParam('job_id'));

    const [description ,setDescription] = useState("");
    const [from_time , setfromTime ] = useState("");
    const [date , setDate ] = useState(getFormattedDate(new Date) );
    const [to_time , setToTime] = useState("");

    const user = useSelector(state => state.register.user);
    let get_states_list = useSelector(state => state.register.states_list);
    let get_cities_list = useSelector(state => state.register.cities_list);
    const [state_id ,setStateId ] = useState("");
    const [state_label ,setStateLabel ] = useState("");
    const [city_label ,setCityLabel ] = useState("");
    const [city_id , setCityId] = useState("");

    const dispatch = useDispatch();
    // const user_id = useSelector(state=>  state.auth.user_id);

    useEffect(() => {

     
        dispatch(editPostJostDetails(user.id,post_id))
          .then(response => {

            
            if(response.data.status == 'success'){

              let postResponse  = response.data.data;

              console.log("posr Response",postResponse);
               setDescription(postResponse.job_desc);
              if(postResponse.job_scope !== null){
                setJobScope(postResponse.job_scope);
              }
              if(postResponse.clinic_requirement !== null){
                setclinicRequirements(postResponse.clinic_requirement);
              }
              
              setRMhour(postResponse.rm_hour);
              setHourOrDay(postResponse.dayorhour);
              setDate(postResponse.required_date);
              setfromTime(postResponse.from_time);
              setToTime(postResponse.to_time);
              setFullAddress(postResponse.job_location);
              setStateId(postResponse.state_id);
              setStateLabel(postResponse.state.name);
              
              if(postResponse.city !== null){
                setCityId(postResponse.city_id);
                setCityLabel(postResponse.city.name)
              }else{
                setCityLabel(postResponse.state.name)
              }
              

              dispatch(fetchJobCategories())
                .then(responseCategories => {

                    let profession_id =  postResponse.profile.id;
                    /// setting profession
                    if(responseCategories == 1){
                      profession_categories.map(element => {

                        if(element.value ==  profession_id){
                          setDropdownId(profession_id);
                          setDropdownLabel(element.label)
                        }
                      })

                      // dispatch(getStatesList())
                      // .then(response => {
                      //     if(response.length  > 0 ){

                      //         console.log("before if",get_states_list)

                      //         response.forEach(element => {
                      //             console.log("before if state",element.value)
                      //             if(element.value == state_id){
                      //                 console.log("before if state",element.label)

                      //                 setStateLabel(element.label);
                      //                 setStateId(element.value)
                      //                 dispatch(getCitiesList(state_id))
                      //                     .then(response => {
                      //                         console.log("after if",response);
                      //                         if(response.length > 0){
                      //                             response.forEach(ele => {

                      //                                 if(ele.value  == city_id){
                                          
                      //                                     setCityId(ele.value)
                      //                                     setCityLabel(ele.label)
                                                      
                      //                                 }
                      //                             });
                      //                         }else{
                      //                             setCityLabel(element.label);
                      //                         }

                      //                 })
                              
                                        
                      //             }
                      //         });

                              
                      //     }
                         
                      // })

                      // fetch state and cities
                      // dispatch(getStatesList())
                      //     .then(response => {
                      //         if(response ==  1){
                      //           console.log("state id",postResponse.state);
                      //             get_states_list.map(element => {
  
                      //                 if(element.value == postResponse.state.id){
                      //                     setStateLabel(element.label);
                      //                     setStateId(postResponse.state.id)
                                          
                      //                 }
                      //             });
                      //             dispatch(getCitiesList(postResponse.state.id))
                      //               .then(response => {

                                     
                      //                   if(response ==  1){
                      //                       get_cities_list.forEach(ele => {

                      //                         if(postResponse.city !== null ){
                                                
                      //                           if(ele.value  == postResponse.city.id){
                                    
                      //                             // setCityId(ele.value);
                      //                             setCityLabel(ele.label)
                      //                             setCityId(ele.value)
                                                  
                      //                           }
                      //                         }
                                                
                      //                       });
                      //                   }else{
                      //                       setCityLabel(postResponse.state.name);
                      //                   }

                      //               })
                                  
                      //         }
                              
                      //     })














                    }

                })


            }


          })
          .catch(error => {

            console.log("error",error);

          })
        
       
    },[]);


    const onStateChangeListener = (id) => {
        
      get_states_list.forEach(element => {

          
          if(id  ===  element.value) {
              setStateId(element.value);
              
              setStateLabel(element.label);
              NetInfo.isConnected.fetch().then(isConnected => {

                  if(!isConnected){
                      props.navigation.navigate("NoNetwork");
                      return;
                  }else{
                      
                      setCityId("");
                      setCityLabel("");
                      dispatch(getCitiesList(id))
                          .then(response => {
                              if(response == 0){
                                  setCityLabel(element.label);
                              }
                          })
                  }
              });
          }
      })
  }

  const onCityChangeListener = (id) => {

      if(get_cities_list.length > 0){

          get_cities_list.forEach(ele => {

              if(ele.value  == id){
  
                  setCityId(ele.value);
                  setCityLabel(ele.label)
              }
          })

      }else{
          setCityLabel(state_label);
      }

    

  }




    const onChangeTextPress = (value)  => {
		//ToastAndroid.show("IDDDDD.."+ value, ToastAndroid.LONG);
		if (profession_categories.length > 0) {
			//var jobs = this.state.jobs
			for (var i = 0; i < profession_categories.length; i++) {
				if (profession_categories[i].value === value) {
                    
                    setDropdownLabel(profession_categories[i].label);
                    setDropdownId(profession_categories[i].value);
				}
			}
		}

    }

    const isTimeVaild = () => {
      

      if(from_time == "" && to_time == ""){

        showMessage(0, 'You must enter "From Time and To Time"', "Job Post", true, false);
        
        return false;
      }
      if(from_time !== ""){
 
       
       if(to_time == ""){
         console.log("in to time")
         showMessage(0, 'You must enter "To Time"', "Job Post", true, false);
         return false
       }
 
 
     }else if(to_time !== ""){
       
       if(from_time == ""){
         console.log("in from time")
         showMessage(0, 'You must enter "From Time"', "Job Post", true, false);
         return false
       }
 
         
     }
     return true;
   }

    const isValid = () => {


        let valid = false;
    
        if (fulladdress.length > 0 &&  experience.toString().length > 0) {
            valid = true;
        }
        if(parseInt(dropdown_value_id) < 1){
           
            showMessage(0,'You must select Job Profile', 'Search Job', true, false);
            return false;
        }
       
        else if (description.toString().length === 0) {
    
          showMessage(0,'You must enter a Job Description', 'Search Job', true, false);
         
          return false
      }else if(rm_hour.length === 0 ){

        showMessage(0,'You must enter a RM Hour', 'Search Job', true, false);

        return false

      }else if(!isTimeVaild()){

        return  false;
      }
       
  
    
        return true;
    }

    
    const searchJobUpdate = () => {

        if(isValid()){
            NetInfo.isConnected.fetch().then(isConnected => {

                if(isConnected){

                  dispatch(checkuserAuthentication(user.id,device_token))
                    .then(response => {
                      if(response.data.error){
                        showMessage(0, 'Session Expired! Please Login.', 'Search Job', true, false);
                        dispatch(logoutUser())
                        props.navigation.navigate("Login");
                      
                        const resetAction = StackActions.reset({
                          index: 0,
                          key: 'Login',
                          actions: [NavigationActions.navigate({ routeName: 'Login' })],
                        });
                        props.navigation.dispatch(resetAction);
                      }else{

                        // get here the latitude and longitude by city id
                       console.log("city",city_label)
                        Geocoder.init("AIzaSyDBxQEvhACIZ73YCvPF9fI7A2l6lULic0E");
                        Geocoder.from(fulladdress)
                        .then(json => {
                            var location = json.results[0].geometry.location;
                            console.log(json);
                            console.log("location",location);

                            dispatch(editJobPost(user.id,post_id[0],dropdown_value_id,state_id,city_id,fulladdress,location.lat,location.lng,
                              date,description,from_time,to_time,props.navigation,
                              wallet_balance,job_scope,clinic_requirements,rm_hour,select_hour_day))
                                .then(response => {

                                  if(response.data.status == 'success'){

                                    props.navigation.state.params.updateValues(response.data.result)
                                      props.navigation.goBack()
                                  }

                                    
                                })
                        })
                        .catch(error => 
                          {
                              console.log("er",error)  
                                      showMessage(0, 'Please Enter valid Address', 'Edit Profile', true, false);
              
                          }
                          
                      );




                       
                        
                      }
                  })

                
                }else{
                  props.navigation.navigate("NoNetwork")
                }

            });
          
        }

    }


    if (loading_status) {
        return (
           <MyActivityIndicator />
        );
    }



    if (location_frame_status) {
        
        return (

            <View style={styles.loactionModalContainerView}>

                    {/* <TouchableOpacity onPress={()=> setLocationFrameStatus(false)} style={{zIndex:100,position:'absolute',top:10,left:0,right:10,bottom:0}}>
                            <Image source={require('../assets/nav/close.png')}  style={styles.closeButton} />
                    </TouchableOpacity> */}
                    <View style={styles.loactionModalView}>
                        
                        
                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        minLength={2} // minimum length of text to search
                        autoFocus={true}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed={false}    // true/false/undefined
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                         
                            console.log("details",data);
          
                            //this.setState({ location_frame_status: false, lat: lat, long: lng, location: full_addr })
                            setLatitude(details.geometry.location.lat);
                            setLongitude(details.geometry.location.lng);
                            setFullAddress(details.formatted_address)
                            setLocationFrameStatus(false);
                        }}

                        getDefaultValue={() => ''}

                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: 'AIzaSyDBxQEvhACIZ73YCvPF9fI7A2l6lULic0E',
                            language: 'en', // language of the results
                            //types: 'geocode' // default: 'geocode'
                        }}

                        styles={{
                            textInputContainer: {
                                width: '100%',
                                marginTop:10
                               
                            },
                            description: {
                                fontFamily:'roboto-bold',
                              
                               
                            }
                        }}

                        //		currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        //	currentLocationLabel="Current location"
                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch

                        GoogleReverseGeocodingQuery={{
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }}
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            types: 'cafe'
                        }}

                        GooglePlacesDetailsQuery={{
                            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                            fields: 'formatted_address',
                          }}
                    

                         filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities


                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

                    />
              
                    </View>
               
                  
            </View>


        );
    }

    return(
      <KeyboardAwareScrollView>
        <View style={styles.container}>

          <Dropdown
              labelPadding={0}
              labelHeight={15}
              fontSize={14}
              label='Select Job Profile'
              data={profession_categories}
              value={dropdown_label}
              onChangeText={(value) => { onChangeTextPress(value) }}
          />
           <Dropdown
                labelPadding={0}
                labelHeight={15}
                fontSize={14}
                label='Select States'
                data={get_states_list}
                value={state_label}
                onChangeText={(value) => { onStateChangeListener(value) }} // passing id here
            />

            <Dropdown
                labelPadding={0}
                labelHeight={15}
                fontSize={14}
                label='Select City'
                data={get_cities_list}
                value={city_label}
                onChangeText={(value) => { onCityChangeListener(value) }} // passing id here
            />
          <TextField
              labelPadding={0}
              labelHeight={15}
              fontSize={14}
              style={{ width: '100%' }}
              label='Location'
              onFocus={() => {
                
                  setLocationFrameStatus(true)
              }}
              value={fulladdress}
              onChangeText={(fulladdress) => setFullAddress(fulladdress)}
          />
          {/* <TextField
              style={{ width: '100%' }}
              label='Experience'
              maxLength={5}
              keyboardType='numeric'
              textContentType='telephoneNumber'
              value={experience}
              onChangeText={(experience) => {
                  var a = experience.replace(/[^0-9.]/g, '')
                  setExperience(a)
              }}
          /> */}

          <TextField
              labelPadding={0}
              labelHeight={15}
              fontSize={14}
              style={{ width: '100%' }}
              label='Description'
              value={description}
              multiline={true}
              maxLength={150}
              onChangeText={(description) => setDescription(description)}
            />

            <TextField
              labelPadding={0}
              labelHeight={15}
              fontSize={14}
              style={{ width: '100%' }}
              label='Job Scope'
              value={job_scope}
              multiline={true}
              maxLength={300}
              onChangeText={(value) => setJobScope(value)}
            />

            <TextField
              labelPadding={0}
              labelHeight={15}
              fontSize={14}
              style={{ width: '100%' }}
              label='Hospital / Clinic Requirements'
              value={clinic_requirements}
              multiline={true}
              maxLength={300}
              onChangeText={(value) => setclinicRequirements(value)}
            />
            <TextField
                labelPadding={0}
                labelHeight={15}
                fontSize={14}
                style={{width:"100%"}}
                label='Rates in RM'
                value={rm_hour}
                multiline={true}
                onChangeText={(value) => setRMhour(value)}
              />
           
            <Dropdown
              labelPadding={0}
              labelHeight={15}
              fontSize={14}
              label='Select per Hour or per Day'
              data={select_time}
              value={select_hour_day}
              onChangeText={(value) => { setHourOrDay(value) }}
          />
            <DatePicker
              style={{ width: "85%", marginTop: 10 }}
              date={date}
              mode="date"
              placeholder="Select Date"
              format="YYYY-MM-DD"
              minDate={getFormattedDate(new Date)}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { setDate(date) }}
            />
          
          
            <View style={{flexDirection:"row"}}>
            <DatePicker
              style={{ width: "85%", marginTop: 10 }}
              date={from_time}
              mode="time"
              // showIcon={false}
              placeholder="Select From Time"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              iconSource={require('../assets/clinic/alarm-clock.png')}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },

                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(from_time) => { setfromTime(from_time) }}
            />
            <TouchableOpacity onPress={()=>{setfromTime("")}}>
              <Text style={{marginTop:30,textAlign:'center',marginLeft:10,textDecorationLine:'underline',color:"#4C74E6"}}>Reset</Text>
            </TouchableOpacity>
            
            </View>

            <View style={{flexDirection:"row"}}>
            <DatePicker
              style={{ width: "85%", marginTop: 10 }}
              date={to_time}
              mode="time"
              placeholder="Select To Time"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              iconSource={require('../assets/clinic/alarm-clock.png')}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36,
                  // borderColor:"transparent",

                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(to_time) => { setToTime(to_time) }}
            />
            <TouchableOpacity onPress={()=>{setToTime("")}}>
              <Text style={{marginTop:30,textAlign:'center',marginLeft:10,textDecorationLine:'underline',color:"#4C74E6"}}>Reset</Text>
            </TouchableOpacity>
            
            </View>




          <TouchableOpacity
              onPress={searchJobUpdate}
              style={styles.submitButton}>
              <Text style={styles.submitText}>Post Job</Text>
          </TouchableOpacity>




          </View>

      </KeyboardAwareScrollView>
        
    )
}

const  styles = StyleSheet.create({

    container :{ 
     padding:15,
      
    
    },
    closeButton :{ 
        width:25,
        height:25,
        alignSelf:'flex-end',
        marginBottom:10
    },

    loactionModalContainerView:{
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        justifyContent: 'center',
        alignItems:'center',
        flex:1
      
    },
    loactionModalView:{
        backgroundColor: 'white', 
        borderColor:'#a7bbfa',
        borderWidth:1,
        borderRadius:4,
        justifyContent: 'center',
        alignItems:"center",
        // width: Dimensions.get('window').width *  0.9,
        height : Dimensions.get('window').height * 0.8,
        paddingTop:5,
        paddingRight:5,
        paddingLeft:5,
        position:'absolute',
        top:20,
        bottom:0,
        left:20,
        right:20

    },

    submitButton:{
        width :'90%',
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor: '#4C74E6',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop:30,
        alignSelf:'center'
        
      },
      submitText:{
        color:'white',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        fontSize :17,
        fontFamily:'roboto-bold'
		},
})

export default EditJobPost;
