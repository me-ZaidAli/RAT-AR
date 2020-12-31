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
  Drawer,
  DrawerItem,
  IndexPath,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {default as theme} from './custom-theme.json';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import Icon from 'react-native-vector-icons/FontAwesome';

import Signup from './components/SignupForm';
import Login from './components/LoginForm';
import MenuDrawer from './components/MenuDrawer';
import Video from './components/VideoCall';
import HomeScreen from './components/tabs/HomeScreen';
import Tab2 from './components/tabs/Tab2';
import Tab3 from './components/tabs/Tab3';

import {ActivityIndicator, View} from 'react-native';
import globalStyles from './globalstyles/globalStyles';

import auth from '@react-native-firebase/auth';
import AuthContextProvider from './components/context/AuthContext';

// Loading icons
const HomeIcon = (props) => <Icon name="home-outline" {...props}></Icon>;
const PersonIcon = (props) => <Icon name="person-outline" {...props}></Icon>;

const App = () => {
  //Initializing multiple navigators
  const Stack = createStackNavigator();
  const MenuDrawer = createDrawerNavigator();
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

  // Configuring drawer before initializing it
  const DrawerContent = ({navigation, state}) => (
    <Drawer
      selectedIndex={new IndexPath(state.index)}
      onSelect={(index) => navigation.navigate(state.routeNames[index.row])}>
      <DrawerItem title="Home" />
      <DrawerItem title="Profile" />
    </Drawer>
  );

  // Initializing drawer
  const createDrawer = () => (
    <MenuDrawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}>
      <MenuDrawer.Screen name="Home" component={createHomeStack} />
      {/* <Drawer.Screen name="Profile" />
      <Drawer.Screen /> */}
    </MenuDrawer.Navigator>
  );

  //Configuring BottomNavigationTabs
  const BottomTabBar = ({navigation, state}) => (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title="HOME" icon={HomeIcon} />
      <BottomNavigationTab title="PROFILE" icon={PersonIcon} />
    </BottomNavigation>
  );

  // Initializing BottomNavigationTabs
  function createBottomTabs() {
    return (
      <bottomTabs.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
        <bottomTabs.Screen name="Home" component={HomeScreen} />
        <bottomTabs.Screen name="Profile" component={Tab2} />
      </bottomTabs.Navigator>
    );
  }

  // Initializing Homescreen stack
  const createHomeStack = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={createBottomTabs} />
      {/* <Stack.Screen name="Login" component={Login} /> */}
      <Stack.Screen name="Video" component={Video} />
    </Stack.Navigator>
  );

  useEffect(() => {
    // Maintaining app state
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
      <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
        <AuthContextProvider>
          <NavigationContainer>
            {!user ? (
              <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
              </Stack.Navigator>
            ) : (
              createDrawer()
            )}
          </NavigationContainer>
        </AuthContextProvider>
      </ApplicationProvider>
    </>
  );
};

export default App;
