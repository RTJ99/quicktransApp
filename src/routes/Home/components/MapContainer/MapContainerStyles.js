import {StyleSheet, Dimensions} from 'react-native';

const styles = {
  container: {
    height: 520,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#000',
  },
};

export default styles;
