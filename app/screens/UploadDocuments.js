import React, { Component } from 'react';
import {
  Text, View, Button, StyleSheet, SafeAreaView, Dimensions, ScrollView, Image,
  FlatList, TouchableOpacity, ToastAndroid, TouchableWithoutFeedback, ActivityIndicator
} from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import { showMessage } from './Globals';
//import FilePickerManager from 'react-native-file-picker';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";



export default class UploadDocuments extends Component {
  constructor(props) {
    super(props);

    this.state = {

      file_one: '',
      file_two: '',
      file_one_name: '',
      file_two_name: '',
      file_three: '',
      file_three_name: '',
      file_four: '',
      file_four_name: '',
      id: '',
      loading_status: false,
      show_file_two: false,
      show_file_three: false,
      show_file_four: false,
      file_one_uploaded: false,
      file_two_uploaded: false,
      file_three_uploaded: false,
      file_four_uploaded: false,
      file_one_choosen: false,
      file_two_choosen: false,
      file_three_choosen: false,
      fie_four_choosen: false,
      final_id: '',
      final_name: '',
      final_image: '',
      final_profession: ''
    };

  }



  isValid() {


    let valid = false;

    if (this.state.file_one_name.length > 0 || this.state.file_two_name.length > 0 || this.state.file_three_name.length > 0 || this.state.file_four_name.length > 0) {
      valid = true;
    }
    else {
      showMessage(0, "Kindly upload at least one document !", "Upload Documents", true, false);

    }

    return valid;
  }


  async getUserId() {
    var id = await AsyncStorage.getItem('temp_id')
    return id
  }
  async getUserName() {
    var name = await AsyncStorage.getItem('name')
    return name
  }
  async getUserPhone() {
    var phone = await AsyncStorage.getItem('phone')
    return phone
  }

  async getUserPic() {
    var pic = await AsyncStorage.getItem('user_image')
    return pic
  }




  async create() {


    let user_id = await this.getUserId()

    // ToastAndroid.show("ID>>>"+user_id,ToastAndroid.LONG)
    this.upload(user_id)

  }

  async componentWillMount() {
    let user_id = await this.getUserId()
    let name = await this.getUserName()

    let pic = await this.getUserPic()

    this.setState({ final_id: user_id, final_name: name, final_image: pic })
  }

  documentPickOne = async () => {
    // DocumentPicker.show({
    //   filetype: [DocumentPickerUtil.allFiles()],
    //   },(error,res) => {

    //     if(res && res.uri){
    //       var photo = {
    //         uri: res.uri,
    //         type:res.type,
    //         name: res.fileName,
    //     };
    //     this.setState({file_one:photo,file_one_name:res.fileName,file_one_uploaded:true})
    //     }

    // });





    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );


      if (res && res.uri) {
        var photo = {
          uri: res.uri,
          type: res.type,
          name: res.name,
        };
        this.setState({ file_one: photo, file_one_name: res.name, file_one_uploaded: true })
      }


    } catch (err) {
      showMessage(0, err.message, "Upload Documents", true, false);

    }


  }

  documentPickTwo = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );


      if (res && res.uri) {
        var photo = {
          uri: res.uri,
          type: res.type,
          name: res.name,
        };
        this.setState({ file_two: photo, file_two_name: res.name, file_two_uploaded: true })
      }


    } catch (err) {
      showMessage(0, err.message, "Upload Documents", true, false);

    }
  }

  documentPickThree = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );


      if (res && res.uri) {
        var photo = {
          uri: res.uri,
          type: res.type,
          name: res.name,
        };
        this.setState({ file_three: photo, file_three_name: res.name, file_three_uploaded: true })
      }


    } catch (err) {
      showMessage(0, err.message, "Upload Documents", true, false);


    }
  }

  documentPickFour = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );


      if (res && res.uri) {
        var photo = {
          uri: res.uri,
          type: res.type,
          name: res.name,
        };
        this.setState({ file_four: photo, file_four_name: res.name, file_four_uploaded: true })
      }


    } catch (err) {
      showMessage(0, err.message, "Upload Documents", true, false);


    }
  }


  next() {
    // var result  = this.props.navigation.getParam('result')
    this.props.navigation.navigate("CreateProfile")
  }

  upload(user_id) {

    if (this.isValid()) {

      NetInfo.isConnected.fetch().then(async isConnected => {
        if (!isConnected) {
          this.props.navigation.navigate("NoNetwork")
          return;
        } else {

          this.setState({ loading_status: true })
          var body = new FormData();
          body.append('doc_1', this.state.file_one);
          body.append('doc_2', this.state.file_two);
          body.append('doc_3', this.state.file_three);
          body.append('doc_4', this.state.file_four);
          body.append('userid', user_id);
          body.append('role', 2);


          //ToastAndroid.show(JSON.stringify(body),ToastAndroid.LONG);

          fetch('http://webmobril.org/dev/locum/api/upload_documents', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            body: body

          }).then((response) => response.json())
            .then((responseJson) => {

              this.setState({ loading_status: false })
              //ToastAndroid.show("UPLOADING:",ToastAndroid.LONG);
              //ToastAndroid.show(JSON.stringify(responseJson),ToastAndroid.LONG);
              if (responseJson.status === 'success') {
                // AsyncStorage.clear()
                // AsyncStorage.setItem('uname', this.state.final_id.toString());
                // AsyncStorage.setItem('name', this.state.final_name.toString());
                // AsyncStorage.setItem('user_image', this.state.final_image);
                // this.props.navigation.navigate("Home")
                this.props.navigation.navigate("Login")
                showMessage(1, responseJson.message,"Upload Documents" ,true, false);

              }
              else {
                showMessage(1, responseJson.message,"Upload Documents" , true, false);
              }

            }).catch((error) => {
              this.setState({ loading_status: false })
              showMessage(1, "Try Again","Upload Documents" , true, false);
            });
        }



      });
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
              <Text style={{fontFamily:"Roboto-Light", fontSize: 20, fontWeight: 'bold', color: "white", paddingRight: 25 }}>Upload Documents</Text>
            </View>

            <View>
            </View>

          </View>

          {/*for main content*/}
          {/*onPress={this.documentPick.bind(this)}*/}

          <View style={{ padding: 20, width: '100%', flex: 1, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, height: '30%' }}>

              {/*document one*/}
              <View style={{ borderColor: 'black', borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center', padding: 10, width: '45%', height: '70%', marginRight: 5 }}>
                <TouchableOpacity onPress={this.documentPickOne.bind(this)}>
                  {this.state.file_one_name.length == 0 ? <Text style={styles.submitText}>File 1</Text> : <Text style={styles.submitText}>File One Uploaded</Text>}
                </TouchableOpacity>

                {
                  this.state.file_one_name.length != 0 ?
                    <TouchableOpacity style={{ position: 'absolute', right: 10, bottom: 15 }} onPress={() => this.setState({ file_one: '', file_one_name: '' })}>
                      <Image style={{ width: 22, height: 22 }} source={require('../assets/doctor/reject.jpg')} />
                    </TouchableOpacity>
                    : null

                }

              </View>

              {/*document two*/}
              <View style={{ borderColor: 'black', borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center', padding: 10, width: '45%', height: '70%', marginRight: 5 }}>
                <TouchableOpacity onPress={this.documentPickTwo.bind(this)}>
                  {this.state.file_two_name.length == 0 ? <Text style={styles.submitText}>File 2</Text> : <Text style={styles.submitText}>File Two Uploaded</Text>}
                </TouchableOpacity>


                {
                  this.state.file_two_name.length != 0 ?
                    <TouchableOpacity style={{ position: 'absolute', right: 10, bottom: 15 }} onPress={() => this.setState({ file_two: '', file_two_name: '' })}>
                      <Image style={{ width: 22, height: 22 }} source={require('../assets/doctor/reject.jpg')} />
                    </TouchableOpacity>
                    : null

                }
              </View>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, height: '30%' }}>
              {/*document three*/}
              <View style={{ borderColor: 'black', borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center', padding: 10, width: '45%', height: '70%', marginRight: 5 }}>
                <TouchableOpacity onPress={this.documentPickThree.bind(this)}>
                  {this.state.file_three_name.length == 0 ? <Text style={styles.submitText}>File 3</Text> : <Text style={styles.submitText}>File Three Uploaded</Text>}
                </TouchableOpacity>

                {
                  this.state.file_three_name.length != 0 ?
                    <TouchableOpacity style={{ position: 'absolute', right: 10, bottom: 15 }} onPress={() => this.setState({ file_three: '', file_three_name: '' })}>
                      <Image style={{ width: 22, height: 22 }} source={require('../assets/doctor/reject.jpg')} />
                    </TouchableOpacity>
                    : null

                }
              </View>
              {/*document four*/}
              <View style={{ borderColor: 'black', borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center', padding: 10, width: '45%', height: '70%', marginRight: 5 }}>
                <TouchableOpacity onPress={this.documentPickFour.bind(this)}>
                  {this.state.file_four_name.length == 0 ? <Text style={styles.submitText}>File 4</Text> : <Text style={styles.submitText}>File Four Uploaded</Text>}
                </TouchableOpacity>


                {
                  this.state.file_four_name.length != 0 ?
                    <TouchableOpacity style={{ position: 'absolute', right: 10, bottom: 15 }} onPress={() => this.setState({ file_four: '', file_four_name: '' })}>
                      <Image style={{ width: 22, height: 22 }} source={require('../assets/doctor/reject.jpg')} />
                    </TouchableOpacity>
                    : null

                }
              </View>
            </View>

            <TouchableOpacity
              style={styles.submitButtonTwo}
              onPress={this.create.bind(this)}
              underlayColor='#fff'>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center' }}>

                <Text style={styles.submitTextTwo}>Upload Documents</Text>
                <Image style={{ width: 22, height: 22, alignSelf: 'center' }} source={require('../assets/doctor/upload.png')} />
              </View>
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
    width: '80%',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#4C74E6',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 10


  },
  submitText: {
    fontFamily:"Roboto-Light",
    color: 'black',
    textAlign: 'center',
    margin: 25,
    fontSize: 16,

  },
  submitButtonTwo: {
    width: '100%',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#4C74E6',
    borderRadius: 1,
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 20
  },
  submitTextTwo: {
    fontFamily:"Roboto-Light",
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
