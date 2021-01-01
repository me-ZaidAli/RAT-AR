/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, useState} from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroPolyline,
} from '@akadrimer/react-viro';

export default function ArBoxScene(props) {
  const [line, setLine] = useState([[0, 0, 0]]);
  const [text, setText] = useState('Initializing....');

  var styles = StyleSheet.create({
    helloWorldTextStyle: {
      fontFamily: 'Arial',
      fontSize: 30,
      color: '#ffffff',
      textAlignVertical: 'center',
      textAlign: 'center',
    },
  });

  // Initializing material to assign to objects in AR spae
  ViroMaterials.createMaterials({
    grid: {
      diffuseTexture: require('./res/res/grid_bg.jpg'),
    },
    white: {
      diffuseColor: 'white',
    },
  });

  // Method to detect when some object is dragged in AR space
  function _onDrag(dragToPos, source) {
    console.log(dragToPos[0]);
    console.log(dragToPos[1]);
    console.log(dragToPos[2]);
    console.log('------');

    let temp = [...line];
    temp.push([dragToPos[0], dragToPos[1], dragToPos[2]]);

    console.log(line);

    setLine(temp);
  }

  // Method for detecting the initializing of AR tracking
  function _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      setText('Hello World');
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  // Method for drawing line on the basis of CameraHitTest
  function _onCameraARHitTest(results) {
    if (results.hitTestResults.length > 0) {
      for (var i = 0; i < results.hitTestResults.length; i++) {
        let result = results.hitTestResults[i];
        if (
          result.type == 'ExistingPlaneUsingExtent' ||
          result.type == 'FeaturePoint'
        ) {
          let temp = [...line];
          console.log(temp);
          temp.push(result.transform.position);
          setLine(temp);

          break;
        }
      }
    }
  }

  return (
    // Initial AR scene
    <ViroARScene onTrackingUpdated={_onInitialized}>
      <ViroARPlaneSelector
        onPlaneSelected={() => {
          setLine([[0, 0, 0]]);
          console.log('plane selected');
        }}>
        {/* <ViroNode */}
          {/* position={[0, -1, 0]}
          dragType="FixedToWorld"
          > */}
          <ViroBox position={[0, 0, -0.25]} scale={[0.2, 0.2, 0.2]} materials={"grid"}/>  
        {/* </ViroNode> */}
        {/* <ViroPolyline position={[0,0,-.25]} points={line} thickness={0.1}
        materials={"white"} /> */}
        {/* <ViroPolyline position={[0,0,0]} points={line} thickness={0.1}
        materials={"white"} /> */}
      </ViroARPlaneSelector>
    </ViroARScene>
  );
}
