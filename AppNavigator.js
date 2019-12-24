import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator ,Header} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import React from 'react';
import { Text, View, Button, StyleSheet,SafeAreaView, Dimensions, ScrollView, Image, FlatList, TouchableOpacity,ToastAndroid,AsyncStorage } from 'react-native';
import StarRating from 'react-native-star-rating';


//screens
import Login from './app/screens/Login';
import Splash from './app/screens/Splash';
import Register from './app/screens/Register';
import CreateProfile from './app/screens/CreateProfile';
import EditProfile from './app/screens/EditProfile';
import JobPost from './app/screens/JobPost';
 import JobList from './app/screens/JobList';
 import JobDetails from './app/screens/JobDetails';

import ResetPassword from './app/screens/ResetPassword';
 import ContactAdmin from './app/screens/ContactAdmin';
import Drawer from './app/screens/Drawer';
 import HomeScreenNew from './app/screens/HomeScreenNew';
 import PractitionersList from './app/screens/PractitionersList';
 import PractitionersDetails from './app/screens/PractitionersDetails';
// import Transactions from './app/screens/Transactions';
import ForgotPassword from './app/screens/ForgotPassword';
import Dummy from './app/screens/Dummy';
import TransactionsList from './app/screens/TransactionsList';
//import TransactionDetails from './app/screens/TransactionDetails';
import UploadDocuments from './app/screens/UploadDocuments';
import Packages from './app/screens/Packages';
import AddMoney from './app/screens/AddMoney';
import Wallet from './app/screens/Wallet';
import ApplyPromo from './app/screens/ApplyPromo';
import FAQ from './app/screens/FAQ/FAQ';
import TermsConditions from './app/screens/TermsConditions';


 const TransactionsStack = createStackNavigator({
  TransactionsList: { screen: TransactionsList },
  //TransactionDetails: { screen: TransactionDetails },




 }, {
 	 headerMode: 'none',
      initialRouteName: 'TransactionsList'

 });

 const ProfileStack = createStackNavigator({
  EditProfile: { screen: EditProfile },

 }, {
    headerMode: 'none',
      initialRouteName: 'EditProfile'

 });


 const PackageStack = createStackNavigator({
  Packages: { screen: Packages },
  AddMoney :{screen :AddMoney},
  	ApplyPromo: { screen: ApplyPromo},

 }, {
    headerMode: 'none',
      initialRouteName: 'Packages'

 });

 const WalletStack = createStackNavigator({
   Wallet: { screen: Wallet},
   AddMoney: { screen: AddMoney },


 }, {
 	 headerMode: 'none',
      initialRouteName: 'Wallet'

 })


const jobStack = createStackNavigator({
  HomeScreen: { screen: HomeScreenNew },
  JobList: { screen: JobList },
  JobDetails: { screen: JobDetails},
  JobPost: { screen: JobPost},
  ContactAdmin: { screen: ContactAdmin},
  PractitionersList: { screen: PractitionersList},
  PractitionersDetails: { screen: PractitionersDetails},
}, {
   headerMode: 'none',
     initialRouteName: 'HomeScreen'

});
//PractitionersDetails
console.disableYellowBox = true;


const resetStack = createStackNavigator({
  ResetPassword: { screen: ResetPassword},


}, {
	 headerMode: 'none',
     initialRouteName: 'ResetPassword'

})

const FAQStack  = createStackNavigator({
  FAQ: { screen: FAQ },

},{
  headerMode: 'none',
  initialRouteName: 'FAQ',


})


const drawerNavigator = createDrawerNavigator(
  {
  HomePage: { screen: jobStack},
	EditProfile: { screen: ProfileStack},
  Packages: { screen: PackageStack},
  FAQ : {screen : FAQStack} ,  
  Wallet: { screen: WalletStack},
  Transactions: { screen: TransactionsStack},
  ResetPassword: { screen: resetStack},


  },

  {initialRouteName: 'HomePage',
	   gesturesEnabled: true,
    contentComponent: props => <Drawer {...props} />
  },
  {
		contentOptions: {
			  activeTintColor: '#e91e63',

			}
  }

);

const createProfileStack = createStackNavigator({

  Login: { screen: Login},
  Register: { screen: Register},
  ApplyPromo : { screen: ApplyPromo},
  ForgotPassword: { screen: ForgotPassword},
  CreateProfile: { screen: CreateProfile},
  TermsConditions:{screen: TermsConditions},
  UploadDocuments: { screen: UploadDocuments},
},{
  initialRouteName:"Login",
  headerMode:'none'
})


const RootStack = createSwitchNavigator({
  Splash: { screen: Splash },
  Login:{ screen: createProfileStack },
  Home: {screen: drawerNavigator},

}, {
	 headerMode: 'none',
     initialRouteName: 'Splash'

})

const AppNavigator = createAppContainer(RootStack)
export default AppNavigator;
