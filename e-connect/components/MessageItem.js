// e-connect/components/MessageItem.js
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//import Video from 'react-native-video';
import { Video } from 'expo-av';
import { Image } from 'expo-image';

export default function MessageItem({ message, currentUser }) {
  const renderMessage = () => {
    if(message?.type === 'text') {
      return (
        <Text style={styles.text}>{message?.text}</Text>
      )
    }
    else if (message?.type.includes('video/mp4')) {
      return (
        <Video source={{uri: 'https://firebasestorage.googleapis.com/v0/b/e-connect-97b70.appspot.com/o/videos%2FVID-20240415-WA0002.mp4?alt=media&token=8cd1d34a-d69c-4fe9-a41e-0ca01796cec3'}}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{ width: 300, height: 300 }}
        />
      )
    } else if(message?.type.includes('image')) {
      console.log('Image uri: ', message?.url);
      return (
        <Image source={{uri: message?.url}} style={{width: 200, height: 200}} />
      )
    }
  }
  if (currentUser?.userId == message?.userId) {
    return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', margin: 10}}>
            <View style={styles.textView}>
              {renderMessage()}
            </View>
        </View>
    )
  } else {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', margin: 10}}>
        <View style={[styles.textView, {backgroundColor: 'rgb(40, 60 ,100)'}]}>
          {renderMessage()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    textView :{
        backgroundColor: 'gray',
        width: wp(20),
        height: hp(4),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
    },
    text: {
        width: '80%',
        color: 'rgb(220,220,220)',
    },
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
})