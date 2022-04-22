import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StatusBar, Image} from 'react-native';
import logo from '../assets/logo.png';
import {styles} from '../style';

export default function SplashScreen({navigation}) {
  return (
    <>
      <StatusBar backgroundColor="#4caf4f" />
      <View style={[styles.container]}>
        <View style={[{flex: 1}]}></View>
        <View style={[styles.body, {flex: 3}]}>
          <Image style={{width: 200, height: 200}} source={logo} />
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 40,
                fontWeight: 'bold',
                color: '#57B7EB',
                marginTop: 10,
                marginBottom: 20,
              }}>
              Quick Trans
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.primaryButton]}
            onPress={() => navigation.navigate('Main')}>
            <Text style={[styles.buttonText, {color: '#fff'}]}> Proceed </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
