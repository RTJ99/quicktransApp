import axios from 'axios';
import {baseUrl} from '../config/baseURL';

export default async ride => {
  const response = await axios.post(`${baseUrl}/offer-ride`, ride);

  if (response.status === 200) {
    return response.data;
  } else {
    return 'FAILED TO CREATE PERSON';
  }
};
