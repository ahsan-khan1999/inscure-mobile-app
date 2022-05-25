import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Img from '../assets/log-in-screen.jpg';
import AsyncStorage from '@react-native-community/async-storage';

const Login = (props) => {
  //    await   AsyncStorage.setItem('LoginData',JSON.stringify(objData))
  const [phoneNumber, setphoneNumber] = useState('');
  const [email, setemail] = useState('');
  //const [name, setName] = useState('');
  async function handleSubmit() {
    if (phoneNumber == '' || email == '') {
      Alert.alert('Error', 'Please fill all the fileds');
    } else {
      let objData = await {
        phone: phoneNumber,
        email: email,
      };
      await AsyncStorage.setItem('LoginData', JSON.stringify(objData));

      await setphoneNumber('');
      await setemail('');
      const response = fetch(`http://132.145.186.226:5000/insurecue/inserttoDB`, {
        method: 'POST',
        body: JSON.stringify({
          Phone_No: phoneNumber,
          Email_ID: email
        })
      })
        .then(url => { url, console.log(url, 'inside') })
        .catch(er => { er.response, console.log(er, 'error') })
      console.log("response in getting", response);
      props.navigation.navigate('Chat');
    }
  }

  React.useEffect(() => {
    Authdata();
  }, []);
  async function Authdata() {
    let AuthData = await AsyncStorage.getItem('LoginData');
    console.log(AuthData, 'Authdata');
    AuthData.phone !== '' ? props.navigation.navigate('Chat') : null;
  }

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Image
        source={Img}
        style={{
          width: '100%',
          height: 180,
        }}
      />
      <Text style={styles.Heading}>Personal Information</Text>
      <View>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          value={phoneNumber}
          keyboardType={'numeric'}
          onChangeText={(value) => setphoneNumber(value)}
          placeholderTextColor="grey"
          placeholder="Enter phone Number "
          style={styles.textInputstyle}
          editable={true}
        />
        {/* <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          keyboardType={'name-phone-pad'}
          onChangeText={(value) => setName(value)}
          placeholderTextColor="grey"
          placeholder="Enter Name "
          style={styles.textInputstyle}
          editable={true}
        /> */}
        <Text style={styles.label}>Email Id</Text>
        <TextInput
          value={email}
          onChangeText={(value) => setemail(value)}
          placeholderTextColor="grey"
          placeholder="Enter email Id"
          style={styles.textInputstyle}
          editable={true}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
        <Text
          style={{
            alignSelf: 'center',
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};
Login.navigationOptions = (navigationData) => {
  return {
    headerShown: false,
  };
};
const styles = StyleSheet.create({
  textInputstyle: {
    borderWidth: 1,
    paddingHorizontal: 5,
    borderRadius: 10,
    paddingVertical: 2,
    borderColor: '#ddd',
    marginVertical: 5,
    marginHorizontal: 15,
  },
  label: {
    marginHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Circular Std Book',
    marginVertical: 5,
    color: 'black',
  },
  Heading: {
    marginHorizontal: 15,
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 28,
    fontFamily: 'Circular Std Book',
  },
  button: {
    backgroundColor: '#fa7a72',
    marginHorizontal: 50,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
  },
});
export default Login;
