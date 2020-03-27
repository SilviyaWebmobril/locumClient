import * as ActionTypes from '../../type';
import Axios from 'axios';
import ApiUrl from '../../../Globals/ApiUrl';
import {showMessage} from '../../../Globals/Globals';
import { NavigationActions,StackActions } from 'react-navigation';

export const searchRequestedJobs = (user_id,category_id,experience,location,lat,long,req_date,job_desp,from_time,to_time, navigation,wallet_balance) => {

    return dispatch => {

        dispatch({
            type:ActionTypes.SHOW_LOADING
        });

        let formData = new FormData();	
        formData.append('job_cat_id', category_id);
        formData.append('experience',experience);
        formData.append('job_location', location);
        formData.append('lat', lat);
        formData.append('long', long);
        formData.append('userid', user_id);
        formData.append('role', 2);
        formData.append('required_date',req_date);
        formData.append('job_desc', job_desp);
        formData.append('from_time',from_time);
        formData.append('to_time',to_time);

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
               
                if(response.data.status == 'success'){

                    dispatch({
                        type:ActionTypes.SEARCH_JOBS_LIST,
                        job_list : response.data.result
                    })

                }else{
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
                showMessage(0,'Something went wrong. Please try again later !', 'Applied Job', true, false);

            });


    }
} 

export const acceptApplication = (id , status) => {

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
                })

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
