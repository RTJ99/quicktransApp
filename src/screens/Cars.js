import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React from 'react';
import {baseUrl} from '../config/baseURL';
import {useApiRequest} from '../services/Axios/AxiosGet';
import bg from '../assets/img/bg2.jpg';
import pin from '../assets/carMarker.png';
import MapView, {Marker} from 'react-native-maps';

const Cars = () => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#fff',
      flex: 1,
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
  });
  const {
    data: cars,
    fetchData,
    error: errorsRequests,
    isLoaded: isLoadedRequests,
  } = useApiRequest(baseUrl + `/offer-ride`);
  const tokyoRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
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
        <Marker
          image={pin}
          coordinate={{
            latitude: -17.824858,
            longitude: 31.053028,
          }}
        />
      </MapView>
      {/* <View style={styles.headerContainer2}>
        <ImageBackground
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
          source={bg}>
          <Text style={[styles.headerText, {color: 'white'}]}>
            Suggested Cars
          </Text>
        </ImageBackground>
      </View>
      <ScrollView>
        {cars.length === 0 && (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 50,
            }}>
            No suggestions
          </Text>
        )}
        {cars.map((car, index) => {
          var lastIndex1 = car.drop_off_location.lastIndexOf(',');
          var lastIndex2 = car?.pickup_point.lastIndexOf(',');

          let dropOff = car.drop_off_location.substring(0, lastIndex1);
          let pickup = car?.pickup_point.substring(0, lastIndex2);
          return (
            <View
              style={[
                styles.headerContainer,
                {
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
              ]}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  // alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 8, color: 'grey'}}>From</Text>
                <Text
                  style={{fontSize: 12, fontWeight: 'bold', color: '#2C3539'}}>
                  {pickup}
                </Text>
                <Text style={{fontSize: 8, color: 'grey'}}>To</Text>
                <Text
                  style={{fontSize: 12, fontWeight: 'bold', color: '#2C3539'}}>
                  {dropOff}
                </Text>
                <Text
                  style={{fontSize: 14, color: '#57B4E7', fontWeight: 'bold'}}>
                  {car.seats} Seats Left
                </Text>
              </View>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <Image
                  source={{uri: car.picture}}
                  style={{width: 60, height: 60, marginTop: 3, borderRadius: 5}}
                />
              </View>
            </View>
          );
        })}
      </ScrollView> */}
    </View>
  );
};

export default Cars;
