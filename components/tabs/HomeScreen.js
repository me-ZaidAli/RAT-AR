/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext} from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Layout,
  TopNavigation,
  Divider,
  Icon,
  TopNavigationAction,
} from '@ui-kitten/components';

import globalStyles from '../../globalstyles/globalStyles';

import {AuthContext} from '../context/AuthContext';
import CreateChannel from '../HomeStack/CreateChannel';
import {Button} from 'react-native-paper';


const LogoutIcon = (props) => <Icon {...props} name="log-out-outline"></Icon>;
const MenuIcon = (props) => <Icon {...props} name="menu-outline"></Icon>;

const HomePage = ({navigation}) => {
  const {signOut} = useContext(AuthContext);
  // const loginFailedError
  console.log(navigation)

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        alignment="center"
        title="Home"
        accessoryRight={() => (
          <TopNavigationAction
            icon={LogoutIcon}
            onPress={signOut}></TopNavigationAction>
        )}
        accessoryLeft={() => (
          <TopNavigationAction
            icon={MenuIcon}
            
            ></TopNavigationAction>
        )}></TopNavigation>
      <Divider />
      <CreateChannel navigation={navigation}></CreateChannel>
      <Divider />
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({});

export default HomePage;
