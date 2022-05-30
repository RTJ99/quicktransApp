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
import React, {useState, useEffect, useRef} from 'react';
import AppBar from '../components/AppBar';
import {styles} from '../style/index';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import axios from 'axios';
import {
  AddIcon,
  Box,
  MinusIcon,
  ScrollView,
  TextArea,
  useToast,
  Modal,
  Button,
  Center,
  Fab,
  Input,
  KeyboardAvoidingView,
} from 'native-base';
import placeholder from '../assets/img/placeholder-car.png';
import {preferencesList} from '../constants/preferences';
import MultiSelect from 'react-native-multiple-select';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import {offerRideService} from '../services';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import PlaceholderCar from '../components/PlaceholderCar';
import AutoComplete from '../components/AutoComplete';
import {baseUrl} from '../config/baseURL';
import Wizard from 'react-native-wizard';

const Register = ({navigation}) => {
  const height = Dimensions.get('window').height;
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
  const [emergencyContact, setEmergencyContact] = useState([]);
  const [ussuallCheckIn, setUssuallCheckIn] = useState('');
  const [ussuallDropOffLocation, setUssuallDropOffLocation] = useState([]);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const wizard = useRef();
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

  const login = async e => {
    console.log(data, 'dataaa');
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
    data.append('emergencyContact', emergencyContact);
    data.append('pickup_points', ussuallCheckIn);
    data.append('usuall_check_ins', ussuallDropOffLocation);

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

    fetch(baseUrl + '/user', requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result, 'result');
        setIsLoading(false);
        navigation.navigate('Login');
        toast.show({
          title: 'Operation Sucessfull',
          status: 'success',
          placement: 'top',
          description: 'Account Successfully Created',
        });
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
        toast.show({
          title: 'Operation Sucessfull',
          status: 'success',
          placement: 'top',
          description: 'Account Successfully Created',
        });
        navigation.navigate('Login');
      });
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

    // })
  };
  const timeout = () => {
    setIsLoading(false);
    toast.show({
      title: 'Server Connectivity Error',
      status: 'error',
      placement: 'top',
      description: 'Failed to communicate with server',
    });
  };
  const styles1 = StyleSheet.create({
    page: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    container: {
      height: 520,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },

    bottomSection: {
      // padding: 20,
      color: '#fff',
      height: 200,

      backgroundColor: '#161B1D',
    },
    bottomSectionBox: {
      backgroundColor: '#389D7B',
      width: 100,
      padding: 5,
      borderRadius: 5,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    search1: {
      flex: 1,
      width: 300,
      marginTop: 80,
      position: 'absolute',
      top: 20,
      elevation: 9,
    },
    search2: {
      flex: 1,
      width: 300,
      marginTop: 20,
      position: 'absolute',
      top: 20,
      elevation: 3,
    },
  });
  const stepList = [
    {
      content: (
        <ScrollView>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={keyboardVerticalOffset}>
            <Text
              style={{
                fontSize: 16,
                color: '#005792',
                fontFamily: 'Rubik-Bold',
                textAlign: 'center',
                marginTop: 20,
              }}>
              Personal Details
            </Text>
            <Box alignItems="center" style={{marginTop: 20}}>
              <Input
                placeholder="Name"
                style={{fontFamily: 'DMSans'}}
                w="320px"
                maxWidth="300px"
                borderColor={'#233b'}
                borderWidth={1}
                color="#000"
                onChangeText={username => setUsername(username)}
              />
            </Box>
            <Box alignItems="center" style={{marginTop: 20}}>
              <Input
                placeholder="Email"
                w="320px"
                maxWidth="300px"
                borderColor={'#233b'}
                borderWidth={1}
                color="#000"
                onChangeText={email => setEmail(email)}
              />
            </Box>
            <Box alignItems="center" style={{marginTop: 20}}>
              <Input
                type="number"
                placeholder="Phone Number"
                w="320px"
                maxWidth="300px"
                borderColor={'#233b'}
                borderWidth={1}
                color="#000"
                onChangeText={phone => setPhone(phone)}
              />
            </Box>
            <Box alignItems="center" style={{marginTop: 20}}>
              <Input
                placeholder="Address"
                w="320px"
                maxWidth="300px"
                borderColor={'#233b'}
                borderWidth={1}
                color="#000"
                onChangeText={address => setAddress(address)}
              />
            </Box>
          </KeyboardAvoidingView>
        </ScrollView>
      ),
    },
    {
      content: (
        <View style={styles1.page}>
          <View style={[styles1.search1, {marginTop: 120}]}>
            <GooglePlacesAutocomplete
              placeholder="Pick Up Location"
              fetchDetails={true}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true

                setUssuallCheckIn(data.structured_formatting.main_text);
              }}
              query={{
                key: 'AIzaSyCOqulxPGaTEOX6sP9TexQlZ7S2mC6KOxs',
                language: 'en',
              }}
              textInputProps={{
                placeholderTextColor: '#BABFC4',
              }}
              styles={{
                textInput: {
                  backgroundColor: '#F6F6F6',

                  borderColor: '#233b',
                  borderWidth: 1,
                },
              }}
            />
            {isLoading && <ActivityIndicator />}
          </View>
          <View style={[styles1.search2, {marginTop: 20}]}>
            <Text
              style={{
                fontSize: 16,
                color: '#005792',
                fontFamily: 'Rubik-Bold',
                textAlign: 'center',
                marginBottom: 10,
              }}>
              Drop off Location and Pickup Location
            </Text>
            <GooglePlacesAutocomplete
              placeholder="Drop Off Location"
              fetchDetails={true}
              onTimeout={timeout}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(details);

                setUssuallDropOffLocation(data.structured_formatting.main_text);
              }}
              query={{
                key: 'AIzaSyCOqulxPGaTEOX6sP9TexQlZ7S2mC6KOxs',
                language: 'en',
                components: 'country:zw',
              }}
              textInputProps={{
                placeholderTextColor: '#BABFC4',
              }}
              styles={{
                textInput: {
                  backgroundColor: '#F6F6F6',
                  borderColor: '#233b',
                  borderWidth: 1,
                },
              }}
            />
          </View>
        </View>
      ),
    },
    {
      content: (
        <ScrollView>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={keyboardVerticalOffset}>
            <Text
              style={{
                fontSize: 16,
                color: '#005792',
                fontFamily: 'Rubik-Bold',
                textAlign: 'center',
                marginTop: 20,
              }}>
              Other details
            </Text>

            <Box alignItems="center" style={{marginTop: 20}}>
              <Input
                placeholder="Emergency Contact Email"
                w="320px"
                maxWidth="300px"
                borderColor={'#233b'}
                borderWidth={1}
                color="#000"
                onChangeText={emergencyContact =>
                  setEmergencyContact(emergencyContact)
                }
              />
            </Box>
            <Box alignItems="center" style={{marginTop: 20}}>
              <Input
                type="password"
                placeholder="Password"
                w="320px"
                maxWidth="300px"
                borderColor={'#233b'}
                borderWidth={1}
                color="#000"
                onChangeText={password => setPassword(password)}
              />
            </Box>
            <Box alignItems="center" style={{marginTop: 20}}>
              <Input
                type="password"
                placeholder="Confirm Password"
                w="320px"
                maxWidth="300px"
                borderColor={'#233b'}
                borderWidth={1}
                color="#000"
                onChangeText={password => setPassword(password)}
              />
            </Box>
          </KeyboardAvoidingView>
        </ScrollView>
      ),
    },
    {
      content: (
        <ScrollView>
          <Text
            style={{
              fontSize: 16,
              color: '#005792',
              fontFamily: 'Rubik-Bold',
              textAlign: 'center',
              marginHorizontal: 20,
              marginVertical: 6,
            }}>
            Add your photo for safer smoother pickups
          </Text>

          <Box alignItems="center" mt={10} style={{marginRight: 5}}>
            <Text
              style={{
                fontSize: 13,
                color: '#005792',
                fontFamily: 'DMSans',
                textAlign: 'center',
                marginHorizontal: 20,
                marginBottom: 4,
              }}>
              Driver can only view your photo during pickup and will not be able
              to access it once the ride is completed
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: '#57B7EB',
                height: 50,

                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30,
                width: 250,
              }}
              onPress={handlePickImage}>
              <Text
                style={{
                  color: '#fff',
                  width: 200,
                  textAlign: 'center',
                  fontFamily: 'DMSans',
                }}>
                Click to Select a Picture
              </Text>
            </TouchableOpacity>
            {resourcePath !== 1 ? (
              <Image
                source={{uri: resourcePath}}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 200,
                  borderWidth: 1,
                  padding: 4,
                  borderColor: 'black',
                  marginTop: 20,
                }}
              />
            ) : (
              <></>
            )}
          </Box>
        </ScrollView>
      ),
    },
  ];

  return (
    <View bg="white" style={{height: height}}>
      <Text
        style={{
          fontFamily: 'DMSans',
          color: '#233b',
          marginTop: 10,
          textAlign: 'center',
        }}>
        Step {currentStep + 1} of 4
      </Text>
      <View style={{}}>
        <Wizard
          ref={wizard}
          steps={stepList}
          isFirstStep={val => setIsFirstStep(val)}
          isLastStep={val => setIsLastStep(val)}
          onNext={() => {
            console.log('Next Step Called');
          }}
          onPrev={() => {
            console.log('Previous Step Called');
          }}
          currentStep={({currentStep, isLastStep, isFirstStep}) => {
            setCurrentStep(currentStep);
          }}
        />
      </View>

      {!isFirstStep && (
        <Fab
          disabled={isFirstStep}
          renderInPortal={false}
          shadow={2}
          bg={'#005792'}
          size="sm"
          mb={70}
          placement="bottom-left"
          onPress={() => wizard.current.prev()}
          icon={<Icon name="arrowleft" size={20} color="white" />}
        />
      )}

      {!isLastStep && (
        <Fab
          disabled={isLastStep}
          renderInPortal={false}
          shadow={2}
          size="sm"
          bg={'#005792'}
          mb={70}
          placement="bottom-right"
          onPress={() => wizard.current.next()}
          icon={<Icon name="arrowright" size={20} color="white" />}
        />
      )}
      {isLastStep && (
        <Fab
          renderInPortal={false}
          shadow={2}
          size="md"
          bg={'#005792'}
          mb={70}
          w="150"
          placement="bottom-right"
          onPress={login}
          icon={<Icon name="rocket1" size={20} color="white" />}
          label={isLoading ? 'Loading...' : 'Register'}
        />
      )}
    </View>
  );
};

export default Register;
