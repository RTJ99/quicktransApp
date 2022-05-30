import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen} from '../screens';
import OfferRide from './../screens/OfferRide';
import Home from './../screens/Home';
import Tabs from './BottomBar';
import Login from '../screens/Login';
import Register from '../screens/Register';
import FindRide from '../screens/FindRide';
import RideDetails from '../screens/RideDetails';
import TripDetails from '../screens/TripDetails';
import Suggested from '../screens/Suggested';
const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="Main"
          component={Tabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,

            headerTitleStyle: {
              color: '#005792',
              fontFamily: 'Rubik-Black',
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,

            headerTitleStyle: {
              color: '#005792',
              fontFamily: 'Rubik-Black',
            },
            headerTintcolor: '#005792',
          }}
        />
        <Stack.Screen
          name="Offer Ride"
          component={OfferRide}
          options={{
            headerShown: true,
            // headerStyle: {backgroundColor: '#161B1D'},
            headerTitleStyle: {
              color: '#005792',
              fontFamily: 'Rubik-Black',
            },
            headerTintcolor: '#005792',
          }}
        />
        <Stack.Screen
          name="RideDetails"
          component={RideDetails}
          options={{
            headerShown: true,
            // headerStyle: {backgroundColor: '#161B1D'},
            headerTitleStyle: {
              color: '#005792',
              fontFamily: 'Rubik-Black',
            },
            headerTintcolor: '#005792',
          }}
        />
        <Stack.Screen
          name="Search Ride"
          component={FindRide}
          options={{
            headerShown: true,
            // headerStyle: {backgroundColor: '#161B1D'},
            headerTitleStyle: {
              color: '#005792',
              fontFamily: 'Rubik-Black',
            },
            headerTintcolor: '#005792',
          }}
        />
        <Stack.Screen
          name="Trip Details"
          component={TripDetails}
          options={{
            headerShown: true,
            // headerStyle: {backgroundColor: '#161B1D'},
            headerTitleStyle: {
              color: '#005792',
              fontFamily: 'Rubik-Black',
            },
            headerTintcolor: '#005792',
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            // headerStyle: {backgroundColor: '#161B1D'},
            headerTitleStyle: {
              color: '#005792',
              fontFamily: 'Rubik-Black',
            },
            headerTintcolor: '#005792',
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: true,
            // headerStyle: {backgroundColor: '#161B1D'},
            headerTitleStyle: {
              color: '#005792',
              fontFamily: 'Rubik-Black',
            },
            headerTintcolor: '#005792',
          }}
        />
        <Stack.Screen
          name="Suggested Cars"
          component={Suggested}
          options={{
            headerShown: true,
            // headerStyle: {backgroundColor: '#161B1D'},
            headerTitleStyle: {
              color: '#005792',
              fontFamily: 'Rubik-Black',
            },
            headerTintcolor: '#005792',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
