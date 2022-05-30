/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {CometChat} from '@cometchat-pro/react-native-chat';

/* const cometLogin = () => {
  var UID = 'jena';
  var authKey = '989f975b620c1588b06b67fe2f6956e78c2ec031';

  CometChat.getLoggedinUser().then(
    user => {
      if (!user) {
        CometChat.login(UID, authKey).then(
          user => {
            console.log('Login Successful:', {user});
          },
          error => {
            console.log('Login failed with exception:', {error});
          },
        );
      }
    },
    error => {
      console.log('Something went wrong', error);
    },
  );
};

const appID = '208722e8dbdb9d28';
const region = 'us';
const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();
CometChat.init(appID, appSetting).then(
  async () => {
    console.log('Initialization completed successfully');
    await cometLogin();
    // You can now call login function.
  },
  error => {
    console.log('Initialization failed with error:', error);
    // Check the reason for error and take appropriate action.
  },
); */

AppRegistry.registerComponent(appName, () => App);
