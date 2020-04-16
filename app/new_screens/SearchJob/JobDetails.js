import React ,{useState, useEffect } from 'react';
import {View,Text,TouchableOpacity,ScrollView,Image,StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';

const JobDetails =(props) => {

    const id = useState(props.navigation.getParam('id'));
    console.log("idd",id);
    const profile  = useState(props.navigation.getParam('profile'));
    const experience = useState(props.navigation.getParam('experience'));
    const description = useState(props.navigation.getParam('description'));
    const location = useState(props.navigation.getParam('location'));
    const from  = useState(props.navigation.getParam('from'));
    const to = useState(props.navigation.getParam('to'));
    const date =  useState(props.navigation.getParam('date'));
    

    return(
        <View style={styles.container}>
            <View style={styles.details}>
                <View style={styles.viewRow}>
                    {/* <Image source={require('../assets/clinic/manager-avatar.png')}  style={styles.imageStyle} /> */}

                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.textHeading}>Profile :</Text>
                        <Text style={styles.textSubheading}>{profile}</Text>
                    </View>
                    
                </View>
                <View style={styles.viewRow}>
                    {/* <Image source={require('../assets/clinic/clock2.png')}  style={styles.imageStyle} /> */}
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.textHeading}>Experience : </Text>
                        <Text style={styles.textSubheading}>{experience} Years</Text>
                    </View>
                </View>
                
                <View style={styles.viewRow}>
                    {/* <Image source={require('../assets/clinic/manager-avatar.png')}  style={styles.imageStyle} /> */}
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.textHeading}>Required Date : </Text>
                        <Text style={styles.textSubheading}>{date}</Text>
                    </View>
                </View>
                {(from[0] !== "" && to[0] !== "")
                ?
                <View style={[styles.viewRow,{justifyContent:'space-between',}]}>
                        
                    <View style={{flexDirection:'row'}}>
                    {/* <Image source={require('../assets/clinic/manager-avatar.png')}  style={styles.imageStyle} /> */}
                        <Text style={styles.textHeading}>From : </Text>
                        <Text style={styles.textSubheading}>{from}</Text>
                    </View>
                
                    <View style={{flexDirection:'row'}}>
                        {/* <Image source={require('../assets/clinic/manager-avatar.png')}  style={styles.imageStyle} /> */}
                        <Text style={styles.textHeading}>To : </Text>
                        <Text style={styles.textSubheading}>{to}</Text>
                    </View>
                </View>
                :
                <View/>
                }

                <View style={styles.viewRow}>
                    
                    <View style={{flexDirection:'row'}}>
                    <Image source={require('../assets/clinic/map.png')}  style={styles.imageStyle} />
                        <Text style={styles.textHeading}>Location : </Text>
                        
                    </View>
                    <Text style={styles.locationText} numberOfLines={2}>{location}</Text>
                </View>
               
              
            </View>
            <Card 
            title="Description"
            containerStyle={{width:'95%',height:null,elevation:5,borderColor:'#a7bbfa',borderRadius:4}} >
                <Text style={styles.dsepText}>{description}</Text>
                

                     {/* <TouchableOpacity  //onPress={this.apply.bind(this)}
                        style={styles.submitButton}>
                                <Text style={styles.submitText}>Apply</Text>
                    </TouchableOpacity> */}
            </Card>
            <TouchableOpacity  onPress={() => props.navigation.navigate("PractionersList",{job_id:id[0]})}
                style={styles.suggestButton}>
                <Text style={styles.suggestText}>See who Applied</Text>
            </TouchableOpacity>




        </View>
    )
}




let styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F2F2',
	  alignItems:'center',
		
    },
    imageStyle:{

        width:20,
        height:20,
        paddingRight:10

    },
    viewRow:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom:15
    },
    details:{

        width:"100%",
        height:null,
        backgroundColor:'#6B579F',
        padding: 15,


    },
    textHeading:{
        color:'white',
        fontSize:15,
        fontFamily:"roboto-bold",
        paddingLeft:10,

    },
    locationText:{
        fontFamily:'roboto-bold',
        fontSize:15,
        color:"white",
        paddingLeft:10,
        lineHeight:20,
        flex:1
    },
    textSubheading:{
        color:'white',
        fontSize:15,
        fontFamily:'roboto-light',
        paddingLeft:10
    },
    dsepText:{
        fontSize:14,
        color:"black",
        fontFamily:'roboto-light',
        marginBottom:20
    },
	submitButton:{
      width :'90%',
	  padding:10,
      backgroundColor:'#4C74E6',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff',

	  alignSelf:'center'

    },
    submitText:{
		fontFamily:'roboto-light',
        color:'white',
        textAlign:'center',
        fontSize :15,
	},
	suggestButton:{
		width :'80%',
		marginTop:10,
		paddingTop:10,
		paddingBottom:10,
		backgroundColor:'#4C74E6',
		borderRadius:10,
		borderWidth: 1,
		borderColor: '#fff',
		marginBottom:10,
	alignSelf:'center'

	},
	suggestText:{
		fontFamily:'roboto-light',
			color:'white',
			textAlign:'center',
			fontSize :15,
},
	indicator: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 80
	  }

})



export default JobDetails;