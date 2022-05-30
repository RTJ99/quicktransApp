import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import {Button, Input, ScrollView, useToast, Divider, Box} from 'native-base';
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
    <ScrollView style={{paddingHorizontal: 10}}>
      <View>
        <View
          style={{
            backgroundColor: 'white',
            marginTop: 10,
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: driverPic}}
            style={{
              width: 100,
              height: 100,
              marginTop: 10,
              borderRadius: 300,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              color: '#005792',
              fontFamily: 'Rubik-Bold',
              textAlign: 'center',
              marginHorizontal: 20,
              marginVertical: 6,
            }}>
            {driver}
          </Text>
          <Divider w="80%" my="2" bg={'#BABFC4'} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#005792',
                  fontFamily: 'Rubik-Bold',
                  textAlign: 'center',
                  marginHorizontal: 20,
                  marginVertical: 6,
                }}>
                0
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#005792',
                  fontFamily: 'Rubik-Bold',
                  textAlign: 'center',
                  marginHorizontal: 20,
                  marginVertical: 6,
                }}>
                Rides
              </Text>
            </View>
            <Divider
              orientation="vertical"
              w="1px"
              h={6}
              my="2"
              bg={'#BABFC4'}
            />
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#005792',
                  fontFamily: 'Rubik-Bold',
                  textAlign: 'center',
                  marginHorizontal: 20,
                  marginVertical: 6,
                }}>
                0
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#005792',
                  fontFamily: 'Rubik-Bold',
                  textAlign: 'center',
                  marginHorizontal: 20,
                  marginVertical: 6,
                }}>
                Passangers
              </Text>
            </View>
            <Divider
              orientation="vertical"
              w="1px"
              h={6}
              my="2"
              bg={'#BABFC4'}
            />
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#005792',
                  fontFamily: 'Rubik-Bold',
                  textAlign: 'center',
                  marginHorizontal: 20,
                  marginVertical: 6,
                }}>
                0
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#005792',
                  fontFamily: 'Rubik-Bold',
                  textAlign: 'center',
                  marginHorizontal: 20,
                  marginVertical: 6,
                }}>
                Rating
              </Text>
            </View>
          </View>
        </View>

        <Text
          style={{
            fontSize: 16,
            color: '#005792',
            fontFamily: 'Rubik-Bold',
            textAlign: 'center',
            marginHorizontal: 20,
            marginVertical: 6,
          }}>
          Vehicle Details
        </Text>
        <View>
          <Text
            style={{
              fontFamily: 'Rubik-Bold',
              fontSize: 14,
              marginBottom: 5,
              color: '#233b',
            }}>
            Vehicle Images:
          </Text>
          <Image
            source={{uri: car}}
            style={{
              width: 100,
              height: 100,

              borderRadius: 5,
            }}
          />
        </View>
        <Divider my="2" bg={'#BABFC4'} />
        <View
          style={{
            padding: 5,
            borderRadius: 10,
          }}>
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
                  marginBottom: 5,
                  color: '#233b',
                }}>
                Make:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#2C3539',
                  fontFamily: 'DMSans',
                }}>
                {model}
              </Text>
            </View>
          </View>
        </View>
        <Divider my="2" bg={'#BABFC4'} />
        <View
          style={{
            padding: 5,
            borderRadius: 10,
          }}>
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
                  marginBottom: 5,
                  color: '#233b',
                }}>
                Plate Number:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#2C3539',
                  fontFamily: 'DMSans',
                }}>
                {plate}
              </Text>
            </View>
          </View>
        </View>
        <Divider my="2" bg={'#BABFC4'} />
        <Text
          style={{
            fontSize: 16,
            color: '#005792',
            fontFamily: 'Rubik-Bold',
            textAlign: 'center',
            marginHorizontal: 20,
            marginVertical: 6,
          }}>
          Trip Details
        </Text>
        <View
          style={{
            padding: 5,
            borderRadius: 10,
          }}>
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
                  marginBottom: 5,
                  color: '#233b',
                }}>
                Seats Available:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#2C3539',
                  fontFamily: 'DMSans',
                }}>
                {seats}
              </Text>
            </View>
          </View>
        </View>
        <Divider my="2" bg={'#BABFC4'} />
        <View
          style={{
            padding: 5,
            borderRadius: 10,
          }}>
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
                  marginBottom: 5,
                  color: '#233b',
                }}>
                Price:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#2C3539',
                  fontFamily: 'DMSans',
                }}>
                {price}
              </Text>
            </View>
          </View>
        </View>
        <Divider my="2" bg={'#BABFC4'} />
        <View
          style={{
            padding: 5,
            borderRadius: 10,
          }}>
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
                  marginBottom: 5,
                  color: '#233b',
                }}>
                From:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#2C3539',
                  fontFamily: 'DMSans',
                }}>
                {pickup}
              </Text>
            </View>
          </View>
        </View>
        <Divider my="2" bg={'#BABFC4'} />
        <View
          style={{
            padding: 5,
            borderRadius: 10,
          }}>
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
                  marginBottom: 5,
                  color: '#233b',
                }}>
                To:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#2C3539',
                  fontFamily: 'DMSans',
                }}>
                {dropoff}
              </Text>
            </View>
          </View>
        </View>
        <Divider my="2" bg={'#BABFC4'} />
        <View
          style={{
            padding: 5,
            borderRadius: 10,
          }}>
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
                  marginBottom: 5,
                  color: '#233b',
                }}>
                Trip Date:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#2C3539',
                  fontFamily: 'DMSans',
                }}>
                {date}
              </Text>
            </View>
          </View>
        </View>
        <Divider my="2" bg={'#BABFC4'} />

        <Box alignItems="center" style={{marginTop: 20}}>
          <Text
            style={{
              fontFamily: 'Rubik-Bold',
              fontSize: 14,
              marginBottom: 5,
              color: '#233b',
            }}>
            Enter Seats Needed
          </Text>
          <Input
            type="number"
            placeholder="SeatsNeeded"
            w="320px"
            maxWidth="300px"
            borderColor={'#233b'}
            borderWidth={1}
            color="#000"
            onChangeText={data => setSeatsNeeded(data)}
          />
        </Box>

        <Box display="flex" mb={10} style={{flexDirection: 'row'}}>
          <Button
            isLoading={isLoading}
            isLoadingText="Sending..."
            onPress={handleUpload}
            w="35%"
            style={[styles.primaryButton, {marginTop: 15}]}
            m="auto">
            <Text style={{fontFamily: 'DMSans'}}> Book Ride</Text>
          </Button>
        </Box>
      </View>
    </ScrollView>
  );
};

export default RideDetails;
