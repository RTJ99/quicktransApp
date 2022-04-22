// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {baseUrl} from '../config/baseURL';

export default async () => {
  //   const personId = await AsyncStorage.getItem('personId');
  if (personId) {
    try {
      const response = await axios.get(`${baseUrl}/car`);

      if (response.status === 200) {
        if (response.data.data) {
          return response.data.data;
        } else {
          return null;
        }
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};
