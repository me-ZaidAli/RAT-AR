/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext} from 'react';
// import {View, TextInput, TouchableOpacity, Switch} from 'react-native';
import {Formik} from 'formik';
import globalStyles from '../globalstyles/globalStyles';
import signupSchema from './yup_schema/schemas';
import {AuthContext} from './context/AuthContext';
import {Layout, Text, Input, Button} from '@ui-kitten/components';

const Signup = ({navigation}) => {
  const {signUp} = useContext(AuthContext);

  const confirmPassword = (password, cpassword) => {
    return password.localCompare(cpassword) ? true : false;
  };

  return (
    <Layout style={globalStyles.container}>
      <Formik
        initialValues={{username: '', email: '', password: '', cpassword: ''}}
        validationSchema={signupSchema}
        onSubmit={(values) => {
          signUp(values.email, values.password);
          console.log(values);
        }}>
        {(props) => (
          <Layout style={globalStyles.formContainer} >
            <Text style={globalStyles.formTitle}>SignUp!</Text>
            {/* <TextInput
              placeholder="Username"
              onChangeText={props.handleChange('username')}
              value={props.values.username}
              style={globalStyles.input}
            /> */}
            <Input
              placeholder="Email"
              onChangeText={props.handleChange('email')}
              value={props.values.email}
              style={globalStyles.input}
              status="basic"
              size="large"
            />
            <Text style={globalStyles.errorText}>
              {props.touched.email && props.errors.email}
            </Text>
            <Input
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={props.handleChange('password')}
              value={props.values.password}
              style={globalStyles.input}
              status="basic"
              size="large"
            />
            <Text style={globalStyles.errorText}>
              {props.touched.password && props.errors.password}
            </Text>
            <Input
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={props.handleChange('cpassword')}
              value={props.values.cpassword}
              style={globalStyles.input}
              status="basic"
              size="large"
            />
            <Text style={globalStyles.errorText}>
              {props.touched.cpassword && props.errors.cpassword}
            </Text>
          
            <Button
              style={globalStyles.signupButton}
              onPress={props.handleSubmit}>
              <Text style={globalStyles.signupButtonText}>Signup</Text>
            </Button>
            
            <Button
              appearance="outline"
              style={globalStyles.loginButton}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={globalStyles.loginButtonText} status="primary">
                Login
              </Text>
            </Button>
            
           
          </Layout>
        )}
      </Formik>
    </Layout>
  );
};

// const styles = StyleSheet.create({});

export default Signup;
