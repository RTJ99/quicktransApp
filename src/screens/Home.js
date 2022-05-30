import {
  Box,
  Button,
  HamburgerIcon,
  Menu,
  useToast,
  Pressable,
  Divider,
} from 'native-base';
import React, {Component, useEffect, useState} from 'react';
import user from '../assets/user1.jpeg';
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
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
    // backgroundColor: '#005792',
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
    shadowColor: '#005792',
  },
  buttonStyle: {
    backgroundColor: '#005792',
    color: 'white',
    marginBottom: 20,
    paddingVertical: 20,
    fontSize: 16,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#005792',
    fontSize: 20,
    fontFamily: 'DMSans',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 90,
  },
  buttonOpen: {
    backgroundColor: '#005792',
  },
  buttonClose: {
    backgroundColor: '#005792',
  },
  textStyle: {
    color: 'white',
    fontFamily: 'DMSans',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 90,
    marginHorizontal: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

const HomeScreen = ({navigation}) => {
  const toast = useToast();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [tripData, setTripData] = useState('');
  const [passengers, setPassengers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [lastRideId, setLastRideId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [User, setUser] = useState(null);
  const [RideByMe, setRideByMe] = useState(null);
  const [Requests, setRequests] = useState(null);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const logout = () => {
    AsyncStorage.clear();
    navigation.navigate('Login');
  };

  const acceptRide = async id => {
    // e.preventDefault();
    // AsyncStorage.setItem("token", response.tokenObj.id_token);
    setIsLoading(true);
    const data = {
      id: lastRideId,
      userId: await AsyncStorage.getItem('id'),
    };

    console.log(data, 'dataaa');
    await fetch(baseUrl + '/offer-ride/accept-ride', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*', // It can be used to overcome cors errors
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.text())
      .then(async json => {
        setIsLoading(false);

        // storeUser(tokenRes.token);
        // console.log(await AsyncStorage.getItem('token'), 'resposnse token');
        //

        toast.show({
          title: 'Ride Accepted',
          status: 'success',
          placement: 'top',
          description: 'Ride Accepted',
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
  const getRides = async () => {
    let id = await AsyncStorage.getItem('id');

    axios
      .get(baseUrl + '/offer-ride/' + id)
      .then(function (response) {
        console.log(response.data, 'reshhhhhh1');
        // getPassengers(response.data._id);
        // setLastRideId(response.data._id);
        // setTripData(response.data);

        // setFrom(response.data.pickup_point);
        // setTo(response.data.drop_off_location);
        // setPassengers(response.data.passengers);
        // handle success
        console.log(response.data, 'res');
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  const getUserInfo = async () => {
    let id = await AsyncStorage.getItem('id');
    axios
      .get(baseUrl + '/user/' + id)
      .then(function (response) {
        setUser(response.data);
        /*  getPassengers(response.data._id);
        setLastRideId(response.data._id);
        setTripData(response.data);

        setFrom(response.data.pickup_point);
        setTo(response.data.drop_off_location);
        setPassengers(response.data.passengers); */
        // handle success
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  const AcceptRide = async (rideid, pass, status) => {
    setAcceptLoading(true);

    let id = await AsyncStorage.getItem('id');
    axios
      .post(baseUrl + '/offer-ride/accept-ride', {
        userId: id,
        id: rideid,
        passengerid: pass,
        status: status,
      })
      .then(function (response) {
        setAcceptLoading(false);
        setUser(response.data);
      })
      .catch(function (error) {
        // handle error
        setAcceptLoading(false);
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const Unbook = async rideid => {
    console.log('rideid');
    setCanceling(true);

    let id = await AsyncStorage.getItem('id');
    axios
      .post(baseUrl + '/offer-ride/unbook', {
        userId: id,
        id: rideid,
      })
      .then(function (response) {
        setCanceling(false);
      })
      .catch(function (error) {
        // handle error
        setCanceling(false);
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  const getRidebyMe = async () => {
    let id = await AsyncStorage.getItem('id');
    axios
      .get(baseUrl + '/offer-ride/rideby/' + id)
      .then(function (response) {
        setRideByMe(response.data);
        const arr = [];
        response.data.forEach(item => {
          if (item.passengers.length > 0) {
            arr.push(item);
          }
        });
        setRequests(arr);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  const getPassengers = async id => {
    axios
      .get(baseUrl + '/offer-ride/passengers/' + id)
      .then(function (response) {
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
  const isVisible = useIsFocused();
  useEffect(() => {
    if (isVisible) {
      console.log('called when screen open or when back on screen ');
      getUserInfo();
      getRidebyMe();
    }
  }, []);
  const [showToast, setShowToast] = useState(false);
  const height = Dimensions.get('window').height;
  const simulateAccept = () => {
    alert('Trip accepted');
  };
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
            color: '#233b',
            fontFamily: 'Rubik-Bold',
            fontSize: 25,
          }}>
          Welcome to Quick Trans
        </Text>
      </Box>

      <Box
        w="90%"
        m="auto"
        mt="20px"
        mb={10}
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
            // borderColor="#005792"
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
              <Icon name={'car'} color={'#005792'} size={45} />
            </TouchableOpacity>
          </Box>
          <Text
            style={{
              marginTop: 10,
              fontFamily: 'DMSans',
              textAlign: 'center',
              color: '#233b',
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
            // borderColor="#005792"
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
              <Icon name={'car-connected'} color={'#005792'} size={45} />
            </TouchableOpacity>
          </Box>
          <Text
            style={{
              marginTop: 10,
              fontFamily: 'DMSans',
              textAlign: 'center',
              color: '#233b',
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
            // borderColor="#005792"
            borderRadius="15px"
            w="100px"
            h="90px"
            p="10px">
            <TouchableOpacity
              onPress={() => navigation.navigate('Suggested Cars')}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name={'map-marker-star'} color={'#005792'} size={45} />
            </TouchableOpacity>
          </Box>
          <Text
            style={{
              marginTop: 10,
              fontFamily: 'DMSans',
              textAlign: 'center',
              color: '#233b',
            }}>
            Suggested Cars
          </Text>
        </Box>
      </Box>

      {/* CREATED RIDES */}

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
          Rides Created
        </Text>
        <TouchableOpacity
          onPress={async () => {
            await getUserInfo();
            await getRidebyMe();
          }}>
          <Icon name="refresh" size={20} color="gray" />
        </TouchableOpacity>
      </Box>
      <Box w="95%" m="auto" borderRadius="15px" p="10px">
        {RideByMe && RideByMe.length > 0 ? (
          RideByMe.map((item, index) => (
            <View
              key={index}
              style={{
                padding: 10,
                borderRadius: 10,
              }}>
              <Divider my="2" bg={'#BABFC4'} />

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Rubik-Bold',
                      fontSize: 14,
                      marginBottom: 15,
                      color: '#233b',
                    }}>
                    From: {item.pickup_point}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Rubik-Bold',
                      fontSize: 14,
                      color: '#233b',
                      marginBottom: 10,
                    }}>
                    To: {item.drop_off_location}
                  </Text>
                </View>
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <Button
                    p={1}
                    my={1}
                    onPress={() =>
                      navigation.navigate('Trip Details', {RideId: item.id})
                    }>
                    <Text style={{fontFamily: 'DMSans', color: 'white'}}>
                      {' '}
                      More Details
                    </Text>
                  </Button>
                  <Button p={1} my={1} style={{backgroundColor: '#de1538'}}>
                    <Text style={{fontFamily: 'DMSans', color: 'white'}}>
                      {' '}
                      Cancel
                    </Text>
                  </Button>
                </Box>
              </View>

              <Divider my="2" bg={'#BABFC4'} />
            </View>
          ))
        ) : (
          <Text
            style={{
              fontSize: 22,
              color: '#c4c3d0',
              textAlign: 'center',
              fontFamily: 'DMSans',
            }}>
            No Created rides
          </Text>
        )}
        {/* </ImageBackground> */}
      </Box>

      {/* BOOKED RIDES */}

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
          Rides Booked
        </Text>
        <TouchableOpacity
          onPress={async () => {
            await getUserInfo();
            await getRidebyMe();
          }}>
          <Icon name="refresh" size={20} color="gray" />
        </TouchableOpacity>
      </Box>
      {isLoading ? (
        <Text style={{fontSize: 15, fontFamily: 'DMSans', color: '#005792'}}>
          Loading ...
        </Text>
      ) : (
        <Box w="95%" m="auto" borderRadius="15px" p="10px">
          {User && User.booked_rides?.length > 0 ? (
            User.booked_rides?.map((item, index) => (
              <View
                key={index}
                style={{
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Divider my="2" bg={'#BABFC4'} />

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Rubik-Bold',
                        fontSize: 14,
                        marginBottom: 15,
                        color: '#233b',
                      }}>
                      From: {item.from}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Rubik-Bold',
                        fontSize: 14,
                        color: '#233b',
                        marginBottom: 10,
                      }}>
                      To: {item.to}
                    </Text>
                  </View>
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <Button
                      p={1}
                      my={1}
                      onPress={() =>
                        navigation.navigate('Trip Details', {RideId: item.id})
                      }>
                      <Text style={{fontFamily: 'DMSans', color: 'white'}}>
                        {' '}
                        More Details
                      </Text>
                    </Button>
                    <Button
                      onPress={() => {
                        Unbook(item.id);
                      }}
                      p={1}
                      my={1}
                      style={{backgroundColor: '#de1538'}}>
                      <Text style={{fontFamily: 'DMSans', color: 'white'}}>
                        {' '}
                        {canceling ? 'Loading ..' : 'Cancel'}
                      </Text>
                    </Button>
                  </Box>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  {/* <Icon name="alpha-b-circle" size={30} color="gray" /> */}
                  <Text>Status</Text>
                  <Text
                    style={{
                      fontFamily: 'OpenSans',
                      fontSize: 14,
                      color: 'orange',
                      marginBottom: 10,
                    }}>
                    {item.status}
                  </Text>
                </View>

                <Divider my="2" bg={'#BABFC4'} />
              </View>
            ))
          ) : (
            <Text
              style={{
                fontSize: 22,
                color: '#c4c3d0',
                textAlign: 'center',

                fontFamily: 'DMSans',
              }}>
              No Booked rides
            </Text>
          )}
          {/* </ImageBackground> */}
        </Box>
      )}

      {/* REQUESTS */}
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
          Requests
        </Text>
        <TouchableOpacity onPress={() => getUserInfo()}>
          <Icon name="refresh" size={20} color="gray" />
        </TouchableOpacity>
      </Box>
      <Box w="95%" m="auto" borderRadius="15px" p="10px">
        {Requests && Requests.length > 0 ? (
          Requests.map((item, index) => (
            <View
              key={index}
              style={{
                padding: 10,
                borderRadius: 10,
              }}>
              {item.passengers.map((passenger, i) => {
                return passenger.status == 'pending' ? (
                  <Box
                    key={index}
                    w="100%"
                    m="auto"
                    my="20px"
                    bg="#f0f8ff"
                    p="3"
                    h="60px"
                    style={{
                      borderRadius: 5,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Rubik-Bold',
                        fontSize: 15,
                        marginBottom: 10,
                        color: '#233b',
                      }}>
                      {passenger.name}
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: 170,
                      }}>
                      <TouchableOpacity
                        style={{
                          color: '#fff',
                          backgroundColor: '#005792',
                          padding: 6,

                          borderRadius: 5,
                        }}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={{color: '#fff'}}>Details</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          color: '#fff',
                          backgroundColor: '#005792',
                          padding: 6,

                          borderRadius: 5,
                        }}
                        onPress={() =>
                          AcceptRide(item._id, passenger.id, 'accept')
                        }>
                        <Text style={{color: '#fff'}}>
                          {acceptLoading ? 'Loading...' : 'Accept'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          color: '#fff',
                          backgroundColor: '#de1738',
                          padding: 6,

                          borderRadius: 5,
                        }}
                        onPress={() =>
                          AcceptRide(item._id, passenger.id, 'reject')
                        }>
                        <Text style={{color: '#fff'}}>
                          {acceptLoading ? 'Loading...' : 'Reject'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                      }}>
                      <View style={styles.centeredView}>
                        <View style={[styles.modalView]}>
                          <View style={styles.modalText}>
                            <Text
                              style={{
                                fontFamily: 'Rubik-Bold',
                                fontSize: 20,
                                marginBottom: 10,
                                color: '#233b',
                              }}>
                              Ride Request
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'DMSans',
                                fontSize: 18,
                                marginBottom: 1,
                                color: '#233b',
                              }}>
                              {passenger.name} Needs {passenger.seats} seat/s
                            </Text>

                            <Image
                              source={{uri: passenger.picture}}
                              style={{
                                width: 100,
                                height: 100,

                                marginVertical: 20,
                                borderRadius: 50,
                              }}
                            />
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: 150,
                              }}>
                              <TouchableOpacity
                                style={{
                                  color: '#fff',
                                  backgroundColor: '#005792',
                                  padding: 6,
                                  margin: 2,
                                  borderRadius: 5,
                                }}
                                onPress={() =>
                                  AcceptRide(item._id, passenger.id, 'accept')
                                }>
                                <Text style={{color: '#fff'}}>
                                  {acceptLoading ? 'Loading...' : 'Accept'}
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={{
                                  color: '#fff',
                                  backgroundColor: '#de1738',
                                  padding: 6,
                                  margin: 2,
                                  borderRadius: 5,
                                }}
                                onPress={() =>
                                  AcceptRide(item._id, passenger.id, 'reject')
                                }>
                                <Text style={{color: '#fff'}}>
                                  {acceptLoading ? 'Loading...' : 'Reject'}
                                </Text>
                              </TouchableOpacity>
                              <Pressable
                                style={{
                                  color: '#fff',
                                  backgroundColor: '#555555',
                                  padding: 6,
                                  margin: 2,
                                  borderRadius: 5,
                                }}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Close</Text>
                              </Pressable>
                            </View>
                          </View>

                          <Box style={[styles.itemsContainer]}>
                            <TouchableOpacity
                              style={styles.datePicker}
                              onPress={() => setShowTime(true)}>
                              <Text style={styles.secondaryTextColor}>
                                {' '}
                                To:
                              </Text>
                            </TouchableOpacity>
                          </Box>
                        </View>
                      </View>
                    </Modal>
                  </Box>
                ) : (
                  <></>
                );
              })}
            </View>
          ))
        ) : (
          <Text
            style={{
              fontSize: 22,
              color: '#c4c3d0',
              textAlign: 'center',
              fontFamily: 'DMSans',
            }}>
            No Requests
          </Text>
        )}
        {/* </ImageBackground> */}
      </Box>

      {tripData ? (
        <Box w="90%" m="auto" bg="#f0f8ff" borderRadius="15px" p="10px">
          <>
            <Text
              style={{fontFamily: 'DMSans', fontSize: 14, color: '#005792'}}>
              Passengers
            </Text>
            <Text style={{fontFamily: 'DMSans', fontSize: 14}}>
              From: {from}
            </Text>
            <Text
              style={{
                fontFamily: 'DMSans',
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

          {/* </ImageBackground> */}
        </Box>
      ) : null}
    </ScrollView>
  );
};

export default HomeScreen;
