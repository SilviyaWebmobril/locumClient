import { DEVICE_TOKEN ,LOGOUT_USER, SHOW_LOADING,RESPONSE_ERROR,AUTH_CHANGED,HIDE_SPINNER} from '../../type';
import axios from 'axios';
import ApiUrl from '../../../Globals/ApiUrl';
import {
	StackActions, NavigationActions
} from 'react-navigation';
import {showMessage} from '../../../Globals/Globals';

export const userDevicetoken = (token) => {

    return {
        type :DEVICE_TOKEN,
        token:token
    }

 }



 export const logoutUser = () => {

    return{
        type: LOGOUT_USER,
    }
 }

 export const checkuserAuthentication  = (user_id,navigation) => {

    return dispatch => {

        dispatch({
            type: SHOW_LOADING,

        });
        let formdata  = new FormData();
        formdata.append("user_id",user_id);
        console.log("form",formdata);
        axios.post(ApiUrl.base_url+ApiUrl.check_token,formdata)
        .then(response => {

            dispatch({
                type :HIDE_SPINNER,
               
            })

            console.log("response.data.error",response.data);
            if(response.data.error){

                console.log("hi");
               

                dispatch({
                    type :AUTH_CHANGED,
                    authenticated:false

                })

                navigation.navigate("Login")
                const resetAction = StackActions.reset({
                    index: 0,
                    key: 'Login',
                    actions: [NavigationActions.navigate({ routeName: 'Login' })],
                });
                navigation.dispatch(resetAction);
              
            
            }else{

                dispatch({
                    type :AUTH_CHANGED,
                    authenticated:true

                })
            }
           

        })
        .catch(error => {

            console.log("check auth errro" , error);
            dispatch({
                type:RESPONSE_ERROR,
           })
            showMessage(0,'Something went wrong. Please try again later !', 'Create Profile', true, false);
        })

    }
 }

