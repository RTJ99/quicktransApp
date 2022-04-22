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
import {styles} from './../style/index';
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
} from 'native-base';
import placeholder from '../assets/img/placeholder-car.png';
import {preferencesList} from './../constants/preferences';
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

const OfferRide = () => {
  const toast = useToast();
  const wizard = useRef();
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [mode, setMode] = useState('date');
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [showIndicator, setShowIndicator] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pickupLocations, setPickupLocations] = useState('');
  const [dropOffLocation, setDropOffLocation] = useState('');
  const [seats, setSeats] = useState('');
  const [preferences, setPreferences] = useState([]);
  const [car, setCar] = useState([]);
  const [summary, setSummary] = useState('');
  const [picture, setPicture] = useState([]);
  const [amount, setAmount] = useState('');
  const [resourcePath, setResourcePath] = useState(placeholder);
  const [showModal, setShowModal] = useState(false);
  const [plateNumber, setPlateNumber] = useState('');
  const [pictureFile, setPictureFile] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState('');
  const [serverError, setServerError] = useState(null);
  const [error404, setError404] = useState(false);
  const [badRequestError, setBadRequestError] = useState(false);
  const [wrongDetails, setWrongDetails] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [price, setPrice] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [loading, setLoading] = useState(false);
  const [dropOffCoords, setDropOffCoords] = useState({});
  const [pickupCoords, setPickupCoords] = useState({});

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
    search: {
      flex: 1,
      width: 300,
      marginTop: 20,
      position: 'absolute',
      top: 20,
      zIndex: 5,
    },
  });

  const preferencesList = [
    {
      id: '1',
      name: 'RTGS Accepted',
    },
    {
      id: '2',
      name: 'Male Driver',
    },
    {
      id: '3',
      name: 'Extra Space Available',
    },
    {
      id: '4',
      name: 'Oprn Truck',
    },
    {
      id: '5',
      name: 'Pets Allowed',
    },
    {
      id: '6',
      name: 'No Smoking',
    },
    {
      id: '7',
      name: 'Christian',
    },
    {
      id: '8',
      name: 'Muslim',
    },
    {
      id: '9',
      name: 'No stops',
    },
  ];
  const handlePickImage = async () => {
    const result = await launchImageLibrary();
    setResourcePath(result.assets[0].uri);
    setPictureFile(result);
  };

  const handleTakePic = async () => {
    const result = await launchCamera();
    setResourcePath(result.assets[0].uri);
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

  const onSelectedItemsChange = selectedItems => {
    // Set Selected Items
    setSelectedItems(selectedItems);
  };
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(false);
    setDate(currentDate);
  };
  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTime(false);
    setTime(currentTime);
  };
  console.log(placeholder, 'path');

  const timeout = () => {
    setLoading(false);
    toast.show({
      title: 'Server Connectivity Error',
      status: 'error',
      placement: 'top',
      description: 'Failed to communicate with server',
    });
  };

  const handleUpload = async e => {
    // e.preventDefault();
    // localStorage.setItem("token", response.tokenObj.id_token);
    setIsLoading(true);
    const data = new FormData();

    data.append('pickup_point', pickupLocations);
    data.append('drop_off_location', dropOffLocation);

    data.append('seats', quantity);
    // data.append('preferences', preferences);
    // data.append('summary', summary);
    // data.append('car', resourcePath);
    // data.append('picture', resourcePath);
    data.append('pickupCoords', pickupCoords);
    data.append('dropOffCoords', dropOffCoords);
    data.append('image', {
      uri: resourcePath,
      name: 'SomeImageName.jpg',
      type: 'image/jpg',
    });
    data.append('date', '1 Jan');
    data.append('time', '12:00');
    data.append('amount', price);
    data.append('driver_id', 'jena');

    data.append('plate_number', plateNumber);

    console.log(data, 'dataaa');
    await fetch(baseUrl + '/offer-ride', {
      method: 'POST',
      body: data,
    })
      .then(response => response.json())
      .then(json => {
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

  const stepList = [
    {
      content: (
        <View style={styles1.page}>
          <View style={styles1.search}>
            <GooglePlacesAutocomplete
              placeholder="Pick Up Location"
              fetchDetails={true}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                setPickupCoords(details.geometry.location);
                setDropOffLocation(data.structured_formatting.main_text);
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
            {loading && <ActivityIndicator />}
          </View>
          <View style={[styles1.search, {marginTop: 80}]}>
            <GooglePlacesAutocomplete
              placeholder="Pick Up Location"
              fetchDetails={true}
              onTimeout={timeout}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(details);

                setDropOffCoords(details.geometry.location);
                setPickupLocations(data.structured_formatting.main_text);
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
          <Box alignItems="center" style={{marginTop: 20}}>
            <Input
              placeholder="Price"
              w="100%"
              maxWidth="300px"
              bg="#F8FAFC"
              variant={'filled'}
              borderColor="#F1F6FE"
              color="#000"
              onChangeText={price => setPrice(price)}
            />
          </Box>
          <Box style={{paddingHorizontal: 20, paddingVertical: 20}}>
            <Text style={{textAlign: 'left', color: '#000', marginBottom: 5}}>
              Number of Seats
            </Text>
            <Box
              alignItems="center"
              style={[
                styles.itemsContainer,
                {
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                },
              ]}>
              {quantity !== 0 ? (
                <MinusIcon
                  onPress={() => setQuantity(quantity - 1)}
                  color="#57B7EB"
                  size="4"
                  style={{marginTop: -5}}
                />
              ) : (
                <MinusIcon color="#57B7EB" size="4" style={{marginTop: -5}} />
              )}
              <Text style={styles.primaryTextColor}>{quantity}</Text>
              <AddIcon
                onPress={() => setQuantity(quantity + 1)}
                color="#57B7EB"
                size="4"
              />
            </Box>
            <Box style={{display: 'flex', flexDirection: 'row'}}>
              <Box
                alignItems="center"
                style={[styles.itemsContainer, {marginRight: 40}]}>
                <TouchableOpacity
                  style={styles.datePicker}
                  onPress={() => setShowDate(true)}>
                  <Text style={styles.secondaryTextColor}>
                    {' '}
                    Date: {date.toLocaleDateString('en-GB')}
                  </Text>
                </TouchableOpacity>
              </Box>
              <Box style={[styles.itemsContainer]}>
                <TouchableOpacity
                  style={styles.datePicker}
                  onPress={() => setShowTime(true)}>
                  <Text style={styles.secondaryTextColor}>
                    {' '}
                    Time: {time ? time.toLocaleTimeString() : '00:00:00'}
                  </Text>
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        </View>
      ),
    },
  ];

  return (
    <View style={styles1.page}>
      {/* <View style={styles1.search}>
        <GooglePlacesAutocomplete
          placeholder="Pick Up Location"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setPickupCoords(details.geometry.location);
            setDropOffLocation(data.structured_formatting.main_text);
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
        {loading && <ActivityIndicator />}
      </View>
      <View style={[styles1.search, {marginTop: 80}]}>
        <GooglePlacesAutocomplete
          placeholder="Pick Up Location"
          fetchDetails={true}
          onTimeout={timeout}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(details);

            setDropOffCoords(details.geometry.location);
            setPickupLocations(data.structured_formatting.main_text);
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
      </View> */}
      <ScrollView style={[styles.container, {marginTop: 125}]}>
        <Box alignItems="center" style={{marginTop: 20}}>
          {/* <Input
          style={styles.input}
          mx="3"
          placeholder="Enter Pick Up Location"
          w="75%"
          maxWidth="300px"
          color="#fff"
          onChangeText={text => setPickupLocations(text)}
        /> */}
        </Box>

        <Box alignItems="center" style={{marginTop: 20}}>
          <Input
            placeholder="Price"
            w="100%"
            maxWidth="300px"
            bg="#F8FAFC"
            variant={'filled'}
            borderColor="#F1F6FE"
            color="#000"
            onChangeText={price => setPrice(price)}
          />
        </Box>
        <Box style={{paddingHorizontal: 20, paddingVertical: 20}}>
          <Text style={{textAlign: 'left', color: '#000', marginBottom: 5}}>
            Number of Seats
          </Text>
          <Box
            alignItems="center"
            style={[
              styles.itemsContainer,
              {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingVertical: 15,
              },
            ]}>
            {quantity !== 0 ? (
              <MinusIcon
                onPress={() => setQuantity(quantity - 1)}
                color="#57B7EB"
                size="4"
                style={{marginTop: -5}}
              />
            ) : (
              <MinusIcon color="#57B7EB" size="4" style={{marginTop: -5}} />
            )}
            <Text style={styles.primaryTextColor}>{quantity}</Text>
            <AddIcon
              onPress={() => setQuantity(quantity + 1)}
              color="#57B7EB"
              size="4"
            />
          </Box>
          <Box style={{display: 'flex', flexDirection: 'row'}}>
            <Box
              alignItems="center"
              style={[styles.itemsContainer, {marginRight: 40}]}>
              <TouchableOpacity
                style={styles.datePicker}
                onPress={() => setShowDate(true)}>
                <Text style={styles.secondaryTextColor}>
                  {' '}
                  Date: {date.toLocaleDateString('en-GB')}
                </Text>
              </TouchableOpacity>
            </Box>
            <Box style={[styles.itemsContainer]}>
              <TouchableOpacity
                style={styles.datePicker}
                onPress={() => setShowTime(true)}>
                <Text style={styles.secondaryTextColor}>
                  {' '}
                  Time: {time ? time.toLocaleTimeString() : '00:00:00'}
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
          <Text style={{textAlign: 'left', color: '#000', marginBottom: 5}}>
            Preferences
          </Text>
          <MultiSelect
            items={preferencesList}
            uniqueKey="id"
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Pick Items"
            searchInputPlaceholderText="Search Items..."
            onChangeInput={text => console.log(text)}
            tagRemoveIconColor="#57B7EB"
            tagTextColor="#57B7EB"
            selectedItemTextColor="#000"
            selectedItemIconColor="#000"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{
              color: '#1E2426',

              backgroundColor: '#F8FAFC',
              borderRadius: 5,
            }}
            styleDropdownMenuSubsection={{
              backgroundColor: '#F8FAFC',
              borderRadius: 5,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: '#F1F6FE',
              height: 50,
            }}
            submitButtonColor="#57B7EB"
            submitButtonText="Submit"
            styleInputGroup={styles.itemsContainer}
            tagBorderColor="#57B7EB"
          />
          <Text style={{textAlign: 'left', color: '#000', marginBottom: 5}}>
            About Vehicle
          </Text>
          <TextArea
            style={styles.textInput}
            h={20}
            placeholder="Summary of vehicle description"
            w="100%"
            maxW="300"
            bg="white"
            color="#000"
            onChange={summary => setSummary(summary)}
          />

          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
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
            </Box>
            <Box style={[styles.itemsContainer]}>
              <TouchableOpacity
                onPress={requestCameraPermission}
                style={[styles.datePicker]}>
                <Text style={[styles.secondaryTextColor, {fontWeight: 'bold'}]}>
                  Take Picture
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>

          <Text
            style={{
              textAlign: 'left',
              color: '#000',
              marginBottom: 5,
              marginTop: 10,
            }}>
            Car Picture
          </Text>

          {resourcePath !== 1 ? (
            <Image
              source={{uri: resourcePath}}
              style={{width: 280, height: 300}}
            />
          ) : (
            <PlaceholderCar />
          )}
        </Box>

        <Box alignItems="center" style={{marginTop: 10, paddingHorizontal: 20}}>
          <Input
            style={{color: '#fff'}}
            placeholder="Car Plate Number"
            w="100%"
            maxWidth="300px"
            variant={'filled'}
            bg="#F8FAFC"
            borderColor="#F1F6FE"
            color="#000"
            onChangeText={plateNumber => setPlateNumber(plateNumber)}
          />
        </Box>
        <Box style={{paddingHorizontal: 20, marginBottom: 5}}>
          <Button
            isLoading={isLoading}
            isLoadingText="Sending..."
            onPress={handleUpload}
            style={[styles.primaryButton, {marginTop: 15}]}>
            Post
          </Button>
        </Box>
        {showDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )}
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
      </ScrollView>
    </View>
  );
};

export default OfferRide;
