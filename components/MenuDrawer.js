/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import globalStyles from '../globalstyles/globalStyles';
import {AuthContext} from './context/AuthContext';

const MenuDrawer = ({navigation}) => {
  //   const {signOut} = useContext(AuthContext);
  // const loginFailedError

  return (
    <TouchableOpacity style={globalStyles.menuDrawer}>
      <Icon name="bars" color="#ffffff" size={20}></Icon>
    </TouchableOpacity>
  );
};

// const styles = StyleSheet.create({});

export default MenuDrawer;
