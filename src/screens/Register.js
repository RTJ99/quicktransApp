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
import {styles} from '../style/index';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import axios from 'axios';
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
import placeholder from '../assets/img/placeholder-car.png';
import {preferencesList} from '../constants/preferences';
import MultiSelect from 'react-native-multiple-select';
import {Icon} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import {offerRideService} from '../services';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import PlaceholderCar from '../components/PlaceholderCar';
import AutoComplete from '../components/AutoComplete';
import {baseUrl} from '../config/baseURL';

const Register = ({navigation}) => {
  const keyboardVerticalOffset = Platform.OS === 'android' ? 40 : 0;
  const toast = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [picture, setPicture] = useState('');
  const [resourcePath, setResourcePath] = useState(placeholder);
  const [pictureFile, setPictureFile] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePickImage = async () => {
    const result = await launchImageLibrary();
    setResourcePath(result.assets[0].uri);
    setPictureFile(result);
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        handleTakePic();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const postData = async (url, data) => {
    const response = await fetch(url, {
      method: 'POST',
      body: data,
    });
    return response.json();
  };
  const login = async e => {
    // e.preventDefault();
    // localStorage.setItem("token", response.tokenObj.id_token);
    setIsLoading(true);
    const data = new FormData();
    data.append('name', username);
    data.append('email', email);
    data.append('password', password);
    data.append('picture', pictureFile);
    data.append('image', {
      uri: resourcePath,
      name: 'SomeImageName.jpg',
      type: 'image/jpg',
    });
    data.append('address', address);
    data.append('phone', phone);

    console.log(data, 'dataaa');
    const url = baseUrl + '/user';
    // postData(url, data).then(response => {
    //   console.log(response, 'res[p');
    // });
    var requestOptions = {
      method: 'POST',
      body: data,
      redirect: 'follow',
    };

    fetch('http://172.16.9.75:5000/user', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    // const response = await fetch(baseUrl + '/user', {
    //   method: 'POST',
    //   body: data,
    // });
    // console.log(response, 'res');
    // .then(response => {
    //   console.log(response.data, 'dhhhhhhh');
    // })
    // .then(json => {
    //   // console.log(json, 'json');
    //   setIsLoading(false);

    //   toast.show({
    //     title: 'Operation Sucessfull',
    //     status: 'success',
    //     placement: 'top',
    //     description: 'Ride has been successfully added',
    //   });
    //   navigation.navigate('Home');
    // })
    // .catch(error => {
    //   console.error(error);
    //   setIsLoading(false);
    //   toast.show({
    //     title: 'Server Connectivity Error',
    //     status: 'error',
    //     placement: 'top',
    //     description: 'Failed to communicate with server',
    //   });
    // });
  };

  return (
    <ScrollView bg="white" h="100%">
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#57B7EB',
          textAlign: 'center',
          marginTop: 40,
        }}>
        Register
      </Text>
      <Box alignItems="center" style={{marginTop: 20}}>
        <Input
          placeholder="Name"
          w="100%"
          maxWidth="300px"
          variant="underlined"
          color="#000"
          onChangeText={username => setUsername(username)}
        />
      </Box>
      <Box alignItems="center" style={{marginTop: 20}}>
        <Input
          placeholder="Email"
          w="100%"
          maxWidth="300px"
          variant="underlined"
          color="#000"
          onChangeText={email => setEmail(email)}
        />
      </Box>
      <Box alignItems="center" style={{marginTop: 20}}>
        <Input
          type="number"
          placeholder="Phone Number"
          w="100%"
          maxWidth="300px"
          variant="underlined"
          color="#000"
          onChangeText={phone => setPhone(phone)}
        />
      </Box>
      <Box alignItems="center" style={{marginTop: 20}}>
        <Input
          placeholder="Address"
          w="100%"
          maxWidth="300px"
          variant="underlined"
          color="#000"
          onChangeText={address => setAddress(address)}
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
        <Input
          type="password"
          placeholder="Confirm Password"
          w="100%"
          maxWidth="300px"
          variant="underlined"
          color="#000"
          onChangeText={password => setPassword(password)}
        />
      </Box>
      <Box
        alignItems="center"
        style={[styles.itemsContainer, {marginRight: 5}]}>
        <TouchableOpacity onPress={handlePickImage} style={[styles.datePicker]}>
          <Text style={[styles.secondaryTextColor, {fontWeight: 'bold'}]}>
            Select Picture
          </Text>
        </TouchableOpacity>
        {resourcePath !== 1 ? (
          <Image
            source={{uri: resourcePath}}
            style={{width: 280, height: 300}}
          />
        ) : (
          <PlaceholderCar />
        )}
      </Box>
      <Box alignItems="center" style={{marginTop: 20, marginBottom: 20}}>
        <TouchableOpacity
          onPress={login}
          style={[styles.primaryButton, {width: 100}]}>
          <Text
            style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>
            {isLoading ? 'Loading..' : 'Register'}
          </Text>
        </TouchableOpacity>
      </Box>
    </ScrollView>
  );
};

export default Register;
