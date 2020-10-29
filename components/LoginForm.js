/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext, useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import globalStyles from '../globalstyles/globalStyles';
import {AuthContext} from './context/AuthContext';
import {Layout, Text, Input, Button,Icon} from '@ui-kitten/components';

const EmailIcon = (props)=>(
  <Icon name="email-outline" {...props}></Icon>
)

const PasswordIcon = (props)=>(
  <Icon name="lock-outline" {...props}></Icon>
)

const Login = ({navigation}) => {
  const {logIn} = useContext(AuthContext);
  // const loginFailedError

  return (
    <Layout style={globalStyles.container}>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={(values) => {
          logIn(values.email, values.password);
          console.log(values);
        }}>
        {(props) => (
          <Layout style={globalStyles.formContainer}>
            <Text style={globalStyles.formTitle}>Login!</Text>
            {/* <TextInput
              placeholder="Email"
              onChangeText={props.handleChange('email')}
              value={props.values.email}
              style={globalStyles.input}
            /> */}
            <Input
              placeholder="Email"
              onChangeText={props.handleChange('email')}
              value={props.values.email}
              status="basic"
              size="large"
              style={globalStyles.input}
              accessoryLeft= {EmailIcon} ></Input>
            {/* <Text style={globalStyles.errorText} >
              {props.touched.email && props.errors.email}
            </Text> */}
            <Input
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={props.handleChange('password')}
              value={props.values.password}
              status="basic"
              size="large"
              style={globalStyles.input}
              accessoryLeft={PasswordIcon}
            />
            {/* <Text style={globalStyles.errorText}>
              {props.touched.password && props.errors.password}
            </Text> */}
            {/* <TouchableOpacity
              style={globalStyles.signupButton}
              onPress={props.handleSubmit}>
              <Text style={globalStyles.signupButtonText}>Login</Text>
            </TouchableOpacity> */}
            <Button
              style={globalStyles.signupButton}
              status='primary'
              onPress={props.handleSubmit}>
              <Text style={globalStyles.signupButtonText}>Login</Text>
            </Button>
            {/* <TouchableOpacity
              style={globalStyles.loginButton}
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              <Text style={globalStyles.loginButtonText}>Signup</Text>
            </TouchableOpacity> */}
            <Text style={{fontSize:13,alignSelf:'flex-start'}} appearance="hint"> Oh! You don't have an account yet?</Text>
            <Button
              appearance="outline"
              style={globalStyles.loginButton}
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              <Text style={globalStyles.loginButtonText} status="primary">
                Signup
              </Text>
            </Button>
          </Layout>
        )}
      </Formik>
    </Layout>
  );
};

// const styles = StyleSheet.create({});

export default Login;
