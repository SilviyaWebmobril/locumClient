import React ,{useEffect , useState } from 'react';
import { 	Text, View, Button, StyleSheet, SafeAreaView,
	Dimensions, Platform, PixelRatio, ScrollView,
	PermissionsAndroid, Image, FlatList, ActivityIndicator, TouchableOpacity, ToastAndroid, TouchableWithoutFeedback} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TextField } from 'react-native-material-textfield';
import NetInfo from "@react-native-community/netinfo";
import { Dropdown } from 'react-native-material-dropdown';
import { Card, CheckBox } from 'react-native-elements';
import { showMessage } from '../Globals/Globals';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import MyActivityIndicator from '../CustomUI/MyActivityIndicator';
import { useDispatch, useSelector } from "react-redux";
import {fetchJobCategories,fetchGrades,fetchSpecialities,submitCreateProfile1,getStatesList,getCitiesList} from '../redux/stores/actions/register_user';
import Geocoder from 'react-native-geocoding';

const CreateProfile = (props,navigation) => {


    const [email ,setEmail ] = useState(props.navigation.getParam('email'));
    const [profession_id ,setProfessionId ] = useState("");
    const [profession_label ,setProfessionLabel ] = useState("");
    const [speciality_id ,setSpecialityId ] = useState("");
    const [speciality_label ,setSpecialityLabel ] = useState("");
    const [ic_no ,setIcNo ] = useState("");
   // const [degree ,setDegree ] = useState("");
   // const [experience ,setExperience ] = useState("");
    const [current_work ,setCurrentWork ] = useState("");
    const [description ,setDescription ] = useState("");
    const [checked ,setChecked ] = useState(false);
    const [license ,setLicense ] = useState("");
    const [name ,setName ] = useState(props.navigation.getParam('name')) ;
    const [mobile ,setMobile  ] = useState(props.navigation.getParam('mobile'));
    const loading_status = useSelector(state => state.register.loading_status);
    const grades  =  useSelector(state => state.register.grades);
    const [grades_id,setGrade] = useState("");
    const [grades_label,setGradeLabel] = useState("");
    const profession_categories =  useSelector(state => state.register.profession_categories);
    const specialities  = useSelector(state => state.register.specialities);
    const temp_register_id =  useSelector(state => state.register.register_id);

    const get_states_list = useSelector(state => state.register.states_list);
    const get_cities_list = useSelector(state => state.register.cities_list);
    const [state_id ,setStateId ] = useState("");
    const [state_label ,setStateLabel ] = useState("");
    const [city_label ,setCityLabel ] = useState("");
    const [city_id , setCityId] = useState("");
    const [user_address,setUserAddress] = useState("");

    const dispatch = useDispatch();
    

    useEffect(()=> {

        
        NetInfo.isConnected.fetch().then(isConnected => {

            if(!isConnected){
                props.navigation.navigate("NoNetwork");
                return;
            }else{
                dispatch(fetchJobCategories());
                dispatch(fetchGrades());
                dispatch(getStatesList());
            }
        });

        console.log(profession_categories);

    },[setProfessionId],[setStateId])



    const onProfessionChangeListener = (id) => {

        profession_categories.forEach(element => {

            if(element.value  === id){
                
                setProfessionId(element.value);
                setProfessionLabel(element.label);
                
                NetInfo.isConnected.fetch().then(isConnected => {

                    if(!isConnected){
                        props.navigation.navigate("NoNetwork");
                        return;
                    }else{
                        setSpecialityLabel("");
                        setSpecialityId("");
                        dispatch(fetchSpecialities(id));
                    }
                });
             
            }
        });

        
    }

    const onSpecialityChangeListener = (id) => {

        specialities.forEach(ele => {

            if(ele.value  == id){

                setSpecialityId(id);
                setSpecialityLabel(ele.label)
            }
        })
    }

    const onGradeChangeListener = (id) => {

        grades.forEach(element => {
            if(element.value == id) {
                setGrade(id);
                setGradeLabel(element.label)
            }
        })
    }

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
                        dispatch(getCitiesList(id));
                    }
                });
            }
        })
    }

    const onCityChangeListener = (id) => {

        get_cities_list.forEach(ele => {

            if(ele.value  == id){

                setCityId(ele.value);
                setCityLabel(ele.label)
            }
        })
    }

       const setUserAddressGeocoder = async(value) => {
        setUserAddress(value);
        console.log(user_address);
      
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
		else if (speciality_id.length === 0) {

			showMessage(0, 'Enter your specialities', 'Profile', true, false);

			return false
		}
		else if (grades_id.length === 0) {

			showMessage(0, 'Enter your grades', 'Profile', true, false);

			return false
		}
		// else if (degree.length === 0) {

		// 	showMessage(0, 'Enter  your degree', 'Profile', true, false);

		// 	return false;
        // }
        
        
		else if (user_address.length === 0) {

			showMessage(0, 'Enter  your Adrress', 'Profile', true, false);

			return false;
        }
        
         
        else if (state_id == "") {

			showMessage(0, 'Please Select State', 'Profile', true, false);

			return false;
		}


        else if (city_id == "") {

			showMessage(0, 'Please Select City', 'Profile', true, false);

			return false;
		}

		else if (license.toString().trim().length === 0) {

			showMessage(0, 'Enter your license number', 'Profile', true, false);

			return false;
		}
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
       
      
		else if (!checked) {

			showMessage(0, 'Accept terms and condition', 'Profile', true, false);


			return false;
		}

		return valid;
	}


    const submitCreateProfile = () => {


            NetInfo.isConnected.fetch().then(isConnected => {

                if(!isConnected){
                    props.navigation.navigate("NoNetwork");
                    return;
                }else{
                    if(isValid()){

                        Geocoder.init("AIzaSyDBxQEvhACIZ73YCvPF9fI7A2l6lULic0E");
                        Geocoder.from(user_address)
                        .then(json => {
                            var location = json.results[0].geometry.location;
                            console.log(json);
                            console.log("location",location);
                            dispatch(submitCreateProfile1(temp_register_id,name,profession_id,mobile,ic_no,speciality_id,license,grades_id
                                ,user_address,description,location.lat ,location.lng,state_id, city_id,props.navigation));
                        })
                        .catch(error => 
                            {
                                console.log("er",error);
                                if(error.origin.results.length  <= 0 )
                                {
                                    showMessage(0, 'Please Enter valid Address', 'Profile', true, false);

                                }

                            }
                           
                            );
                    }
                  
                }
            });
         


    }






    if (loading_status) {
        return (
           <MyActivityIndicator />
        );
    }


    return (
        <View style={{ flex: 1,marginBottom:20 }}>
            <SafeAreaView style={{ backgroundColor: '#4C74E6' }} />


            <View style={styles.container}>
               
                <KeyboardAwareScrollView >
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                   
                    <View style={{width:Dimensions.get('window').width * 0.9,marginTop:30 }}>
                            <TextField
                                style={{ alignSelf: 'center',marginTop:10,color:"grey" }}
                                label='Name'
                                value={name}
                                editable={false}
                                onChangeText={(name) => setName(name)}
                            />


                            <TextField
                                style={{ alignSelf: 'center',marginTop:10,color:"grey"  }}
                                label='Email'
                                value={email}
                                editable={false}
                                onChangeText={(email) => setEmail(email)}
                            />

                            <TextField
                                style={{ alignSelf: 'center',marginTop:10,color:"grey"  }}
                                label='Mobile'
                                keyboardType='numeric'
                                textContentType='telephoneNumber'
                                value={mobile}
                                editable={false}
                                onChangeText={(mobile) => setMobile(mobile)}
                            />

                            <Dropdown
                                label='Select Job Profile'
                                data={profession_categories}
                                value={profession_label}
                                onChangeText={(value) => { onProfessionChangeListener(value) }} // passing id here
                            />

                            <Dropdown
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
                                
                            />
                         
                            {/* <TextField
                                style={{ alignSelf: 'center',marginTop:10  }}
                                label='Degree'
                                value={degree}
                                onChangeText={(degree) => setDegree(degree)}
                            />


                            <TextField
                                style={{ alignSelf: 'center',marginTop:10  }}
                                label='Current Work'
                                value={current_work}
                                onChangeText={(current_work) => setCurrentWork(current_work)}
                            /> */}

                            <TextField
                                style={{ alignSelf: 'center',marginTop:10 ,color:"grey" }}
                                label='Country'
                                value="Malaysia"
                                editable={false}
                            />

                            <Dropdown
                                label='Select States'
                                data={get_states_list}
                                value={state_label}
                                onChangeText={(value) => { onStateChangeListener(value) }} // passing id here
                            />

                            <Dropdown
                                label='Select City'
                                data={get_cities_list}
                                value={city_label}
                                onChangeText={(value) => { onCityChangeListener(value) }} // passing id here
                            />

                            <TextField
                                style={{ alignSelf: 'center',marginTop:10  }}
                                label='Address'
                                value={user_address}
                                onChangeText={(value) => setUserAddressGeocoder(value)}
                            />


                            <TextField
                                style={{ alignSelf: 'center',marginTop:10  }}
                                label='License Number'
                                value={license}
                                onChangeText={(license) => setLicense(license)}
                            />
                            <TextField
                                style={{ alignSelf: 'center',marginTop:10  }}
                                label='IC Number'
                                value={ic_no}
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
                                style={{ alignSelf: 'center',marginTop:10  }}
                                label='Description'
                                value={description}
                                onChangeText={(description) => setDescription( description )}
                            />

                            {/*checkbox */}

                            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center', marginTop: 10, marginBottom: 4 }}>


                                <CheckBox
                                    onPress={() => setChecked(!checked)}
                                    checked={checked}
                                    checkedColor="blue"

                                />
                                <TouchableOpacity onPress={() => props.navigation.navigate('TermsCondition')}>
                                {/* <TouchableOpacity onPress={() => {}}> */}
                                    <View style={{ flexDirection: 'row', marginLeft: -15, flexWrap: 'wrap', flexShrink: 1 }}>
                                        <Text style={{ color: 'black' }}>Accept  </Text>
                                        <Text style={{ textDecorationLine: 'underline', marginLeft: 2, color: 'bluye' }}>Terms & Condition</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>




                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={submitCreateProfile}
                                underlayColor='#fff'>
                                <Text style={styles.submitText}>Create</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </KeyboardAwareScrollView>
                
            </View>
        </View >

    )


}

let styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',

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
		fontFamily:'Roboto-Light',
		color: 'white',
		textAlign: 'center',
		paddingLeft: 10,
		paddingRight: 10,
		fontSize: 20,
		fontWeight: 'bold'
	},

	indicator: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 80
	}

});





export default CreateProfile;