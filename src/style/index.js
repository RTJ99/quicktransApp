import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    color: 'black',
  },
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000000',
  },
  mapsContainer: {
    height: 520,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  search: {
    flex: 1,
    width: 300,
    marginTop: 10,
    position: 'absolute',

    zIndex: 5,
  },
  primaryTextColor: {color: '#000'},
  secondaryTextColor: {
    color: '#000',
  },
  itemsContainer: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#F1F6FE',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    marginTop: 5,
  },
  body: {
    flex: 1,
    margin: 20,

    backgroundColor: '#fff',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#57B7EB',
    // backgroundColor: '#FC8080',
    padding: 10,
    borderRadius: 20,
  },
  cancelButton: {
    backgroundColor: '#FC8080',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
  },
  form: {
    marginHorizontal: 5,
    justifyContent: 'space-evenly',
  },

  secondaryButton: {
    backgroundColor: '#ffeb3b',
    padding: 10,
    borderRadius: 10,
  },
  defaultButton: {
    backgroundColor: '#00bcd4',
    padding: 10,
    borderRadius: 10,
  },
  textInput: {
    borderColor: '#389D7B',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
  },
  datePicker: {
    padding: 8,
  },
  search: {
    flex: 1,
    width: 270,
    marginTop: 20,
    marginBottom: 10,
    zIndex: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor: '#fff',
  },
});
