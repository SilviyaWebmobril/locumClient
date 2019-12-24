import React ,  {Component}from 'react';
import { Text, View, Button, StyleSheet,SafeAreaView, Dimensions, ScrollView, Image, FlatList,NetInfo, TouchableOpacity,ToastAndroid,AsyncStorage ,ActivityIndicator,TouchableWithoutFeedback} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import ImagePicker from "react-native-image-picker";

import SelectMultiple from 'react-native-select-multiple';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
		this.state = {
		data:[],
    selected_data:[],
    ids:[],
    about :null,
    name:'',
    email:'',
    contact:0,
    city:'',
    image:null,
    state:'',
    services:null,
    location:'',
    about_editable:false,
    city_editable:false,
    state_editable:false,
    location_editable:false,
    contact_editable:false,
    id:'',
    ImageSource:null,
    dataImage:null,
    final_services:''



		};

    }

	async getUserId(){
		var id = await AsyncStorage.getItem('uname')
		return id
	}

makeServices(services,ids){

  var temp_arr =[]
let final = ''
  if(services === null){

      }



              else{
                let arr = services.split(",")
                let length = arr.length
          //   ToastAndroid.show("Sers"+JSON.stringify(arr),ToastAndroid.SHORT)
                for(var i = 0 ; i < length ; i++){
                              var index = ids.indexOf(parseInt(arr[i]));

                               var name = this.state.data[index]
                              // const array = [...temp_arr];
                              // array[i] = { ...array[i], label:name };
                              // array[i] = { ...array[i], value: name };
                              // temp_arr = array
                            //  ToastAndroid.show("inddexxxx"+JSON.stringify(index)+"nameeee..."+name,ToastAndroid.LONG)
                              let a = this.state.selected_data
                              let obj_one ={
                                "label" : name,
                                "value":name
                              }
                              a.push(obj_one)
                              this.setState({selected_data:a });

                              if(i === length - 1){
                                  let str=name
                                   final = final + str

                              }
                              else{
                                let str=name

                               final = final + str+","
                              }


                            }
                            this.setState({
                              final_services:final
                            })

              }


}


change = async (image) =>{
	//	var pic = await this.getUserPic()
		AsyncStorage.setItem("user_image",image)
	}
	 fetch(ids){

			var formData = new FormData();
			formData.append('userid',64);
			formData.append('role', 2);

			this.setState({loading_status:true})
			fetch('http://webmobril.org/dev/locum/api/get_profile', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data',
			},
		body: formData

		}).then((response) => response.json())
					.then((responseJson) => {
					this.setState({loading_status:false})

					//ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.SHORT);

						if(responseJson.status === 'success'){
							var about = responseJson.result.about
							var name = responseJson.result.name//clininca name
							var email = responseJson.result.email
							var address = responseJson.result.address
							var mobile = responseJson.result.mobile
              var city = responseJson.result.city_id
              var state = responseJson.result.state_id
							var image = responseJson.result.user_image
              var services = responseJson.result.services

								this.setState({
									about :about,
									name:name,
									email:email,
									contact:mobile,
									city:city,
									image:"http://webmobril.org/dev/locum/"+image,
									state:state,
                  services:services,
                  location:address,


								})

                this.makeServices(services,ids)


						}
						else{
						ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
						}



					}).catch((error) => {
						console.error(error);
					});
		}


  async getServices(){
    this.setState({loading_status:true})

    fetch('http://webmobril.org/dev/locum/api/get_job_categories', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },


    }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({loading_status:false})
          //  ToastAndroid.show(JSON.stringify(responseJson),ToastAndroid.LONG)
            if(responseJson.status === 'success'){
              var length = responseJson.result.length
              var  temp_arr = []
            //	ToastAndroid.show("fetching",ToastAndroid.LONG)
              for(var i = 0 ; i < length ; i++){
                var name = responseJson.result[i].name
                var id = responseJson.result[i].id

                let array_one = this.state.data;
                array_one.push(name)
                let array_two = this.state.ids;
                array_two.push(id)



                let array = [...temp_arr];
                array[i] = { ...array[i], key:id };
                array[i] = { ...array[i], value: name };

                temp_arr = array


                this.setState({ data: array_one,ids:array_two });
              }
                this.setState({services:temp_arr})

                this.fetch(this.state.ids)
            }

          //  ToastAndroid.show("DAT>..."+JSON.stringify(this.state.ids),ToastAndroid.LONG)
          }).catch((error) => {
            console.error(error);
          });

    		}



		async componentWillMount(){
			var id = await this.getUserId()
      await this.getServices()
		//	await this.fetch()

			//ToastAndroid.show(JSON.stringify(id),ToastAndroid.LONG)
			this.setState({
				id:id
			})


      //
      // let values = '';
      // if(this.state.selected_data.length > 0){
      //   for(var i = 0 ; i < this.state.selected_data.length ; i++){
      //     if(i == this.state.selected_data.length - 1){
      //       values = values + this.state.selected_data[i]["label"]
      //     }
      //     else{
      //       values = values +this.state.selected_data[i]["label"] + ","
      //     }
      //   }
      //   this.setState({
      //     final_services:values
      //   })
      // }



		}





    isValid() {


      var isnum = /^\d+$/.test(this.state.contact);
      let valid = false;

      if (this.state.location.length > 0 && this.state.city.length > 0 && this.state.state.length > 0) {
        valid = true;
      }

      if (this.state.location.length === 0) {

        ToastAndroid.show('You must enter a location', ToastAndroid.SHORT);
      }
      else if (this.state.city.length === 0) {

        ToastAndroid.show('You must enter a city name', ToastAndroid.SHORT);
       return false;
    }
    else if (this.state.state.length === 0) {

        ToastAndroid.show('You must enter a state', ToastAndroid.SHORT);
      }
      else if (this.state.contact.toString().length === 0 ) {

      ToastAndroid.show('You must enter  mobile number', ToastAndroid.SHORT);
       return false;
      }else if (this.state.contact.toString().length < 10) {

      ToastAndroid.show('Mobile number must be 10 digits', ToastAndroid.SHORT);

      }
      else if(!isnum){
         ToastAndroid.show("Please Enter Valid Contact Number", ToastAndroid.SHORT);
        return false;
      }

      return valid;
    }




		editProfile(){
			if(this.isValid()){
        var formData = new FormData();

        formData.append('userid',64);
        formData.append('role', 2);
        formData.append('name',this.state.name);
        formData.append('about',this.state.about);
        formData.append('mobile', this.state.contact);
        formData.append('state',this.state.state);
        formData.append('location',this.state.location);
        formData.append('city',this.state.city);
        let final='';
        // var index = imageList.indexOf(200);
          //ToastAndroid.show(JSON.stringify("JSONNNN>>>>"+this.state.selected_data[0].label), ToastAndroid.SHORT);
        var index = 0
        for(var i = 0 ; i < this.state.selected_data.length ; i++){
          if(i == this.state.selected_data.length - 1){
                let str=this.state.selected_data[i]["label"]
               index = this.state.data.indexOf(str);
               let v = this.state.ids[index]
               final = final + v

          }
          else{
            let str=this.state.selected_data[i]["label"]
           index = this.state.data.indexOf(str);
           let v = this.state.ids[index]+","
           final = final + v
          }

      }

    //  ToastAndroid.show(final, ToastAndroid.SHORT);
      formData.append('service',final);
        this.setState({loading_status:true})
        fetch('http://webmobril.org/dev/locum/api/edit_profile_clinic', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      body: formData

      }).then((response) => response.json())
            .then((responseJson) => {
            this.setState({loading_status:false})



              if(responseJson.status === 'success'){
                ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
              }
              else{
                //ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
                ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
              }



            }).catch((error) => {
              console.error(error);
            });

			}



		}

    onSelectionsChange = (selected_data) => {
      // selectedFruits is array of { label, value }
    //  ToastAndroid.show(JSON.stringify(selected_data),ToastAndroid.LONG)
      this.setState({ selected_data:selected_data })
    }




		selectPhotoTapped()  {
			//await requestCameraPermission()
			//ToastAndroid.show("Uploading !!",ToastAndroid.LONG);
			const options = {
				maxWidth: 500,
				maxHeight: 500,
				storageOptions: {
					skipBackup: true
				}
			};

			ImagePicker.showImagePicker(options, (response) => {
				console.log('Response = ', response);

				if (response.didCancel) {
					console.log('User cancelled photo picker');
				}
				else if (response.error) {
					ToastAndroid.show("Cancelled ", ToastAndroid.LONG);
				}
				else if (response.customButton) {
					console.log('User tapped custom button: ', response.customButton);
				}
				else {
				 //const image_data = { uri: `data:image/jpeg;base64,${response.data}` };
				 //ToastAndroid.show(JSON.stringify(this.state.services),ToastAndroid.LONG)
					let source = { uri: response.uri};
					this.setState({
						ImageSource: source ,
						dataImage: response.data,


					});


					this.upload(response.data,response.uri,response.fileName)
				}
			});
	 }




	 upload(data,uri,name){

     																ToastAndroid.show("dataaaaaaa......"+JSON.stringify(this.state.data),ToastAndroid.LONG)
     																	this.setState({loading_status:true})
     																	//fetching all fata from server
     																	var body = new FormData();
     																	body.append('userid', 64);

     																	var photo = {
     																		uri: uri,
     																		type:"image/jpeg",
     																		name: name,
     																	};
     																//	body.append('userpic', JSON.stringify(data));
     																body.append('userpic', photo);
     																body.append('role', 2);

     																fetch('http://webmobril.org/dev/locum/api/update_profile_pic', {
     																method: 'POST',
     																headers: {
     																'Accept': 'application/json',
     																'Content-Type': 'multipart/form-data',
     																},
     																body: body

     																}).then((response) => response.json())
     																	.then((responseJson) => {
     																			this.setState({loading_status:false})


     																			//ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.LONG);

                                        if(responseJson.status === 'success'){
																				var new_image = responseJson.data.user_image
																				this.change(new_image)
																			}


     																	}).catch((error) => {
     																			this.setState({loading_status:false})
     																			ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG);
     																	});

	 }







		check(){

			if(this.state.ImageSource === null && this.state.image=== null){
			  return (<Image source={require('../assets/clinic/camera.png')} style={styles.image} />)
			}
			else if(this.state.ImageSource === null && this.state.image != null){
			  return (<Image source={{uri: this.state.image}} style={styles.image} />)
			}
			else{
				return (<Image source={this.state.ImageSource} style={styles.image} />)
			}


		  }




     render() {

		if (this.state.loading_status) {
			return (
			  <ActivityIndicator
				animating={true}
				style={styles.indicator}
				size="large"
			  />
			);
	  }





    let result = this.check()



        return (


		<View style ={styles.container}>
			{/*for header*/}
			 <View style = {{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'100%',height:'09%',backgroundColor: '#4C74E6'}}>

						<TouchableWithoutFeedback onPress={() =>this.props.navigation.goBack()}>
									 <Image style={{width: 25, height: 25,margin:10}}  source={require('../assets/clinic/left-arrow.png')} />
						 </TouchableWithoutFeedback>

						 <View>
						  <Text style={{fontSize: 21,fontWeight: 'bold', color: "white",paddingRight:25}}></Text>
						 </View>

						<View>
						</View>

			 </View>

			 {/*for main content*/}


			 <ScrollView style={{width:'100%',flex:1,height:'100%'}}>



			<View style = {{width:'100%',height:'50%',backgroundColor: '#4C74E6',justifyContent:'center',alignItems: 'center',flex:3,flexGrow:1}}>
				{/*change margin top and bottom to make view hirht flexible in below header vieww */}
			<Text style={{fontSize: 18,fontWeight: 'bold', color: "white",marginBottom:'25%',marginTop:'10%',paddingTop:-35}}>{this.state.name}</Text>


			 </View>




													<View style={{backgroundColor: 'white', borderRadius:100/2,alignSelf:'center',flex:1,borderColor:'#000000',elevation:10,position:'absolute',top:Dimensions.get('window').height * 0.16,height:null,width:null}}>
															{/*	<Image
																source={{uri:this.state.image}}
																style={{
																borderRadius: 100 / 2,

																height: 100,
																width: 100}}
																	/>

																*/}
																{result}
													</View>



						<View style={{padding:10,backgroundColor: '#686BE4',elevation:13,width:50,height:50,borderRadius:50/2,alignSelf:'center',justifyContent:'center',alignItems:'center',marginLeft:'15%',marginTop:11}}>
						<TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
									 <Image style={{width: 23, height: 23}}  source={require('../assets/clinic/camera-2.png')} />
						 </TouchableOpacity>
						</View>


											 <View style={{flexDirection:"row",alignItems:'center',paddingLeft:20}}>
													<View style={{flex:1}}>
														 <TextField
																		style = {{justifyContent: 'flex-start',marginRight:10}}
																		label='About'
																		editable={this.state.about_editable}
																		value={this.state.about == null ? '' : this.state.about}
																		onChangeText={ (about) => this.setState({about:about}) }
																	/>
													</View>
													<View style={{flex:0.1,marginRight:10,height:45,width:45}}>
														<TouchableOpacity style = {{justifyContent: 'flex-end',marginRight:10}} onPress={() => this.setState({about_editable:!this.state.about_editable})}>
															<Image style={{width: 25, height: 25}}  source={require('../assets/clinic/pen.png')} />
														</TouchableOpacity>
													</View>
											</View>


                      <View style={{borderColor:'black',height:null,width:null}}>
                      <Text>{this.state.final_services}</Text>
                      <SelectMultiple
                         style={{marginTop:10,marginBottom:10}}
                         items={this.state.data}
                         selectedItems={this.state.selected_data}
                         onSelectionsChange={this.onSelectionsChange} />
                         </View>


                                           											<View style={{flexDirection:"row",alignItems:'center',paddingLeft:20}}>
                                           											<View style={{flex:1}}>
                                           												 <TextField
                                           																style = {{justifyContent: 'flex-start',marginRight:10,width:'100%'}}
                                           																label='Location'
                                           																editable={this.state.location_editable}
                                           																value={this.state.location}
                                           															onChangeText={ (location) => this.setState({location:location}) }
                                           															/>
                                           											</View>
                                           											<View style={{flex:0.1,marginRight:10}}>
                                           												<TouchableOpacity style = {{justifyContent: 'flex-end',marginRight:10}} onPress={() => this.setState({location_editable:!this.state.location_editable})}>
                                           												<Image style={{width: 25, height: 25}}  source={require('../assets/clinic/pen.png')} />
                                           												</TouchableOpacity>
                                           											</View>
                                           									</View>


											 <View style={{flexDirection:"row",alignItems:'center',paddingLeft:20}}>
													<View style={{flex:1}}>
														 <TextField
																		style = {{justifyContent: 'flex-start',marginRight:10}}
																		label='City'
																		editable={this.state.city_editable}
																		value={this.state.city == null ? '' : this.state.city}
																		onChangeText={ (city) => this.setState({city:city}) }
																	/>
													</View>
													<View style={{flex:0.1,marginRight:10}}>
														<TouchableOpacity style = {{justifyContent: 'flex-end',marginRight:10}} onPress={() => this.setState({city_editable:!this.state.city_editable})}>
														<Image style={{width: 25, height: 25}}  source={require('../assets/clinic/pen.png')} />
														</TouchableOpacity>
													</View>
											</View>





											<View style={{flexDirection:"row",alignItems:'center',paddingLeft:20}}>
											<View style={{flex:1}}>
												 <TextField
																style = {{justifyContent: 'flex-start',marginRight:10,width:'100%'}}
																label='State'
																editable={this.state.state_editable}
																value={this.state.state}
															onChangeText={ (state) => this.setState({state:state}) }
															/>
											</View>
											<View style={{flex:0.1,marginRight:10}}>
												<TouchableOpacity style = {{justifyContent: 'flex-end',marginRight:10}} onPress={() => this.setState({state_editable:!this.state.state_editable})}>
												<Image style={{width: 25, height: 25}}  source={require('../assets/clinic/pen.png')} />
												</TouchableOpacity>
											</View>
									</View>






											 <View style={{flexDirection:"row",alignItems:'center',paddingLeft:20}}>
													<View style={{flex:1}}>
														 <TextField
																		style = {{justifyContent: 'flex-start',marginRight:10}}
																		label='Contact'
																		keyboardType = 'numeric'
       															 maxLength={14}
  																	textContentType='telephoneNumber'
																		editable={this.state.contact_editable}
																		value={this.state.contact}
																		onChangeText={ (contact) => this.setState({contact:contact}) }
																	/>
													</View>
													<View style={{flex:0.1,marginRight:10}}>
														<TouchableOpacity style = {{justifyContent: 'flex-end',marginRight:10}} onPress={() => this.setState({contact_editable:!this.state.contact_editable})}>
														<Image style={{width: 25, height: 25}}  source={require('../assets/clinic/pen.png')} />
														</TouchableOpacity>
													</View>
											</View>


											<View style={{flexDirection:"row",alignItems:'center',paddingLeft:20}}>
											<View style={{flex:1}}>
												 <TextField
																style = {{justifyContent: 'flex-start',marginRight:10}}
																label='Email'
																editable={false}
																value={this.state.email}
																onChangeText={ (email) => this.setState({email:email}) }
															/>
											</View>


											<View style={{flex:0.1,marginRight:10}}>

											</View>
									</View>







											<TouchableOpacity
											style={styles.submitButton}
											onPress={this.editProfile.bind(this)}
											underlayColor='#fff'>
											<Text style={styles.submitText}>Update </Text>
								 </TouchableOpacity>








      </ScrollView>

		</View>

        )
    }
}


let styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
		alignItems:'center',

    },
	submitButton:{
		width :'100%',
		marginTop:10,
		paddingTop:10,
		paddingBottom:10,
		backgroundColor:'#4C74E6',
		borderRadius:1,
		borderWidth: 1,
		borderColor: '#fff',
		marginTop:20
	  },
	  submitText:{
		  color:'white',
		  textAlign:'center',
		  paddingLeft : 10,
		  paddingRight : 10,
		  fontSize :20,
		  fontWeight : 'bold'
	  },
	input:{
		width:'50%',

	},
	image:{
		borderRadius: 100 / 2,
		height: 100,
		width: 100
	},
	indicator: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 80
	  }

})
