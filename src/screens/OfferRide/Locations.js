import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const Locations = () => {
  return (
    <View>
      <View style={styles1.search}>
        <GooglePlacesAutocomplete
          placeholder="Pick Up Location"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setPickupCoords(details.geometry.location);
            setDropOffLocation(data.structured_formatting.main_text);
          }}
          query={{
            key: 'AIzaSyCOqulxPGaTEOX6sP9TexQlZ7S2mC6KOxs',
            language: 'en',
          }}
          styles={{
            textInput: {
              backgroundColor: '#F8FAFC',
              borderColor: '#F1F6FE',

              borderWidth: 1,
            },
          }}
        />
        {loading && <ActivityIndicator />}
      </View>
      <View style={[styles1.search, {marginTop: 80}]}>
        <GooglePlacesAutocomplete
          placeholder="Pick Up Location"
          fetchDetails={true}
          onTimeout={timeout}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(details);

            setDropOffCoords(details.geometry.location);
            setPickupLocations(data.structured_formatting.main_text);
          }}
          query={{
            key: 'AIzaSyCOqulxPGaTEOX6sP9TexQlZ7S2mC6KOxs',
            language: 'en',
            components: 'country:zw',
          }}
          styles={{
            textInput: {
              backgroundColor: '#F8FAFC',
              borderColor: '#F1F6FE',

              borderWidth: 1,
            },
          }}
        />
      </View>
    </View>
  );
};

export default Locations;
