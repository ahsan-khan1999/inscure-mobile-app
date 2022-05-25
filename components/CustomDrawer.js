
import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';
class CustomSidebarMenu extends Component {
  loadSideBarLink = () => {
    // console.log(this.state.role);

    // if (
    //   this.state.token === undefined ||
    //   this.state.token === null ||
    //   this.state.token === ''
    // ) {
    //   console.log(this.state.token, 'popopo');
    //   var item = this.state.items;
    //   item.push({
    //     navOptionThumb: 'settings',
    //     navOptionName: 'Login',
    //     screenToNavigate: 'Login',
    //   });
    //   this.setState({items: item});
    // } else {
    //   var item = this.state.items;

    //   if (this.state.role == 'owner') {
    //     item.push({
    //       navOptionThumb: 'add',
    //       navOptionName: 'Add Property',
    //       screenToNavigate: 'Dashboard',
    //     });
    //   } else {
    //   }
    //   item.push({
    //     navOptionThumb: 'image',
    //     navOptionName: 'Logout',
    //     screenToNavigate: 'Logout',
    //   });
    //   this.setState({items: item});
    // }
  };

  // constructor(props) {
  
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
          {/* <Image
            source={back}
            style={{height: 30, width: 30, marginLeft: '5%', marginTop: '5%'}}
          /> */}
          <Text>back</Text>
        </TouchableOpacity>

        <View style={styles.sideMenuContainer}>
          {/* <Image source={profileImage} style={styles.sideMenuProfileIcon} /> */}

          <View style={{width: '100%', marginTop: 10}}>
            
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: '10%',
                  paddingTop: 5,
                  paddingBottom: 10,
                }}
              >
                <View style={{marginRight: 10, marginLeft: 20}}>
                  <Text>dhhh</Text>
                  {/* <Icon name={item.navOptionThumb} size={25} color="#808080" /> */}
                </View>
                {/* <TouchableOpacity
                  style={{
                    fontSize: 15,
                    color: global.currentScreenIndex === key ? 'red' : 'black',
                  }}
                  onPress={() => {
                    global.currentScreenIndex = key;
                    this.props.navigation.navigate(item.screenToNavigate);
                  }}>
                  <Text style={{textAlign: 'center'}}>
                    {item.navOptionName}
                  </Text>
                </TouchableOpacity> */}
              </View>
            
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    // alignItems: 'center',

    paddingTop: 20,
  },
  sideMenuProfileIcon: {
    width: 100,
    height: 100,
    marginTop: 20,
    marginLeft: '15%',
    borderRadius: 100 / 2,
    borderWidth: 1,
    borderColor: 'grey',
  },
});

export default CustomSidebarMenu;