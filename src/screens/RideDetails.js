import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import {Button, Input, ScrollView, useToast} from 'native-base';
import {styles} from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from '../config/baseURL';

const RideDetails = ({route, navigation}) => {
  const [seatsNeeded, setSeatsNeeded] = useState(1);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const {
    rideId,
    driver,
    phone,
    car,
    plate,
    model,
    seats,
    price,
    pickup,
    dropoff,
    date,
    driverPic,
    time,
  } = route.params;
  const handleUpload = async e => {
    let driverId = await AsyncStorage.getItem('id');
    let driverName = await AsyncStorage.getItem('name');
    console.log(driverName, 'nme');
    // e.preventDefault();
    // localStorage.setItem("token", response.tokenObj.id_token);
    setIsLoading(true);
    const data = JSON.stringify({
      userId: driverId,
      rideId: rideId,
      seatsNeeded: seatsNeeded,
    });

    console.log(data, 'dataaa');
    await fetch(baseUrl + '/offer-ride/book', {
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
      <Image
        source={{uri: car}}
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
      <Text>{model}</Text>

      <View>
        <Text style={{fontSize: 14, color: '#2C3539', fontWeight: 'bold'}}>
          Plate Number
        </Text>
        <Text>{plate}</Text>
      </View>
      <View>
        <Text style={{fontSize: 14, color: '#2C3539', fontWeight: 'bold'}}>
          Seats Available
        </Text>
        <Text>{seats}</Text>
      </View>
      <View style={{width: 280, height: 50, borderRadius: 5, border: 1}}>
        <Text style={{fontSize: 14, color: '#2C3539', fontWeight: 'bold'}}>
          Driver Name
        </Text>
        <Text style={{fontSize: 14}}>{driver}</Text>
      </View>
      <View>
        <Image
          source={{uri: driverPic}}
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
        <Text>{price}</Text>
      </View>
      <View>
        <Text style={{fontSize: 14, color: '#2C3539', fontWeight: 'bold'}}>
          From
        </Text>
        <Text>{pickup}</Text>
      </View>
      <View>
        <Text style={{fontSize: 14, color: '#2C3539', fontWeight: 'bold'}}>
          To
        </Text>
        <Text>{dropoff}</Text>
      </View>
      <View>
        <Text style={{fontSize: 14, color: '#2C3539', fontWeight: 'bold'}}>
          Date of Trip
        </Text>
        <Text>{date}</Text>
      </View>
      <View>
        <Text style={{fontSize: 14, color: '#2C3539', fontWeight: 'bold'}}>
          Enter Number of Seats
        </Text>
        <Input
          onChangeText={seatsNeeded => setSeatsNeeded(seatsNeeded)}
          keyboardType="numeric"></Input>
      </View>

      <Button
        isLoading={isLoading}
        isLoadingText="Sending..."
        onPress={handleUpload}
        w="80%"
        style={[styles.primaryButton, {marginTop: 15}]}
        m="auto">
        Book Car
      </Button>
    </ScrollView>
  );
};

export default RideDetails;
