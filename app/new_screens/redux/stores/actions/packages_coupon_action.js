import * as ActionTypes  from '../../type';
import {showMessage } from '../../../Globals/Globals';
import Axios from 'axios';
import ApiUrl from '../../../Globals/ApiUrl';

// export const buy_packages = (id,user_id,amount,job_count,navigation) => {

//      return dispatch => {

//         dispatch({
//             type:ActionTypes.SHOW_LOADING
//         });
//         // this is working here
//         //return Promise.resolve(1)

//         let formData = new FormData();
//         formData.append('package_id', id);
//         Axios.post(ApiUrl.base_url + ApiUrl.buy_packages,formData)
//             .then(response => {
                
//                 console.log("response buy package ",response.data);
                
//                 if(response.data.status == 'success'){

               
//                     dispatch({
//                         type: ActionTypes.UPDATE_JOBS_REMAINING_AND_BALC,
//                         jobs_remaining:  response.data.jobs_remaining,
//                         amt_spent:amount
//                     })
//                     showMessage(1, responseJson.message, 'Packages', true, false);
//                     // sending 1 to navigate on transactions 
//                       // not here
//                    return Promise.resolve(1)
                   

//                 }else{

//                       showMessage(1, responseJson.message, 'Packages', true, false);
//                       // sending 1 to navigate on add money 
//                      resolve(0);
//                 }

//             })
//             .catch(error => {

//             })
//         }

// }


export const buy_packages = (id,user_id,amount,job_count,coupon_applied,navigation) => (dispatch)=> 
new Promise(function(resolve){

    dispatch({
        type:ActionTypes.SHOW_LOADING
    });

    let formData = new FormData();
    formData.append('package_id', id);
    formData.append('user_id', user_id);
    formData.append('amt', amount.toString());
    formData.append('job_count', job_count);
    formData.append("coupon_applied",coupon_applied);
    
    Axios.post(ApiUrl.base_url + ApiUrl.buy_package,formData)
        .then(response => {
            
            console.log("response buy package ",response.data);
            dispatch({
                type:ActionTypes.HIDE_SPINNER
            });

            
            if(response.data.status == 'success'){

            
                dispatch({
                    type: ActionTypes.UPDATE_JOBS_REMAINING_AND_BALC,
                    jobs_remaining:  response.data.jobs_remaining,
                    amt_spent:amount
                })
                showMessage(1, response.data.message, 'Packages', true, false);
                // sending 1 to navigate on transactions 
                resolve(1);
                
            }else{

                    showMessage(1, response.data.message, 'Packages', true, false);
                    // sending 1 to navigate on add money 
                    resolve(0);
                
            }

        })
        .catch(error => {

            dispatch( {
                type:ActionTypes.RESPONSE_ERROR,
            })
            showMessage(0,'Something went wrong. Please try again later !', 'Buy Packages', true, false);


        })

});


export const get_packages = () => {

    return dispatch => {

        dispatch({
            type:ActionTypes.SHOW_LOADING
        });

        let formData =  new FormData();
        formData.append("role",2);

        Axios.post(ApiUrl.base_url+ApiUrl.get_packages,formData)
            .then(response => {

               dispatch({
                   type:ActionTypes.HIDE_SPINNER
               });

               console.log("resp..",response.data.data);

               if(response.data.status === 'success'){

                    dispatch({
                        type:ActionTypes.PACKAGES ,
                        packages: response.data.data,
                    })

               }else{

                  showMessage(0, "No Packages found !", 'Packages', true, false);

               }

            }).catch(error => {

                dispatch( {
                    type:ActionTypes.RESPONSE_ERROR,
                })
                showMessage(0,'Something went wrong. Please try again later !', 'Packages', true, false);


            })

    }

}
 


export const get_coupons = (user_id) => {

    return dispatch => {

        dispatch({
            type:ActionTypes.SHOW_LOADING
        });

        let formdata = new FormData();
        formdata.append('user_id',user_id);
        Axios.post(ApiUrl.base_url+ApiUrl.coupons_list,formdata)
            .then(response => {
                console.log("res.. cou",response.data);
                
                dispatch({
                    type:ActionTypes.HIDE_SPINNER
                });

                if(!response.data.error){

                  
                    dispatch({
                        type:ActionTypes.GET_COUPONS,
                        coupons_list : response.data.data
                    })


                }else{

                 
                    dispatch({
                        type:ActionTypes.NO_COUPON_ERROR
                    })
    
                    showMessage(0,'No Coupons Available!', 'Coupons', true, false);

                }

            })
            .catch(error => {

                console.log("get err",error);

                dispatch( {
                    type:ActionTypes.RESPONSE_ERROR,
                })

                showMessage(0,'Something went wrong. Please try again later !', 'Coupons', true, false);

            })

    }
}


export const applyCouponsNew = (user_id ,package_id ,coupon_code) => (dispatch) => 
new Promise(function(resolve){

    dispatch({
        type:ActionTypes.SHOW_LOADING
    });

    let formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('role', 2);
    formData.append('coupon_code', coupon_code);
    formData.append('package_id', package_id);
   
    console.log("formdata coupons",formData);
    Axios.post(ApiUrl.base_url + ApiUrl.apply_promo_new,formData)
        .then(response => {

            
            dispatch({
                type:ActionTypes.HIDE_SPINNER
            });

            if(response.data.error == "success"){

                
                showMessage(0, response.data.message, "Apply Promo", true, false);

                resolve(response);

                
            }else{
             
                //resolve(response);
                showMessage(0,response.data.message, "Apply Promo", true, false);
            }



        })
        .catch(error => {
            console.log("error",error);
        })


});


// export const applyCoupons = (user_id ,package_id,amount ,coupon_code,job_count) => (dispatch) => 
// new Promise(function(resolve){

//     dispatch({
//         type:ActionTypes.SHOW_LOADING
//     });

//     let formData = new FormData();
//     formData.append('user_id', user_id);
//     formData.append('role', 5);
//     formData.append('amt', amount);
//     formData.append('coupon_code', coupon_code);
//     formData.append('package_id', package_id);
//     formData.append('job_count', job_count);
//     console.log("formdata coupons",formData);
//     Axios.post(ApiUrl.base_url + ApiUrl.apply_coupons,formData)
//         .then(response => {

//             console.log("resp",response.data);
//             dispatch({
//                 type:ActionTypes.HIDE_SPINNER
//             });

//             if(response.data.status == "success"){

//                 console.log("resppp",response.data);
//                 showMessage(0, response.data.message, "Apply Promo", true, false);

//                 resolve(response);

                
//             }else{
             
//                 resolve(response);
//                 showMessage(0, response.data.message, "Apply Promo", true, false);
//             }



//         })
//         .catch(error => {
//             console.log("error",error);
//         })


// });


export const updateRemainingJobs = (remaining_job) =>{

    return {
       
        type: ActionTypes.UPDATE_JOBS_REMAINING,
        jobs_remaining:  remaining_job,
        
        
    }


}