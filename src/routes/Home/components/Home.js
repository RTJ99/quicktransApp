import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
// import {Actions} from 'react-native-router-flux';

import {Container} from 'native-base';

import MapContainer from './MapContainer';
// import HeaderComponent from '../../../components/HeaderComponent';
// import FooterComponent from '../../../components/FooterComponent';
import Fare from './Fare';
import Fab from './Fab';
import FindDriver from './FindDriver';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {getCurrentLocation} from '../module/home';
const carMarker = <Icon name="car" size={30} color="#900" />;
const Home = props => {
  console.log(typeof props.getCurrentLocation, 'prrrrrrrrrr');
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentLocation()(dispatch);
    setTimeout(function () {
      props.getNearByDrivers();
    }, 1000);
  });

  //   componentDidUpdate(prevProps, prevState) {
  //     if (props.booking.status === 'confirmed') {
  //       Actions.trackDriver({type: 'reset'});
  //     }
  //     props.getCurrentLocation();
  //   }

  const region = {
    latitude: 3.146642,
    longitude: 101.695845,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const {status} = props.booking;
  return (
    <Container>
      {(status !== 'pending' && (
        <View style={{flex: 1}}>
          <MapContainer
            region={region}
            getInputData={props.getInputData}
            toggleSearchResultModal={props.toggleSearchResultModal}
            getAddressPredictions={props.getAddressPredictions}
            resultTypes={props.resultTypes}
            predictions={props.predictions}
            getSelectedAddress={props.getSelectedAddress}
            selectedAddress={props.selectedAddress}
            carMarker={carMarker}
            nearByDrivers={props.nearByDrivers}
          />

          <Fab onPressAction={() => props.bookCar()} />
          {props.fare && <Fare fare={props.fare} />}
          {/* <FooterComponent /> */}
        </View>
      )) || <FindDriver selectedAddress={props.selectedAddress} />}
    </Container>
  );
};

export default Home;
