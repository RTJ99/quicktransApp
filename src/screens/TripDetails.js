import {View, Text, Image, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Divider} from 'native-base';
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
      userId: driverId,
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
    <ScrollView style={{paddingHorizontal: 10}}>
      {fetching === true ? (
        <Center h={height}>
          <Spinner color="#d75369" size={30} />
        </Center>
      ) : (
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
              source={{uri: tripData?.driver_pic}}
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
              {tripData?.driver}
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
              source={{uri: tripData?.picture}}
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
                  {tripData.make}
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
                  {tripData?.plate}
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
                  {tripData?.seats}
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
                  {tripData?.amount}
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
                  {tripData?.pickup_point}
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
                  {tripData?.drop_off_location}
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
                  {tripData?.date}
                </Text>
              </View>
            </View>
          </View>
          <Divider my="2" bg={'#BABFC4'} />

          <Box display="flex" mb={10} style={{flexDirection: 'row'}}>
            <Button
              isLoading={isLoading}
              isLoadingText="Sending..."
              onPress={() => setChangeText(true)}
              w="30%"
              style={[styles.primaryButton, {marginTop: 15}]}
              m="auto">
              <Text style={{fontFamily: 'DMSans'}}>
                {changeText === false ? 'Start Trip' : 'End Trip'}
              </Text>
            </Button>

            <Button
              isLoading={isLoading}
              isLoadingText="Sending..."
              onPress={handleUpload}
              w="35%"
              style={[styles.primaryButton, {marginTop: 15}]}
              m="auto">
              <Text style={{fontFamily: 'DMSans'}}> Cancel Ride</Text>
            </Button>
          </Box>
        </View>
      )}
    </ScrollView>
  );
};

export default RideDetails;
