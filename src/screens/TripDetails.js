import {View, Text, Image, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Box, Button, ScrollView, useToast, Center, Spinner} from 'native-base';
import {styles} from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from '../config/baseURL';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
const height = Dimensions.get('window').height;

const RideDetails = ({route, navigation}) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [changeText, setChangeText] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [tripData, setTripData] = useState({});
  const {RideId} = route.params;

  const getRide = async () => {
    setFetching(true);
    axios
      .get(baseUrl + '/offer-ride/getride/' + RideId)
      .then(function (response) {
        setTripData(response.data[0]);
        console.log('triiiiipDatttttta', tripData);
        setFetching(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setFetching(false);
      })
      .then(function () {
        // always executed
        setFetching(false);
      });
  };

  useEffect(() => {
    getRide();
  }, []);
  const handleUpload = async e => {
    let driverId = await AsyncStorage.getItem('id');
    let driverName = await AsyncStorage.getItem('name');
    console.log(driverName, 'nme');
    // e.preventDefault();
    // localStorage.setItem("token", response.tokenObj.id_token);
    setIsLoading(true);
    const data = JSON.stringify({
      id: tripData._id,
    });

    console.log(data, 'dataaa');
    await fetch(baseUrl + '/offer-ride/unbook', {
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

  return (
    <ScrollView style={{paddingHorizontal: 40}}>
      {fetching === true ? (
        <Center h={height}>
          <Spinner color="#d75369" size={30} />
        </Center>
      ) : (
        <View>
          <Image
            source={{uri: tripData?.picture}}
            style={{
              width: 280,
              height: 300,
              marginTop: 60,
              borderRadius: 5,
            }}
          />
          <View>
            <Text style={{fontSize: 14, color: '#2C3539', fontWeight: 'bold'}}>
              Make
            </Text>
          </View>
          <Text style={{fontSize: 12, color: '#2C3539'}}>{tripData.make}</Text>

          <View>
            <Text style={{fontSize: 14, color: '#2C3539', fontWeight: 'bold'}}>
              Plate Number
            </Text>
            <Text style={{fontSize: 12, color: '#2C3539'}}>
              {tripData?.plate}
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 14, color: '#2C3539', fontWeight: 'bold'}}>
              Seats Available
            </Text>
            <Text style={{fontSize: 12, color: '#2C3539'}}>
              {tripData?.seats}
            </Text>
          </View>
          <View style={{width: 280, height: 50, borderRadius: 5, border: 1}}>
            <Text style={{fontSize: 14, color: '#2C3539', fontWeight: 'bold'}}>
              Driver Name
            </Text>
            <Text style={{fontSize: 12, color: '#2C3539'}}>
              {tripData?.driver}
            </Text>
          </View>
          <View>
            <Image
              source={{uri: tripData?.driver_pic}}
              style={{
                width: 280,
                height: 300,

                borderRadius: 5,
              }}
            />
          </View>
          <View>
            <Text style={{fontSize: 14, color: '#2C3539', fontWeight: 'bold'}}>
              Price
            </Text>
            <Text style={{fontSize: 12, color: '#2C3539'}}>
              {tripData?.amount}
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 14, color: '#2C3539', fontWeight: 'bold'}}>
              From
            </Text>
            <Text style={{fontSize: 12, color: '#2C3539'}}>
              {tripData?.pickup_point}
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 14, color: '#2C3539', fontWeight: 'bold'}}>
              To
            </Text>
            <Text style={{fontSize: 12, color: '#2C3539'}}>
              {tripData?.drop_off_location}
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 14, color: '#2C3539', fontWeight: 'bold'}}>
              Date of Trip
            </Text>
            <Text style={{fontSize: 12, color: '#2C3539'}}>
              {tripData?.date}
            </Text>
          </View>
          <Box display="flex" style={{flexDirection: 'row'}}>
            <Button
              isLoading={isLoading}
              isLoadingText="Sending..."
              onPress={() => setChangeText(true)}
              w="30%"
              style={[styles.primaryButton, {marginTop: 15}]}
              m="auto">
              {changeText === false ? 'Start Trip' : 'End Trip'}
            </Button>

            <Button
              isLoading={isLoading}
              isLoadingText="Sending..."
              onPress={handleUpload}
              w="35%"
              style={[styles.primaryButton, {marginTop: 15}]}
              m="auto">
              Cancel Ride
            </Button>
            <Button
              isLoading={isLoading}
              isLoadingText="Sending..."
              onPress={handleUpload}
              w="30%"
              style={[styles.primaryButton, {marginTop: 15}]}
              m="auto">
              <Icon name="sharealt" color="white" size={20} />
            </Button>
          </Box>
        </View>
      )}
    </ScrollView>
  );
};

export default RideDetails;
