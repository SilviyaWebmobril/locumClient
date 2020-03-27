import *  as ActionTypes from '../../type';
import Axios from 'axios';
import ApiUrl from '../../../Globals/ApiUrl';
import {showMessage} from '../../../Globals/Globals';


export const transcationHistory = (user_id) => {

    return dispatch => {

        dispatch({
            type: ActionTypes.SHOW_LOADING
        });

        let formdata = new FormData();
        formdata.append('user_id',user_id);

        Axios.post(ApiUrl.base_url+ApiUrl.transaction_history,formdata)
            .then(response => {

                dispatch({
                    type: ActionTypes.HIDE_SPINNER
                });

              
                if (response.data.status === 'success') {
                    if (response.data.data.length > 0) {

                       dispatch({
                           type:ActionTypes.TRANSACTION_HISTORY,
                           history:response.data.data,
                       })

                    }
                    else {
                        showMessage(0, "No transactions history found !", 'Transactions', true, false);

                    }




                }
                else {

                    showMessage(0, response.message, 'Transactions', true, false);

                }

            }).catch(error => {

                dispatch( {
                    type:ActionTypes.RESPONSE_ERROR,
                })

                showMessage(0,'Something went wrong. Please try again later !', 'Transaction', true, false);

            })
    }
}


export const wallet_history = (user_id) => {
    return dispatch => {

        dispatch({
            type: ActionTypes.SHOW_LOADING
        });

        let formdata = new FormData();
        formdata.append('userid',user_id);

        Axios.post(ApiUrl.base_url+ApiUrl.wallet_history,formdata)
            .then(response => {

                dispatch({
                    type: ActionTypes.HIDE_SPINNER
                });

              
                if (response.data.status === 'success') {
                    if (response.data.result.length > 0) {

                        console.log("wallets",response.data.result);
                       dispatch({
                           type:ActionTypes.WALLET_HISTORY,
                           wallet :response.data.result,
                       })

                    }
                    else {
                        showMessage(0, "No transactions history found !", 'Transactions', true, false);

                    }




                }
                else {

                    showMessage(0, response.data.message, 'Transactions', true, false);

                }

            }).catch(error => {

                console.log("er",error);

                dispatch( {
                    type:ActionTypes.RESPONSE_ERROR,
                })

                showMessage(0,'Something went wrong. Please try again later !', 'Transaction', true, false);

            })


    }
}