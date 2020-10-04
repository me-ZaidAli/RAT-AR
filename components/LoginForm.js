/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import globalStyles from '../globalstyles/globalStyles';
import {AuthContext} from './context/AuthContext';

const Login = ({navigation}) => {
  const {logIn} = useContext(AuthContext);
  // const loginFailedError

  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={(values) => {
          logIn(values.email, values.password);
          console.log(values);
        }}>
        {(props) => (
          <View style={globalStyles.formContainer}>
            <Text style={globalStyles.formTitle}>Login!</Text>
            <TextInput
              placeholder="Email"
              onChangeText={props.handleChange('email')}
              value={props.values.email}
              style={globalStyles.input}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.email && props.errors.email}
            </Text>
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={props.handleChange('password')}
              value={props.values.password}
              style={globalStyles.input}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.password && props.errors.password}
            </Text>
            <TouchableOpacity
              style={globalStyles.signupButton}
              onPress={props.handleSubmit}>
              <Text style={globalStyles.signupButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.loginButton}
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              <Text style={globalStyles.loginButtonText}>Signup</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

// const styles = StyleSheet.create({});

export default Login;
