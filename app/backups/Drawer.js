import React ,  {Component}from 'react';
import { Text, View, Button, StyleSheet,SafeAreaView, Dimensions, ScrollView, Image, FlatList, TouchableOpacity,ToastAndroid,AsyncStorage ,TouchableWithoutFeedback} from 'react-native';
import StarRating from 'react-native-star-rating';

  //customizing drawer items here
export default class Drawer extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      starCount: 4.5
    };
  }


    static navigationOptions = {
      header: null ,
    };
// <StatusBar hidden={true} />

 onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }


      render() {
          return (
						<View style={{flex:1}}>
						

						  <View style={{height:'36%', backgroundColor:'#8D6CFD', justifyContent:'center',marginBottom:10}}>
								<StarRating

								containerStyle={{marginRight:20,width:'40%',alignSelf:'flex-end',marginTop:-20,marginBottom:10}}
								disabled={false}
								emptyStar={'ios-star-outline'}
								fullStar={'ios-star'}
								fullStarColor='#F0E68C'
								emptyStarColor='black'
								halfStarColor='#F0E68C'
								halfStar={'ios-star-half'}
								iconSet={'Ionicons'}
								starSize={25}
								maxStars={5}
								rating={this.state.starCount}
								selectedStar={(rating) => this.onStarRatingPress(rating)}
								/>
								<View style ={{flexDirection:'row',marginLeft:20,alignItems:'center'}}>
								<Image source={require('../assets/doctor/doctor1.jpg')}  style={{height:70, width:70}} />
										<View style={{marginLeft:10}}>
												<Text>John Davin</Text>
												<Text>NeuroSurgeon</Text>
										</View>
								</View>
							</View>



                       

          					  <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")} >
          					  <View style={styles.drawerlayout}>
          						 <Image source={require('../assets/nav/home.png')} style={styles.drawerimage} />
								 <Text style={styles.drawertext}>Home</Text>
          					  </View>
          					  </TouchableOpacity>



							  <TouchableOpacity>
          					  <View style={styles.drawerlayout}>
          						 <Image source={require('../assets/nav/earn.png')} style={styles.drawerimage} />
								 <Text style={styles.drawertext}>Wallet</Text>
          					  </View>
          					  </TouchableOpacity>




							  <TouchableOpacity onPress={() => this.props.navigation.navigate("History")}>
          					  <View style={styles.drawerlayout}>
          						 <Image source={require('../assets/nav/history.png')} style={styles.drawerimage} />
								 <Text style={styles.drawertext}>History</Text>
          					  </View>
          					  </TouchableOpacity>




							  <TouchableOpacity onPress={() => this.props.navigation.navigate("Transactions")}>
          					  <View style={styles.drawerlayout}>
          						 <Image source={require('../assets/nav/notification.png')} style={styles.drawerimage} />
								 <Text style={styles.drawertext}>Transactions</Text>
          					  </View>
          					  </TouchableOpacity>





							  <TouchableOpacity>
          					  <View style={styles.drawerlayout}>
          						 <Image source={require('../assets/nav/setting.png')} style={styles.drawerimage} />
								 <Text style={styles.drawertext}>Settings</Text>
          					  </View>
          					  </TouchableOpacity>



							  <TouchableOpacity onPress={() => {
								    AsyncStorage.removeItem('uname', (err) => {

									  ToastAndroid.show("Successfully logged out", ToastAndroid.LONG);
									  this.props.navigation.navigate("Login")
									  });
							  }}>
          					  <View style={styles.drawerlayout}>
          						 <Image source={require('../assets/nav/logout.png')} style={styles.drawerimage} />
								 <Text style={styles.drawertext}>Logout</Text>
          					  </View>
          					  </TouchableOpacity>

						


								
									
									</View>

          );
      }
  }

  const styles = StyleSheet.create({
drawerborder: {
borderBottomColor: '#000000',borderWidth: 1
},
drawerlayout: {
flexDirection: 'row',
justifyContent: 'flex-start',
alignItems:'center',


},
drawertext:{
fontSize : 20,
color:'black',
marginTop:15,
marginBottom:15,
marginLeft:10
},
drawerimage:{
height:35,
width:35,
marginRight:20,
marginLeft:20
},

});
