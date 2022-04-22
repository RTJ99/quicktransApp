import React from 'react';
import {ApplicationStack} from './src/navigation';
import {NativeBaseProvider, Text, Box} from 'native-base';
import {BottomTabBar} from '@react-navigation/bottom-tabs';
import createStore from './src/store/createStore';
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';

export default function App(props) {
  App.propTypes = {
    store: PropTypes.object.isRequired,
  };

  const initialState = window.___INTITIAL_STATE__;
  const store = createStore(initialState);
  // 2. Use at the root of your app
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <ApplicationStack />
      </Provider>
    </NativeBaseProvider>
  );
}
