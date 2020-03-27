import * as ActionTypes from '../../type';

const initialState  = {

    transaction_history : [] ,
    wallet_history : [],
}


export default (state =  initialState ,action ) => {

    switch(action.type){

        case ActionTypes.TRANSACTION_HISTORY :
            let history = [...action.history];

            return {
                ...state,
                transaction_history :history,
            }


        case ActionTypes.WALLET_HISTORY :
            let wallet_history = [...action.wallet];

            return {
                ...state,
                wallet_history :wallet_history,
            }


        default :
            return state ;
    }


}