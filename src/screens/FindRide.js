import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Box, Button, useToast} from 'native-base';
import React, {useState} from 'react';
import {baseUrl} from '../config/baseURL';
import {useApiRequest} from '../services/Axios/AxiosGet';
import bg from '../assets/img/bg2.jpg';
import pin from '../assets/carMarker.png';

import MapView, {Circle, Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {TouchableOpacity} from 'react-native';

const Cars = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dropOffLocation, setDropOffLocation] = React.useState('');
  const [pickupLocation, setPickupLocation] = React.useState('');
  const [time, setTime] = React.useState('');
  const [time2, setTime2] = React.useState('');
  const [showTime, setShowTime] = useState(false);

  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#fff',
      flex: 1,
    },
    itemsContainer: {
      backgroundColor: '#F8FAFC',
      borderWidth: 1,
      borderColor: '#F1F6FE',
      borderRadius: 5,
      padding: 5,
      marginBottom: 10,
      marginTop: 5,
    },
    headerContainer: {
      backgroundColor: '#fff',
      padding: 10,
      height: 90,
      borderRadius: 20,
      marginTop: 20,
      borderColor: '#F3F5FB',
      borderWidth: 1,
    },
    headerContainer2: {
      backgroundColor: '#fff',

      height: 150,
      borderRadius: 20,
      marginTop: 20,
    },
    outerContainer: {
      paddingHorizontal: 20,
      backgroundColor: '#fff',
      flex: 1,
    },
    headerText: {
      color: '#57B7EB',
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    driverName: {
      color: '#000',
      fontSize: 10,
    },
    map: {
      position: 'absolute',
      top: 0,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    nextRideContainer: {
      borderRadius: 40,
      marginTop: 10,
      // backgroundColor: '#57B7EB',
      height: 150,
      // paddingTop: 60,
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

    modalView: {
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
      marginBottom: 15,
      textAlign: 'center',
      color: '#57B7EB',
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
  const {
    data: cars,
    fetchData,
    error: errorsRequests,
    isLoaded: isLoadedRequests,
  } = useApiRequest(
    baseUrl +
      `/offer-ride/search?pickup_point=${pickupLocation}&drop_off_location=${dropOffLocation}`,
  );

  console.log(cars, 'ot');
  const tokyoRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTime(false);
    setTime(currentTime);
  };
  const onChangeTime2 = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTime(false);
    setTime2(currentTime);
  };
  return (
    <View style={styles.outerContainer}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        userLocationUpdateInterval={5000}
        loadingEnabled={true}
        region={{
          latitude: -17.824858,
          longitude: 31.053028,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {cars.map((car, index) => (
          <>
            <Marker
              onPress={() =>
                navigation.navigate('RideDetails', {
                  rideId: car._id,
                  driver: car.driver,
                  phone: car.phone,
                  car: car.picture,
                  plate: car.plate,
                  model: car.make,
                  seats: car.seats,
                  price: car.amount,
                  pickup: car.pickup_point,
                  dropoff: car.drop_off_location,
                  date: car.date,
                  time: car.time,
                  driverPic: car.driver_pic,
                })
              }
              image={pin}
              coordinate={{
                latitude: parseFloat(car.pickupLat),
                longitude: parseFloat(car.pickupLng),
              }}
            />
            <Circle
              center={{
                latitude: parseFloat(car.pickupLat),
                longitude: parseFloat(car.pickupLng),
              }}
              radius={1000}
              strokeColor={'#55f1f4'}
              fillColor={'#57b7eb3d'}
            />
          </>
        ))}
      </MapView>

      <View style={styles.nextRideContainer}>
        <View
          style={[
            styles.nextRideContainer,
            {
              flex: 1,
              resizeMode: 'cover',
              justifyContent: 'center',
              color: 'white',
              paddingHorizontal: 20,
            },
          ]}>
          <View style={[styles.search1]}>
            <GooglePlacesAutocomplete
              placeholder="Pick Up Location"
              fetchDetails={true}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true

                setPickupLocation(data.structured_formatting.main_text);
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
          </View>
          <View style={[styles.search2, {marginTop: 20}]}>
            <GooglePlacesAutocomplete
              placeholder="Drop Off Location"
              fetchDetails={true}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(details);

                setDropOffLocation(data.structured_formatting.main_text);
              }}
              query={{
                key: 'AIzaSyCOqulxPGaTEOX6sP9TexQlZ7S2mC6KOxs',
                language: 'en',
                components: 'country:zw',
              }}
              styles={{
                textInput: {
                  backgroundColor: '#f0f8ff',
                  borderColor: '#F1F6FE',

                  borderWidth: 1,
                },
              }}
            />
            <View>
              <View style={{marginTop: 100}}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>Select Time Range</Text>
                      <Box style={[styles.itemsContainer]}>
                        <TouchableOpacity
                          style={styles.datePicker}
                          onPress={() => setShowTime(true)}>
                          <Text style={styles.secondaryTextColor}>
                            {' '}
                            From:{' '}
                            {time ? time.toLocaleTimeString() : '00:00:00'}
                          </Text>
                        </TouchableOpacity>
                      </Box>
                      <Box style={[styles.itemsContainer]}>
                        <TouchableOpacity
                          style={styles.datePicker}
                          onPress={() => setShowTime(true)}>
                          <Text style={styles.secondaryTextColor}>
                            {' '}
                            To:{' '}
                            {time2 ? time2.toLocaleTimeString() : '00:00:00'}
                          </Text>
                        </TouchableOpacity>
                      </Box>
                      {showTime && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={date}
                          mode={'time'}
                          is24Hour={true}
                          display="default"
                          onChange={onChangeTime}
                        />
                      )}
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Filter</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => setModalVisible(true)}>
                  <Text style={styles.textStyle}>Filter</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={[styles.search1, {marginTop: 400}]}>
            {cars && cars.length > 0 ? (
              <Text>{cars.length} cars found</Text>
            ) : (
              <View
                style={{
                  backgroundColor: '#00bcd4',
                  color: '#fff',
                  padding: 3,
                  borderRadius: 3,
                }}>
                <Text
                  style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>
                  {' '}
                  No Cars
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Cars;
