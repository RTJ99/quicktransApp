import React from 'react';
import {View} from 'native-base';
import MapView from 'react-native-maps';
import {StyleSheet, Text, Dimensions} from 'react-native';
import SearchBox from '../SearchBox';
import SearchResults from '../SearchResults';

import styles from './MapContainerStyles.js';

export const MapContainer = ({
  region,
  getInputData,
  toggleSearchResultModal,
  getAddressPredictions,
  resultTypes,
  predictions,
  getSelectedAddress,
  selectedAddress,
  carMarker,
  nearByDrivers,
}) => {
  const {selectedPickUp, selectedDropOff} = selectedAddress || {};

  //   const styles = StyleSheet.create({
  //     container: {
  //       flex: 1,
  //       backgroundColor: '#fff',
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //     },
  //     map: {
  //       width: Dimensions.get('window').width,
  //       height: Dimensions.get('window').height,
  //     },
  //   });

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} />
      {/* <MapView
				provider={MapView.PROVIDER_GOOGLE}
				style={styles.map}
				region={region}
			>

				{ selectedPickUp &&
					<MapView.Marker
						coordinate={{latitude:selectedPickUp.latitude, longitude:selectedPickUp.longitude}}
						pinColor="green"

					/>	
				}
				{ selectedDropOff &&
					<MapView.Marker
						coordinate={{latitude:selectedDropOff.latitude, longitude:selectedDropOff.longitude}}
						pinColor="blue"

					/>	
				}

				{
					nearByDrivers && nearByDrivers.map((marker, index)=>
						<MapView.Marker
							key={index}
							coordinate={{latitude:marker.coordinate.coordinates[1], longitude:marker.coordinate.coordinates[0] }}
							image={carMarker}
						/>	
					)
				}


			</MapView> */}
      <SearchBox
        getInputData={getInputData}
        toggleSearchResultModal={toggleSearchResultModal}
        getAddressPredictions={getAddressPredictions}
        selectedAddress={selectedAddress}
      />
      {(resultTypes.pickUp || resultTypes.dropOff) && (
        <SearchResults
          predictions={predictions}
          getSelectedAddress={getSelectedAddress}
        />
      )}
    </View>
  );
};

export default MapContainer;
