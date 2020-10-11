/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Container, Header, Title, Icon, Left, Right, Body} from 'native-base';
import {Button} from 'react-native-paper';

import globalStyles from '../globalstyles/globalStyles';
import {AuthContext} from './context/AuthContext';

const HomePage = ({navigation}) => {
  const {signOut} = useContext(AuthContext);
  // const loginFailedError

  return (
    <View>
      {/* <View>
        <Header noShadow style={globalStyles.header}>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Header No Shadow</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
      </View> */}
      <View style={globalStyles.container}>
        {/* <Text>login</Text>
        <TouchableOpacity style={globalStyles.signupButton} onPress={signOut}>
          <Text style={globalStyles.signupButtonText}>Login</Text>
        </TouchableOpacity>
        <Button
          onPress={() => {
            navigation.setOptions({headerTitle: 'lun'});
          }}>
          <Text>Props Details</Text>
        </Button> */}
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({});

export default HomePage;
