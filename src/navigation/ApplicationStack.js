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
              color: '#57B7EB',
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,

            headerTitleStyle: {
              color: '#57B7EB',
            },
            headerTintcolor: '#57B7EB',
          }}
        />
        <Stack.Screen
          name="Offer Ride"
          component={OfferRide}
          options={{
            headerShown: true,
            // headerStyle: {backgroundColor: '#161B1D'},
            headerTitleStyle: {
              color: '#57B7EB',
            },
            headerTintcolor: '#57B7EB',
          }}
        />
        <Stack.Screen
          name="RideDetails"
          component={RideDetails}
          options={{
            headerShown: true,
            // headerStyle: {backgroundColor: '#161B1D'},
            headerTitleStyle: {
              color: '#57B7EB',
            },
            headerTintcolor: '#57B7EB',
          }}
        />
        <Stack.Screen
          name="Search Ride"
          component={FindRide}
          options={{
            headerShown: true,
            // headerStyle: {backgroundColor: '#161B1D'},
            headerTitleStyle: {
              color: '#57B7EB',
            },
            headerTintcolor: '#57B7EB',
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            // headerStyle: {backgroundColor: '#161B1D'},
            headerTitleStyle: {
              color: '#57B7EB',
            },
            headerTintcolor: '#57B7EB',
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: true,
            // headerStyle: {backgroundColor: '#161B1D'},
            headerTitleStyle: {
              color: '#57B7EB',
            },
            headerTintcolor: '#57B7EB',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
