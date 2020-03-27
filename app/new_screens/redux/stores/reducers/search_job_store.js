import * as ActionTypes from '../../type';


const initialState  = { 

    search_jobs_list:[],
    applied_jobs:[],
    applied_users:[],
 

}

export default ( state = initialState  , action ) => {

    switch(action.type){

        case ActionTypes.SEARCH_JOBS_LIST :
           
            let joblist = [...action.job_list];
            joblist.forEach(element  => {

                var last_index_from ;
                var from_hr_min;
                if(element.from_time == null){

					last_index_from ="";
					from_hr_min =""
				}else{
					last_index_from  = element.from_time.lastIndexOf(":");
				     from_hr_min =  element.from_time.substring(0,last_index_from)
				}
				var last_index_to ;
				var to_hr_min ;
				if(element.to_time == null){

					last_index_to = "";
					to_hr_min = "";
				}else{
					last_index_to  = element.to_time.lastIndexOf(":");
					to_hr_min = element.to_time.substring(0,last_index_to)
				}

                element.from_time = from_hr_min ;
                element.to_time = to_hr_min;
                Object.assign(element ,{coordinates :{latitude : parseFloat(element.latitude) , longitude : parseFloat(element.longitude), latitudeDelta: 0.23,longitudeDelta: 0.5,}} )

            })
           

            return {
                ...state,
                search_jobs_list:joblist,
                loading_status:false
            }

        case ActionTypes.GET_APPLIED_USERS: 
            let applied_users = [...action.applied_users_list];
            applied_users.map(element => {

                Object.assign(element,{description :element.user_name.profession + " with " + element.user_name.experience + " years exp."})
            })
            return{
                ...state,
                applied_users:applied_users,
            }
        case ActionTypes.CHANGE_APPLICATION_STATUS_USER :
            {
                let applied_users1 =  [...state.applied_users];
                applied_users1.map(element => {
                    if(element.id  ==  action.id){
                        element.application_status  = action.change_application_status
                        
                    }
                });

            
            
                return {
                    ...state,
                    applied_users:applied_users1, 
                }
            }
            
        case ActionTypes.APPLIED_JOB :
            let applied_jobs = [...action.applied_jobs];

        return {
            ...state,
            applied_jobs:applied_jobs

        }

        case ActionTypes.RESPONSE_ERROR :

            return{
                ...state,
                loading_status:false,
            }

        case ActionTypes.SHOW_LOADING :
            return {
                ...state,
                loading_status:true
            }



        default :
            return state ;
    }
} 