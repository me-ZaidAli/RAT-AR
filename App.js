/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import Icon from 'react-native-vector-icons/FontAwesome';

import Signup from './components/SignupForm';
import Login from './components/LoginForm';
import HomePage from './components/HomePage';
import MenuDrawer from './components/MenuDrawer';
import Video from './components/Video';

import HomeScreen from './components/tabs/HomeScreen';
import Tab2 from './components/tabs/Tab2';
import Tab3 from './components/tabs/Tab3';

import {ActivityIndicator, View} from 'react-native';
import globalStyles from './globalstyles/globalStyles';

import auth from '@react-native-firebase/auth';
import AuthContextProvider from './components/context/AuthContext';

const HomeIcon = (props) => <Icon name="home-outline" {...props}></Icon>;

const PersonIcon = (props) => <Icon name="person-outline" {...props}></Icon>;

const App = () => {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  const MateriaTopTabs = createMaterialTopTabNavigator();
  const bottomTabs = createBottomTabNavigator();

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  // function createHomeStack() {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen
  //         name="Home"
  //         component={HomePage}
  //         options={{
  //           title: 'Home',
  //         }}
  //       />
  //       <Stack.Screen name="Top Tabs" children={createTopTabs} />
  //     </Stack.Navigator>
  //   );
  // }

  // function createTopTabs() {
  //   return (
  //     <MateriaTopTabs.Navigator>
  //         <MateriaTopTabs.Screen name='Tab1' component={Tab1}></MateriaTopTabs.Screen>
  //         <MateriaTopTabs.Screen name='Tab2' component={Tab2}></MateriaTopTabs.Screen>
  //         <MateriaTopTabs.Screen name='Tab3' component={Tab3}></MateriaTopTabs.Screen>
  //     </MateriaTopTabs.Navigator>
  //   )
  // }
  const BottomTabBar = ({navigation, state}) => (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title="HOME" icon={HomeIcon} />
      <BottomNavigationTab title="PROFILE" icon={PersonIcon} />
    </BottomNavigation>
  );
  function createBottomTabs() {
    return (
      // <MaterialBottomTabs.Navigator
      //   initialRouteName="Home"
      //   activeColor="#009688"
      //   inactiveColor="#131C21"
      //   barStyle={{backgroundColor: '#262D31', elevation: 10}}>
      //   <MaterialBottomTabs.Screen
      //     name="Home"
      //     component={HomeScreen}
      //     options={{
      //       tabBarLabel: 'Home',
      //       tabBarIcon: ({color, focused}) => (
      //         <Icon name="home" color={color} size={22} />
      //       ),
      //     }}
      //   />

      //   <MaterialBottomTabs.Screen
      //     name="Profile"
      //     component={Tab3}
      //     options={{
      //       tabBarLabel: 'Profile',
      //       tabBarIcon: ({color, focused}) => (
      //         <Icon name="user" color={color} size={22} />
      //       ),
      //     }}
      //   />
      // </MaterialBottomTabs.Navigator>
      <bottomTabs.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
        <bottomTabs.Screen name="Home" component={HomeScreen} />
        <bottomTabs.Screen name="Profile" component={Tab2} />
      </bottomTabs.Navigator>
    );
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log(user);
    return subscriber;
  }, []);

  if (initializing) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        <AuthContextProvider>
          <NavigationContainer>
            {!user ? (
              <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
              </Stack.Navigator>
            ) : (
              // <Drawer.Navigator>
              //   <Drawer.Screen
              //     name="Home"
              //     children={createHomeStack}></Drawer.Screen>
              //   <Drawer.Screen name="Screen1" component={Screen1}></Drawer.Screen>
              //   <Drawer.Screen name="Screen2" component={Screen2}></Drawer.Screen>
              //   <Drawer.Screen name="Screen3" component={Screen3}></Drawer.Screen>
              // </Drawer.Navigator>
              // createHomeStack()

              <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={createBottomTabs} />
                {/* <Stack.Screen name="Login" component={Login} /> */}
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </AuthContextProvider>
      </ApplicationProvider>
    </>

    // <Video></Video>
  );
};

export default App;
