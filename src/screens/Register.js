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
import Wizard from 'react-native-wizard';

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
                color: '#2C3539',
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 20,
              }}>
              Personal Details
            </Text>
            <Box alignItems="center" style={{marginTop: 20}}>
              <Input
                placeholder="Name"
                w="320px"
                maxWidth="300px"
                variant="underlined"
                color="#000"
                onChangeText={username => setUsername(username)}
              />
            </Box>
            <Box alignItems="center" style={{marginTop: 20}}>
              <Input
                placeholder="Email"
                w="320px"
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
                w="320px"
                maxWidth="300px"
                variant="underlined"
                color="#000"
                onChangeText={phone => setPhone(phone)}
              />
            </Box>
            <Box alignItems="center" style={{marginTop: 20}}>
              <Input
                placeholder="Address"
                w="320px"
                maxWidth="300px"
                variant="underlined"
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
              placeholder="Ussual Pick Up Location"
              fetchDetails={true}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true

                setUssuallCheckIn(data.structured_formatting.main_text);
              }}
              query={{
                key: 'AIzaSyCOqulxPGaTEOX6sP9TexQlZ7S2mC6KOxs',
                language: 'en',
              }}
              styles={{
                textInput: {
                  backgroundColor: '#F8FAFC',
                  borderColor: '#F1F6FE',

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
                color: '#2C3539',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Ussuall Drop off Location and Pickup Location{' '}
            </Text>
            <GooglePlacesAutocomplete
              placeholder="Ussuall Drop Off Location"
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
              styles={{
                textInput: {
                  backgroundColor: '#F8FAFC',
                  borderColor: '#F1F6FE',

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
                color: '#2C3539',
                fontWeight: 'bold',
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
                variant="underlined"
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
                variant="underlined"
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
                variant="underlined"
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
              color: '#2C3539',
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 20,
            }}>
            Profile Picture
          </Text>
          <Box
            alignItems="center"
            style={[styles.itemsContainer, {marginRight: 5}]}>
            <TouchableOpacity
              onPress={handlePickImage}
              style={[styles.datePicker]}>
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
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                {isLoading ? 'Loading..' : 'Register'}
              </Text>
            </TouchableOpacity>
          </Box>
        </ScrollView>
      ),
    },
  ];

  return (
    <View bg="white" h="100%">
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          backgroundColor: '#FFF',
          borderBottomColor: '#dedede',
          borderBottomWidth: 1,
          padding: 4,
        }}>
        {!isFirstStep && (
          <Button
            style={{height: 40}}
            disabled={isFirstStep}
            onPress={() => wizard.current.prev()}>
            <Text style={{color: 'white'}}>Prev</Text>
          </Button>
        )}
        <Text style={{fontWeight: 'bold', marginTop: 10, textAlign: 'center'}}>
          Step {currentStep + 1} of 4
        </Text>
        {!isLastStep && (
          <Button
            style={{height: 40}}
            disabled={isLastStep}
            onPress={() => wizard.current.next()}>
            <Text style={{color: 'white'}}>Next</Text>
          </Button>
        )}
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
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
    </View>
  );
};

export default Register;
