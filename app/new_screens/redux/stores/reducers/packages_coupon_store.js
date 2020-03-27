import * as ActionTypes from '../../type';


const initialState = {

    packages:[],
    coupons:[],
    coupoun_error:false

}

export default (state =initialState ,action) => {

    switch(action.type){

        case ActionTypes.PACKAGES :

            let packages = [...action.packages];
            return {
                ...state,
                packages : packages
            }
        case ActionTypes.GET_COUPONS:
            let coupons_list = [...action.coupons_list];
            return {
                ...state,
                coupons:coupons_list
            }
        case ActionTypes.NO_COUPON_ERROR  :
            return {
                ...state,
                coupons:[],
                coupoun_error:true
            }
        default :
            return state;
     }

}