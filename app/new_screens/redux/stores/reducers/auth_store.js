import  * as ActionTypes from '../../type'
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
    user_id:'',
    user_basic_details:{},
    device_token:null,
    authenticated:true,
}

export default (state =  initialState ,action ) => {

    switch(action.type){

        case ActionTypes.STORE_USER_ID_GLOBALLY :
            let id = action.result_user_id;
            let token = action.device_token;
            let basic_details = action.user_details;
            let exist_user_details  = {...state.user_basic_details};
            Object.assign(exist_user_details,{

                name:basic_details.name,
                email:basic_details.email,
                user_image:basic_details.user_image,
                wallet_balance:basic_details.wallet_balance,
            })
            return {
                ...state,
                user_id :id,
                device_token : token,
                user_basic_details : exist_user_details
            }

        case ActionTypes.AUTH_CHANGED :
            return {
                ...state,
                authenticated:action.authenticated
            }
        case ActionTypes.PROFILE_PIC_UPLOADED :
            let user_img = {...state.user_basic_details};
            user_img.user_image = action.user_pic;
            return{
                ...state,
                user_basic_details:{...user_img},
            }

        case ActionTypes.LOGOUT_USER:

            AsyncStorage.removeItem('persist:STORE_USER_ID_GLOBALLY')
                
            return {
                ...state,
                user_id:'',
                device_token:null
            }
    
        

        default :
            return state;
    }
}