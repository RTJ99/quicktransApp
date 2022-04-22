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
  Input,
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
import {Icon} from 'native-base';
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
        AsyncStorage.setItem('phone', decodedToken.phone.toString());
        // AsyncStorage.setItem('pickup_points', decodedToken.pickup_points);

        toast.show({
          title: 'Login Sucessfull',
          status: 'success',
          placement: 'top',
          description: 'Welcome' + ' ' + (await AsyncStorage.getItem('name')),
        });
        navigation.navigate('Main');
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
        <View style={{display: 'flex', alignItems: 'center', marginTop: 40}}>
          <Image
            style={{width: 200, height: 200, margin: 'auto'}}
            source={logo}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#57B7EB',
            textAlign: 'center',
          }}>
          Login
        </Text>

        <Box alignItems="center" style={{marginTop: 20}}>
          <Input
            type="email"
            placeholder="Email"
            w="100%"
            maxWidth="300px"
            variant="underlined"
            color="#000"
            onChangeText={username => setUsername(username)}
          />
        </Box>

        <Box alignItems="center" style={{marginTop: 20}}>
          <Input
            type="password"
            placeholder="Password"
            w="100%"
            maxWidth="300px"
            variant="underlined"
            color="#000"
            onChangeText={password => setPassword(password)}
          />
        </Box>
        <Box alignItems="center" style={{marginTop: 20}}>
          <TouchableOpacity
            onPress={login}
            style={[styles.primaryButton, {width: 100}]}>
            <Text
              style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>
              Login
            </Text>
          </TouchableOpacity>
          <View style={{display: 'flex', flexDirection: 'row', marginTop: 5}}>
            <Text style={{marginRight: 5}}>Dont have an account?</Text>
            <Text
              onPress={() => navigation.navigate('Register')}
              style={{color: 'red'}}>
              Register
            </Text>
          </View>
        </Box>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
