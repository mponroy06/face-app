import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as FaceDetector from 'expo-face-detector';
import styles from './css/camera'
import * as ScreenCapture from 'expo-screen-capture';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [detected, setDetected] = useState(false);
  const [faces, setFaces] = useState({});
  const ref = useRef(null);

  useEffect(() => {
    (async () => {
      const { status }  = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const handleFacesDetected = ({ faces }) => {
    setFaces(faces);
    if(faces != ''){
      setDetected(true);
    }else{
      setDetected(false);
    }
  }

  let XleftEyePosition = faces?.[0]?.leftEyePosition.x;
  XleftEyePosition = Number(XleftEyePosition) - 40;
  let YleftEyePosition = faces?.[0]?.leftEyePosition.y;
  YleftEyePosition = Number(YleftEyePosition) - 40;

  let XrightEyePosition = faces?.[0]?.rightEyePosition.x;
  XrightEyePosition = Number(XrightEyePosition) - 40;
  let YrightEyePosition = faces?.[0]?.rightEyePosition.y;
  YrightEyePosition = Number(YrightEyePosition) - 40;

  let XnoseBasePosition = faces?.[0]?.noseBasePosition.x;
  XnoseBasePosition = Number(XnoseBasePosition) - 32;
  let YnoseBasePosition = faces?.[0]?.noseBasePosition.y;
  YnoseBasePosition = Number(YnoseBasePosition) - 32;


  let XmoustachePosition = XnoseBasePosition - 30;
  let YmoustachePosition = YnoseBasePosition  + 40;

  let Xcircle = Number(faces?.[0]?.bounds?.origin.x);
  let Ycircle = Number(faces?.[0]?.bounds?.origin.y);

  let Wcircle = Number(faces?.[0]?.bounds?.size.width);
  let Hcircle = Number(faces?.[0]?.bounds?.size.height);

  const dimStyles  = StyleSheet.create({
    
    lefteyes:{
      left: XleftEyePosition ? XleftEyePosition : 0,
      top: YleftEyePosition ? YleftEyePosition : 0,
    },
    righteyes:{
      left: XrightEyePosition ? XrightEyePosition : 0,
      top: YrightEyePosition ? YrightEyePosition : 0,
    },
    nose:{
      left: XnoseBasePosition ? XnoseBasePosition : 0,
      top: YnoseBasePosition ? YnoseBasePosition : 0,
    },
    moustache:{
      left: XmoustachePosition ? XmoustachePosition : 0,
      top: YmoustachePosition ? YmoustachePosition : 0,
    },
    moustache:{
      left: XmoustachePosition ? XmoustachePosition : 0,
      top: YmoustachePosition ? YmoustachePosition : 0,
    },
    circle:{
      width: Wcircle ? Wcircle : null,
      height: Hcircle ? Hcircle : null,
      top: Ycircle ? Ycircle : null,
      left: Xcircle ? Xcircle : null,
    }
  })
  

//console.log(Xcircle, '/', Ycircle);

  const image = require('./assets/moustache.png');

  const takePicture = async () => {
      const data = await ref.current.takePictureAsync();
      //console.log(data);
      await MediaLibrary.saveToLibraryAsync(data.uri);
  };

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera} 
        type={type}
        onFacesDetected={handleFacesDetected}
        ref={ref}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}
        >
        <View style={[styles.nose, dimStyles.nose, styles.abso, detected ? styles.visible : null]}></View>
        <Image source={require('./assets/moustache.png')} style={[styles.moustache, dimStyles.moustache, styles.abso, detected ? styles.visible : null]} />
        <View style={[styles.lefteyes, styles.abso, dimStyles.lefteyes, detected ? styles.visible : null]}></View>
        <View style={[styles.righteyes, styles.abso, dimStyles.righteyes, detected ? styles.visible : null]}></View>
        <View style={[styles.circle, styles.abso, dimStyles.circle, detected ? styles.visible : null]}></View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={detected ? [styles.button, styles.green] : styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.front ? Camera.Constants.Type.back : Camera.Constants.Type.front
              );
            }}>
            <Text style={detected ? styles.whiteText : null}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={detected ? [styles.button, styles.tomato] : styles.button}
            onPress={takePicture}>
            <Text style={detected ? styles.whiteText : null}> Shoot </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
  
}


