/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {Layout, TopNavigation,Divider,Icon, TopNavigationAction} from '@ui-kitten/components';

import globalStyles from '../../globalstyles/globalStyles';
import {AuthContext} from '../context/AuthContext';

const LogoutIcon = (props)=>(<Icon {...props} name='log-out-outline' ></Icon>)
 

const HomePage = ({navigation}) => {
  const {signOut} = useContext(AuthContext);
  // const loginFailedError

  return (
    // <View style={globalStyles.container}>
    //   <View style={globalStyles.homeScreenContainer}>
    //     <TouchableOpacity
    //       style={globalStyles.addProblemButton}
    //       // onPress={props.handleSubmit}
    //       >
    //      <Icon name="plus" size={20} color="#ffffff"></Icon>
    //     </TouchableOpacity>
    //   </View>
    // </View>
    <SafeAreaView style={{flex:1}}>
      <TopNavigation alignment="center" title='Home' accessoryRight={()=>(
        <TopNavigationAction icon={LogoutIcon} onPress={signOut}></TopNavigationAction>
      )} ></TopNavigation>
      <Divider/>
      <Layout style={globalStyles.homeScreenContainer}></Layout>
      <Divider/>

    </SafeAreaView>
    
  );
};

// const styles = StyleSheet.create({});

export default HomePage;
