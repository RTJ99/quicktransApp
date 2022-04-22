import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import OfferRide from './../screens/OfferRide';
import Home from './../screens/Home';

import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import {NavigationContainer} from '@react-navigation/native';
import HomeContainer from '../routes/Home/container/HomeContainer';
import TrackingDriverContainer from '../routes/TrackDriver/container/TrackDriverContainer';
import PictureCar from '../screens/PictureCar';
import Cars from '../screens/Cars';
const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Cars':
      iconName = 'car';
      break;
    case 'Inbox':
      iconName = 'inbox';
      break;
    case 'Emergency':
      iconName = 'exclamationcircleo';
      break;
    case 'Profile':
      iconName = 'user';
      break;
    default:
      break;
  }

  return <Icon name={iconName} color={color} size={24} />;
};

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        activeTintColor: '#da8794',
        inactiveTintColor: '#979db8',
        style: {
          borderTopColor: '#66666666',
          backgroundColor: '#1E2426',
          elevation: 1,
        },
        tabBarIcon: ({color}) => screenOptions(route, color),
      })}>
      <Tab.Screen options={{headerShown: false}} name="Home" component={Home} />
      <Tab.Screen options={{headerShown: false}} name="Cars" component={Cars} />
      <Tab.Screen
        options={{headerShown: false}}
        name="Inbox"
        component={OfferRide}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Emergency"
        component={TrackingDriverContainer}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Profile"
        component={Home}
      />
    </Tab.Navigator>
  );
};
export default Tabs;
