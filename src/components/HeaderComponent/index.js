import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {HamburgerIcon, Menu, Pressable, Box} from 'native-base';

import Icon from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';
const Header = props => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 3,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#c3dff7',
      }}>
      <Box>
        <Text
          style={{
            textAlign: 'center',
            color: '#57B7EB',
            fontSize: 28,
            fontWeight: 'bold',
          }}>
          Quick Trans
        </Text>
      </Box>

      <TouchableOpacity h="80%" alignItems="flex-start" onPress={props.logout}>
        <Icon name={'log-out'} color={'#57B7EB'} size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
