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
        height: 70,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#233b',
      }}>
      <Box>
        <Text
          style={{
            textAlign: 'center',
            color: '#005792',
            fontSize: 20,
            fontFamily: 'Rubik-Black',
          }}>
          Quick Trans
        </Text>
      </Box>

      <Box>
        <Menu
          trigger={triggerProps => {
            return (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}>
                <HamburgerIcon color={'#005792'} />
              </Pressable>
            );
          }}>
          <Menu.Item onPress={props.logout}>Logout</Menu.Item>
        </Menu>
      </Box>
    </View>
  );
};

export default Header;
