import React ,{ useState , useEffect } from 'react';
import {
    Text, View, StyleSheet, SafeAreaView,
    Dimensions, ScrollView, Image, FlatList, TouchableOpacity, ToastAndroid, TouchableWithoutFeedback, ActivityIndicator
  } from 'react-native';
  import DocumentPicker from 'react-native-document-picker';
  import { Card, ListItem, Button } from 'react-native-elements'
  import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { useDispatch } from 'react-redux';
import {uploadUserDocuments} from '../redux/stores/actions/register_user';
import { useSelector } from 'react-redux';
import MyActivityIndicator from '../CustomUI/MyActivityIndicator';
import {showMessage} from '../Globals/Globals';
 



const UploadDocuments = (props) => {

    const [file_one , setFileOne ] = useState("");
    const [file_name_one, setFileNameOne ] = useState("");
    const [file_one_uploaded , setFileOneUploaded ] = useState("");

    const [file_two , setFileTwo ] = useState("");
    const [file_name_two, setFileNameTwo ] = useState("");
    const [file_two_uploaded , setFileTwoUploaded ] = useState("");

    const [file_three , setFileThree ] = useState("");
    const [file_name_three, setFileNameThree ] = useState("");
    const [file_three_uploaded , setFileThreeUploaded ] = useState("");

    const [file_four , setFileFour ] = useState("");
    const [file_name_four, setFileNameFour ] = useState("");
    const [file_four_uploaded , setFileFourUploaded ] = useState("");

    const register_id  = useSelector(state => state.register.register_id);
    const loading_status = useSelector(state => state.register.loading_status);
    const dispatch = useDispatch();


    isValid = () => {


        let valid = false;
    
        if (file_name_one.toString().length > 0 || file_name_two.length > 0 || file_name_three.length > 0 || file_name_four.length > 0) {
          valid = true;
        }
        else {
          showMessage(0, "Kindly upload at least one document !", "Upload Files", true, false);
    
        }
    
        return valid;
      }
  
   

  const documentPickOne = async () => {
   
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

        setFileOne(photo);
        setFileNameOne(res.name);
        setFileOneUploaded(true);
      
      }


    } catch (err) {
  
    }


  }

  const documentPickTwo = async () => {
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

        setFileTwo(photo);
        setFileNameTwo(res.name);
        setFileTwoUploaded(true);

    }


    } catch (err) {
      //showMessage(0, err.message, "Upload Files", true, false);

    }
  }

  const documentPickThree = async () => {
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

        setFileThree(photo);
        setFileNameThree(res.name);
        setFileThreeUploaded(true);
    }


    } catch (err) {
    //  showMessage(0, err.message, "Upload Files", true, false);

    }
  }

  const documentPickFour = async () => {
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

        setFileFour(photo);
        setFileNameFour(res.name);
        setFileFourUploaded(true);
        
      }


    } catch (err) {
    //  showMessage(0, err.message, "Upload Files", true, false);

    }
  }



    const uploadDocuments = () => {

        if(isValid()) {

            dispatch(uploadUserDocuments(register_id,file_one, file_two, file_three, file_four ,props.navigation))

        }

    }

    if (loading_status) {

        return(

            <MyActivityIndicator />
        )
       
    }

    return (

        <>
            <SafeAreaView style={{  backgroundColor: '#4C74E6'}} />
                <View style={styles.container}>

                    <View style={styles.rowStyle}>
                        <View style={styles.rowStyle}>
                            <TouchableOpacity onPress={documentPickOne}>
                                <Card
                                    containerStyle={styles.buttonBox}>
                                     {file_name_one == "" 
                                     ?
                                        <Text style={styles.buttonBoxText}> File Upload 1</Text>
                                     :      
                                        <Text style={styles.buttonBoxText}>{file_name_one}</Text>
                                     }   
                                    
                                </Card>
                                {file_name_one == "" 
                                ?
                                 <View/>
                                :
                                <TouchableOpacity style={styles.crossBuuton} onPress={()=>{setFileOne(""); setFileNameOne("")}}>
                                    <Image style={{width:30,height:30}}
                                    source={require('../assets/doctor/reject.jpg')} />
                                </TouchableOpacity>
                                }
                            </TouchableOpacity>
                           
                            <TouchableOpacity onPress={documentPickTwo}>
                                <Card
                                    containerStyle={styles.buttonBox}>
                                     {file_name_two == "" 
                                     ?
                                        <Text style={styles.buttonBoxText}> File Upload 2</Text>
                                     :      
                                        <Text style={styles.buttonBoxText}>{file_name_two}</Text>
                                     }   
                                    
                                </Card>
                                {file_name_two == "" 
                                ?
                                 <View/>
                                :
                                <TouchableOpacity style={styles.crossBuuton} onPress={()=>{setFileTwo(""); setFileNameTwo("")}}>
                                    <Image style={{width:30,height:30}}
                                    source={require('../assets/doctor/reject.jpg')} />
                                </TouchableOpacity>
                                }
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={styles.rowStyle}>
                        <View style={styles.rowStyle}>
                            <TouchableOpacity onPress={documentPickThree}>
                                <Card
                                        containerStyle={styles.buttonBox}>
                                        {file_name_three == "" 
                                        ?
                                            <Text style={styles.buttonBoxText}> File Upload 3</Text>
                                        :      
                                            <Text style={styles.buttonBoxText}>{file_name_three}</Text>
                                        }   
                                        
                                    </Card>
                                    {file_name_three == "" 
                                    ?
                                    <View/>
                                    :
                                    <TouchableOpacity style={styles.crossBuuton} onPress={()=>{setFileThree(""); setFileNameThree("")}}>
                                        <Image style={{width:30,height:30}}
                                        source={require('../assets/doctor/reject.jpg')} />
                                    </TouchableOpacity>
                                    }
                            </TouchableOpacity>
                            <TouchableOpacity onPress={documentPickFour}>
                                <Card
                                    containerStyle={styles.buttonBox}>
                                    {file_name_four == "" 
                                    ?
                                        <Text style={styles.buttonBoxText}> File Upload 4</Text>
                                    :      
                                        <Text style={styles.buttonBoxText}>{file_name_four}</Text>
                                    }   
                                    
                                </Card>
                                {file_name_four == "" 
                                ?
                                <View/>
                                :
                                <TouchableOpacity style={styles.crossBuuton} onPress={()=>{setFileFour(""); setFileNameFour("")}}>
                                    <Image style={{width:30,height:30}}
                                    source={require('../assets/doctor/reject.jpg')} />
                                </TouchableOpacity>
                                }
                            </TouchableOpacity>
                        </View>

                    </View>
                    
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={uploadDocuments}
                        underlayColor='#fff'>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center' }}>

                        <Text style={{color:"white",fontWeight:"bold",fontSize:17}}>Upload Documents</Text>
                        <Image style={{ width: 22, height: 22, alignSelf: 'center',marginLeft:10 }} source={require('../assets/doctor/upload.png')} />
                        </View>
                    </TouchableOpacity>


                </View>
        
        </>
      )
}



let styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      
     
    },
    rowStyle:{
        margin:10,
        flexDirection:"row",
        
    

    },

    buttonBox: {
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center",
        width:150,
        height:150,
        borderRadius:5,
        borderWidth:1,
        borderColor:"grey",
        elevation:5,
        
    },
    buttonBoxText:{
        textAlign:"center",
        fontSize:15,
        alignSelf:"center"

    },
    crossBuuton:{
        top:20,
        bottom:0,
        left:20,
        bottom:0,
        position:"absolute",
        elevation:20
    },

    submitButton: {
      width: '90%',
      padding:10,
      marginTop:20,
      backgroundColor: '#4C74E6',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#fff',
      
  
  
    },
    
  })

export default UploadDocuments;