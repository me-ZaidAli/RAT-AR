import React, {useEffect, useState} from 'react';
import {
  Layout,
  Button,
  Icon,
  Divider,
  TopNavigation,
  Spinner,
  Text,
} from '@ui-kitten/components';
import {
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
  ChannelMediaOptions,
} from 'react-native-agora';

import requestCameraAndAudioPermission from './Permission';
import styles from '../globalstyles/Style';
import globalStyles from '../globalstyles/globalStyles';
import axios from 'axios';
import {ViroARSceneNavigator} from '@akadrimer/react-viro';
import ARSample from './ARSample'

const PhoneOffOutline = (props) => <Icon {...props} name="phone-off"></Icon>;
const SwitchCameraIcon = (props) => <Icon name="swap" {...props}></Icon>;
// const LoadingIndicator = (props) =>;

const Video = ({navigation, route}) => {
  let token = '';
  let channelName = !route.params ? '123' : route.params.channelId;
  const [appId, setAppId] = useState('6fbc95615707434392c85cff827b9d54');
  const [joinSucceed, setJoinSucceed] = useState(false);
  const [peerIds, setPeerIds] = useState([]);
  const [engine, setEngine] = useState('');

  useEffect(() => {
    if (Platform.OS === 'android') {
      // Request required permissions from Android
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
    // console.log(`Channel name is ${channelName}`);

    init();
  }, []);

  function getToken() {
    return axios.get(
      `https://token-generation-server.herokuapp.com/rtcToken?ChannelName=${channelName}`,
    );
  }

  const init = async () => {
    console.log(route);

    let response = await getToken();
    console.log(response.data.key);
    token = response.data.key;

    let engine = await RtcEngine.create(appId);
    await engine.enableVideo();

    // channelObject = await engine.createRtcChannel('123');
    // console.log(channelObject);

    // channelObject.on('JoinChannelSuccess', (channel, uid, elapsed) => {
    //   console.log('JoinChannelSuccess', channel, uid, elapsed);
    //   // Set state variable to true
    //   setJoinSucceed(true);
    // });

    engine.addListener('Warning', (warn) => {
      console.log('Warning', warn);
    });

    engine.addListener('Error', (err) => {
      console.log('Error', err);
    });

    engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      // Get current peer IDs
      // const {peerIds} = this.state
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        setPeerIds([...peerIds, uid]);
      }
    });

    engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      // const {peerIds} = this.state
      // this.setState({
      //     // Remove peer ID from state array
      //     peerIds: peerIds.filter(id => id !== uid)
      // })
      setPeerIds(peerIds.filter((id) => id !== uid));
    });

    // If Local user joins RTC channel
    engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);
      // Set state variable to true
      setJoinSucceed(true);
    });
    setEngine(engine);
    startCall(engine);
  };

  const startCall = async (engine) => {
    console.log('token is ' + token);
    const message = await engine.switchCamera();

    // let mediaOptions = new ChannelMediaOptions();
    // mediaOptions.autoSubscribeAudio = true;
    // mediaOptions.autoSubscribeVideo = true;
    await engine.joinChannel(token, channelName, null, 0);
    // await channelObject.joinChannel(token,'123',null,mediaOptions);
  };

  const endCall = async () => {
    await engine.leaveChannel();
    setPeerIds([]);
    setJoinSucceed(false);
    navigation.navigate('Home');
  };

  const renderRemoteVideos = () => {
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={{paddingHorizontal: 2.5}}
        horizontal={true}>
        {peerIds.map((value, index, array) => {
          return (
            <RtcRemoteView.SurfaceView
              style={styles.remote}
              uid={value}
              channelId={'123'}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };

  const renderVideos = () => {
    return(
      <View style={styles.fullView}>
        {/* <RtcLocalView.SurfaceView
          style={styles.max}
          channelId={'123'}
          renderMode={VideoRenderMode.Hidden}
        /> */}
        {/* <View style={styles.ArContainer}> */}
        <ViroARSceneNavigator initialScene={{scene: ARSample}} />
        {/* </View> */}
        <View style={styles.customButtonHolder}>
          <Button
            onPress={endCall}
            style={globalStyles.hangUpButton}
            size="large"
            accessoryRight={PhoneOffOutline}></Button>
          {/* <Button
            onPress={engine.switchCamera}
            size="large"
            // appearance="ghost"
            status="basic"
            accessoryRight={SwitchCameraIcon}></Button> */}
        </View>
        {/* {renderRemoteVideos()} */}
        
      </View>
    )
  };

  return (
    <SafeAreaView>
      <TopNavigation
        alignment="center"
        title={`channel Id: ${channelName}`}
        // accessoryRight={() => (
        //   <TopNavigationAction
        //     // icon={LogoutIcon}
        //     onPress={signOut}></TopNavigationAction>
        // )}
        // accessoryLeft={() => (
        //   <TopNavigationAction icon={MenuIcon}></TopNavigationAction>
        // )}
      ></TopNavigation>
      <Divider />
     
      {/* {!joinSucceed ? (
        <Layout style={globalStyles.videoLoadContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 230,
            }}>
            <Spinner size="small" />
            <Text category="h6" appearance="hint">
              Waiting for call to initiate
            </Text>
          </View>
        </Layout>
      ) : ( */}
        <View style={styles.max}>
          <View style={styles.max}>
            {/* <View style={styles.ArContainer}>
              <ViroARSceneNavigator initialScene={{scene: ARSample}} />
            </View> */}

            {renderVideos()}
          </View>
        </View>
       {/* )} */}
    </SafeAreaView>
  );
};

export default Video;
