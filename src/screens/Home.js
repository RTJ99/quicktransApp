import {
  Box,
  Button,
  HamburgerIcon,
  Menu,
  useToast,
  Pressable,
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

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#57B7EB',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 90,
  },
  buttonOpen: {
    backgroundColor: '#57B7EB',
  },
  buttonClose: {
    backgroundColor: '#57B7EB',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
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
      .get(baseUrl + '/user/last-ride/' + id)
      .then(function (response) {
        console.log(response.data, 'res1');
        getPassengers(response.data._id);
        setLastRideId(response.data._id);
        setTripData(response.data);

        setFrom(response.data.pickup_point);
        setTo(response.data.drop_off_location);
        setPassengers(response.data.passengers);
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
      getRides();
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
        bg="#57B7EB"
        h="120px"
        style={{
          borderRadius: 15,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {showToast
          ? toast.show({
              title: 'Ride Accepted',
              status: 'success',
              placement: 'top',
              description: 'Ride Accepted',
            })
          : null}
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 25,
          }}>
          Welcome to Quick Trans
        </Text>
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
        style={{
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#57B7EB'}}>
          Rides
        </Text>
        <TouchableOpacity onPress={() => getRides()}>
          <Text>Refresh</Text>
        </TouchableOpacity>
      </Box>
      <Box w="90%" m="auto" bg="#f0f8ff" borderRadius="15px" p="10px">
        <Text style={{fontWeight: 'bold', fontSize: 14, color: '#57B7EB'}}>
          Next Ride
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 14}}>
          From: Kaguvi Street
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 14,

            marginBottom: 10,
          }}>
          To: Nehanda Street
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

        {/* </ImageBackground> */}
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
        ) : // <Text
        //   style={{
        //     fontSize: 22,
        //     color: '#c4c3d0',
        //     textAlign: 'center',
        //     fontWeight: 'bold',
        //   }}>
        //   No upcoming rides
        // </Text>
        null}
        {/* </ImageBackground> */}
      </Box>
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
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#57B7EB'}}>
          Requests
        </Text>
        <TouchableOpacity onPress={() => getUserInfo()}>
          <Text>Refresh</Text>
        </TouchableOpacity>
      </Box>
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
        <Text style={{color: '#57B7EB'}}>Tawanda Nhamo</Text>
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
              backgroundColor: '#57B7EB',
              padding: 2,
              borderRadius: 5,
            }}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={{color: '#fff'}}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              color: '#fff',
              backgroundColor: '#57B7EB',
              padding: 2,
              borderRadius: 5,
            }}
            onPress={() => alert('Trip Accepted')}>
            <Text style={{color: '#fff'}}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              color: '#fff',
              backgroundColor: '#de1738',
              padding: 2,
              borderRadius: 5,
            }}
            onPress={() => alert('Trip Rejected')}>
            <Text style={{color: '#fff'}}>Reject</Text>
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
                <Text>Pasenger Details</Text>
                <Text>Tawanda Nhamo</Text>
                <Image
                  source={require('../assets/user1.jpeg')}
                  style={{
                    width: 100,
                    height: 100,

                    marginTop: 10,
                    marginBottom: 10,
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
                      backgroundColor: '#57B7EB',
                      padding: 2,
                      borderRadius: 5,
                    }}
                    onPress={() => alert('Trip Accepted')}>
                    <Text style={{color: '#fff'}}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      color: '#fff',
                      backgroundColor: '#de1738',
                      padding: 2,
                      borderRadius: 5,
                    }}
                    onPress={() => simulateAccept()}>
                    <Text style={{color: '#fff'}}>Reject</Text>
                  </TouchableOpacity>
                  <Pressable
                    style={{backgroundColor: '#555555'}}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                </View>
              </View>

              <Box style={[styles.itemsContainer]}>
                <TouchableOpacity
                  style={styles.datePicker}
                  onPress={() => setShowTime(true)}>
                  <Text style={styles.secondaryTextColor}> To:</Text>
                </TouchableOpacity>
              </Box>
            </View>
          </View>
        </Modal>
      </Box>
      {passengers.map((passenger, index) => {
        return (
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
            <Text style={{color: '#57B7EB'}}>{passenger}</Text>
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
                  backgroundColor: '#57B7EB',
                  padding: 2,
                  borderRadius: 5,
                }}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{color: '#fff'}}>Details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  color: '#fff',
                  backgroundColor: '#57B7EB',
                  padding: 2,
                  borderRadius: 5,
                }}
                onPress={() => simulateAccept()}>
                <Text style={{color: '#fff'}}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  color: '#fff',
                  backgroundColor: '#de1738',
                  padding: 2,
                  borderRadius: 5,
                }}
                onPress={() => simulateAccept()}>
                <Text style={{color: '#fff'}}>Reject</Text>
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
                    <Text>Pasenger Details</Text>
                    <Text>{passenger}</Text>
                    <Image
                      source={{uri: passenger.picture}}
                      style={{
                        width: 100,
                        height: 100,

                        marginTop: 60,
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
                          backgroundColor: '#57B7EB',
                          padding: 2,
                          borderRadius: 5,
                        }}
                        onPress={() => getUserInfo()}>
                        <Text style={{color: '#fff'}}>Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          color: '#fff',
                          backgroundColor: '#de1738',
                          padding: 2,
                          borderRadius: 5,
                        }}
                        onPress={() => getUserInfo()}>
                        <Text style={{color: '#fff'}}>Reject</Text>
                      </TouchableOpacity>
                      <Pressable
                        style={{backgroundColor: '#555555'}}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Close</Text>
                      </Pressable>
                    </View>
                  </View>

                  <Box style={[styles.itemsContainer]}>
                    <TouchableOpacity
                      style={styles.datePicker}
                      onPress={() => setShowTime(true)}>
                      <Text style={styles.secondaryTextColor}> To:</Text>
                    </TouchableOpacity>
                  </Box>
                </View>
              </View>
            </Modal>
          </Box>
        );
      })}
      {tripData ? (
        <Box w="90%" m="auto" bg="#f0f8ff" borderRadius="15px" p="10px">
          <>
            <Text style={{fontWeight: 'bold', fontSize: 14, color: '#57B7EB'}}>
              Passengers
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

          {/* </ImageBackground> */}
        </Box>
      ) : null}
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
