import * as ActionTypes from '../../type';
import Axios from 'axios';
import ApiUrl from '../../../Globals/ApiUrl';
import {showMessage} from '../../../Globals/Globals';
import { NavigationActions,StackActions } from 'react-navigation';

export const searchRequestedJobs = (user_id,category_id,state_id,city_id,full_address,lat,long,
    req_date,job_desp,from_time,to_time, navigation,wallet_balance,job_scope,clinic_requirement,rm_hour,dayORhour) => {

    return dispatch => {

        dispatch({
            type:ActionTypes.SHOW_LOADING
        });

        let formData = new FormData();	
        formData.append('job_cat_id', category_id);
        //formData.append('experience',experience);
        formData.append('job_location', full_address);
        formData.append("state_id",state_id);
        formData.append("city_id",city_id);
        formData.append('lat', lat);
        formData.append('long', long);
        formData.append('userid', user_id);
        formData.append('role', 2);
        formData.append('required_date',req_date);
        formData.append('job_desc', job_desp);
        formData.append('from_time',from_time);
        formData.append('to_time',to_time);
        formData.append("job_scope",job_scope);
        formData.append("clinic_requirement",clinic_requirement);
        formData.append("rm_hour",rm_hour);
        formData.append("dayorhour",dayORhour)

        console.log("formdata",formData);
        Axios.post(ApiUrl.base_url + ApiUrl.post_job,formData)
            .then(response => {

                dispatch({
                    type: ActionTypes.HIDE_SPINNER
                })

                console.log("post job",response.data)

                
                if(response.data.status == 'success'){

                    dispatch({

                        type: ActionTypes.UPDATE_JOBS_REMAINING,
                        jobs_remaining : response.data.jobs_remaining.toString()
                    });
                    showMessage(0, response.data.message, "Job Post", true, false);
    
                    navigation.goBack()
                }else{
                    if(parseFloat(wallet_balance)  == 0 || wallet_balance.toString() == "" ){
                        navigation.navigate('Packages');
                        const resetAction = StackActions.reset({
                          index: 0,
                          key: 'Packages',
                          actions: [NavigationActions.navigate({ routeName: 'Packages' })],
                        });
                        navigation.dispatch(resetAction);
                    }
                   
                    showMessage(0,response.data.message, 'Search Job', true, false);
                }

            }).catch(error => {

                console.log("error",error);

                dispatch({
                    type:ActionTypes.RESPONSE_ERROR,
               })
                showMessage(0,'Something went wrong. Please try again later !', 'Search Job', true, false);

            })

    }
    
}

// update (post) job detail
export const editJobPost = (user_id,job_id,category_id,state_id,city_id,fulladdress,lat,long,req_date,job_desp,
    from_time,to_time,navigation,wallet_balance,job_scope,clinic_requirement,rm_hour,dayORhour) => (dispatch) => 

    new Promise(function(resolve) {

        dispatch({
            type:ActionTypes.SHOW_LOADING
        });

        let formData = new FormData();	
        formData.append('job_cat_id', category_id);
        //formData.append('experience',experience);
        formData.append('job_location', fulladdress);
        formData.append("job_id",job_id);
        formData.append("state_id",state_id);
        formData.append("city_id",city_id);
        formData.append('lat', lat);
        formData.append('long', long);
        formData.append('user_id', user_id);
        formData.append('role', 2);
        formData.append('required_date',req_date);
        formData.append('job_desc', job_desp);
        formData.append('from_time',from_time);
        formData.append('to_time',to_time);
        formData.append("job_scope",job_scope);
        formData.append("clinic_requirement",clinic_requirement);
        formData.append("rm_hour",rm_hour);
        formData.append("dayorhour",dayORhour)

        console.log("formdata",formData);
        Axios.post(ApiUrl.base_url + ApiUrl.edit_job_post,formData)
            .then(response => {

                dispatch({
                    type: ActionTypes.HIDE_SPINNER
                })

                console.log("post job",response.data)

                
                if(response.data.status == 'success'){

                    dispatch({

                        type: ActionTypes.UPDATE_JOB_POST_BY_ID,
                        details : response.data.result,
                        job_id: job_id
                    });
                    showMessage(0, response.data.message, "Job Post", true, false);
                   resolve(response)
                }

            }).catch(error => {

                console.log("error",error);

                dispatch({
                    type:ActionTypes.RESPONSE_ERROR,
               })
                showMessage(0,'Something went wrong. Please try again later !', 'Search Job', true, false);

            })
    })

export const getJobList = (user_id) => {

    return dispatch => {

        dispatch({
            type:ActionTypes.SHOW_LOADING
        });


        let formData = new FormData();
        formData.append("userid",user_id);
        Axios.post(ApiUrl.base_url + ApiUrl.get_job_list,formData)
            .then(response => {

                dispatch({
                    type: ActionTypes.HIDE_SPINNER
                });
               
                console.log("response job list",response.data.data);
                if(response.data.status == 'success'){

                    dispatch({
                        type:ActionTypes.SEARCH_JOBS_LIST,
                        job_list : response.data.result
                    })

                }else{
                    dispatch({
                        type:ActionTypes.SEARCH_JOBS_LIST,
                        job_list : []
                    })
                    showMessage(0,response.data.message, 'Job List', true, false);
                }

            })
            .catch(error => {
                console.log("error",error);
                dispatch({
                    type:ActionTypes.RESPONSE_ERROR,
               })
                showMessage(0,'Something went wrong. Please try again later !', 'Job List', true, false);

            });
    }
}

export const get_applied_jobs = (user_id) => {

    return dispatch => {

        dispatch({
            type:ActionTypes.SHOW_LOADING
        });

        let formdata = new FormData();
        formdata.append("userid",user_id)
        Axios.post(ApiUrl.base_url+ApiUrl.applied_jobs,formdata)
            .then(response => {

                dispatch({
                    type: ActionTypes.HIDE_SPINNER
                });

                if(response.data.status === 'success'){

                    dispatch({

                        type: ActionTypes.APPLIED_JOB,
                        applied_jobs : response.data.result
                    });


                }else{
                    showMessage(0,response.data.message, 'Applied Job', true, false);
                }

            })
            .catch(error => {

                dispatch({
                    type:ActionTypes.RESPONSE_ERROR,
               })
                showMessage(0,'Something went wrong. Please try again later !', 'Applied Job', true, false);


            })

    }
}


export const cancelJobPost = (job_id, user_id) =>  (dispatch) => 
    new Promise(function (resolve){

        dispatch({
            type:ActionTypes.SHOW_LOADING
        });

        let formData = new FormData();
        formData.append("job_id",job_id);
        formData.append("user_id",user_id);
        formData.append("role",2);
        console.log("fomedata",formData);
        Axios.post(ApiUrl.base_url+ApiUrl.cancel_job_posting ,formData)
            .then(response => {

                dispatch({
                    type: ActionTypes.HIDE_SPINNER
                });

                if(response.data.status  == "success"){

                    dispatch({
                        type:ActionTypes.REMOVE_JOB_POST_BY_ID,
                        job_id : job_id,
                    });

                    showMessage(0,response.data.message, 'Job Detais', true, false);
                    resolve(1);
                }else{
                    showMessage(0,response.data.message, 'Job Details', true, false);
                }



            }).catch(error=> {

                console.log("err",error)
                dispatch({
                    type:ActionTypes.RESPONSE_ERROR,
               })
                showMessage(0,'Something went wrong. Please try again later !', 'Practitioners List', true, false);

            })


    }) ;


    // to get job details
export const editPostJostDetails = (user_id,post_id) => (dispatch) => 
    new Promise((resolve,reject) => {

        dispatch({
            type:ActionTypes.SHOW_LOADING
        });

        //?user_id=244&role=2&job_id=2

        let formData =  new FormData() ;
        formData.append("user_id",user_id);
        formData.append("job_id",post_id[0]);
        formData.append("role",2);
        console.log("form",formData);
        Axios.post(ApiUrl.base_url+ApiUrl.job_detail,formData)
            .then(response => {

                dispatch({
                    type: ActionTypes.HIDE_SPINNER
                });
                console.log("respo",response.data);
                if(response.data.status == "success"){

                    resolve(response);
                }else{
                    reject(response)
                }
            })
            .catch(error => {
                console.log("error",error);
                dispatch({
                    type:ActionTypes.RESPONSE_ERROR,
               })
                showMessage(0,'Something went wrong. Please try again later !', 'Job Details', true, false);


            })

    })    

export const getJobAppliedList = (user_id, job_id) => {

    return dispatch => {

        dispatch({
            type:ActionTypes.SHOW_LOADING
        });

        let formData = new FormData();
        formData.append("clinicid",user_id);
        formData.append("job_id",job_id);
        
        Axios.post(ApiUrl.base_url+ApiUrl.practitioner_request,formData)
            .then(response =>{

                dispatch({
                    type: ActionTypes.HIDE_SPINNER
                });

               
                console.log("res......cvsgcs",response.data);
                if(response.data.status == 'success'){

                    dispatch({
                        type:ActionTypes.GET_APPLIED_USERS,
                        applied_users_list : response.data.result,
                    })

                }else{
                    dispatch({
                        type:ActionTypes.GET_APPLIED_USERS,
                        applied_users_list : [],
                    })
                    showMessage(0,response.data.message, 'Practitioners List', true, false);
                }

            })
            .catch(error =>{

                console.log("err",error)
                dispatch({
                    type:ActionTypes.RESPONSE_ERROR,
               })
                showMessage(0,'Something went wrong. Please try again later !', 'Practitioners List', true, false);

            });


    }
} 

// list to check if coming from list or details to update the UI
export const acceptApplication = (id , status,navigation , list) => {

    return dispatch => {

        dispatch({
            type:ActionTypes.SHOW_LOADING
        });
        let type ;
        if(status ==  1){
            type ="Accept";
        }else{
            type ="Reject";
        }

        let formData = new FormData();
        formData.append("application_id" ,id);
        formData.append("application_status",status) ;

        Axios.post(ApiUrl.base_url+ApiUrl.accept_application,formData)
        .then(response =>{

            dispatch({
                type: ActionTypes.HIDE_SPINNER
            });

           console.log("res.. ",response.data);
            if(response.data.status == 'success'){

                dispatch({
                    type:ActionTypes.CHANGE_APPLICATION_STATUS_USER,
                    change_application_status : status,
                    id : id
                });

                if(list === 0){
                    if(navigation.getParam('result')['fetch'] == 0){
                        navigation.goBack()
                    }else{
                        navigation.state.params.fetch();
                        navigation.goBack()
                    }
                }

            }else{
                showMessage(0,response.data.message, `${type} Practitioner`, true, false);
            }

        })
        .catch(error =>{

            console.log("err",error)
            dispatch({
                type:ActionTypes.RESPONSE_ERROR,
           })
            showMessage(0,'Something went wrong. Please try again later !', `${type} Practitioner`, true, false);

        });



    }

}
