/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import globalStyles from '../globalstyles/globalStyles';
import {AuthContext} from './context/AuthContext';

const HomeScreen = ({navigation}) => {
  const {signOut} = useContext(AuthContext);
  // const loginFailedError

  return (
    <View>
      <Text>login</Text>
      <TouchableOpacity
        style={globalStyles.signupButton}
        onPress={signOut}>
        <Text style={globalStyles.signupButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

// const styles = StyleSheet.create({});

export default HomeScreen;
