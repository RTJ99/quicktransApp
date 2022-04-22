import {View, Text, Image} from 'react-native';
import React from 'react';
import logo from '../assets/img/logo.png';
import {styles} from './../style/index';
import Icon from 'react-native-vector-icons/FontAwesome';
const PlaceholderCar = () => {
  return (
    <View
      style={[
        styles.itemsContainer,
        {width: 280, height: 300, display: 'flex', justifyContent: 'center'},
      ]}>
      <Text style={{textAlign: 'center'}}>
        <Icon
          name="image"
          size={90}
          color="#F10086"
          style={{textAlign: 'center'}}
        />
        ;
      </Text>
    </View>
  );
};

export default PlaceholderCar;
