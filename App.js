/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from './components/SignupForm';
import Login from './components/LoginForm';
import {ActivityIndicator, View, Text, TouchableOpacity} from 'react-native';
import {AuthContext} from './components/context/Context';
import globalStyles from './globalstyles/globalStyles';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  const Stack = createStackNavigator();

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };

      case 'SIGNUP':
        return {
          ...state,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'SIGNOUT':
        return {
          ...state,
          username: null,
          userToken: null,
          isLoading: false,
        };
      case 'RETREIVE_TOKEN':
        return {
          ...state,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      logIn: async (username, password) => {
        // setUserToken('fkg'), setIsLoading(false);
        let userToken = null;
        if (username === 'user' && password === 'user') {
          userToken = 'ff';
          try {
            await AsyncStorage.setItem('userToken', userToken);
          } catch (e) {
            console.log(e);
          }
        }
        dispatch({type: 'LOGIN', id: username, token: userToken});
      },
      signOut: async () => {
        // setUserToken(null), setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'SIGNOUT'});
      },
      signUp: () => {
        setUserToken('fkg'), setIsLoading(false);
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETREIVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // const {signOut} = useContext(AuthContext)

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken === null ? (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        ) : (
          <View>
            <Text>login</Text>
            <TouchableOpacity
              style={globalStyles.signupButton}
              onPress={authContext.signOut}>
              <Text style={globalStyles.signupButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
