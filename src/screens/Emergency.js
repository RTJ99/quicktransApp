import {
  Box,
  Button,
  FormControl,
  HamburgerIcon,
  Input,
  Menu,
  Modal,
  Pressable,
  useToast,
  Fab,
} from 'native-base';
import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AutoComplete from '../components/AutoComplete';
import MapContainer from '../components/MapContainer/index';
import Home from '../routes/Home/components/Home';
import bg from '../assets/img/bg.jpg';
import {useApiRequest} from '../services/Axios/AxiosGet';
import {baseUrl} from '../config/baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Header from '../components/HeaderComponent';
import Geolocation from '@react-native-community/geolocation';
import SendSMS from 'react-native-sms';
import {NativeModules} from 'react-native';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000000',
  },
  container: {
    height: 520,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
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
  search: {
    flex: 1,
    width: 300,
    marginTop: 20,
    position: 'absolute',
    top: 20,
    zIndex: 5,
  },
  nextRideContainer: {
    borderRadius: 40,
    marginTop: 10,
    // backgroundColor: '#57B7EB',
    height: 150,
    // paddingTop: 60,
  },
  homeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    // padding: 10,
    color: 'white',
  },
  elevation: {
    elevation: 5,
    shadowColor: '#57B7EB',
  },
  buttonStyle: {
    backgroundColor: '#57B7EB',
    color: 'white',
    marginBottom: 20,
    paddingVertical: 20,
    fontSize: 16,
  },
});

const HomeScreen = ({navigation}) => {
  let DirectSms = NativeModules.DirectSms;
  const toast = useToast();

  const [showModal, setShowModal] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [emergencyContact, setEmergencyContact] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [mobileNumber, setMobileNumber] = useState('0784675999');
  const [bodySMS, setBodySMS] = useState(
    'Please follow https://aboutreact.com',
  );

  const getOneTimeLocation = () => {
    return Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        console.log(currentLatitude);
        return {
          currentLatitude,
          currentLongitude,
        };
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const sendDirectSms = async () => {
    Geolocation.getCurrentPosition(async res => {
      const body = `https://www.google.com/maps/@${res.coords.latitude},${res.coords.longitude},20z/data=!3m1!4b1!4m5!3m4!1s0x1931a437ad96167b:0xe91b065f2baed9ba!8m2!3d${res.coords.latitude}!4d${res.coords.longitude}`;
      if (mobileNumber) {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.SEND_SMS,
            {
              title: 'Send SMS App Sms Permission',
              message:
                'Send SMS App needs access to your inbox ' +
                'so you can send messages in background.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            DirectSms.sendDirectSms(mobileNumber, body);
            alert('SMS sent');
          } else {
            alert('SMS permission denied');
          }
        } catch (error) {
          console.warn(error);
          alert(error);
        }
      }
    });
  };
  const handleUpload = async e => {
    let driverId = await AsyncStorage.getItem('id');

    // e.preventDefault();
    // localStorage.setItem("token", response.tokenObj.id_token);
    setIsLoading(true);
    const data = JSON.stringify({
      email: emergencyContact,
      userId: driverId,
    });

    console.log(data, 'dataaa');
    await fetch(baseUrl + '/emergency-contact', {
      method: 'POST',
      body: data,
      redirect: 'follow',
      headers: {
        Accept: 'application/json, text/plain, */*', // It can be used to overcome cors errors
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log(data, 'dataaa');
        console.log(json, 'json');
        setIsLoading(false);
        toast.show({
          title: 'Operation Sucessfull',
          status: 'success',
          placement: 'top',
          description: 'Ride has been successfully added',
        });
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);

        toast.show({
          title: 'Server Connectivity Error',
          status: 'error',
          placement: 'top',
          description: 'Failed to communicate with server',
        });
      });
  };
  const logout = () => {
    AsyncStorage.clear();
    navigation.navigate('Login');
  };
  const emergencies = async () => {
    let id = await AsyncStorage.getItem('id');
    axios
      .get(baseUrl + '/emergency-contact')
      .then(function (response) {
        setEmergencyContacts(response.data);
        console.log(response.data, 'haa');
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  useEffect(() => {
    emergencies();
  }, []);
  const height = Dimensions.get('window').height;
  return (
    <View style={{height: height}}>
      <ScrollView style={[{backgroundColor: 'white', height: height}]}>
        <Header logout={logout} />
        {/* <MapView
        style={styles.map}
        userLocationUpdateInterval={5000}
        loadingEnabled={true}
        region={{
          latitude: -17.824858,
          longitude: 31.053028,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}

        <Box
          w="90%"
          m="auto"
          my="20px"
          bg="#f0f8ff"
          p="3"
          h="50px"
          style={{
            borderRadius: 5,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 20, fontFamily: 'DMSans', color: '#005792'}}>
            Emergency Contacts
          </Text>
          <TouchableOpacity
            onPress={async () => {
              await emergencies();
            }}>
            <Box
              w="55px"
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Icon
                onPress={() => setShowModal(true)}
                name="plus"
                size={20}
                color="gray"
              />
              <Icon name="refresh" size={20} color="gray" />
            </Box>
          </TouchableOpacity>
        </Box>
        <Box w="90%" m="auto" bg="#f0f8ff" borderRadius="15px" p="10px">
          {emergencyContacts ? (
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{fontWeight: 'bold', fontSize: 14, color: '#57B7EB'}}>
                Next Ride
              </Text>

              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: 60,
                  justifyContent: 'space-between',
                }}>
                <Icon name="alert-circle-outline" size={20} color="red" />
                <Icon name="delete-outline" size={20} color="red" />
              </Box>
            </Box>
          ) : (
            <Text
              style={{
                fontSize: 22,
                color: '#c4c3d0',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              No Emergency contacts
            </Text>
          )}
          {/* </ImageBackground> */}
        </Box>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Add Emergency Contact</Modal.Header>
            <Modal.Body>
              <FormControl mt="3">
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  placeholder="Emergency Contact Email"
                  color="#000"
                  onChangeText={emergencyContact =>
                    setEmergencyContact(emergencyContact)
                  }
                />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}>
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    handleUpload();
                  }}>
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </ScrollView>
      <Fab
        renderInPortal={false}
        shadow={2}
        size="md"
        bg={'#005792'}
        mb={70}
        w="150"
        placement="bottom-right"
        onPress={sendDirectSms}
        icon={<Icon name="alert" size={20} color="white" />}
        label={'Alert All'}
      />
    </View>
  );
};

export default HomeScreen;
