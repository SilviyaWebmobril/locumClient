import React  from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator ,Header} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Login from '../Login/Login'
import Splash  from '../Splash/Splash';
import Register from '../NewUserRegister/Register';
import NetworkError from '../Globals/NetworkError';
import CreateProfile from '../NewUserRegister/CreateProfile';
import HeaderComponent from '../CustomUI/HeaderComponent';
import HeaderComponentt from '../CustomUI/HeaderComponentt';
import TermsCondition from '../TermsAndCondition/TermsCondition';
import MyHeader from '../CustomUI/MyHeader';
import UploadDocuments from '../NewUserRegister/UploadDocuments';
import HomeScreen from '../HomeStack/HomeScreen';
import Drawer from '../HomeStack/Drawer';
import EditProfile from '../NewUserRegister/EditProfile';
import SearchJob from '../SearchJob/SearchJob';
import JobDetails from '../SearchJob/JobDetails';
import AppliedJob from '../SearchJob/AppliedJob';
import JobList from '../SearchJob/JobList';
import SearchLocation from '../SearchJob/SearchLocation';
import TransactionList from '../Transactions/TransactionList';
import BuyPackages from '../Packages/BuyPackages';
import ApplyCoupon from '../Packages/ApplyCoupon.js';
import Wallet from '../Wallet/Wallet';
import AddMoney from '../Wallet/AddMoney';
import ResetPassword from '../ResetPassword/ResetPassword';
import FrequentlyAskedQues from '../FAQ/FrequentlyAskedQues';
import ContactAdmin from '../ContactAdmin/ContactAdmin';
import PractionersList  from '../SearchJob/PractionersList';
import PractitionersDetails from '../SearchJob/PractitionersDetails';
import EditJobPost from '../SearchJob/EditJobPost';


const CreateProfileStack =  createStackNavigator({

    Login: { screen: Login,
      navigationOptions:{
        header:null
      }
    },
    Register: { screen: Register,
      navigationOptions:{
        header:null
      }
    },
   
    // ForgotPassword: { screen: ForgotPassword},
    CreateProfile :{screen :CreateProfile,
      navigationOptions:{
        header:  props => <HeaderComponent value={0} {...props} wallet={0} />
      }
    },
    UploadDocuments: { screen: UploadDocuments,
      navigationOptions:{
        header :props => <MyHeader  {...props}  title="Upload Documents" value={0}/>
      }
    },
    // UploadFiles: { screen: UploadFiles},
    TermsCondition: { screen: TermsCondition,
      navigationOptions:{
        header : props => <MyHeader {...props} title="Terms And Conditions" value={0}/>
      }
    },
    NoNetwork : { screen : NetworkError,
      navigationOptions:{
        header:null
      }
     },
  },{
    //headerMode: 'none',
    initialRouteName:'Login'
  });


  const HomeStack = createStackNavigator({
    HomeScreen: { screen: HomeScreen,
      navigationOptions:{
        header : props => <MyHeader {...props} title="Home" value={0} />
      }
     },
      SearchJob: { screen: SearchJob,
        navigationOptions:{
          header : props => <MyHeader {...props} title="Add Post" value={0}/>
        } 
      },
       Location: { screen: SearchLocation,
        navigationOptions:{
          header : props => <MyHeader {...props} title="Location" value={0}/>
        }
     },
     JobList: { screen: JobList,
      navigationOptions:{
        header : props => <MyHeader {...props} title="Jobs" value={0}/>
      },
      
     },
     EditJobPost: { screen: EditJobPost,
      navigationOptions:{
        header : props => <MyHeader {...props} title="Edit Job Post" value={0}/>
      }
    },
  
    // //  TransferJob: { screen: TransferJob },
     JobDetails: { screen: JobDetails,
      navigationOptions:{
        header : props => <MyHeader {...props} title="Job Details" value={0} />
      }
     },
     PractionersList: { screen: PractionersList,
      navigationOptions:{
        header : props => <MyHeader {...props} title="Practitioners List" value={0} />
      }
     },
     PractitionersDetails: { screen: PractitionersDetails,
      // navigationOptions:{
      //   // header : props => <HeaderComponentt  {...props}/>
      // }
     },
     FrequentlyAskedQues :{
       screen: FrequentlyAskedQues,
       navigationOptions:{
        header : props => <MyHeader {...props} title="FAQ" value={0} />
       }
     },
    ContactAdmin: { screen: ContactAdmin ,
      navigationOptions:{
        header : props => <MyHeader {...props} title="Contact Admin" value={0} />
       }
    },
    // Availibility: { screen: Availibility },
    NoNetwork : { screen : NetworkError,
      navigationOptions:{
        header:null
      }
     },
  
  
  
  
  
  }, {
    // headerMode: 'none',
       initialRouteName: 'HomeScreen'
  
  })

  const editStack = createStackNavigator({
    EditProfile: { screen: EditProfile,
       navigationOptions:{
        header:  props => <HeaderComponent value={1} {...props} edit={1} wallet={0} />
      }
    },
    // JobPreferences: { screen: JobPreferences},
    // LocationPreferences: { screen: LocationPreferences},
    NoNetwork : { screen : NetworkError,
      navigationOptions:{
        header:null
      }
     },
  }, {
    
       initialRouteName: 'EditProfile'
  
  })


const TransactionStack = createStackNavigator({
  TransactionList: { screen: TransactionList,
    navigationOptions:{
      header : props => <MyHeader {...props} title="Your Transactions"/>
  }},
  NoNetwork : { screen : NetworkError,
    navigationOptions:{
      header:null
    }
   },

}, {
     initialRouteName: 'TransactionList'

});

const PackageStack = createStackNavigator({
  Packages: { screen: BuyPackages,
    navigationOptions:{
      header : props => <MyHeader {...props} title="Packages"/>
    }
   },
   AddMoney: { screen: AddMoney,
    navigationOptions:{
      header : props => <MyHeader {...props} title="Add Money" value={0} />
    }
   },
   ApplyCoupon: { screen: ApplyCoupon,
    navigationOptions:{
      header : props => <MyHeader {...props} title="Coupons" value={0}/>
    }
   },
 
 }, {
      initialRouteName: 'Packages'
 
 });


 const WalletStack = createStackNavigator({
  Wallet: { screen: Wallet ,
    navigationOptions:{
      header:  props => <HeaderComponent value={1} {...props} edit={0} wallet={1} />
    }
  },
  AddMoney: { screen: AddMoney,
    navigationOptions:{
      header : props => <MyHeader {...props} title="Add Money" value={0} />
    }
   },
  NoNetwork : { screen : NetworkError,
    navigationOptions:{
      header:null
    }
   },

}, {

     initialRouteName: 'Wallet'

});

const AppliedJobsStack  = createStackNavigator({
  AppliedJob: { screen: AppliedJob,
    navigationOptions:{
      header : props => <MyHeader {...props} title="Applied Jobs"/>
    }
  },
  JobDetails: { screen: JobDetails,
    navigationOptions:{
      header : props => <MyHeader {...props} title="Job Details" value={1} />
    }
   },
   NoNetwork : { screen : NetworkError,
    navigationOptions:{
      header:null
    }
   },

}, {
     initialRouteName: 'AppliedJob'

});

const resetStack = createStackNavigator({
  ResetPassword: { screen: ResetPassword,
    navigationOptions:{
      header : props => <MyHeader {...props} title="Reset Password"/>
    }
  },
  NoNetwork : { screen : NetworkError,
    navigationOptions:{
      header:null
    }
   },

}, {
     initialRouteName: 'ResetPassword'

});


const termsStack = createStackNavigator({
  TermsCondition: { screen: TermsCondition,
    navigationOptions:{
      header : props => <MyHeader {...props} title="Terms And Conditions" value={1}/>
    }
  },
  NoNetwork : { screen : NetworkError,
    navigationOptions:{
      header:null
    }
   },

}, {
     initialRouteName: 'TermsCondition'

})



 
const drawerNavigator = createDrawerNavigator(
  {
  HomePage: { screen: HomeStack},
	// History: { screen: History},
	 Transactions: { screen: TransactionStack},
   Profile:{screen:editStack},
   Wallet:{screen:WalletStack},
   Packages: { screen: PackageStack},
   AppliedJobs :{ screen :AppliedJobsStack},
  // SuggestedJobs:{screen:suggestionStack},
   ResetPassword:{screen:resetStack},
  // NoNetwork : { screen : NoNetwork },
   TermsCondition: { screen: termsStack},

  },
  {initialRouteName: 'HomePage',
  gesturesEnabled: true,
    contentComponent: props => <Drawer {...props} />
  },
  {
		contentOptions: {
        activeTintColor: '#e91e63',
        activeBackgroundColor:'#A4A4DD',

			}
  }

);
  

const AppRoutes = createSwitchNavigator({
    Splash: { screen: Splash },
    Login: { screen: CreateProfileStack},
    // ApplyPromo: { screen: ApplyPromo},
     Home: {screen: drawerNavigator},
    // NoNetwork : { screen : NoNetwork }
  
  
  }, {
       headerMode: 'none',
       initialRouteName: 'Splash'
  
  });

export default createAppContainer(AppRoutes)