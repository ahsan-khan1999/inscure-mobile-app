import React from "react";
import { ActivityIndicator,StyleSheet, View , Text} from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import { Bubbles } from 'react-native-loader';
 

export default () => (
 
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Bubbles size={10} color="#ff8c69" >
        
    <ActivityIndicator  />
  </Bubbles>
        <Text style={{color:'black'}}>Uploading</Text>
  </View>
);

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100
  },
  container: {    flex: 1,    justifyContent: 'center',    alignItems: 'center',    backgroundColor: '#F5FCFF',  }
});