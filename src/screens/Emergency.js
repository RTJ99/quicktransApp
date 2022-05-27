import {Box, Button, HamburgerIcon, Menu, Pressable} from 'native-base';
import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  ScrollView,
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
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [tripData, setTripData] = useState('');
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
        my="10px"
        bg="#57B7EB"
        h="120px"
        style={{
          borderRadius: 15,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 25,
          }}>
          Welcome to Quick Trans
        </Text>
      </Box>

      <Box
        w="90%"
        m="auto"
        my="20px"
        bg="#f0f8ff"
        p="3"
        h="50px"
        style={{borderRadius: 5}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#57B7EB'}}>
          Emergency Contacts
        </Text>
      </Box>
      <Box w="90%" m="auto" bg="#f0f8ff" borderRadius="15px" p="10px">
        {emergencyContacts ? (
          <>
            <Text style={{fontWeight: 'bold', fontSize: 14, color: '#57B7EB'}}>
              Next Ride
            </Text>

            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Button
                onPress={() => navigation.navigate('Trip Details', {tripData})}>
                Alert
              </Button>
              <Button bg="amber.100" w="40%">
                Remove
              </Button>
            </Box>
          </>
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
    </ScrollView>
  );
};

export default HomeScreen;
