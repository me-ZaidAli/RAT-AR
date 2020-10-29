import React, {useEffect, useState} from 'react';
import {Button, Icon} from '@ui-kitten/components';
import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';

import requestCameraAndAudioPermission from './Permission';
import styles from '../globalstyles/Style';
import globalStyles from '../globalstyles/globalStyles'

const PhoneOffOutline = (props) => <Icon {...props} name="phone-off"></Icon>;

const Video = ({navigation}) => {
  const [appId, setAppId] = useState('6fbc95615707434392c85cff827b9d54');
  const [token, setToken] = useState(
    '0066fbc95615707434392c85cff827b9d54IAAS3RQ3SDWH1G8z1dxEMWR4Sg6iG/wGehWhkWdaj46UgwJkFYoAAAAAEADJ+bHOhQObXwEAAQCEA5tf',
  );
  const [channelName, setChannelName] = useState('channel-x');
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
    console.log(`Channel name is ${channelName}`);
    console.log(engine);
    init();
  }, []);

  const init = async () => {
    let engine = await RtcEngine.create(appId);
    await engine.enableVideo();

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

    startCall(engine)

};

  const startCall = async (engine) => {
    await engine.joinChannel(token, channelName, null, 0);
  };

  const endCall = async () => {
    await engine.leaveChannel();
    setPeerIds([]);
    setJoinSucceed(false);
    navigation.navigate('Home')
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
              channelId={channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };

  const renderVideos = () => {
    return joinSucceed ? (
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView
          style={styles.max}
          channelId={channelName}
          renderMode={VideoRenderMode.Hidden}
        />
        <View style={styles.customButtonHolder}>
          <Button
            onPress={endCall}
            style={globalStyles.hangUpButton}
            size="large"
            accessoryRight={PhoneOffOutline}></Button>
        </View>
        {renderRemoteVideos()}
      </View>
    ) : null;
  };

  return (
    <View style={styles.max}>
      <View style={styles.max}>
        <View style={styles.buttonHolder}>
          {/* <TouchableOpacity onPress={startCall} style={styles.button}>
            <Text style={styles.buttonText}> Start Call </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={endCall} style={styles.button}>
            <Text style={styles.buttonText}> End Call </Text>
          </TouchableOpacity> */}
        </View>

        {renderVideos()}
      </View>
    </View>
  );
};

export default Video;
