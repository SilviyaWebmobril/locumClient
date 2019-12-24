// import React from 'react';
// import { Text, View } from 'react-native';
// import { createBottomTabNavigator, createAppContainer,createMaterialTopTabNavigator,createStackNavigator } from 'react-navigation';
//
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator ,Header} from 'react-navigation-stack';
// import { createDrawerNavigator } from 'react-navigation-drawer';
// import Today from './Today';
// import Weekly from './Weekly';
// import TransactionDetails from './TransactionDetails';
//
//
//  const TodayStack = createStackNavigator({
//   Today: { screen: Today },
//   TransactionDetails: { screen: TransactionDetails },
//
//
//  }, {
//  	 headerMode: 'none',
//       initialRouteName: 'Today'
//
//  });
//
//  const WeeklyStack = createStackNavigator({
//   Weekly: { screen: Weekly },
//   TransactionDetails: { screen: TransactionDetails },
//
//
//  }, {
//  	 headerMode: 'none',
//       initialRouteName: 'Weekly'
//
//  });
//
//  //below code is used to hide tab bar except first screen
//  TodayStack.navigationOptions = ({ navigation }) => {
// 	let tabBarVisible = true;
// 	if (navigation.state.index > 0) {
// 	  tabBarVisible = false;
// 	}
//
// 	return {
// 	  tabBarVisible,
// 	};
//   };
//
//   WeeklyStack.navigationOptions = ({ navigation }) => {
// 	let tabBarVisible = true;
// 	if (navigation.state.index > 0) {
// 	  tabBarVisible = false;
// 	}
//
// 	return {
// 	  tabBarVisible,
// 	};
//   };
//
// const Tab = createMaterialTopTabNavigator(
// {
//   Today: TodayStack,
//   Weekly: WeeklyStack,
// }
// ,{
// 			tabBarOptions: {
// 			style:{
// 					backgroundColor:'white',
//
// 			},
//
// 			indicatorStyle: {
// 				backgroundColor: 'blue',
// 			},
// 			activeTintColor:"black",
// 			inactiveTintColor:'black',
// 			labelStyle: {
// 				fontWeight: 'bold',
// 				margin: 8,
// 				padding: 0,
// 				fontSize:18
//   },
//
//
// 		}
// }
// );
//
// export default createAppContainer(Tab);
