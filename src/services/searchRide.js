import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AppBar from '../components/AppBar';
import {styles} from './../style/index';
import {
  AddIcon,
  Box,
  Input,
  MinusIcon,
  ScrollView,
  TextArea,
  useToast,
} from 'native-base';
import {preferencesList} from './../constants/preferences';
import MultiSelect from 'react-native-multiple-select';
import {Icon} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import {offerRideService} from '../services';
import ImagePicker from 'react-native-image-picker';
const SearchRide = ({navigation}) => {
  const toast = useToast();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [mode, setMode] = useState('date');
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [showIndicator, setShowIndicator] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pickupLocations, setPickupLocations] = useState([]);
  const [dropOffLocation, setDropOffLocation] = useState('');
  const [seats, setSeats] = useState('');
  const [preferences, setPreferences] = useState([]);
  const [car, setCar] = useState([]);
  const [summary, setSummary] = useState('');
  const [picture, setPicture] = useState([]);
  const [amount, setAmount] = useState('');

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
  const handlePicker = () => {
    // console.log('edit');
    ImagePicker.showImagePicker({}, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setPicture({uri: response.uri});
        // here we can call a API to upload image on server
      }
    });
  };
  const nextPage = async () => {
    setIsLoading(true);

    const ride = {
      pickupLocations,
      dropOffLocation,
      date,
      time,
      seats: quantity,
      preferences: selectedItems,
      summary,
      car,
      picture,
      amount,
    };
    console.log(ride, 'ride');
    offerRideService(ride)
      .then(async response => {
        console.log(response);

        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
        toast.show({
          title: 'Server Connectivity Error',
          status: 'error',
          placement: 'top',
          description: 'Failed to communicate with server',
        });
      });
  };
  return (
    <ScrollView style={styles.container}>
      <Box alignItems="center" style={{marginTop: 20}}>
        <Input
          style={styles.input}
          mx="3"
          placeholder="Enter Pick Up Location"
          w="75%"
          maxWidth="300px"
          color="#fff"
          onChangeText={text => setPickupLocations(text)}
        />
      </Box>
      <Box alignItems="center" style={{marginTop: 20}}>
        <Input
          style={styles.input}
          mx="3"
          placeholder="Enter Drop Off Location"
          w="75%"
          maxWidth="300px"
          color="#fff"
          onChangeText={text => setDropOffLocation(text)}
        />
      </Box>
      <Box alignItems="center" style={{marginTop: 20}}>
        <Input
          style={styles.input}
          mx="3"
          placeholder="Price"
          w="75%"
          maxWidth="300px"
          color="#fff"
          onChangeText={text => setAmount(text)}
        />
      </Box>
      <Box style={{paddingHorizontal: 40, paddingVertical: 20}}>
        <Text style={{textAlign: 'left', color: 'white', marginBottom: 5}}>
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
            },
          ]}>
          {quantity !== 0 ? (
            <MinusIcon
              onPress={() => setQuantity(quantity - 1)}
              color="white"
              size="4"
              style={{marginTop: -5}}
            />
          ) : (
            <MinusIcon color="white" size="4" style={{marginTop: -5}} />
          )}
          <Text style={styles.primaryTextColor}>{quantity}</Text>
          <AddIcon
            onPress={() => setQuantity(quantity + 1)}
            color="white"
            size="4"
          />
        </Box>
        <Box style={{display: 'flex', flexDirection: 'row'}}>
          <Box
            alignItems="center"
            style={[styles.itemsContainer, {marginRight: 5}]}>
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
        <Text style={{textAlign: 'left', color: 'white', marginBottom: 5}}>
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
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{color: '#1E2426'}}
          submitButtonColor="#48d22b"
          submitButtonText="Submit"
        />
        <Text style={{textAlign: 'left', color: 'white', marginBottom: 5}}>
          About Vehicle
        </Text>
        <TextArea
          style={styles.textInput}
          h={20}
          placeholder="Summary of vehicle description"
          w="100%"
          maxW="300"
          color="#fff"
        />
      </Box>

      <Box alignItems="center" style={{marginTop: 10, paddingHorizontal: 40}}>
        <Input
          style={{color: '#fff'}}
          mx="3"
          placeholder="Car Plate Number"
          w="100%"
          maxWidth="300px"
          color="#fff"
        />
      </Box>
      <Box style={{paddingHorizontal: 40, marginBottom: 5}}>
        <TouchableOpacity
          onPress={nextPage}
          style={[styles.primaryButton, {marginTop: 15}]}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
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
      {showIndicator && <ActivityIndicator size="large" color="blue" />}
    </ScrollView>
  );
};

export default SearchRide;
