import React, { Component } from 'react';
import {
  Text, View, Button, StyleSheet, Dimensions, SafeAreaView,
  ScrollView, Image, BackHandler, FlatList, TouchableOpacity, 
  ToastAndroid, ActivityIndicator, TouchableWithoutFeedback, Platform
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import ImagePicker from "react-native-image-picker";
import { withNavigationFocus } from 'react-navigation';
import SelectMultiple from 'react-native-select-multiple';
import { Dropdown } from 'react-native-material-dropdown';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from './Globals';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';



class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selected_data: [],
      ids: [],
      about: null,
      name: '',
      email: '',
      contact: 0,
      city: '',
      image: null,
      state: '',
      services: null,
      location: '',
      about_editable: false,
      city_editable: false,
      state_editable: false,
      location_editable: false,
      contact_editable: false,
      id: '',
      ImageSource: null,
      dataImage: null,
      final_services: '',
      services_status: false,
      pic_no: '',

      roc_no: '',
      clinicTypes: [],
      clinic_type_id: '',
      clinic_type_val: '',
      specialization: '',
      directors_name: '',
      year_of_operation: '',
      hourly_rate: '',
      daily_rate: '',
      weekly_rate: '',
      monthly_rate: '',
      description: '',



    };

  }

  async getUserId() {
    var id = await AsyncStorage.getItem('uname')
    return id
  }



  fetch() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected) {
        this.props.navigation.navigate("NoNetwork")
        return;
      }
      else {
        this.setState({ loading_status: true })


        fetch('http://webmobril.org/dev/locum/api/get_job_categories', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },


        }).then((response) => response.json())
          .then((responseJson) => {

            this.setState({ loading_status: false })


            if (responseJson.status === 'success') {

              var length = responseJson.result.length

              for (var i = 0; i < length; i++) {
                var name = responseJson.result[i].name
                var id = responseJson.result[i].id

                const array = [...this.state.clinicTypes];
                array[i] = { ...array[i], key: id };
                array[i] = { ...array[i], value: name };

                this.setState({ clinicTypes: array });
              }
            }

          }).catch((error) => {
            console.error(error);
            showMessage(0, JSON.stringify(error), "Profile", true, false);

          });

      }

    })

  }



  makeServices(services, ids) {

    var temp_arr = []
    let final = ''
    if (services === null) {

    }



    else {
      let arr = services.split(",")
      let length = arr.length

      for (var i = 0; i < length; i++) {
        var index = ids.indexOf(parseInt(arr[i]));

        var name = this.state.clinicTypes[index]

        let a = this.state.selected_data
        let obj_one = {
          "label": name,
          "value": name
        }
        a.push(obj_one)
        this.setState({ selected_data: a });

        if (i === length - 1) {
          let str = name
          final = final + str

        }
        else {
          let str = name

          final = final + str + ","
        }


      }
      this.setState({
        final_services: final
      })

    }


  }


  change = async (image) => {
    //	var pic = await this.getUserPic()
    AsyncStorage.setItem("user_image", image)
  }

  onClinicTypeChange(value) {

    if (this.state.clinicTypes.length > 0) {
      //var jobs = this.state.jobs
      for (var i = 0; i < this.state.clinicTypes.length; i++) {
        if (this.state.clinicTypes[i].value === value) {

          this.setState({
            clinic_type_id: this.state.clinicTypes[i].value,
            clinic_type_val: this.state.clinicTypes[i].key, clinic_type: this.state.clinicTypes[i].value
          })


        }
      }
    }

  }



  fetchUser(id) {

    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected) {
        this.props.navigation.navigate("NoNetwork")
        return;
      }
      else {


        var formData = new FormData();
        formData.append('userid', id);
        formData.append('role', 2);

        this.setState({ loading_status: true })
        fetch('http://webmobril.org/dev/locum/api/get_profile', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData

        }).then((response) => response.json())
          .then((responseJson) => {
           
            this.setState({ loading_status: false })


            if (responseJson.status === 'success') {



              var about = responseJson.result.about
              var name = responseJson.result.name//clininca name
              var email = responseJson.result.email
              var address = responseJson.result.address
              var mobile = responseJson.result.mobile
              var city = responseJson.result.city_id
              var state = responseJson.result.state_id
              var image = responseJson.result.user_image
              var services = responseJson.result.services
              var pic_no = responseJson.result.pic_no

              //new

              var roc_no = responseJson.result.roc_no
              var specialization = responseJson.result.specialization
              var professionId = responseJson.result.profession.id
              var professionName = responseJson.result.profession.name
              var directors_name = responseJson.result.directors_name
              var roc_no = responseJson.result.roc_no
              var current_work = responseJson.result.current_work
              var directors_name = responseJson.result.directors_name
              var year_of_operation = responseJson.result.year_of_operation
              var hourly_rate = responseJson.result.hourly_rate
              var daily_rate = responseJson.result.daily_rate
              var weekly_rate = responseJson.result.weekly_rate
              var monthly_rate = responseJson.result.monthly_rate
              var description = responseJson.result.description





              if (about == null) {
                this.setState({
                  about: '',
                  name: name,
                  email: email,
                  contact: mobile,
                  city: city,
                  image: image,
                  state: state,
                  services: services,
                  location: address,
                  pic_no: pic_no == null ? '' : pic_no,
                  roc_no: roc_no,
                  specialization: specialization,
                  clinic_type_val: professionId,
                  clinic_type_id: professionName,
                  directors_name: directors_name,
                  roc_no: roc_no,
                  current_work: current_work == null ? '' : current_work,
                  directors_name: directors_name,
                  year_of_operation: year_of_operation,
                  hourly_rate: hourly_rate,
                  daily_rate: daily_rate,
                  weekly_rate: weekly_rate,
                  monthly_rate: monthly_rate,
                  description: description


                })
              }
              else {
                this.setState({
                  about: about,
                  name: name,
                  email: email,
                  contact: mobile,
                  city: city,
                  image: image,
                  state: state,
                  services: services,
                  location: address,
                  pic_no: pic_no, roc_no: roc_no,
                  specialization: specialization,
                  clinic_type_val: professionId,
                  clinic_type_id: professionName,
                  directors_name: directors_name,
                  roc_no: roc_no,
                  current_work: current_work == null ? '' : current_work,
                  directors_name: directors_name,
                  year_of_operation: year_of_operation,
                  hourly_rate: hourly_rate,
                  daily_rate: daily_rate,
                  weekly_rate: weekly_rate,
                  monthly_rate: monthly_rate,
                  description: description


                })
              }


              // this.makeServices(services,id
              this.getServices()


            }
            else {
              showMessage(0, responseJson.message, "Profile", true, false);

            }



          }).catch((error) => {
            console.error(error);
            showMessage(0, error.message, "Profile", true, false);

          });

      }

    });


  }


  async getServices() {

    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected) {
        this.props.navigation.navigate("NoNetwork")
        return;
      }
      else {


        this.setState({ loading_status: true })

        fetch('http://webmobril.org/dev/locum/api/clinic_types', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },


        }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({ loading_status: false })

            if (responseJson.status === 'success') {

              var length = responseJson.result.length
              var temp_arr = []

              for (var i = 0; i < length; i++) {
                var name = responseJson.result[i].name
                var id = responseJson.result[i].id

                let array_one = this.state.data;
                array_one.push(name)
                let array_two = this.state.ids;
                array_two.push(id)



                let array = [...temp_arr];
                array[i] = { ...array[i], key: id };
                array[i] = { ...array[i], value: name };

                temp_arr = array


                this.setState({ data: array_one, ids: array_two });
              }
              this.setState({ services: temp_arr })

              //   this.fetchUser(user_id)

            }

          }).catch((error) => {
            console.error(error);
          });



      }
    });



  }

  handleBackWithAlert = () => {

    if (this.props.isFocused) {

      if (this.state.services_status) {
        this.setState({ services_status: false })
      }



      return true;
    }
  }





  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackWithAlert);

  }

  async componentWillMount() {
    // BackHandler.addEventListener('hardwareBackPress',this.handleBackWithAlert);
    var id = await this.getUserId()

    console.log("id..", id);

    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected) {
        this.props.navigation.navigate("NoNetwork")
        return;
      }
      else {
        this.fetchUser(id)
      }
    });

    this.setState({
      id: id
    })

  }





  isValid() {


    var isnum = /^\d+$/.test(this.state.contact);
    let valid = false;

    if (this.state.location.length > 0
      && this.state.pic_no.length > 0) {
      valid = true;
    }

    if (this.state.name.length === 0) {

      showMessage(0, ' Enter Clinic name', "Profile", true, false);

      return false;
    }

    if (this.state.roc_no.toString().trim().length === 0) {

      showMessage(0, 'Enter ROC Number', "Profile", true, false);

      return false
    }

    else if (this.state.clinic_type_id.length === 0) {

      showMessage(0, 'Enter Clinic Type', "Profile", true, false);

      return false
    }
    else if (this.state.specialization.toString().trim().length === 0) {

      showMessage(0, 'Enter Specialization', "Profile", true, false);

      return false
    }



    else if (this.state.directors_name.toString().trim().length === 0) {

      showMessage(0, 'Enter Directors Name', "Profile", true, false);

      return false
    }

    else if (this.state.location.length === 0) {
      showMessage(0, 'You must enter a location', "Profile", true, false);

      return false
    }

    else if (this.state.contact.toString().length === 0) {
      showMessage(0, 'You must enter  mobile number', "Profile", true, false);

      return false;
    } else if (this.state.contact.toString().length < 10) {
      showMessage(0, 'Mobile number must be 10 digits', "Profile", true, false);

      return false

    }
    else if (!isnum) {

      showMessage(0, "Please Enter Valid Contact Number", "Profile", true, false);

      return false
    }
    else if (this.state.pic_no.toString().length == 0) {
      showMessage(0, 'Enter PIC no.', "Profile", true, false);

      return false

    }

    else if (this.state.year_of_operation.toString().trim().length === 0) {

      showMessage(0, 'Enter Years of Operation', "Profile", true, false);

      return false
    }
    else if (this.state.hourly_rate.toString().trim().length === 0) {

      showMessage(0, 'Enter Hourly Rate', "Profile", true, false);


      return false
    }
    else if (this.state.daily_rate.toString().trim().length === 0) {
      showMessage(0, 'Enter Daily Rate', "Profile", true, false);

      return false
    }
    else if (this.state.weekly_rate.toString().trim().length === 0) {
      showMessage(0, 'Enter Weekly Rate', "Profile", true, false);

      return false
    }
    else if (this.state.monthly_rate.toString().trim().length === 0) {

      showMessage(0, 'Enter Monthly Rate', "Profile", true, false);

      return false
    }


    else if (this.state.description.toString().trim().length === 0) {

      showMessage(0, 'Enter Description', "Profile", true, false);

      return false
    }

    else if (this.state.description.toString().trim().length < 10) {

      showMessage(0, 'Description Should be 10 characters long', "Profile", true, false);

      return false
    }

    return valid;
  }




  editProfile() {


    if (this.isValid()) {

      NetInfo.isConnected.fetch().then(isConnected => {
        if (!isConnected) {
          this.props.navigation.navigate("NoNetwork")
          return;
        }
        else {

           ///from here
      var formData = new FormData();

      formData.append('userid', this.state.id);
      formData.append('role', 2);
      formData.append('name', this.state.name);
      // formData.append('about',this.state.about);
      formData.append('mobile', this.state.contact);
      formData.append('state', this.state.state);
      formData.append('location', this.state.location);
      formData.append('city', this.state.city);
      formData.append('pic_no', this.state.pic_no);


      //new

      formData.append('roc_no', this.state.roc_no);
      formData.append('profession', this.state.clinic_type_val);
      formData.append('specialization', this.state.specialization);
      formData.append('directors_name', this.state.directors_name);
      formData.append('years_of_operation', this.state.year_of_operation)
      formData.append('hourly_rate', this.state.hourly_rate)
      formData.append('daily_rate', this.state.daily_rate)
      formData.append('weekly_rate', this.state.daily_rate)
      formData.append('monthly_rate', this.state.monthly_rate)
      formData.append('description', this.state.description)




      let final = '';
      // var index = imageList.indexOf(200);

      var index = 0
      for (var i = 0; i < this.state.selected_data.length; i++) {
        if (i == this.state.selected_data.length - 1) {
          let str = this.state.selected_data[i]["label"]
          index = this.state.data.indexOf(str);
          let v = this.state.ids[index]
          final = final + v

        }
        else {
          let str = this.state.selected_data[i]["label"]
          index = this.state.data.indexOf(str);
          let v = this.state.ids[index] + ","
          final = final + v
        }

      }

      formData.append('service', final);

      // ToastAndroid.show(JSON.stringify(formData), ToastAndroid.SHORT);

      console.log("new form adata", formData);


      this.setState({ loading_status: true })
      fetch('http://webmobril.org/dev/locum/api/edit_profile_clinic', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData

      }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({ loading_status: false })



          if (responseJson.status === 'success') {
            showMessage(0, responseJson.message, "Profile", true, false);
            //console.log(responseJson)
            this.props.navigation.navigate("HomeScreen")
          }
          else {
            showMessage(0, responseJson.message, "Profile", true, false);

          }



        }).catch((error) => {
          console.error(error);
        });

  
        }
      });

     
    }



  }

  onSelectionsChange = (selected_data) => {
    // selectedFruits is array of { label, value }
    //  ToastAndroid.show(JSON.stringify(selected_data),ToastAndroid.LONG)
    this.setState({ selected_data: selected_data })
    let final = ''
    for (var i = 0; i < selected_data.length; i++) {


      var name = selected_data[i]["label"]
      if (i === selected_data.length - 1) {
        let str = name
        final = final + str
      }
      else {
        let str = name
        final = final + str + ","
      }


    }
    this.setState({
      final_services: final
    })
  }




  selectPhotoTapped() {
    //await requestCameraPermission()
    //ToastAndroid.show("Uploading !!",ToastAndroid.LONG);
    const options = {
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.launchCamera(options, (response) => {
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
        let source = { uri: response.uri };
        this.setState({
          ImageSource: source,
          dataImage: response.data,


        });

        if(Platform.OS == 'ios'){
          this.upload(response.data, response.uri, 'image.jpg')
        }else{
          this.upload(response.data, response.uri, response.fileName)
        }

       
      }
    });
  }




  upload(data, uri, name) {

    //	ToastAndroid.show("dataaaaaaa......"+JSON.stringify(this.state.data),ToastAndroid.LONG)

    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected) {
        this.props.navigation.navigate("NoNetwork")
        return;
      }
      else {

        this.setState({ loading_status: true })
        //fetching all fata from server
        var body = new FormData();
        body.append('userid', this.state.id);
    
        var photo = {
          uri: uri,
          type: "image/jpeg",
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
            this.setState({ loading_status: false })
    
            if (responseJson.status === 'success') {
              var new_image = responseJson.data.user_image
              this.change(new_image)
            }
    
    
          }).catch((error) => {
            this.setState({ loading_status: false })
            showMessage(0, "Try Again!", "Profile", true, false);
    
          });
    
   
      }
    });
  }







  check() {

    if (this.state.ImageSource === null && this.state.image === null) {
      return (<Image source={require('../assets/clinic/camera.png')} style={styles.image} />)
    }
    else if (this.state.ImageSource === null && this.state.image != null) {
      return (<Image source={{ uri: "http://webmobril.org/dev/locum/" + this.state.image }} style={styles.image} />)
    }
    else {
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

    if (this.state.services_status) {
      return (
        <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
          <SelectMultiple
            style={{ marginTop: 10, marginBottom: 10, width: '100%' }}
            items={this.state.data}
            selectedItems={this.state.selected_data}
            onSelectionsChange={this.onSelectionsChange} />


          <Button
            onPress={() => {
              this.setState({ services_status: false })
            }}
            style={{ padding: 35 }}
            title="OK"
            color="#4C74E6"

          />

        </View>
      );
    }





    let result = this.check()



    return (
      <View style={{ flex: 1,marginBottom:20 }}>
        <SafeAreaView style={{ backgroundColor: '#4C74E6' }} />

        <View style={styles.container}>
          {/*for header*/}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '09%', backgroundColor: '#4C74E6' }}>

            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("HomePage")}>
              <Image style={{ width: 20, height: 20, margin: 10 }} source={require('../assets/clinic/left-arrow.png')} />
            </TouchableWithoutFeedback>

            <View>
              <Text style={{fontFamily:"Roboto-Light", fontSize: 20, fontWeight: 'bold', color: "white", }}></Text>
            </View>

            <View>
            </View>

          </View>

          {/*for main content*/}


          
					<KeyboardAwareScrollView  >
						<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
						<View style={{ width: Dimensions.get('window').width , height: 100, backgroundColor: '#4C74E6', }}>
              {/*change margin top and bottom to make view hirht flexible in below header vieww */}
              <Text numberOfLines={10} style={{ fontSize: 18,marginLeft:10,marginRight:10, fontWeight: 'bold', 
              color: "white", marginBottom: '15%', marginTop: 10, alignSelf:"center"}}>{this.state.name}</Text>
            <TouchableWithoutFeedback onPress={()=> {this.selectPhotoTapped()}}>
            <View style={{ backgroundColor: 'white', borderRadius: 100 / 2, alignSelf: 'center', flex: 1,
             borderColor: '#000000', elevation: 0, position: 'absolute', top: Dimensions.get('window').height * 0.16, marginTop: -55 }}>
            
              {result}
            </View>
            </TouchableWithoutFeedback>
            
            {/* <TouchableWithoutFeedback onPress={()=> ToastAndroid.show("ASDfasdf",ToastAndroid.LONG)}>
                <View style={{ padding: 10, backgroundColor: '#686BE4', 
                elevation:10,width: 50, height: 50, 
                borderRadius: 50 / 2, alignSelf: 'center',
                 justifyContent: 'center', alignItems: 'center',
                 position:'absolute',left:140,marginTop:100}}>
                  <Image style={{ width: 23, height: 23 }} resizeMode='contain'
                  source={require('../assets/clinic/camera-2.png')} />
                </View>
                </TouchableWithoutFeedback>
              
            */}
           

            </View>

            <View style={{ width: Dimensions.get('window').width * 0.9, alignSelf: 'center',marginTop:20 }}>
              <TextField
                style={{ marginRight: 10, marginRight: 10 }}
                label='Clinic Name'
                editable={false}
                value={this.state.name}
                onChangeText={(name) => this.setState({ name: name })}
              />




              <TextField
                style={{ marginRight: 10, marginRight: 10, width: '95%' }}
                label='ROC Number'
                value={this.state.roc_no}
                onChangeText={(roc_no) => this.setState({ roc_no: roc_no })}
              />

              <Dropdown
                label='Select Clinic Type'
                data={this.state.clinicTypes}
                value={this.state.clinic_type_id}
                onChangeText={(value) => { this.onClinicTypeChange(value) }}
              />

              <TextField
                style={{ marginRight: 10, marginRight: 10, width: '95%' }}
                label='Specialization'
                value={this.state.specialization}
                onChangeText={(specialization) => this.setState({ specialization: specialization })}
              />



              <TextField
                style={{ marginRight: 10, marginRight: 10, width: '95%' }}
                label='Directors name'
                value={this.state.directors_name}
                onChangeText={(directors_name) => this.setState({ directors_name: directors_name })}
              />


            </View>




            <View style={{ borderColor: 'black', height: null, width: null }}>


            </View>


            {/*

                                                                                         <View style={{flexDirection:"row",alignItems:'center',paddingLeft:20}}>
                                                                                         <View style={{flex:1}}>
                                                                                            <TextField
                                                                                                   style = {{justifyContent: 'flex-start',marginRight:10,width:'100%'}}
                                                                                                   label='Services'
                                                                                                   editable={false}
                                                                                                   value={this.state.final_services}

                                                                                                 />
                                                                                         </View>

                                                                                         <View style={{flex:0.1,marginRight:10}}>
                                                                                           <TouchableOpacity style = {{justifyContent: 'flex-end',marginRight:10}} onPress={() => this.setState({services_status:!this.state.services_status})}>
                                                                                           <Image style={{width: 25, height: 25}}  source={require('../assets/clinic/pen.png')} />
                                                                                           </TouchableOpacity>
                                                                                         </View>

                                                                                     </View>

                                                                                     */}



            <View style={{ flexDirection: "row", alignItems: 'center', paddingLeft: 20 }}>
              <View style={{ flex: 1 }}>
                <TextField
                  style={{ justifyContent: 'flex-start', marginRight: 10, width: '100%' }}
                  label='Address'

                  value={this.state.location}
                  onChangeText={(location) => this.setState({ location: location })}
                />
              </View>
              {/*
                                                               <View style={{flex:0.1,marginRight:10}}>
                                                                 <TouchableOpacity style = {{justifyContent: 'flex-end',marginRight:10}} onPress={() => this.setState({location_editable:!this.state.location_editable})}>
                                                                 <Image style={{width: 25, height: 25}}  source={require('../assets/clinic/pen.png')} />
                                                                 </TouchableOpacity>
                                                               </View>
                                                               */}
            </View>


            <View style={{ flexDirection: "row", alignItems: 'center', paddingLeft: 20 }}>
              <View style={{ flex: 1 }}>

              </View>
              {/*
                         <View style={{flex:0.1,marginRight:10}}>
                           <TouchableOpacity style = {{justifyContent: 'flex-end',marginRight:10}} onPress={() => this.setState({city_editable:!this.state.city_editable})}>
                           <Image style={{width: 25, height: 25}}  source={require('../assets/clinic/pen.png')} />
                           </TouchableOpacity>
                         </View>
                         */}
            </View>





            <View style={{ flexDirection: "row", alignItems: 'center', paddingLeft: 20 }}>
              <View style={{ flex: 1 }}>

              </View>
              {/*
                     <View style={{flex:0.1,marginRight:10}}>
                       <TouchableOpacity style = {{justifyContent: 'flex-end',marginRight:10}} onPress={() => this.setState({state_editable:!this.state.state_editable})}>
                       <Image style={{width: 25, height: 25}}  source={require('../assets/clinic/pen.png')} />
                       </TouchableOpacity>
                     </View>
                     */}
            </View>






            <View style={{ flexDirection: "row", alignItems: 'center', paddingLeft: 20 }}>
              <View style={{ flex: 1 }}>
                <TextField
                  style={{ justifyContent: 'flex-start', marginRight: 10 }}
                  label='Contact'
                  keyboardType='numeric'
                  maxLength={14}
                  textContentType='telephoneNumber'

                  value={this.state.contact}
                  onChangeText={(contact) => this.setState({ contact: contact })}
                />
              </View>
              {/*
                         <View style={{flex:0.1,marginRight:10}}>
                           <TouchableOpacity style = {{justifyContent: 'flex-end',marginRight:10}} onPress={() => this.setState({contact_editable:!this.state.contact_editable})}>
                           <Image style={{width: 25, height: 25}}  source={require('../assets/clinic/pen.png')} />
                           </TouchableOpacity>
                         </View>
                         */}
            </View>


            <View style={{ flexDirection: "row", alignItems: 'center', paddingLeft: 20 }}>
              <View style={{ flex: 1 }}>
                <TextField
                  style={styles.input}
                  label='PIC No.'
                  value={this.state.pic_no}
                  onChangeText={(pic_no) => this.setState({ pic_no: pic_no.trim() })}
                />
              </View>

            </View>




            <View style={{ flexDirection: "row", alignItems: 'center', paddingLeft: 20 }}>
              <View style={{ flex: 1 }}>
                <TextField
                  style={{ justifyContent: 'flex-start', marginRight: 10 }}
                  label='Email'
                  editable={false}
                  value={this.state.email}
                  onChangeText={(email) => this.setState({ email: email })}
                />
              </View>


              <View style={{ flex: 0.1, marginRight: 10 }}>

              </View>
            </View>

            <View style={{ width: Dimensions.get('window').width * 0.9, alignSelf: 'center' }}>

              <TextField
                style={{ marginRight: 10, marginRight: 10, width: '95%' }}
                label='Years of Operations'
                maxLength={2}
                keyboardType='numeric'
                textContentType='telephoneNumber'
                value={this.state.year_of_operation}
                onChangeText={(year_of_operation) => {
                  var a = year_of_operation.replace(/[^0-9.]/g, '')
                  this.setState({ year_of_operation: a })
                }}

              />

              <TextField
                style={{ marginRight: 10, marginRight: 10, width: '95%' }}
                label='Hourly Rate(RM)'
                maxLength={5}
                keyboardType='numeric'
                textContentType='telephoneNumber'
                value={this.state.hourly_rate}
                onChangeText={(hourly_rate) => {
                  var a = hourly_rate.replace(/[^0-9.]/g, '')
                  this.setState({ hourly_rate: a })
                }}

              />

              <TextField
                style={{ marginRight: 10, marginRight: 10, width: '95%' }}
                label='Daily Rate(RM)'
                maxLength={5}
                keyboardType='numeric'
                stextContentType='telephoneNumber'
                value={this.state.daily_rate}
                onChangeText={(daily_rate) => {
                  var a = daily_rate.replace(/[^0-9.]/g, '')
                  this.setState({ daily_rate: a })
                }}

              />


              <TextField
                style={{ marginRight: 10, marginRight: 10, width: '95%' }}
                label='Weekly Rate(RM)'
                maxLength={5}
                keyboardType='numeric'
                textContentType='telephoneNumber'
                value={this.state.weekly_rate}
                onChangeText={(weekly_rate) => {
                  var a = weekly_rate.replace(/[^0-9.]/g, '')
                  this.setState({ weekly_rate: a })
                }}

              />

              <TextField
                style={{ marginRight: 10, marginRight: 10, width: '95%' }}
                label='Monthly Rate(RM)s'
                maxLength={5}
                keyboardType='numeric'
                textContentType='telephoneNumber'
                value={this.state.monthly_rate}
                onChangeText={(monthly_rate) => {
                  var a = monthly_rate.replace(/[^0-9.]/g, '')
                  this.setState({ monthly_rate: a })
                }}

              />

              <TextField
                style={{ marginRight: 10, marginRight: 10, width: '95%' }}
                label='Description'
                value={this.state.description}
                onChangeText={(description) => this.setState({ description: description })}
              />

            </View>








            <TouchableOpacity
              style={styles.submitButton}
              onPress={this.editProfile.bind(this)}
              underlayColor='#fff'>
              <Text style={styles.submitText}>Update </Text>
            </TouchableOpacity>








        </View>
        </KeyboardAwareScrollView>

        </View>
      </View>

    )
  }
}



let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',

  },
  submitButton: {
    width: '100%',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#4C74E6',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 20,

  },
  submitText: {
    fontFamily:"Roboto-Light",
    color: 'white',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  input: {
    width: '50%',

  },
  image: {
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


export default withNavigationFocus(EditProfile);
