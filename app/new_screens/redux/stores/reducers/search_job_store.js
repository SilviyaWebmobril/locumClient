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
                if(element.job_scope ==  null) {
                    element.job_scope = "";
                }
                if(element.clinic_requirement == null ){
                    element.clinic_requirement = "";
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
        case ActionTypes.REMOVE_JOB_POST_BY_ID :
            {let joblist = [...state.search_jobs_list];
            let position ; 
            joblist.map((element,index) => {
                if(element.id ==  action.job_id){
                    position = index;
                    console.log("id",element.id);
                }
            });
            console.log("old job list",joblist);

            let newjoblist = joblist.splice(position,1);

            console.log("new job list",newjoblist);

            return {
                ...state,
                search_jobs_list:joblist ,
            }
        }
        case ActionTypes.UPDATE_JOB_POST_BY_ID :
            {let joblist = [...state.search_jobs_list];
            let position ; 
            joblist.map((element,index) => {
                if(element.id ==  action.job_id){
                    position = index;
                    console.log("id updating",element.id);
                }
            });
                let updated_details = action.details ;
                var last_index_from ;
                var from_hr_min;
                if(updated_details.from_time == null){

					last_index_from ="";
					from_hr_min =""
				}else{
					last_index_from  = updated_details.from_time.lastIndexOf(":");
				     from_hr_min =  updated_details.from_time.substring(0,last_index_from)
				}
				var last_index_to ;
				var to_hr_min ;
				if(updated_details.to_time == null){

					last_index_to = "";
					to_hr_min = "";
				}else{
					last_index_to  = updated_details.to_time.lastIndexOf(":");
					to_hr_min = updated_details.to_time.substring(0,last_index_to)
                }
                if(updated_details.job_scope ==  null) {
                    updated_details.job_scope = "";
                }
                if(updated_details.clinic_requirement == null ){
                    updated_details.clinic_requirement = "";
                }

                updated_details.from_time = from_hr_min ;
                updated_details.to_time = to_hr_min;

                joblist[position].city =  updated_details.city;
                joblist[position].city_id =  updated_details.city_id;
                joblist[position].clinic_requirement = updated_details.clinic_requirement;
                joblist[position].dayorhour =  updated_details.dayorhour;
                joblist[position].from_time = updated_details.from_time;
                joblist[position].job_desc = updated_details.job_desc;
                joblist[position].job_scope = updated_details.job_scope;
                joblist[position].job_location = updated_details.job_location;
                joblist[position].latitude =  updated_details.latitude;
                joblist[position].longitude = updated_details.longitude;
                joblist[position].required_date = updated_details.required_date;
                joblist[position].rm_hour = updated_details.rm_hour;
                joblist[position].state =  updated_details.state;
                joblist[position].state_id = updated_details.state_id;
                joblist[position].to_time =  updated_details.to_time;
                joblist[position].coordinates.latitude = updated_details.latitude;
                joblist[position].coordinates.longitude = updated_details.longitude;
                

            return {
                ...state,
                search_jobs_list:joblist ,
            }
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
                    if(action.change_application_status == 1){

                        if(element.id  ==  action.id){
                            element.application_status  = 1
                            
                        }else{
                            element.application_status = 2;
                        }
                    }else{

                        if(element.id  ==  action.id){
                            element.application_status  = 2
                            
                        }

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