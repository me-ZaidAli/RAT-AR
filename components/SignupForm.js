/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Switch} from 'react-native';
import {Formik} from 'formik';
import globalStyles from '../globalstyles/globalStyles';
import axios from 'axios';
import signupSchema from './yup_schema/schemas';

import {Header} from 'react-native/Libraries/NewAppScreen';

const Signup = ({navigation}) => {
  const confirmPassword = (password, cpassword) => {
    return password.locaCompare(cpassword) ? true : false;
  };

  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{username: '', email: '', password: '', cpassword: ''}}
        validationSchema={signupSchema}
        onSubmit={(values) => {
          // axios.get('http://192.168.10.5:3000/').then(function (response) {
          //   // handle success
          //   console.log(response);
          // });
          console.log(values);
        }}>
        {(props) => (
          <View style={globalStyles.formContainer}>
            <Text style={globalStyles.formTitle}>SignUp!</Text>
            {/* <TextInput
              placeholder="Username"
              onChangeText={props.handleChange('username')}
              value={props.values.username}
              style={globalStyles.input}
            /> */}
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
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={props.handleChange('cpassword')}
              value={props.values.cpassword}
              style={globalStyles.input}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.cpassword && props.errors.cpassword}
            </Text>
            <TouchableOpacity
              style={globalStyles.signupButton}
              onPress={props.handleSubmit}>
              <Text style={globalStyles.signupButtonText}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.loginButton}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={globalStyles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

// const styles = StyleSheet.create({});

export default Signup;
