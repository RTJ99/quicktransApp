import {Box, Button} from 'native-base';
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  Text,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AutoComplete from '../components/AutoComplete';
import MapContainer from '../components/MapContainer/index';
import Home from '../routes/Home/components/Home';
import bg from '../assets/img/bg.jpg';
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
});

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.homeContainer}>
      <MapView
        style={styles.map}
        userLocationUpdateInterval={5000}
        loadingEnabled={true}
        region={{
          latitude: -17.824858,
          longitude: 31.053028,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <Box w="95%" style={styles.nextRideContainer}>
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
          <Text style={{fontWeight: 'bold', fontSize: 20, color: '#fff'}}>
            Next Ride
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}>
            From:
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 14,
              color: '#fff',
              marginBottom: 10,
            }}>
            To:
          </Text>
          <Button w="40%">Cancel</Button>
        </ImageBackground>
      </Box>
      <Box
        bg="white"
        w="100%"
        overflow="hidden"
        borderColor="coolGray.200"
        p="5"
        shadow="md"
        style={[
          styles.elevation,
          {marginTop: 180, height: 210, borderRadius: 30},
        ]}>
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
          onPress={() => navigation.navigate('Login')}
          size="lg"
          style={styles.buttonStyle}
          leftIcon={<Icon name="cog-outline" type="Ionicons" color="white" />}
          colorScheme="#57B7EB">
          Sign Out
        </Button>
      </Box>
    </View>
  );
};

export default HomeScreen;
