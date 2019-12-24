import React, { Component } from 'react';
import {
  Text, View, Button, StyleSheet, Dimensions, ScrollView, ActivityIndicator, SafeAreaView,
  Image, FlatList, TouchableOpacity, ToastAndroid, TouchableWithoutFeedback
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Card, CheckBox } from 'react-native-elements';
import ImagePicker from "react-native-image-picker";
import { Dropdown } from 'react-native-material-dropdown';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from './Globals';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
 
export default class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clininc_name: '',
      location: '',
      city: '',
      email: '',
      state: '',
      contact_no: '',
      id: '',
      loading_status: false,
      data: null,
      ImageSource: null,
      pic_no: '',

      //new
      roc_no: '',
      clinicTypes: [],
      clinic_type_id: '',
      clinic_type_val: '',
      specialization: '',
      directors_name: '',
      years_operation: '',
      hourly_rate: '',
      daily_rate: '',
      weekly_rate: '',
      monthly_rate: '',
      description: '',
      checked: false




    };

  }



  fetch() {


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

                const array = [...this.state.clinicTypes];
                array[i] = { ...array[i], key: id };
                array[i] = { ...array[i], value: name };

                this.setState({ clinicTypes: array });
              }
            }

          }).catch((error) => {
            console.error(error);
            showMessage(0, JSON.stringify(error), "Profile", true, false)

          });

      }

    })

  }






  selectPhotoTapped() {
    //await requestCameraPermission()
    //ToastAndroid.show("Uploading !!",ToastAndroid.LONG);
    const options = {
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      }
    };

    ImagePicker.launchCamera(options, (response) => {
      

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        showMessage(0, "Cancelled ", "Profile", true, false)

      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {

        let source = { uri: response.uri };
        this.setState({
          ImageSource: source,
          data: response.data,


        });

        if(Platform.OS == 'ios'){
          this.upload(response.data, response.uri,"imgae.jpg")
        }else{
          this.upload(response.data, response.uri, response.fileName)
        }

        
      }
    });
  }



  upload(data, uri, name) {
    //ToastAndroid.show(JSON.stringify(this.state.data),ToastAndroid.LONG)
    this.setState({ loading_status: true })
    //fetching all fata from server
    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected) {
        this.props.navigation.navigate("NoNetwork")
        return;
      }
      else {

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
            showMessage(0, JSON.stringify(responseJson.message), "Profile", true, false)


          }).catch((error) => {
            this.setState({ loading_status: false })
            showMessage(0, JSON.stringify(error), "Profile", true, false)

          });



      }

    });

  }



  isValid() {

    console.log("des1", this.state.description.toString().length);

    let valid = false;

    if (this.state.location.length > 0
      && this.state.contact_no.length > 0 && this.state.pic_no.length > 0) {
      //ToastAndroid.show("sadasd",ToastAndroid.SHORT)
      valid = true;
    } else if (this.state.roc_no.toString().trim().length === 0) {

      showMessage(0, 'Enter ROC Number', "Profile", true, false)

      return false;

    }

    else if (this.state.clinic_type_val.length === 0) {

      showMessage(0, 'Enter Clinic Type', "Profile", true, false)

      return false
    } else if (this.state.specialization.toString().trim().length === 0) {

      showMessage(0, 'Enter Specialization', "Profile", true, false)

      return false;
    } else if (this.state.email.toString().trim().length === 0) {

      showMessage(0, 'Enter Email', "Profile", true, false)


      return false
    } else if (this.state.directors_name.toString().trim().length === 0) {

      showMessage(0, 'Enter Directors Name', "Profile", true, false)

      return false
    } else if (this.state.years_operation.toString().trim().length === 0) {

      showMessage(0, 'Enter Years of Operation', "Profile", true, false)

      return false
    }
    else if (this.state.hourly_rate.toString().trim().length === 0) {

      showMessage(0, 'Enter Hourly Rate', "Profile", true, false)

      return false
    }
    else if (this.state.daily_rate.toString().trim().length === 0) {

      showMessage(0, 'Enter Daily Rate', "Profile", true, false)

      return false
    }
    else if (this.state.weekly_rate.toString().trim().length === 0) {

      showMessage(0, 'Enter Weekly Rate', "Profile", true, false)

      return false
    }
    else if (this.state.monthly_rate.toString().trim().length === 0) {

      showMessage(0, 'Enter Monthly Rate', "Profile", true, false);

      return false
    } else if (this.state.location.length === 0) {

      showMessage(0, 'Enter address', "Profile", true, false);

      return false

    } else if (this.state.pic_no.length === 0) {
      showMessage(0, 'Enter PIC no.', "Profile", true, false);

      return false;

    } else if (this.state.contact_no.length === 0) {

      showMessage(0, 'Enter contact no.', "Profile", true, false);

      return false;

    }

    if (this.state.description.length === 0) {
      console.log("des", this.state.description.toString().trim().length);

      showMessage(0, 'Enter Description', "Profile", true, false);

      return false;

    }

    if (this.state.description.length < 10) {
      console.log("desp", this.state.description.toString().trim());

      showMessage(0, 'Description Should be 10 characters long', "Profile", true, false);

      return false;
    }

    if (!this.state.checked) {

      showMessage(0, "Accept terms and condition", "Profile", true, false);

      return false


    }



    return valid;
  }

  async getUserName() {
    var name = await AsyncStorage.getItem('name')
    return name
  }

  async getEmail() {
    var email = await AsyncStorage.getItem('email')
    return email
  }


  async getUserId() {
    var id = await AsyncStorage.getItem('temp_id')
    return id
  }

  async getUserPhone() {
    var phone = await AsyncStorage.getItem('phone')
    return phone
  }


  onClinicTypeChange(value) {
    //ToastAndroid.show("IDDDDD.."+ value, ToastAndroid.LONG);
    if (this.state.clinicTypes.length > 0) {
      //var jobs = this.state.jobs
      for (var i = 0; i < this.state.clinicTypes.length; i++) {
        if (this.state.clinicTypes[i].value === value) {
          //ToastAndroid.show("IDDDDD.."+ this.state.data[i].key, ToastAndroid.LONG);
          this.setState({
            clinic_type_id: this.state.clinicTypes[i].value,
            clinic_type_val: this.state.clinicTypes[i].key, clinic_type: this.state.clinicTypes[i].value
          })


        }
      }
    }

  }



  async componentWillMount() {
    let user_id = await this.getUserId()
    let name = await this.getUserName()
    let phone = await this.getUserPhone()
    let email = await this.getEmail()
    this.setState({ name: name, contact_no: phone, id: user_id, email: email })

    this.fetch()
  }

  connect() {
    //  ToastAndroid.show(JSON.stringify(this.isValid()),ToastAndroid.LONG)

    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected) {
        this.props.navigation.navigate("NoNetwork")
        return;
      }
      else {


        if (this.isValid()) {
          var formData = new FormData();
          formData.append('userid', this.state.id);
          formData.append('name', this.state.name);
          formData.append('location', this.state.location);
          formData.append('city', this.state.city);
          formData.append('state', this.state.state)
          formData.append('mobile', this.state.contact_no)
          formData.append('pic_no', this.state.pic_no)
          formData.append('role', 2)

          //new


          formData.append('roc_no', this.state.roc_no);
          formData.append('profession', this.state.clinic_type_val);
          formData.append('specialization', this.state.specialization);
          formData.append('directors_name', this.state.directors_name);
          formData.append('years_of_operation', this.state.years_operation)
          formData.append('hourly_rate', this.state.hourly_rate)
          formData.append('daily_rate', this.state.daily_rate)
          formData.append('weekly_rate', this.state.daily_rate)
          formData.append('monthly_rate', this.state.monthly_rate)
          formData.append('description', this.state.description)


          //ToastAndroid.show(JSON.stringify(formData), ToastAndroid.LONG);


          this.setState({ loading_status: true })
          fetch('http://webmobril.org/dev/locum/api/update_clinic_profile', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            body: formData

          }).then((response) => response.json())
            .then((responseJson) => {
              this.setState({ loading_status: false })

              //ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.LONG);
              if (responseJson.status === 'success') {
                var id = this.state.id

                var image = "";
								if(responseJson.result.user_image !== null){
								 image	= responseJson.result.user_image
								}

                AsyncStorage.setItem('user_image', image);

                this.props.navigation.navigate("UploadDocuments")


              }
              showMessage(0, responseJson.message.toString(), "Profile", true, false);

            }).catch((error) => {
              console.error(error);
            });

        }

      }
    });


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


    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ backgroundColor: '#4C74E6' }} />

        <View style={styles.container}>
          {/*for header*/}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '09%', backgroundColor: '#4C74E6' }}>

            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
              <Image style={{ width: 20, height: 20, margin: 10 }} source={require('../assets/clinic/left-arrow.png')} />
            </TouchableWithoutFeedback>

            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white", paddingRight: 25 }}></Text>
            </View>

            <View>
            </View>

          </View>

          {/*for main content*/}


          <KeyboardAwareScrollView  >

          <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>



          <View style={{ width: Dimensions.get('window').width, height: 100, backgroundColor: '#4C74E6' }}>
              {/*change margin top and bottom to make view hirht flexible in below header vieww */}
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white", marginBottom: 15,alignSelf:"center" }}>{this.state.name}</Text>
           


            {
              this.state.ImageSource == null ?
                <View
                  style={{
                    position: 'absolute',
                    overflow: 'hidden',
                    top: Dimensions.get('window').height * 0.16,
                    marginTop: Platform.OS == 'android' ? -55 : -75,
                    marginBottom: 30,
                    backgroundColor: 'white',
                    borderRadius: 50,
                    padding: 20,
                    borderColor: '#000000',
                    borderWidth: 1,
                    alignSelf: 'center',

                    height: null
                  }}>
                  <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <Image style={{ width: 60, height: 60, marginTop: 2 }} source={require('../assets/clinic/camera.png')} />
                  </TouchableOpacity>
                </View>
                :
                <View
                  style={{
                    position: 'absolute',
                    overflow: 'hidden',
                    top: Dimensions.get('window').height * 0.16,
										marginTop: Platform.OS == 'android' ? -55 : -75,
                    marginBottom: 30,
                    backgroundColor: 'white',
                    borderRadius: 50,

                    borderColor: '#909090',
                    borderWidth: 1,
                    alignSelf: 'center',

                    alignItems: 'center',
                    justifyContent: 'center',
                    width: null,
                    height: null
                  }}>
                  <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <Image source={this.state.ImageSource} style={{ width: 100, height: 100, marginTop: 2 }} />
                  </TouchableOpacity>
                </View>
            }

            </View>




            <View style={{width:Dimensions.get('window').width * 0.9,marginTop:30 }}>
              <TextField
                style={styles.input}
                label='Clinic Name'
                editable={false}
                value={this.state.name}
                onChangeText={(name) => this.setState({ name: name })}
              />
              <TextField
                style={styles.input}
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
                style={styles.input}
                label='Specialization'
                value={this.state.specialization}
                onChangeText={(specialization) => this.setState({ specialization: specialization })}
              />

              <TextField
                style={styles.input}
                label='Email'
                editable={false}
                value={this.state.email}
                onChangeText={(email) => this.setState({ email: email })}
              />
              <TextField
                style={styles.input}
                label='Directors name'
                value={this.state.directors_name}
                onChangeText={(directors_name) => this.setState({ directors_name: directors_name })}
              />

              <TextField
                style={styles.input}
                label='Years of Operations'
                maxLength={2}
                keyboardType='numeric'
                textContentType='telephoneNumber'
                value={this.state.years_operation}
                onChangeText={(years_operation) => {
                  var a = years_operation.replace(/[^0-9.]/g, '')
                  this.setState({ years_operation: a })
                }}

              />

              <TextField
                style={styles.input}
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
                style={styles.input}
                label='Daily Rate(RM)'
                maxLength={5}
                keyboardType='numeric'
                textContentType='telephoneNumber'
                value={this.state.daily_rate}
                onChangeText={(daily_rate) => {
                  var a = daily_rate.replace(/[^0-9.]/g, '')
                  this.setState({ daily_rate: a })
                }}

              />


              <TextField
                style={styles.input}
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
                style={styles.input}
                label='Monthly Rate(RM)'
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
                style={styles.input}
                label='Location'
                value={this.state.location}
                onChangeText={(location) => this.setState({ location: location.trim() })}
              />

              <TextField
                style={styles.input}
                label='PIC No.'
                value={this.state.pic_no}
                onChangeText={(pic_no) => this.setState({ pic_no: pic_no.trim() })}
              />
              <TextField
                style={styles.input}
                label='Contact No'
                editable={false}
                value={this.state.contact_no}
                onChangeText={(contact_no) => this.setState({ contact_no: contact_no.trim() })}
              />


              <TextField
                style={styles.input}
                label='Description'
                value={this.state.description}
                onChangeText={(description) => this.setState({ description: description })}
              />

              {/*checkbox */}

              <View style={{ flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center', marginTop: 10, marginBottom: 4 }}>


                <CheckBox
                  onPress={() => this.setState({ checked: !this.state.checked })}
                  checked={this.state.checked}
                  checkedColor="blue"

                />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('TermsConditions')}>
                  <View style={{ flexDirection: 'row', marginLeft: -15, flexWrap: 'wrap', flexShrink: 1 }}>
                    <Text style={{ color: 'black' }}>Accept  </Text>
                    <Text style={{ textDecorationLine: 'underline', marginLeft: 2, color: 'blue' }}>Terms & Condition</Text>
                  </View>

                </TouchableOpacity>

              </View>


              <TouchableOpacity
                style={styles.submitButton}
                onPress={this.connect.bind(this)}
                underlayColor='#fff'>
                <Text style={styles.submitText}>Create</Text>
              </TouchableOpacity>

            </View>



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
    marginTop: 20
  },
  submitText: {
    color: 'white',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  input: {
    width: Dimensions.get('window').width * 0.7,

  },

  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }

})
