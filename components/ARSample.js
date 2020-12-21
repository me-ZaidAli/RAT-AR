/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component,useState } from 'react';

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
  ViroPolyline
} from '@akadrimer/react-viro';


export default function ARSample (props) {

  // constructor() {
  //   super();

  //   // Set initial state here
  //   // this.state = {
  //   //   // text : "Initializing AR...",
  //   //   line:[[0,0,0]]
  //   // };
  //   this.line = [[0,0,0]]

  //   // bind 'this' to functions
  //   this._onInitialized = this._onInitialized.bind(this);
  //   this._onTouch = this._onTouch.bind(this)
  //   this._onDrag = this._onDrag.bind(this)
  // }

  // render() {
    const [line,setLine] = useState([[0,0,0]])  
    const [text,setText] = useState('Initializing....')

    var styles = StyleSheet.create({
      helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',
      },
    });
    
    
    ViroMaterials.createMaterials({
      grid: {
        diffuseTexture: require('./res/res/grid_bg.jpg'),
      },
      white:{
        diffuseColor:"white"
      }
    });

    function _onDrag(dragToPos, source){
      console.log(dragToPos[0])
      console.log(dragToPos[1])
      console.log(dragToPos[2])
      console.log('------')
      
      let temp = [...line]
      temp.push([dragToPos[0],dragToPos[1],dragToPos[2]])

      console.log(line)

      setLine(temp)
      
    }

    function _onInitialized(state, reason) {
      if (state == ViroConstants.TRACKING_NORMAL) {
        setText('Hello World')
      } else if (state == ViroConstants.TRACKING_NONE) {
        // Handle loss of tracking
      }
    }

    function _onTouch(state, touchPos, source){
      if(state == 1) {  
        console.log('touch down') 
      } else if(state == 2) {
        console.log('touch down move')
      } else if(state == 3) { 
        console.log('Bitch!') 
      }
    }

    function _onCameraARHitTest(results) {
      if(results.hitTestResults.length > 0) {
        for (var i = 0; i < results.hitTestResults.length; i++) {
            let result = results.hitTestResults[i];
            if (result.type == "ExistingPlaneUsingExtent" || result.type == "FeaturePoint") {
              let temp = [...line]
              console.log(temp)
              temp.push(result.transform.position)
              setLine(temp)
              
              //  points: this.state.points.push(result.transform.position),
               break;
           } 
        }
     }
  }

  return (
    <ViroARScene onTrackingUpdated={_onInitialized} >
      <ViroARPlaneSelector onPlaneSelected={()=>{
                                              setLine([[0,0,0]])
                                              console.log('plane selected')}}>
        <ViroNode position={[0,-1,0]} dragType="FixedToWorld" onTouch = {_onTouch} >
          <ViroBox position={[0, 0, -.25]} scale={[.1, .1, .1]} />
        </ViroNode>
        {/* <ViroPolyline position={[0,0,-.25]} points={line} thickness={0.1}
        materials={"white"} /> */}
         {/* <ViroPolyline position={[0,0,0]} points={line} thickness={0.1}
        materials={"white"} /> */}
      </ViroARPlaneSelector>
    </ViroARScene>
    );
  
}
