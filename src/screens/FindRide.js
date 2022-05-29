import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Box,
  Button,
  useToast,
  Fab,
  Modal,
  Input,
  Center,
  FormControl,
  Divider,
} from 'native-base';
import React, {useState} from 'react';
import {baseUrl} from '../config/baseURL';
import {useApiRequest} from '../services/Axios/AxiosGet';
import bg from '../assets/img/bg2.jpg';
import pin from '../assets/carMarker.png';
import Icon from 'react-native-vector-icons/AntDesign';
import {BlurView, VibrancyView} from '@react-native-community/blur';

import MapView, {Circle, Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {TouchableOpacity} from 'react-native';

const Cars = ({navigation}) => {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
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
      marginTop: 50,
      position: 'absolute',
      top: 2,
      elevation: 9,
    },
    search2: {
      flex: 1,
      width: 300,
      position: 'absolute',
      top: 5,
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
    <View style={{height: height}}>
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
      <BlurView
        style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <View style={{display: 'flex', flexDirection: 'row', width: width}}>
        <View>
          {cars && cars.length > 0 ? (
            <View
              style={{
                backgroundColor: '#00bcd4',
                color: '#fff',
                padding: 3,
                borderRadius: 3,
                width: width,
              }}>
              <Text style={{textAlign: 'center', fontFamily: 'DMSans'}}>
                {cars.length} car/s found
              </Text>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: '#00bcd4',
                color: '#fff',
                padding: 3,
                borderRadius: 3,
                width: width,
              }}>
              <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>
                {' '}
                No Cars
              </Text>
            </View>
          )}
        </View>
      </View>

      <View>
        <View
          style={{
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: width,
            height: 110,
            borderTopColor: '#233b',
            borderBottomColor: '#233b',
            padding: 10,
            borderTopWidth: 1,
            borderBottomWidth: 1,
          }}>
          <View style={[styles.search1]}>
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
          <View style={[styles.search2]}>
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
      </View>
    </View>
  );
};

export default Cars;
