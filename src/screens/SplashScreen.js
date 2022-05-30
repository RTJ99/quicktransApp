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
          <View style={{flex: 1}}>
            <Image style={{width: 200, height: 200}} source={logo} />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#005792',
              height: 50,
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
              width: 250,
            }}
            onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                color: '#fff',
                width: 200,
                textAlign: 'center',
                fontFamily: 'DMSans',
              }}>
              Get Started
            </Text>
          </TouchableOpacity>
          <View style={{}}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'DMSans',
                fontSize: 15,
                color: '#005792',
                marginTop: 10,
                marginBottom: 20,
              }}>
              Ready to earn?
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
