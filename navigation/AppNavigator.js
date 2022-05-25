import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {TouchableOpacity, Text} from 'react-native';
import {createDrawerNavigator, DrawerActions} from 'react-navigation-drawer';
import LandingPage from '../screens/landing';
import ChatScreen from '../screens/ChatScreen';
import ChatScreen2 from '../screens/ChatScreen2';
import CustomDrawer from '../components/CustomDrawer';
import Contact from '../screens/Contact';
import About from '../screens/Aboutus';
import React from 'react';
import linking from './linking';
import Login from '../screens/login';
const DrawerNavigator = createDrawerNavigator(
  {
    About: {
      screen: About,
      defaultNavigationOptions: {
        headerTintColor: 'black',
      },
    },

    Contact: {
      screen: Contact,
    },
  },
  {
    mode: 'modal',
    lazy: true,
    hideStatusBar: false,
    drawerBackgroundColor: 'white',
    overlayColor: 'transparent',
  },
);

const AppNavigator = createStackNavigator(
  {
    LandingScreen: {
      screen: LandingPage,
    },

    Chat: {
      screen: ChatScreen,
      defaultNavigationOptions: {
        headerTintColor: 'black',
      },
    },
    Chat2: {
      screen: ChatScreen2,
      defaultNavigationOptions: {
        headerTintColor: 'black',
      },
    },
    // Login: Login,
  },
  {
    initialRouteName: 'LandingScreen',
    // headerMode:'none'
    linking: linking,
    mode: 'modal',
    lazy: true,
  },
);
const MainNavigator = createSwitchNavigator(
  {
    Main: AppNavigator,
    Drawer: DrawerNavigator,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: true,
      header: null,
    },
  },
);
const AppConatiner = createAppContainer(MainNavigator);

export default createAppContainer(AppConatiner);
// export default ()=> {
//     const prefix = 'insurcue://'
//     return (<AppConatiner uriPrefix={prefix}/>)};
