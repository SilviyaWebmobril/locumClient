import React, { Component } from 'react';
import {
  Text, View, Button, StyleSheet, SafeAreaView, Dimensions, ScrollView, BackHandler,
  Image, FlatList, TouchableOpacity, ToastAndroid, TouchableWithoutFeedback, KeyboardAvoidingView, ActivityIndicator, Keyboard
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { StackActions , NavigationActions } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import { withNavigationFocus } from 'react-navigation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { TextInput } from 'react-native-gesture-handler';
import { showMessage } from './Globals';



var uid = 0;
class JobPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      profile: '',
      experience: '',
      isDatePickerVisible: false,
      date: '',
      description: '',
      dropdown_val: '',
      drop_val: 0,
      data: [],
      location_frame_status: false,
      lat: 0.0,
      long: 0.0,

    };

  }

  isValid() {


    let valid = false;

    if (this.state.location.toString().length > 0
      && this.state.date.toString().length > 0 && this.state.description.toString().length > 0
    ) {
      valid = true;
    }
    if (parseInt(this.state.drop_val) < 1) {
      showMessage(0,'You must select job profile',"Job Post",true,false);
     
    }
    else if (this.state.location.toString().length === 0) {

      showMessage(0,'You must enter job location',"Job Post",true,false);
     
     
      return false
    }
    else if (this.state.date.toString().length === 0) {

      showMessage(0,'You must enter a date',"Job Post",true,false);
     
      
      return false
    }
    else if (this.state.description.toString().length === 0) {

      showMessage(0,'You must enter a job description',"Job Post",true,false);
   
      return false
    }

    return valid;
  }



  postJob(id) {
    if (this.isValid()) {

      NetInfo.isConnected.fetch().then(isConnected => {
				if (!isConnected) {
				  this.props.navigation.navigate("NoNetwork")
				  return;
				}
				else {

          var formData = new FormData();
          formData.append('userid', id);
          formData.append('role', 2);
          formData.append('job_cat_id', this.state.drop_val);
          formData.append('exp_required', this.state.experience);
          formData.append('job_location', this.state.location);
          formData.append('required_date', this.state.date);
          formData.append('job_desc', this.state.description);
          formData.append('lat', this.state.lat);
          formData.append('long', this.state.long);
          this.setState({ loading_status: true })
          fetch('http://webmobril.org/dev/locum/api/post_job', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            body: formData
    
          }).then((response) => response.json())
            .then((responseJson) => {
              this.setState({ loading_status: false })
    
              if (responseJson.status === "success") {
    
                AsyncStorage.setItem('job_remaining',responseJson.jobs_remaining.toString())
                showMessage(0,responseJson.message,"Job Post",true,false);
               
                this.props.navigation.navigate("HomeScreen")
              }
              else {
                this.props.navigation.navigate('Packages');
                    const resetAction = StackActions.reset({
                      index: 0,
                      key: 'Packages',
                      actions: [NavigationActions.navigate({ routeName: 'Packages' })],
                    });
                    this.props.navigation.dispatch(resetAction);
                
                showMessage(0,responseJson.message,"Job Post",true,false);
           
              }
    
    
            }).catch((error) => {
              console.error(error);
            });
    
        }
      });

    }
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
              //	ToastAndroid.show("fetching",ToastAndroid.LONG)
              for (var i = 0; i < length; i++) {
                var name = responseJson.result[i].name
                var id = responseJson.result[i].id

                const array = [...this.state.data];
                array[i] = { ...array[i], key: id };
                array[i] = { ...array[i], value: name };

                this.setState({ data: array });
              }
            }

            //ToastAndroid.show(JSON.stringify(this.state.data),ToastAndroid.LONG)
          }).catch((error) => {
            console.error(error);
          });




      }
    });

    
  }


  handleBackWithAlert = () => {
   
    if (this.props.isFocused) {

      if (this.state.location_frame_status) {
        this.setState({ location_frame_status: false })
      }



      return true;
    }
  }



  // componentWillMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.handleBackWithAlert);

  // }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackWithAlert);

  // }



  componentDidMount() {
    this.fetch()
  }

  async _getStorageValue() {
    var value = await AsyncStorage.getItem('uname')
    return value
  }

  onChangeTextPress(value) {
   
    if (this.state.data.length > 0) {
      //var jobs = this.state.jobs
      for (var i = 0; i < this.state.data.length; i++) {
        if (this.state.data[i].value === value) {
          this.setState({ dropdown_val: this.state.data[i].value, drop_val: this.state.data[i].key })
        }
      }
    }

  }

  async connect() {
    let user_id = await this._getStorageValue()
    //ToastAndroid.show("IDDDDD.."+ user_id, ToastAndroid.LONG);
    this.postJob(user_id)
  }

  convertDate(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();

    var mmChars = mm.split('');
    var ddChars = dd.split('');

    return yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
  }
  //for date
  showDatePicker = () => this.setState({ isDatePickerVisible: true });

  hideDatePicker = () => this.setState({ isDatePickerVisible: false });

  handleDatePicked = (date) => {

    //console.log('A date has been picked: ', date);
    this.setState({ date: this.convertDate(date) })
    this.hideDatePicker();
  };

  render() {
    let data = this.state.data;

    if (this.state.loading_status) {
      return (
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="large"
        />
      );
    }
    if (this.state.location_frame_status) {
      return (
        <View style={{ flex: 1 }}>
					<SafeAreaView style={{ backgroundColor: "white" }} />

					<View style={{flex: 1 ,justifyContent:"center",alignItems:"center"}}>

						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '7%', backgroundColor: 'white' }}>

							<TouchableWithoutFeedback onPress={() =>{this.setState({location_frame_status:false})}}>
								<Image style={{ width: 20, height: 20, margin: 10 }} source={require('../assets/clinic/left-arrow-black.png')} />
							</TouchableWithoutFeedback>

							<View>
								<Text style={{ fontSize: 20, fontWeight: 'bold', color: "white", paddingRight: 25 }}>Reset Password</Text>
							</View>

							<View>
							</View>

						</View>
          <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed='auto'    // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              //  ToastAndroid.show(JSON.stringify(data),ToastAndroid.LONG)

              let city = details.address_components[0].long_name
              let lat = details.geometry.location.lat
              let lng = details.geometry.location.lng
              let full_addr = details.formatted_address
              //	this.setState({location:full_addr})

              //	ToastAndroid.show(city+"..."+lat+"..."+lng+".."+full_addr,ToastAndroid.LONG)
              this.setState({ location_frame_status: false, lat: lat, long: lng, location: full_addr })
            }}

            getDefaultValue={() => ''}

            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyB-q60XaNf5nsz5e1jaRg0KTs5Q1nPi2Zk',
              language: 'en', // language of the results
              types: 'geocode' // default: 'geocode'
            }}


            GoogleReverseGeocodingQuery={{
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }}
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: 'distance',
              types: 'food'
            }}



            styles={{
              textInputContainer: {
                width: '90%',
               
              },
              description: {
                fontWeight: 'bold'
              }
            }}

            //  currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch


            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities


            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

          />
        </View>
        </View>
      );
    }


    return (

      <View style={{flex:1}}>
			<SafeAreaView style={{  backgroundColor: '#4C74E6'}} />
      <View style={styles.container}>
        {/*for header*/}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '09%', backgroundColor: '#4C74E6' }}>

          <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
            <Image style={{ width: 20, height: 20, margin: 10 }} source={require('../assets/clinic/left-arrow.png')} />
          </TouchableWithoutFeedback>

          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white", paddingRight: 25 }}>Post Job</Text>
          </View>

          <View>
          </View>

        </View>

        {/*for main content*/}

        <View style={{ padding: 10, width: '90%' }}>


          <Dropdown
            label='Select Job Profile'
            data={this.state.data}
            value={this.state.dropdown_val}
            onChangeText={(value) => { this.onChangeTextPress(value) }}
          />




          <TextField
            style={{ width: '100%' }}
            label='Experience (in years)'
            keyboardType='numeric'
            maxLength={5}
            textContentType='telephoneNumber'
            value={this.state.experience}
            onChangeText={(experience) => this.setState({ experience })}
          />
          <TextField
            style={{ width: '100%' }}
            label='Location'
            onFocus={() => {
              Keyboard.dismiss()
              this.setState({ location_frame_status: true })

            }}
            value={this.state.location}
            onChangeText={(location) => this.setState({ location })}
          />



        
          <TextField
            style={{ width: '100%' }}
            label='Description'
            value={this.state.description}
            onChangeText={(description) => this.setState({ description })}
          />

          <TextInput
            style={{ width: '100%',borderBottomColor:"#C8C8C8",borderBottomWidth:1,fontSize:15 ,marginTop:30,paddingBottom:8}}
            onFocus={() => {
              Keyboard.dismiss()
              this.showDatePicker()

            }}
            placeholder="Enter Date"
            value={this.state.date}
            onChangeText={(date) => this.setState({ date })}
          />



          <DateTimePicker
            mode="date"
            isVisible={this.state.isDatePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDatePicker}
            minimumDate={new Date()}
          >
          </DateTimePicker>



          <TouchableOpacity
            onPress={() => this.connect()}
            style={styles.submitButton}>
            <Text style={styles.submitText}>Post</Text>
          </TouchableOpacity>

        </View>

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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 40,

  },
  submitText: {
    color: 'white',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },

  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }

})

export default withNavigationFocus(JobPost);
