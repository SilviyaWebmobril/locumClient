import  * as ActionTypes from '../../type';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {

    user:{},
    loading_status:false,
    message:"",
    register_id:"",
    register_user_name:"",
    profession_categories:[],
    grades:[],
    specialities:[],
    user:{},
    user_id:"",
    device_token:null,
    states_list:[],
    cities_list:[],
    business_type : []

}



export default  (state = initialState ,action) => {

    switch(action.type){

        case ActionTypes.HIDE_SPINNER :
            return {
                ...state,
                loading_status:false
            }
        case ActionTypes.SHOW_LOADING :
            return {
                ...state,
                loading_status:true
            }

        case ActionTypes.REGISTER_USER_RESPONSE :
            let temp_id = action.register_id;
            let register_user_name = action.register_user_name
            return {
                ...state,
                loading_status : false,
                register_id:temp_id,
                register_user_name: register_user_name
               
            }
        case ActionTypes.JOB_CATEGORIES :

            let profession_categories = [...state.profession_categories];
            profession_categories = [...action.profession_categories];

            return {
                ...state,
                profession_categories:profession_categories,
                loading_status:false
            }
        case ActionTypes.FETCH_GRADES :

            let fetch_grades = [...state.grades];
            fetch_grades = [...action.grades];
            console.log("gscvfgvcg")

            return {
                ...state,
                grades:fetch_grades,
                loading_status:false
            }

        case ActionTypes.FETCH_SPECIALITY :

            let fetch_specialities = [...state.specialities];
            fetch_specialities = [...action.specialities];
            
            return {
                ...state,
                specialities:fetch_specialities,
                loading_status:false
            }
        case ActionTypes.BUSINESS_TYPES :

            let business_type ;
            business_type = [...action.business_type];
            
            return {
                ...state,
                business_type:business_type,
                loading_status:false
            }
        case ActionTypes.CREATE_PROFILE :
            let user_data1 = action.result_user;
            let exist_user_data = {...state.user};
           // await AsyncStorage.setItem('user_id',JSON.stringify(user_data.id));
           let name , email , address, degree , mobile ,hourly_rate, weekly_rate, monthly_rate,daily_rate, grade , longitude,
           latitude ,city_id,state_id,location_preference,preference_one_city,preference_one_state,preference_two_city,preference_two_state,
           experience,userdoc_1,userdoc_2,userdoc_3,userdoc_4,user_image ,license,ic_no, current_work,wallet_balance,jobs_remaining,
           email_verify,description,document_upload_status, profile_upload_status,street1,street2,
           med_pc_id,roc_no,directors_name,owner_ic_no,post_code,year_of_operation;
           if(user_data1.name !== null){
               name = user_data1.name;
           }else{
               name = "";
           }

           if(user_data1.email !== null){
                email =  user_data1.email;
           }else{
               email = "";
           }

           if(user_data1.address !==  null ){
               address = user_data1.address;
           }else{
               address = "";
           }
           if(user_data1.degree !== null ){
               degree =user_data1.degree;
           }else{
               degree ="";
           }
            if(user_data1.mobile !== null){
                mobile = user_data1.mobile ;
            }else{
                mobile = "";
            }
            if(user_data1.hourly_rate !== null){
                hourly_rate = user_data1.hourly_rate ;
            }else{
                hourly_rate = "";
            }

            if(user_data1.monthly_rate !== null){
                monthly_rate = user_data1.monthly_rate ;
            }else{
                monthly_rate = "";
            }

            if(user_data1.weekly_rate !== null){
                weekly_rate = user_data1.weekly_rate ;
            }else{
                weekly_rate = "";
            }

            if(user_data1.daily_rate !==  null){
                daily_rate = user_data1.daily_rate ;
            }else{
                daily_rate ="";
            }

            if(user_data1.grade !== null ){
                grade = user_data1.grade ;
            }else{
                grade = "";
            }

            if(user_data1.latitude !== null){
                latitude = user_data1.latitude;
            }else{
                latitude = "";
            }

            if(user_data1.longitude !== null){
                longitude = user_data1.longitude;
            }else{
                longitude ="";
            } 
            
            if(user_data1.city_id !== null){
                city_id = user_data1.city_id;
            }else{
                city_id = "";
            }

            if(user_data1.state_id !== null) {
                state_id = user_data1.state_id;
            }else{
                state_id = "";
            }

            if(user_data1.location_preference !== null){
                location_preference = user_data1.location_preference ;
            }else{
                location_preference = "";
            }

            if( user_data1.preference_one_city !== null){
                preference_one_city =  user_data1.preference_one_city;
            }else{
                preference_one_city = "";
            }

            if(user_data1.preference_one_state !== null ){
                preference_one_state = user_data1.preference_one_state;
            }else{
                preference_one_state ="";
            }

            if(user_data1.preference_two_city !== null){
                preference_two_city =user_data1.preference_two_city ;
            }else{
                preference_two_city = "";
            }

            if(user_data1.preference_two_state !== null){
                preference_two_state = user_data1.preference_two_state
            }else{
                preference_two_state = "";
            }

            if(user_data1.experience !== null){
               experience =  user_data1.experience;
            }else{
                experience = "";
            }

            if(user_data1.userdoc_1 !== null ){
                userdoc_1 = user_data1.userdoc_1;
            }else{
                userdoc_1 = "";
            }
            if(user_data1.userdoc_2 !==  null){
                userdoc_2 = user_data1.userdoc_2;
            }else{
                userdoc_2 = "";
            }

            if(user_data1.userdoc_3 !== null){
                userdoc_3 = user_data1.userdoc_3 ;
            }else{
                userdoc_3 = "";
            }

            if(user_data1.userdoc_4 !== null){
                userdoc_4 = user_data1.userdoc_4;
            }else{
                userdoc_4 = "";
            }

            if(user_data1.user_image !==  null){
                user_image = user_data1.user_image ;
            }else{
                user_image = "";
            }

            if( user_data1.license !== null){
                license =  user_data1.license;
            }else{
                license = "";
            }

            if(user_data1.owner_ic_no !== null){
                ic_no =user_data1.owner_ic_no;
            }else{
                ic_no = "";
            }

            if(user_data1.current_work !== null){
                current_work = user_data1.current_work;
            }else{
                current_work = "";
            }

            if(user_data1.wallet_balance !== null){
                wallet_balance =user_data1.wallet_balance ;
            }else{
                wallet_balance = 0;
            }
            if(user_data1.jobs_remaining !== null){
                jobs_remaining = user_data1.jobs_remaining ;
            }else{
                jobs_remaining = 0;
            }

            if(user_data1.email_verify !== null){
                email_verify = user_data1.email_verify ;
            }else{
                email_verify = "";
            }

            if(user_data1.description !== null ){
                description = user_data1.description;
            }else{
                description = "";
            }
            if(user_data1.document_upload_status !== null ){
                document_upload_status = user_data1.document_update_status;
            }else{
                document_upload_status = "";
            }
            if(user_data1.profile_upload_status !== null ){
                profile_upload_status = user_data1.profile_update_status;
            }else{
                profile_upload_status = "";
            }

            if(user_data1.med_pc_id !== null){
                med_pc_id = user_data1.med_pc_id;
            }else{
                med_pc_id = "";
            }
            
            if(user_data1.roc_no !== null){
                roc_no = user_data1.roc_no;
            }else{
                user_data1.roc_no = "";
            }

            if(user_data1.directors_name !== null){
                directors_name = user_data1.directors_name;
            }else{
                directors_name = "";
            }

            if(user_data1.owner_ic_no !== null){
                owner_ic_no =  user_data1.owner_ic_no;
            }else{
                owner_ic_no = "";
            }

            if(user_data1.post_code !== null){
                post_code = user_data1.post_code;
            }else{
                post_code = "";
            }

            if(user_data1.year_of_operation !== null){
                year_of_operation = user_data1.year_of_operation;
            }else{
                year_of_operation = "";
            }

            if(user_data1.street_2 !== null){
                street2 = user_data1.street_2;
            }else{
                street2 = "";
            }
            if(user_data1.street_1 !== null){
                street1 = user_data1.street_1;
            }else{
                street1 = "";
            }

            Object.assign(exist_user_data ,{

                id : user_data1.id,
                name : name,
                email : email,  
                address :address,
                degree : degree,
                mobile : mobile,
                bussiness_type_id : user_data1.bussiness_type.id,
                speciality_id :user_data1.speciality,
                hourly_rate: hourly_rate,
                monthly_rate : monthly_rate,
                weekly_rate : weekly_rate,
                daily_rate : daily_rate,
                grade : grade,
                latitude : latitude,
                longitude : longitude,
                city_id : city_id,
                country_id : 132,
                state_id : state_id,
                location_preference: location_preference,
                preference_one_city : preference_one_city,
                preference_one_state : preference_one_state,
                preference_two_city : preference_two_city,
                preference_two_state : preference_two_state,
                experience : experience,
                userdoc_1 : userdoc_1,
                userdoc_2 : userdoc_2,
                userdoc_3 : userdoc_3,
                userdoc_4 : userdoc_4,
                user_image : user_image,
                roles_id : user_data1.roles_id,
                license : license,
                ic_no : ic_no,
                current_work : current_work,
                wallet_balance: wallet_balance,
                jobs_remaining : jobs_remaining,
                email_verify : email_verify,
                verify : user_data1.verify,
                status : user_data1.status,
                description : description,
                document_upload_status : document_upload_status,
                profile_upload_status : profile_upload_status,
                med_pc_id : med_pc_id,
                roc_no : roc_no,
                year_of_operation : year_of_operation,
                directors_name : directors_name,
                owner_ic_no :owner_ic_no,
                post_code:post_code,
                street1 : street1,
                street2: street2
                
            });
            console.log("user data exist", exist_user_data);
            return {
                ...state,
                loading_status:false,
                user:exist_user_data,
            }
        case ActionTypes.PROFILE_PIC_UPLOADED :

            
            let user =  {...state.user};
            let new_user_pic =  action.user_pic;
            if("user_image" in user){

                user.user_image = new_user_pic;
               

            }else{
                Object.assign(user,{user_image : new_user_pic});
            }

            console.log("user pic reducer", user);
            return {
                ...state,
                loading_status:false,
                user:user
            }
        case ActionTypes.UPDATE_JOBS_REMAINING_AND_BALC :
            let user_ex = {...state.user};
            user_ex.jobs_remaining = action.jobs_remaining;
            let prevBalc = user_ex.wallet_balance;
            let newBalc = parseFloat(prevBalc) -  parseFloat(action.amt_spent);
            user_ex.wallet_balance =  newBalc;
            return {
                ...state,
                user :{...user_ex}
            }
        case ActionTypes.UPDATE_JOBS_REMAINING :
           { let user_ex = {...state.user};
            user_ex.jobs_remaining = action.jobs_remaining;
           
            return {
                ...state,
                user :{...user_ex}
            }}
        case ActionTypes.UPDATE_WALLET_BALANCE :
            { let user_ex = {...state.user};
                let last_amt = user_ex.wallet_balance;
                user_ex.wallet_balance = parseFloat(last_amt) + parseFloat(action.wallet_balance);
            
                return {
                    ...state,
                    user :{...user_ex}
                }}
        case ActionTypes.GET_STATES :

        console.log("GET_STATES",action.states)
        
            return {
                ...state,
                loading_status:false,
                states_list : action.states
            }
        case ActionTypes.GET_CITIES :
        
            return {
                ...state,
                cities_list : action.cities,
                loading_status:false,
            }
            
        case ActionTypes.UPLOAD_DOCUMENTS :

            return{
                ...state,
                loading_status:false,
            }

    case ActionTypes.LOGOUT_USER:

        AsyncStorage.removeItem('persist:STORE_USER_ID_GLOBALLY')
            
        return {
            ...state,
            user_id:'',
            user:{}
        }
        
        
       
        case ActionTypes.RESPONSE_ERROR :

            return{
                ...state,
                loading_status:false,
            }

        case ActionTypes.DEVICE_TOKEN :
            return {
                ...state,
                device_token : action.token
            }

        default :
            return state;
    }


}