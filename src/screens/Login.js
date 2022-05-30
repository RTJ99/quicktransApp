import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AppBar from '../components/AppBar';
import {styles} from './../style/index';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import axios from 'axios';
import logo from '../assets/logo.png';
import {
  AddIcon,
  Box,
  MinusIcon,
  ScrollView,
  TextArea,
  useToast,
  Modal,
  Button,
  KeyboardAvoidingView,
} from 'native-base';
import jwt_decode from 'jwt-decode';
import placeholder from '../assets/img/placeholder-car.png';
import {preferencesList} from './../constants/preferences';
import MultiSelect from 'react-native-multiple-select';
import {Stack, Input} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import {offerRideService} from '../services';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import PlaceholderCar from '../components/PlaceholderCar';
import AutoComplete from '../components/AutoComplete';
import {baseUrl} from '../config/baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const keyboardVerticalOffset = Platform.OS === 'android' ? 40 : 0;

  const toast = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uId, setUid] = useState('');
  const [dp, setDp] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [show, setShow] = React.useState(false);
  const storeUser = async token => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem('token'));
      let decodedToken = jwt_decode(AsyncStorage.getItem('token'));
      console.log(decodedToken, 'decoded');
    } catch (error) {
      console.log(error);
    }
  };
  const login = async e => {
    // e.preventDefault();
    // AsyncStorage.setItem("token", response.tokenObj.id_token);
    setIsLoading(true);
    const data = {
      username: username,
      password: password,
    };

    console.log(data, 'dataaa');
    await fetch(baseUrl + '/user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*', // It can be used to overcome cors errors
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.text())
      .then(async json => {
        // console.log(JSON.parse(json).token, 'json');
        let tokenRes = JSON.parse(json);
        console.log(tokenRes, 'resposnse token');
        setIsLoading(false);
        AsyncStorage.setItem('token', tokenRes.token.toString()).then(
          async res => {
            console.log(await AsyncStorage.getItem('token'), 'resposnse token');
          },
        );
        // storeUser(tokenRes.token);
        // console.log(await AsyncStorage.getItem('token'), 'resposnse token');
        //

        // storeUser(tokenRes.token);
        let token = await AsyncStorage.getItem('token');
        let decodedToken = jwt_decode(token);
        console.log(decodedToken, 'toe');
        /*userId is the surname of the user*/
        AsyncStorage.setItem('name', decodedToken.name);
        /*user_id is the real user id*/
        AsyncStorage.setItem('dp', decodedToken.picture);
        AsyncStorage.setItem('address', decodedToken.address);
        AsyncStorage.setItem('email', decodedToken.email);

        AsyncStorage.setItem('id', decodedToken.id);
        AsyncStorage.setItem('emergencyContact', decodedToken.emergencyContact);
        AsyncStorage.setItem(
          'ussuall_check_ins',
          decodedToken.usuall_check_ins,
        );
        AsyncStorage.setItem('ussuall_pick_up', decodedToken.pickup_points);
        AsyncStorage.setItem('phone', decodedToken.phone.toString());
        // AsyncStorage.setItem('pickup_points', decodedToken.pickup_points);

        toast.show({
          title: 'Login Sucessfull',
          status: 'success',
          placement: 'top',
          description: 'Welcome' + ' ' + (await AsyncStorage.getItem('name')),
        });
        navigation.navigate('Main', {
          id: decodedToken.id,
        });
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
        toast.show({
          title: 'Server Connectivity Error',
          status: 'error',
          placement: 'top',
          description: 'Failed to communicate with server',
        });
      });
  };

  return (
    <View style={[styles.container]}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <View style={{display: 'flex', alignItems: 'center', marginTop: 60}}>
          <Image
            style={{width: 200, height: 200, margin: 'auto'}}
            source={logo}
          />
        </View>
        <Stack space={6} w="100%" alignItems="center">
          <Text
            style={{
              fontSize: 16,
              color: '#005792',
              fontFamily: 'Rubik-Bold',
              textAlign: 'center',
              marginVertical: 20,
            }}>
            Login to QuickTrans
          </Text>
          <Input
            w={{
              base: '75%',
              md: '25%',
            }}
            rounded={10}
            px={4}
            InputLeftElement={<Icon name="user" size={20} color="grey" />}
            onChangeText={username => setUsername(username)}
            placeholder="Email"
          />
          <Input
            w={{
              base: '75%',
              md: '25%',
            }}
            rounded={10}
            type={show ? 'text' : 'password'}
            InputLeftElement={<Icon name="lock1" size={20} color="grey" />}
            InputRightElement={
              <Icon
                name={show ? 'eye' : 'eyeo'}
                size={20}
                color="grey"
                onPress={() => setShow(!show)}
              />
            }
            placeholder="Password"
            onChangeText={password => setPassword(password)}
          />
          <Box alignItems="center">
            <TouchableOpacity
              onPress={login}
              style={{
                backgroundColor: '#005792',
                height: 45,
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                width: 270,
              }}>
              {isLoading ? (
                <Text
                  style={{
                    color: '#fff',
                    width: 200,
                    textAlign: 'center',
                    fontFamily: 'DMSans',
                  }}>
                  Loading...
                </Text>
              ) : (
                <Text
                  style={{
                    color: '#fff',
                    width: 200,
                    textAlign: 'center',
                    fontFamily: 'DMSans',
                  }}>
                  Login
                </Text>
              )}
            </TouchableOpacity>
            <View style={{display: 'flex', flexDirection: 'row', marginTop: 5}}>
              <Text
                style={{marginRight: 5, color: 'black', fontFamily: 'DMSans'}}>
                Dont have an account?
              </Text>
              <Text
                onPress={() => navigation.navigate('Register')}
                style={{color: 'red', fontFamily: 'DMSans'}}>
                Register
              </Text>
            </View>
          </Box>
        </Stack>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
