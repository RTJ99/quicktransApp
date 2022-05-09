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
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [tripData, setTripData] = useState('');
  const logout = () => {
    AsyncStorage.clear();
    navigation.navigate('Login');
  };
  const getUserInfo = async () => {
    let id = await AsyncStorage.getItem('id');
    axios
      .get(baseUrl + '/user/' + id)
      .then(function (response) {
        setTripData(response.data.rides[0]);

        setFrom(response.data.rides[0].pickup_point);
        setTo(response.data.rides[0].drop_off_location);
        // handle success
        console.log(response.data);
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
    getUserInfo();
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
        style={{borderRadius: 15}}>
        {/* <ImageBackground
          blurRadius={4}
          imageStyle={{borderRadius: 20}}
          style={[
            styles.nextRideContainer,
            {
              flex: 1,
              resizeMode: 'cover',
              justifyContent: 'center',
              color: 'white',
              paddingHorizontal: 20,
            },
          ]}
          source={bg}></ImageBackground> */}
      </Box>

      <Box
        w="90%"
        m="auto"
        mt="10px"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Box>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            bg="#f0f8ff"
            // borderColor="#57B7EB"
            borderRadius="15px"
            w="100px"
            h="90px"
            p="10px">
            <TouchableOpacity
              onPress={() => navigation.navigate('Offer Ride')}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name={'car'} color={'#57B7EB'} size={45} />
            </TouchableOpacity>
          </Box>
          <Text
            style={{
              marginTop: 10,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Offer Ride
          </Text>
        </Box>
        <Box>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            bg="#f0f8ff"
            // borderColor="#57B7EB"
            borderRadius="15px"
            w="100px"
            h="90px"
            p="10px">
            <TouchableOpacity
              onPress={() => navigation.navigate('Search Ride')}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name={'car-connected'} color={'#57B7EB'} size={45} />
            </TouchableOpacity>
          </Box>
          <Text
            style={{
              marginTop: 10,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Find Ride
          </Text>
        </Box>
        <Box>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            bg="#f0f8ff"
            // borderColor="#57B7EB"
            borderRadius="15px"
            w="100px"
            h="90px"
            p="10px">
            <TouchableOpacity
              onPress={() => navigation.navigate('Cars')}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name={'map-marker-star'} color={'#57B7EB'} size={45} />
            </TouchableOpacity>
          </Box>
          <Text
            style={{
              marginTop: 10,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Saved Places
          </Text>
        </Box>
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
          Rides
        </Text>
      </Box>
      <Box w="90%" m="auto" bg="#f0f8ff" borderRadius="15px" p="10px">
        {tripData ? (
          <>
            <Text style={{fontWeight: 'bold', fontSize: 14, color: '#57B7EB'}}>
              Next Ride
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 14}}>From: {from}</Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,

                marginBottom: 10,
              }}>
              To: {to}
            </Text>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Button
                onPress={() => navigation.navigate('Trip Details', {tripData})}>
                More Details
              </Button>
              <Button bg="amber.100" w="40%">
                Cancel
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
            No upcoming rides
          </Text>
        )}
        {/* </ImageBackground> */}
      </Box>
      {/* <Box
        bg="white"
        w="100%"
        overflow="hidden"
        borderColor="coolGray.200"
        p="5"
        shadow="md"
        style={[styles.elevation, {height: 210, borderRadius: 30}]}>
        <Button
          onPress={() => navigation.navigate('Offer Ride')}
          size="lg"
          style={styles.buttonStyle}
          leftIcon={<Icon name="cog-outline" type="Ionicons" color="white" />}
          colorScheme="#57B7EB">
          Offer Ride
        </Button>
        <Button
          onPress={() => navigation.navigate('Search Ride')}
          size="lg"
          style={styles.buttonStyle}
          leftIcon={<Icon name="cog-outline" type="Ionicons" color="white" />}
          colorScheme="#57B7EB">
          Find Ride
        </Button>
        <Button
          onPress={logout}
          size="lg"
          style={styles.buttonStyle}
          leftIcon={<Icon name="cog-outline" type="Ionicons" color="white" />}
          colorScheme="#57B7EB">
          Sign Out
        </Button>
      </Box> */}
    </ScrollView>
  );
};

export default HomeScreen;
