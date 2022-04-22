import * as React from 'react';

import {useState, useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const useApiRequest = (url, defaultValue = []) => {
  const [data, setData] = useState(defaultValue);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = React.useCallback(() => {
    setLoading(true);
    var config = {
      headers: {
        'Content-Type': 'application/json',
        // authorization: 'Bearer ' + AsyncStorage.getItem('token'),
      },
    };
    axios
      .get(url, config)
      .then(response => {
        setLoading(false);
        setIsLoaded(true);
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        setIsLoaded(true);
      });
  }, [url]);
  useEffect(() => {
    fetchData();
  }, [url, fetchData]);

  return {error, isLoaded, data, fetchData, loading};
};
