/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import globalStyles from '../../globalstyles/globalStyles';
// import {AuthContext} from './context/AuthContext';

const HomePage = ({navigation}) => {
  // const {signOut} = useContext(AuthContext);
  // const loginFailedError

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.homeScreenContainer}>
        <TouchableOpacity
          style={globalStyles.addProblemButton}
          // onPress={props.handleSubmit}
          >
         <Icon name="plus" size={20} color="#ffffff"></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({});

export default HomePage;
