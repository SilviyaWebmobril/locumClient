import {REGISTER_USER_RESPONSE, 
    SHOW_LOADING,
    RESPONSE_ERROR,
    FETCH_SPECIALITY,
    FETCH_GRADES,
    PROFILE_PIC_UPLOADED,
    UPLOAD_DOCUMENTS,
    CREATE_PROFILE,
    DEVICE_TOKEN,
    LOGOUT_USER,
    STORE_USER_ID_GLOBALLY,
    AUTH_CHANGED,
    JOB_CATEGORIES,
    GET_CITIES,
    GET_STATES,
    HIDE_SPINNER} from '../../type';
import axios from 'axios';
import ApiUrl from '../../../Globals/ApiUrl';
import { showMessage } from '../../../Globals/Globals';
import { NavigationActions,StackActions } from 'react-navigation';



export const getStatesList = () => (dispatch) => 
    new Promise(function(resolve){

        dispatch({
            type:SHOW_LOADING,
        });

        var formdata = new FormData();
        formdata.append('country_id','132');
        axios.post(ApiUrl.base_url+ApiUrl.get_states,formdata)
            .then(response => {

                if(response.data.status === 'success'){

                    let states_list =[] ;
                    let new_obj;
                   response.data.data.forEach(element => {

                    new_obj = Object.assign({}, {label:element.name,value :element.id });
                    states_list.push(new_obj);
                       
                   });
                    dispatch({
                        type:GET_STATES,
                        states: states_list
                    })
    
                }else{
                    dispatch( {
                        type:RESPONSE_ERROR,
                    })
                }

                resolve(1);
               
            })
            .catch(error => {

                showMessage(0,'Something went wrong. Please try again later !', 'Create Profile', true, false);

                dispatch( {
                    type:RESPONSE_ERROR,
                })
              
            })


    })

   


export const getCitiesList = (state_id) => (dispatch) => 
    new Promise(function(resolve){

        dispatch({
            type:SHOW_LOADING,
        });

        var formdata = new FormData();
        formdata.append('state_id',state_id);
        console.log("formdara",formdata);   
        axios.get(ApiUrl.base_url+ApiUrl.get_city+"?state_id="+state_id)
            .then(response => {

                if(!response.data.error){

                    let city_list =[] ;
                    let new_obj;
                   
                   response.data.data.forEach(element => {

                    new_obj = Object.assign({}, {label:element.name,value :element.id });
                    city_list.push(new_obj);
                       
                   });

                    dispatch({
                        type:GET_CITIES,
                        cities: city_list
                    })
    
                }else{
                    dispatch( {
                        type:RESPONSE_ERROR,
                    })
                }
                resolve(1)
               
            })
            .catch(error => {

                showMessage(0,'Something went wrong. Please try again later !', 'Create Profile', true, false);

                dispatch( {
                    type:RESPONSE_ERROR,
                })
              
            })


    })





export const userRegister  = (name,email,mobile,password,navigation) => {
 

    return dispatch => {



        dispatch({
            type:SHOW_LOADING,
        })

        //any async code you want! 
        var formData  = new FormData();
        formData.append('name', name);
		formData.append('phone', mobile);
		formData.append('email', email);
		formData.append('password', password);
		//2 for clinic 5 for practitioner
		formData.append('role', 2);
       
       
      axios.post(ApiUrl.base_url + ApiUrl.sign_up,formData,)
      .then(response => {

        if(response.data.status === "success" ){

            console.log("data status",response.data);

            dispatch({
                type: LOGOUT_USER,
            })

            dispatch( {
                type:REGISTER_USER_RESPONSE,
                register_id:response.data.result,
                register_user_name : name
            });

            //dispatch(NavigationActions.navigate({ routeName: 'NoNetwork' }));

            navigation.navigate('CreateProfile',{"name":name,"email":email,"mobile":mobile});
          
        }else{

            dispatch( {
                type:RESPONSE_ERROR,
            })

        }

        showMessage(0,response.data.message, 'Register', true, false);

     
      }).catch(error => {

        console.log("bvsgvfdhsfdh",error);
        showMessage(0,'Something went wrong. Please try again later !', 'Register', true, false);

        dispatch( {
            type:RESPONSE_ERROR,
        })
      
    
      });
      
    }

    
}

export const fetchJobCategories =  () => (dispatch) => 

    new Promise(function(resolve){


        dispatch({
            type:SHOW_LOADING,
        });

        axios.post(ApiUrl.base_url+ApiUrl.get_job_categories)
            .then(response => {

                if(response.data.status === 'success'){

                    let profession_categories =[] ;
                    let new_obj;
                   response.data.result.forEach(element => {

                    new_obj = Object.assign({}, {label:element.name,value :element.id });
                    profession_categories.push(new_obj);
                       
                   });
                   
                    dispatch({
                        type:JOB_CATEGORIES,
                        profession_categories:profession_categories
                    })
                    resolve(1);
                }else{
                    dispatch({
                         type:RESPONSE_ERROR,
                    })
                }

               

            })
            .catch(error => {

                dispatch({
                    type:RESPONSE_ERROR,
               })
                showMessage(0,'Something went wrong. Please try again later !', 'Create Profile', true, false);
            })




    })

    


export const fetchGrades = () => (dispatch) => 

    new Promise(function(resolve) {

        dispatch ({
            type:SHOW_LOADING
        });

        axios.post(ApiUrl.base_url + ApiUrl.grades_list)
            .then(response =>{

                if(response.data.status === 'success'){

                    let fetch_grades =[] ;
                    let new_obj;
                    response.data.data.forEach(element => {
 
                     new_obj = Object.assign({}, {label:element.name,value :element.id });
                     fetch_grades.push(new_obj);
                        
                    });
                    
                    dispatch({
                        type:FETCH_GRADES,
                        grades:fetch_grades
                    })
                }else{
                    dispatch({
                         type:RESPONSE_ERROR,
                    })
                }

                resolve(1);

            })
            .catch(error => {

                dispatch({
                    type:RESPONSE_ERROR,
               })
                showMessage(0,'Something went wrong. Please try again later !', 'Create Profile', true, false);

            })


    })

  


export const fetchSpecialities =  (profession_id) => (dispatch) => 
    new Promise(function(resolve ) {

        dispatch({
            type:SHOW_LOADING,
        });

        var formData = new FormData();
        formData.append('profession_id', profession_id);
        
        axios.post(ApiUrl.base_url + ApiUrl.specialities_list,formData)
            .then(response => {

               
                if(response.data.status === "success" ){

                    
                    let fetch_speciality =[] ;
                    let new_obj;
                    response.data.data.forEach(element => {
 
                     new_obj = Object.assign({}, {label:element.name,value :element.id });
                     fetch_speciality.push(new_obj);
                        
                    });
                   
                    dispatch({
                        type:FETCH_SPECIALITY,
                        specialities:fetch_speciality
                    });
                }else{
                    dispatch({
                        type:FETCH_SPECIALITY,
                        specialities:[]
                    });
                    dispatch({
                        type:RESPONSE_ERROR,
                   });
                   showMessage(0,response.data.message, 'Create Profile', true, false);

                }
               resolve(1);

            })
            .catch(error => {
                console.log("fetchSpecialities",error);
                dispatch({
                    type:RESPONSE_ERROR,
               })
                showMessage(0,'Something went wrong. Please try again later !', 'Create Profile', true, false);

            })



    })

export const submitCreateProfile1 = (user_id,name,profession_val,mobile,ic_no,specialities_val,license,grades_val,
    address,description,lat,long,state_id,city_id,navigation) => {

    return dispatch => {

        dispatch({
            type:SHOW_LOADING,
        });

        var formData = new FormData();
        formData.append('userid', user_id);
        formData.append('name', name);
        formData.append('country',132);
        formData.append("state",state_id);
        formData.append("city",city_id);
        formData.append('latitude', lat);
        formData.append('longitude', long);
        formData.append('profession', profession_val);
        formData.append('mobile', mobile);
        //formData.append('degree', degree)
        formData.append('ic_no', ic_no);
        formData.append('speciality', specialities_val);
        formData.append('license', license);
        formData.append('grade', grades_val)
        //formData.append('experience', experience)
        formData.append('role', 2)

        //new

        formData.append('address', address);
        //formData.append('current_work', current_work);
        formData.append('description', description)
         
        console.log("form data...",formData);
         
        axios.post(ApiUrl.base_url + ApiUrl.create_profile,formData,)
        .then(response => {
  
           
          if(response.data.status === "success" ){
  
              
              dispatch( {
                  type:CREATE_PROFILE,
                  result_user:response.data.result
              });
  
              navigation.navigate('UploadDocuments');
            
          }else{
  
              dispatch( {
                  type:RESPONSE_ERROR,
              })
  
          }
  
          showMessage(0,response.data.message, 'Create Profile', true, false);
  
       
        }).catch(error => {
  
          showMessage(0,'Something went wrong. Please try again later !', 'Create Profile', true, false);
  
          dispatch( {
              type:RESPONSE_ERROR,
          })
        
      
        });


    }

}

export const submitEditProfile = (user_id,name,profession_id,mobile,ic_no,speciality_id,license,grades_id,
    user_address,description,lat ,lng,state_id, city_id,weekly_rate,monthly_rate,hourly_rate,navigation) => {

return dispatch => {

    dispatch({
        type:SHOW_LOADING,
    });

    var formData = new FormData();
    formData.append('userid', user_id);
    //formData.append('userid',507);
    formData.append("name",name)
    formData.append('country',132);
    formData.append("state",state_id);
    formData.append("city",city_id);
    formData.append('latitude', lat);
    formData.append('longitude', lng);
    formData.append('profession', profession_id);
    formData.append('mobile', mobile);
    //formData.append('degree', degree)
    formData.append('ic_no', ic_no);
    formData.append('speciality', speciality_id);
    formData.append("weekly_rate",weekly_rate);
    formData.append("hourly_rate",hourly_rate);
    formData.append("monthly_rate",monthly_rate);

    formData.append('license', license);
    formData.append('grade', grades_id)
    //formData.append('experience', experience)
    formData.append('role', 2)

    //new

    formData.append('location', user_address);
    //formData.append('current_work', current_work);
    formData.append('description', description)
     
    console.log("form data...",formData);
     
    axios.post(ApiUrl.base_url + ApiUrl.edit_profile,formData,)
    .then(response => {

       
        console.log("response from edit profile",response.data.result)
      if(response.data.status === "success" ){

          
          dispatch( {
              type:CREATE_PROFILE,
              result_user:response.data.result
          });

         
        
      }else{

          dispatch( {
              type:RESPONSE_ERROR,
          })

      }

      showMessage(0,response.data.message, 'Profile', true, false);

   
    }).catch(error => {

        console.log(error);
      showMessage(0,'Something went wrong. Please try again later !', 'Profile', true, false);

      dispatch( {
          type:RESPONSE_ERROR,
      })
    
  
    });


}

}




export const uploadProfilePic = (user_id,picUri ,picName) => {

    return dispatch => {

        dispatch({
            type:SHOW_LOADING,
        });

        let formData = new FormData();
        formData.append("userid",user_id)
        var photo = {
            uri: picUri,
            type: "image/jpeg",
            name: picName,
        };
        //	body.append('userpic', JSON.stringify(data));
        formData.append('userpic', photo);
        formData.append('role', 2);

        console.log("formdata........",formData);

        axios.post(ApiUrl.base_url + ApiUrl.update_profile_pic,formData)
            .then(response =>{

                console.log("resp .. pic",response.data);
               if(response.data.status == 'success'){

                    dispatch({
                        type:PROFILE_PIC_UPLOADED,
                        user_pic:response.data.data.user_image
                    });

               }else{
                    dispatch( {
                        type:RESPONSE_ERROR,
                    });
    
               }

                
                showMessage(0,response.data.message, 'Profile', true, false);

               
            })
            .catch(error => {

                console.log("error",error);
                showMessage(0,'Something went wrong. Please try again later !', 'Profile', true, false);
  
                dispatch( {
                    type:RESPONSE_ERROR,
                })

            })


    }


}


 export const uploadUserDocuments = (user_id, fileOne , fileTwo ,fileThree , fileFour, navigation ) => {

    return dispatch => {

        dispatch({
            type:SHOW_LOADING,
        });

        var body = new FormData();
        body.append('doc_1', fileOne);
        body.append('doc_2', fileTwo);
        body.append('doc_3', fileThree);
        body.append('doc_4', fileFour);
        body.append('userid', user_id);
        body.append('role', 2);

        axios.post(ApiUrl.base_url + ApiUrl.upload_documents,body)
            .then(response => {

                
                if(response.data.status == "success"){

                    dispatch({
                        type:UPLOAD_DOCUMENTS,
                    });
                   
                    navigation.navigate('Login');

                }else{

                    dispatch( {
                        type:RESPONSE_ERROR,
                    })
        

                }
                showMessage(0,response.data.message, 'Upload Documents', true, false);

            })
            .catch(error => {

                console.log("error",error);
                showMessage(0,'Something went wrong. Please try again later !', 'Create Profile', true, false);
  
                dispatch( {
                    type:RESPONSE_ERROR,
                })

            })


    }
 } 


 export const submitUserLogin = (email,password,token,navigation) => {
     return dispatch => {

        dispatch( {
            type:SHOW_LOADING,
        });

        let formdata = new FormData();
        formdata.append("email",email);
        formdata.append("password",password);
        formdata.append("device_token",token);
        formdata.append('role', 2);
        console.log("form",formdata);
        axios.post(ApiUrl.base_url+ApiUrl.login,formdata)
            .then((response) => {

                console.log("res login",response.data);
                if(response.data.status === "success"){

                    dispatch({
                        type :AUTH_CHANGED,
                        authenticated:true
    
                    })
                    dispatch({
                        type:HIDE_SPINNER,
                    });
            

                    if(response.data.result.profile_update_status == 0 ){
                        // move to create profile
                        navigation.navigate('CreateProfile',{"name":response.data.result.name,"email":response.data.result.email,"mobile":response.data.result.mobile});
                    }else if(response.data.result.document_update_status == 0 ){
                        // move to upload documnets 
                        navigation.navigate('UploadDocuments');
                    }else if( response.data.result.profile_update_status ==  1 && response.data.result.document_update_status ==  1){

                        dispatch({
                            type:CREATE_PROFILE,
                            result_user:response.data.result
                        });
    
                        dispatch({
                            type:STORE_USER_ID_GLOBALLY,
                            user_details:response.data.result,
                            result_user_id:response.data.result.id,
                            device_token:token
                        })
                       // AsyncStorage.setItem('user_id',JSON.stringify(user_data.id));
                        navigation.navigate('Home')

                    }


                  

                }else{

                    dispatch( {
                        type:RESPONSE_ERROR,
                    })

                }
                showMessage(0,response.data.message, 'Login', true, false);

            })
            .catch(error => {

                console.log("err",error);
                showMessage(0,'Something went wrong. Please try again later !', 'Create Profile', true, false);
  
                dispatch( {
                    type:RESPONSE_ERROR,
                })

            })

     }
 }


 export const userResetPassword =(user_id,old_pass,new_pass, confirm_pass,navigation) => {

    return dispatch => {

        dispatch({
            type:SHOW_LOADING
        });
        var formData = new FormData();

        formData.append('userid', user_id);
        formData.append('old_password', old_pass);
        formData.append('new_password', new_pass);
        formData.append('confirm_password', confirm_pass);
        //2 for clinic 2 for practitioner
        formData.append('role', 2);
        console.log("formdata",formData);
        axios.post(ApiUrl.base_url+ApiUrl.change_password,formData)
            .then(response =>{

                console.log("response...",response.data);
                dispatch({
                    type:HIDE_SPINNER
                })
                
                if(response.data.status == 'success'){

                   
                    dispatch({
                        type:LOGOUT_USER
                    });

                    navigation.navigate("Login")
                    const resetAction = StackActions.reset({
                        index: 0,
                        key: 'Login',
                        actions: [NavigationActions.navigate({ routeName: 'Login' })],
                    });
                    navigation.dispatch(resetAction);
                }else{
                    showMessage(0,response.data.message, 'Reset Password', true, false);
                }
            })
            .catch(error => {

                console.log("er",error);
                showMessage(0,'Something went wrong. Please try again later !', 'Reset Password', true, false);
  
                dispatch( {
                    type:RESPONSE_ERROR,
                })
            })

    }

 }


 export const showSpinner = () => {

    return {
        type:SHOW_LOADING
    }
}


export const hideSpinner = () => {

    return {
        type:HIDE_SPINNER
    }
}


