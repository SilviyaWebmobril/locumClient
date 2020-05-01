import React ,{useState, useEffect } from 'react';
import {View ,StyleSheet ,Text, TouchableOpacity} from 'react-native';
import {useDispatch ,useSelector} from 'react-redux';
import MyActivityIndicator from '../CustomUI/MyActivityIndicator';
import { TextField } from 'react-native-material-textfield';
import NetInfo from "@react-native-community/netinfo";
import { Dropdown } from 'react-native-material-dropdown';
import {fetchBusinessTypes,fetchGrades,fetchSpecialities,submitEditProfile,getStatesList,getCitiesList, showSpinner, hideSpinner} from '../redux/stores/actions/register_user';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Geocoder from 'react-native-geocoding';
import {showMessage} from '../Globals/Globals';
import {checkuserAuthentication , logoutUser} from '../redux/stores/actions/auth_action';
import { StackActions, NavigationActions } from 'react-navigation';

const EditProfile = (props) => {

    const user = useSelector(state => state.register.user);
    const device_token  = useSelector(state => state.auth.device_token)
    const [profession_id ,setProfessionId ] = useState(user.bussiness_type_id);
    const [profession_label ,setProfessionLabel ] = useState("");
    const [speciality_id ,setSpecialityId ] = useState("");
    const [speciality_label ,setSpecialityLabel ] = useState("");
    const [ic_no ,setIcNo ] = useState(user.owner_ic_no); // owner ic no
    const [degree ,setDegree ] = useState(user.degree);
    const [experience ,setExperience ] = useState(user.experience);
    const [mobile ,setMobile  ] = useState(user.mobile);
    const [address ,setAddress ] = useState(user.address);
    const [current_work ,setCurrentWork ] = useState(user.current_work);
    const [description ,setDescription ] = useState(user.description);
    const [license ,setLicense ] = useState("");
    const grades  =  useSelector(state => state.register.grades);
    const [grades_id,setGrade] = useState("");
    const [grades_label,setGradeLabel] = useState("");

    // business type
    const profession_categories =  useSelector(state => state.register.business_type);
    const specialities  = useSelector(state => state.register.specialities);

    const [med_pc_id , setMedPcId] = useState(user.med_pc_id);
    const [roc_no , setRocNo] = useState(user.roc_no);
    console.log("roc_no",roc_no);
    const [owner_name , setOwnerName] = useState(user.directors_name); // directors name
    const [post_code , setPostCode] = useState(user.post_code);
    const [year_of_operation , setYearOfOperation] = useState(user.year_of_operation); // years of establishment

    const [street1 ,setStreet1] = useState(user.street1);
    const [street2 ,setStreet2] = useState(user.street2);

    let get_states_list = useSelector(state => state.register.states_list);
    let get_cities_list = useSelector(state => state.register.cities_list);
    const [state_id ,setStateId ] = useState(user.state_id);
    const [state_label ,setStateLabel ] = useState("");
    const [city_label ,setCityLabel ] = useState("");

    const [weekly_rate ,setWeeklyRate ] = useState(user.weekly_rate);
    const [monthly_rate ,setMonthlyRate ] = useState(user.monthly_rate);
    const [hourly_rate ,setHourlyRate ] = useState(user.hourly_rate);

    const [city_id , setCityId] = useState(user.city_id);
    const [user_address,setUserAddress] = useState(user.address);


    const dispatch = useDispatch();
   
    const loading_status = useSelector(state => state.register.loading_status);

    useEffect(()=> {

        
        NetInfo.isConnected.fetch().then(isConnected => {

            if(!isConnected){
                props.navigation.navigate("NoNetwork");
                return;
            }else{

                dispatch(fetchBusinessTypes())
                    .then(response => {

                        if(response ==  1){

                            profession_categories.forEach(element => {

                                if(element.value  == profession_id){
                                    
                                    setProfessionLabel(element.label);
                                    dispatch(getStatesList())
                                    .then(response => {
                                        if(response ==  1){

                                            get_states_list.map(element => {
            
                                                if(element.value == state_id){
                                                    setStateLabel(element.label);
                                                    dispatch(getCitiesList(state_id))
                                                        .then(response => {

                                                            if(response ==  1){
                                                                get_cities_list.forEach(ele => {

                                                                    if(ele.value  == city_id){
                                                        
                                                                        // setCityId(ele.value);
                                                                        setCityLabel(ele.label)
                                                                    
                                                                    }
                                                                });
                                                            }else{
                                                                setCityLabel(element.label);
                                                            }

                                                    })
                                            
                                                   
                                                }
                                            });

                                            
                                        }
                                       
                                    })
                                    
                                }
                            });

                        }
                      

                    })
                // dispatch(fetchJobCategories())
                //     .then(response => {

                //         if(response ==  1){
                //             console.log("hello response is ",response);
                //             profession_categories.forEach(element => {

                //                 if(element.value  == profession_id){
                                    
                //                     setProfessionLabel(element.label);
                                    
                //                 }
                //             });
                //             dispatch(fetchGrades())
                //                 .then(response =>{
                //                     if(response ==  1){

                //                         grades.forEach(element => {
                //                             console.log("ele-- grades",element);
                //                             if(element.value == grades_id) {
                                            
                //                                 setGradeLabel(element.label)
                //                             }
                //                         });
                                       
                //                     }
                //                 })
                //         }
                //     })
                
            }
        });

        console.log(profession_categories);

    },[setProfessionId]);


    const onProfessionChangeListener = (id) => {

        profession_categories.forEach(element => {

            if(element.value  === id){
                
                setProfessionId(element.value);
                setProfessionLabel(element.label);
                
                // NetInfo.isConnected.fetch().then(isConnected => {

                //     if(!isConnected){
                //         props.navigation.navigate("NoNetwork");
                //         return;
                //     }else{
                //         setSpecialityLabel("");
                //         setSpecialityId("");
                //         dispatch(fetchSpecialities(id));
                //     }
                // });
             
            }
        });

        
    }

    

    // const onSpecialityChangeListener = (id) => {

    //     specialities.forEach(ele => {

    //         if(ele.value  == id){

    //             setSpecialityId(id);
    //             setSpecialityLabel(ele.label)
    //         }
    //     })
    // }

    // const onGradeChangeListener = (id) => {

    //     grades.forEach(element => {
    //         if(element.value == id) {
    //             setGrade(id);
    //             setGradeLabel(element.label)
    //         }
    //     })
    // }

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

    const isValid = () => {
		var regexp = /^\d*\.?\d*$/;
		//var isnum = regexp.test(experience);
		let valid = true;

		// if (degree.length > 0) {
		// 	valid = true;
		// }

		if (profession_id.length === 0) {

			showMessage(0, 'Enter your profession', 'Profile', true, false);

			return false
		}
		// else if (speciality_id.length === 0) {

		// 	showMessage(0, 'Enter your specialities', 'Profile', true, false);

		// 	return false
		// }
		// else if (grades_id.length === 0) {

		// 	showMessage(0, 'Enter your grades', 'Profile', true, false);

		// 	return false
		// }
		// else if (degree.length === 0) {

		// 	showMessage(0, 'Enter  your degree', 'Profile', true, false);

		// 	return false;
        // }
        else if (state_id == "") {

			showMessage(0, 'Please Select State', 'Profile', true, false);

			return false;
		}

		else if (street1.length === 0) {

			showMessage(0, 'Enter  Street 1', 'Profile', true, false);

			return false;
        }

        else if (street2.length === 0) {

			showMessage(0, 'Enter  Street 2', 'Profile', true, false);

			return false;
        }

        else if (post_code == "") {

			showMessage(0, 'Please enter postcode', 'Profile', true, false);

			return false;
        }
        
        else if (year_of_operation == "") {

			showMessage(0, 'Please enter year of establishment', 'Profile', true, false);

			return false;
        }
        else if (owner_name == "") {

			showMessage(0, 'Please enter Owner Name', 'Profile', true, false);

			return false;
		}




		// else if (license.toString().trim().length === 0) {

		// 	showMessage(0, 'Enter your license number', 'Profile', true, false);

		// 	return false;
		// }
		else if (ic_no.toString().trim().length === 0) {

			showMessage(0, 'Enter your IC number', 'Profile', true, false);

			return false;
		}


		// 	else if(!isnum){
		// 		ToastAndroid.show("Please Enter Valid Experience", ToastAndroid.SHORT);
		// 	 return false;
		//  }

		else if (description.toString().trim().length === 0) {

			showMessage(0, 'Enter Description', 'Profile', true, false);

			return false;
		}

		else if (description.toString().trim().length < 10) {

			showMessage(0, 'Description Should be 10 characters long', 'Profile', true, false);

			return false;
		}

		return valid;
	}


    const setUserAddressGeocoder = async(value) => {
        setUserAddress(value);
        console.log(user_address);
      
    }


    const submitEditProfile11 = () => {

        if(isValid()){

            console.log("user",user_address);
            dispatch(showSpinner())
            Geocoder.init("AIzaSyDBxQEvhACIZ73YCvPF9fI7A2l6lULic0E");
            Geocoder.from(street1)
            .then(json => {
                dispatch(hideSpinner())
                var location = json.results[0].geometry.location;
                console.log(json);
                console.log("location",location);

                dispatch(checkuserAuthentication(user.id,device_token))
                    .then(response => {

                        if(response.data.error){

                            showMessage(0, 'Session Expired! Please Login.', 'Edit Profile', true, false);
                            dispatch(logoutUser());
                            props.navigation.navigate("Login")
                            const resetAction = StackActions.reset({
                                index: 0,
                                key: 'Login',
                                actions: [NavigationActions.navigate({ routeName: 'Login' })],
                            });
                            props.navigation.dispatch(resetAction);
        

                        }else{

                            // dispatch(submitEditProfile(user.id,user.name,profession_id,mobile,ic_no,speciality_id,license,grades_id
                            //     ,user_address,description,location.lat ,location.lng,state_id, city_id,weekly_rate,monthly_rate,hourly_rate,props.navigation));

                            dispatch(submitEditProfile(user.id,user.name,profession_id,speciality_id,grades_id,
                                mobile,state_id,city_id,street1,street2,post_code,year_of_operation,med_pc_id,roc_no,license,owner_name,ic_no,
                            description,location.lat ,location.lng,weekly_rate,monthly_rate,hourly_rate,props.navigation));
            
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

       
}

  
    if(loading_status){

        return <MyActivityIndicator /> 
    }


    
    

    return(
        <KeyboardAwareScrollView>
       
        <View style={styles.container}>

            <Dropdown
                labelPadding={0}
                labelHeight={15}
                fontSize={14}
                label='Select Busines Type'
                data={profession_categories}
                value={profession_label}
                onChangeText={(value) => { onProfessionChangeListener(value) }} // passing id here
            />

                {/* <Dropdown
                    label='Select Specialities'
                    data={specialities}
                    value={speciality_label}
                    onChangeText={(value) => { onSpecialityChangeListener(value) }}
                    
                />
                <Dropdown
                    label='Select Grades'
                    data={grades}
                    value={grades_label}
                    onChangeText={(value) => {onGradeChangeListener(value) }}
                    
                /> */}
                <TextField
                    labelPadding={0}
                    labelHeight={15}
                    fontSize={14}
                    style={{ alignSelf: 'center',color:'grey'  }}
                    label='Mobile'
                    keyboardType='numeric'
                    textContentType='telephoneNumber'
                    value={mobile}
                    editable={false}
                    onChangeText={(mobile) => setMobile(mobile)}
                />
                {/* <TextField
                    style={{ alignSelf: 'center',marginTop:10  }}
                    label='Degree'
                    value={degree}
                    onChangeText={(degree) => setDegree(degree)}
                /> */}

                

                {/* <TextField
                    style={{ alignSelf: 'center',marginTop:10  }}
                    label='Current Work'
                    value={current_work}
                    onChangeText={(current_work) => setCurrentWork(current_work)}
                />

             */}

               

                {/* <TextField
                    style={{ alignSelf: 'center',marginTop:10  }}
                    label='Weekly Rate'
                    value={weekly_rate}
                    onChangeText={(weekly_rate) => setWeeklyRate(weekly_rate)}
                />
                <TextField
                    style={{ alignSelf: 'center',marginTop:10  }}
                    label='Monthly Rate'
                    value={monthly_rate}
                    onChangeText={(monthly_rate) => setMonthlyRate(monthly_rate)}

                />

                <TextField
                    style={{ alignSelf: 'center',marginTop:10  }}
                    label='Hourly Rate'
                    value={hourly_rate}
                    onChangeText={(hourly_rate) => setHourlyRate(hourly_rate)}

                /> */}

                <TextField
                    labelPadding={0}
                    labelHeight={15}
                    fontSize={14}
                    style={{ alignSelf: 'center',}}
                    label='Country'
                    value="Malaysia"
                    editable={false}
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



                {/* <TextField
                    style={{ alignSelf: 'center',marginTop:10  }}
                    label='Address'
                    value={user_address}
                    onChangeText={(value) => setUserAddressGeocoder(value)}
                /> */}


                <TextField
                    labelPadding={0}
                    labelHeight={15}
                    fontSize={14}
                    style={{ alignSelf: 'center', }}
                    label='Street 1'
                    value={street1}
                    onChangeText={(value) => setStreet1(value)}
                />
                <TextField
                    labelPadding={0}
                    labelHeight={15}
                    fontSize={14}
                    style={{ alignSelf: 'center',}}
                    label='Street 2'
                    value={street2}
                    onChangeText={(value) => setStreet2(value)}
                />

                <TextField
                    labelPadding={0}
                    labelHeight={15}
                    fontSize={14}
                    maxLength={6}
                    style={{ alignSelf: 'center',}}
                    label='Postcode'
                    value={post_code}
                    keyboardType="numeric"
                    onChangeText={(value) => setPostCode(value)}
                />
                <TextField
                    labelPadding={0}
                    labelHeight={15}
                    fontSize={14}
                    maxLength={4}
                    keyboardType="numeric"
                    style={{ alignSelf: 'center', }}
                    label='Year Of Establishment'
                    value={year_of_operation}
                    onChangeText={(value) => setYearOfOperation(value)}
                />

                <TextField
                    labelPadding={0}
                    labelHeight={15}
                    fontSize={14}
                    style={{ alignSelf: 'center',color:"grey"  }}
                    label='MedPCs ID'
                    value={med_pc_id}
                    editable={false}
                    onChangeText={(value) => setMedPcId(value)}
                />
                <TextField
                    labelPadding={0}
                    labelHeight={15}
                    fontSize={14}
                    style={{ alignSelf: 'center',color:"grey"  }}
                    label='ROC NO'
                    value={roc_no}
                    editable={false}
                    onChangeText={(value) => setRocNo(value)}

                />

                {/* <TextField
                    labelPadding={0}
                    labelHeight={15}
                    fontSize={14}
                    style={{ alignSelf: 'center', color:'grey'  }}
                    label='License Number'
                    value={license}
                    editable={false}
                    onChangeText={(license) => setLicense(license)}
                /> */}
                 <TextField
                    labelPadding={0}
                    labelHeight={15}
                    fontSize={14}
                    style={{ alignSelf: 'center', }}
                    label='Owner Name'
                    value={owner_name}
                    onChangeText={(owner_name) => setOwnerName(owner_name)}

                />

                <TextField
                    labelPadding={0}
                    labelHeight={15}
                    fontSize={14}
                    style={{ alignSelf: 'center',color:"grey"  }}
                    label='Owner IC Number'
                    value={ic_no}
                    editable={false}                    
                    onChangeText={(ic_no) => setIcNo(ic_no)}

                />



                {/* <TextField
                    style={{ alignSelf: 'center',marginTop:10  }}
                    label='Experience'
                    keyboardType='phone-pad'
                    maxLength={3}
                    onChangeText={(experience) => { 
                        setExperience(experience)
                    
                        }}
                    value={experience}
                /> */}




                <TextField
                    labelPadding={0}
                    labelHeight={15}
                    fontSize={14}
                    style={{ alignSelf: 'center'}}
                    label='Description'
                    value={description}
                    onChangeText={(description) => setDescription( description )}
                />

              

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={submitEditProfile11}
                    underlayColor='#fff'>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>

        </View>
             
        </KeyboardAwareScrollView>

      
    )
}

let styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
        padding:20,
        marginTop:15

	},
	submitButton: {
        width: '90%',
        borderRadius:5,
		marginTop: 10,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: '#4C74E6',
		borderWidth: 1,
		borderColor: '#fff',
        marginTop: 20,
        alignSelf:'center'
	},
	submitText: {
		fontFamily:'roboto-bold',
		color: 'white',
		textAlign: 'center',
		paddingLeft: 10,
		paddingRight: 10,
		fontSize: 20,
		
	},

	indicator: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 80
	}

});



export default EditProfile;
