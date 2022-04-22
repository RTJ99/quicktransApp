import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyCOqulxPGaTEOX6sP9TexQlZ7S2mC6KOxs',
        language: 'en',
      }}
    />
  );
};

export default GooglePlacesInput;
