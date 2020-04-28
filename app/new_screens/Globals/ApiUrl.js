export default  {

    image_url :'http://webmobril.org/dev/locum/',

    base_url :"http://webmobril.org/dev/locum/api/",

    sign_up:"signup",

    login:"login",

    get_states : "states",

    get_city : 'city',

    clinic_types : 'clinic_types',

    get_job_categories : "get_job_categories",

    grades_list:"grades_list",

    specialities_list :"specialities_list",

    update_profile_pic : "update_profile_pic",

    // not using this
   /// create_profile : "update_pro_profile",
   create_profile : "update_clinic_profile",

   // not using this
   // edit_profile : 'edit_profile_pro',
    edit_profile : 'edit_profile_clinic',

    upload_documents :"upload_documents",

    check_token : "checktoken",

    post_job : "post_job" ,
    //search_job :"search_job",

    edit_job_post : "edit_job_post",

    buy_package : "get_package",

    // not using this api
    apply_coupons :"apply_promo",

    // using this one
    apply_promo_new :"apply_promo_new",
    
    transaction_history : "my_purchased_packages",

    get_packages : "packages",

    coupons_list : "coupons_list",

    wallet_history :'recharge_history',

    applied_jobs :"apply_history",

    change_password :'change_password',

    get_job_list :"job_list",

    contact_admin : "contact_admin",

    // get all applied users
    practitioner_request: "practitioner_request",
     

    // accept or reject  // 1-accept ot 2-reject
    accept_application : "accept_application",

    cancel_job_posting : "cancel_posting",

    job_detail : "job_detail" ,

}