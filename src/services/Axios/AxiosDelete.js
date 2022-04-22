import React from 'react';

import axios from 'axios';
import {baseUrl} from './../baseUrl';

const AxiosDelete = props => {
  if (window.confirm('Are you sure you want to delete?') === false) {
    return;
  }

  if (props.setLoading) {
    props.setLoading(true);
  }

  var config = {
    method: 'delete',
    url: baseUrl + `/${props.url}`,
    headers: {
      'Content-Type': 'application/json',
      // authorization: "Bearer " + localStorage.getItem("tokenMus"),
      accept: 'application/json',
    },
  };

  return axios(config).then(function (response) {
    console.log(JSON.stringify(response.data));
    props.fetchData();
    props.setLoading(false);
  });
  // .catch(function (error) {
  //   //   if (error.response.status === 400) {
  //   //     if (props.setDisable) {
  //   //       props.setDisable(true);
  //   //     }
  //   //     }
  //   if (error.response) {
  //     if (error.response.status === 400) {
  //       props.setBadRequestError(true);
  //     }
  //     if (error.response.status === 401) {
  //       props.setBadRequestError(true);
  //     }
  //     if (error.response.status === 500) {
  //       props.setServerError(true);
  //     }
  //     if (error.response.status === 422) {
  //       console.log(error.response.message, "message");
  //       props.setServerError(true);
  //     }
  //     if (error.response.status === 404) {
  //       props.setError404(true);
  //     }
  //   }
  // });
};
export default AxiosDelete;
