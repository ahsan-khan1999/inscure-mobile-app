
import React, {Component} from 'react';
import MainNavigator from './navigation/AppNavigator';;

import {enableScreens} from 'react-native-screens';
class App extends Component {

  render(){
   enableScreens()
  return (
  <MainNavigator />
    );
}
}

export default (App);