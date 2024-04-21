// e-connect/components/MessageItem.js
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function MessageItem({ message, currentUser }) {
  if (currentUser?.userId == message?.userId) {
    return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', margin: 10}}>
            <View style={styles.textView}>
                <Text style={styles.text}>{message?.text}</Text>
            </View>
        </View>
    )
  } else {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', margin: 10}}>
        <View style={[styles.textView, {backgroundColor: 'rgb(40, 60 ,100)'}]}>
          <Text style={styles.text}>{message?.text}</Text>
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
    }
})