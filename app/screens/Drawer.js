import React, { Component } from 'react';
import {
  Text, View, Button, StyleSheet, SafeAreaView,
  Dimensions, ScrollView, Image, FlatList,
  TouchableOpacity, ToastAndroid,
  TouchableWithoutFeedback
} from 'react-native';
import { showMessage } from './Globals';
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems, StackActions, NavigationActions } from 'react-navigation';

//customizing drawer items here
export default class Drawer extends Component {


  constructor(props) {

    super(props);
    this.first()
    this.state = {
      starCount: 0.0,
      name: '',
      user_image: null,
      verify:"",
      job_remaining:""

    };
  }

  async getUserPic() {
    var pic = await AsyncStorage.getItem('user_image')
    return pic
  }


  async getUserName() {
    var name = await AsyncStorage.getItem('name')
    return name
  }

  async getUserVerified() {
    var verify = await AsyncStorage.getItem('verify')
    return verify
  }

  async getJobRemaining() {
    var job_remaining = await AsyncStorage.getItem('job_remaining')
    return job_remaining
  }


  async first() {
    let user_name = await this.getUserName()
    let pic = await this.getUserPic()

    let verify = await this.getUserVerified() ;
    this.setState({verify:verify});

    let job_remaining = await this.getJobRemaining();
    this.setState({job_remaining:job_remaining});
    //this.setState({name:user_name,user_image:pic})
    if (pic == null) {
      this.setState({ name: user_name, user_image: null })
    }
    else {
      this.setState({ name: user_name, user_image: "http://webmobril.org/dev/locum/" + pic })
    }
  }

  async componentDidMount() {
    this.first()
    this.timer = setInterval(() => this.first(), 5000)
  }



  componentWillUnmount() {
    //ToastAndroid.show("sdsads",ToastAndroid.LOMG)
    clearInterval(this.timer)
  }

  onLogin() {


    fetch('http://dev.webmobrilmedia.com/mentor_me/api/get_profile.php?user_id=315', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },


    }).then((response) => response.json())
      .then((responseJson) => {
         showMessage(0,responseJson.message,"Profile",true,false);
        this.setState({ name: responseJson.message })
      }).catch((error) => {
        console.error(error);
      });

  }

  async getUserId() {
    var id = await AsyncStorage.getItem('uname')
    return id
  }



  componentWillMount() {
    this.props.navigation.closeDrawer()
  }




  static navigationOptions = {
    header: null,
  };


  onStarRatingPress(rating) {
    //this.setState({
    //  starCount: rating
    // });
  }



  render() {

    const name = this.state.name

    return (
      <View style={{flex:1}}>
			<SafeAreaView style={{  backgroundColor: '#4C74E6'}} />


        <View style={{ height: '25%', backgroundColor: '#4C74E6', justifyContent: 'center', }}>

          <View style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center' }}>

            {this.state.user_image == null ?
              <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate('EditProfile');
                const resetAction = StackActions.reset({
                  index: 0,
                  key: 'EditProfile',
                  actions: [NavigationActions.navigate({ routeName: 'EditProfile' })],
                });
                this.props.navigation.dispatch(resetAction);
              }}>
                 <Image source={require('../assets/doctor/avatar.png')} style={{ height: 70, width: 70, borderRadius: 70 / 2, elevation: 10 }} />
              </TouchableOpacity>
             
              : <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate('EditProfile');
                const resetAction = StackActions.reset({
                  index: 0,
                  key: 'EditProfile',
                  actions: [NavigationActions.navigate({ routeName: 'EditProfile' })],
                });
                this.props.navigation.dispatch(resetAction);
              }}>
                 <Image source={{ uri: this.state.user_image }} style={{ height: 70, width: 70, borderRadius: 70 / 2, elevation: 10 }} />
              </TouchableOpacity>
             
            }

            <View style={{ marginLeft: 15 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white' }}>{name}</Text>

            </View>


          </View>
          {/* {this.state.verify == 1
          ?
          <Text style={{ fontWeight: 'bold', fontSize: 15,marginTop:20, color: 'white' ,textAlign:"left",marginLeft:20}}>Verified By Admin</Text>
          :
          <Text style={{ fontWeight: 'bold', fontSize: 15,marginTop:20, color: 'red' ,textAlign:"left",marginLeft:20}}>Not verified</Text>
          } */}
          
          <Text style={{ fontWeight: 'bold', fontSize: 15,marginTop:10, color: 'white' ,textAlign:"left",marginLeft:20}}>Post Jobs Available : {this.state.job_remaining}</Text>
          {/* <StarRating
            containerStyle={{ width: '35%', alignSelf: 'center', marginLeft: 20 }}
            disabled={false}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            fullStarColor='#F0E68C'
            emptyStarColor='black'
            halfStarColor='#F0E68C'
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            starSize={18}
            maxStars={5}
            rating={this.state.starCount}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
          /> */}


        </View>



        <ScrollView style={{ flex: 1 }}>

          <TouchableOpacity onPress={() => {
            this.props.navigation.closeDrawer()
            this.props.navigation.navigate('HomePage');
            //below is used to reset stacki navigator so that goes infirst screen only
            const resetAction = StackActions.reset({
              index: 0,
              key: 'HomeScreen',
              actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
            });
            this.props.navigation.dispatch(resetAction);
          }} >
            <View style={styles.drawerlayout}>
              <Image source={require('../assets/nav/home.png')} style={styles.drawerimage} />
              <Text style={styles.drawertext}>Home</Text>
            </View>
          </TouchableOpacity>






          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('EditProfile');
            const resetAction = StackActions.reset({
              index: 0,
              key: 'EditProfile',
              actions: [NavigationActions.navigate({ routeName: 'EditProfile' })],
            });
            this.props.navigation.dispatch(resetAction);
          }}>
            <View style={styles.drawerlayout}>
              <Image source={require('../assets/nav/user-shape.png')} style={styles.drawerimage} />
              <Text style={styles.drawertext}>Profile</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('Packages');
            //below is used to reset stacki navigator so that goes infirst screen only
            const resetAction = StackActions.reset({
              index: 0,
              key: 'Packages',
              actions: [NavigationActions.navigate({ routeName: 'Packages' })],
            });
            this.props.navigation.dispatch(resetAction);
          }}>
            <View style={styles.drawerlayout}>
              <Image source={require('../assets/nav/buy.png')} style={styles.drawerimage} />
              <Text style={styles.drawertext}>Buy Packages</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('Wallet');
            //below is used to reset stacki navigator so that goes infirst screen only
            const resetAction = StackActions.reset({
              index: 0,
              key: 'Wallet',
              actions: [NavigationActions.navigate({ routeName: 'Wallet' })],
            });
            this.props.navigation.dispatch(resetAction);
          }}>
            <View style={styles.drawerlayout}>
              <Image source={require('../assets/nav/wallet.png')} style={styles.drawerimage} />
              <Text style={styles.drawertext}>Wallet</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('Transactions');
            //below is used to reset stacki navigator so that goes infirst screen only
            const resetAction = StackActions.reset({
              index: 0,
              key: 'Transactions',
              actions: [NavigationActions.navigate({ routeName: 'TransactionsList' })],
            });
            this.props.navigation.dispatch(resetAction);
          }}>
            <View style={styles.drawerlayout}>
              <Image source={require('../assets/nav/trans.png')} style={styles.drawerimage} />
              <Text style={styles.drawertext}>Transactions</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('ResetPassword');
            //below is used to reset stacki navigator so that goes infirst screen only
            const resetAction = StackActions.reset({
              index: 0,
              key: 'ResetPassword',
              actions: [NavigationActions.navigate({ routeName: 'ResetPassword' })],
            });
            this.props.navigation.dispatch(resetAction);
          }}>
            <View style={styles.drawerlayout}>
              <Image source={require('../assets/nav/setting.png')} style={styles.drawerimage} />
              <Text style={styles.drawertext}>Reset Password</Text>
            </View>
          </TouchableOpacity>











          <TouchableOpacity onPress={() => {
            AsyncStorage.clear();
           
            showMessage(0,"Successfully logged out","Logout",true,false)
       
            this.setState({ name: '', user_image: null })
            this.props.navigation.closeDrawer()
            this.props.navigation.navigate("Login")
            const resetAction = StackActions.reset({
              index: 0,
              key: 'Login',
              actions: [NavigationActions.navigate({ routeName: 'Login' })],
            });
            this.props.navigation.dispatch(resetAction);
          }}>
            <View style={styles.drawerlayout}>
              <Image source={require('../assets/nav/logout.png')} style={styles.drawerimage} />
              <Text style={styles.drawertext}>Logout</Text>
            </View>
          </TouchableOpacity>

        </ScrollView>


     </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerborder: {
    borderBottomColor: '#000000', borderWidth: 1
  },
  drawerlayout: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',


  },
  drawertext: {
    fontSize: 14,
    color: 'black',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10
  },
  drawerimage: {
    height: 20,
    width: 20,
    marginRight: 20,
    marginLeft: 20
  },

});
