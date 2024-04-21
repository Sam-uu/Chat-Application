// e-connect/app/(app)/chatRoom.js
import { View, Text, TextInput, TouchableOpacity, Animated, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessageList from '../../components/MessageList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../context/authContext';
import { getRoomId } from '../../utils/common';
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const AnimatedFontAwesome = Animated.createAnimatedComponent(FontAwesome);

export default function ChatRoom() {
  const router = useRouter();
  const item = useLocalSearchParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const textRef = useRef('');

  const scaleSendIcon = useRef(new Animated.Value(inputText ? 1 : 0)).current;
  const scaleMicIcon = useRef(new Animated.Value(inputText ? 0 : 1)).current;

  useEffect(() => {
    if (inputText) {
      Animated.timing(scaleSendIcon, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      Animated.timing(scaleMicIcon, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleSendIcon, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      Animated.timing(scaleMicIcon, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    createRoomIfNotExists();
    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, 'rooms', roomId);
    const messagesRef = collection(docRef, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    let unsubscribe = onSnapshot(q, (snapshot) => {
      let messages = snapshot.docs.map(doc => {
        return doc.data();
      });
      setMessages([...messages]);
    });

    return unsubscribe;
  }, [inputText]);
  const createRoomIfNotExists = async () => {
    let roomId = getRoomId(user?.userId, item?.userId);
    await setDoc(doc(db, 'rooms', roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date())
    });
  }

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    setInputText('');
    textRef.current = '';
    if (!message) return;
    try{
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, 'rooms', roomId);
      const messagesRef = collection(docRef, 'messages');
      const newDoc = await addDoc(messagesRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.firstName + ' ' + user?.lastName,
        createdAt: Timestamp.fromDate(new Date())
      });

      console.log('new message id: ', newDoc.id);
    } catch (error) {
      Alert.alert('Message', error.message);
    }
  }

  console.log('messages: ', messages);

  const handleSendAudio = () => {
    Alert.alert('Audio', 'Audio sent')
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(0,30,0,0.5)' }}>
      <StatusBar style='dark' />
      <ChatRoomHeader user={item} router={router} />
      <View style={{ borderBottomWidth: 1 }} />
      <View style={{ flex: 1, justifyContent: 'space-between', overflow: 'visible' }}>
        <View style={{ flex: 1 }}>
          <MessageList messages={messages} currentUser={ user } />
        </View>
        <View style={{ marginBottom: hp(1), alignItems: 'center' }}>
          <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1, backgroundColor: 'rgb(200, 220, 200)', borderRadius: 50, height: hp(5), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextInput
                style={{ flex: 1, paddingLeft: hp(1), paddingRight: hp(1) }}
                value={inputText}
                placeholder='Message'
                placeholderTextColor='rgb(0,0,0)'
                fontSize={16}
                onChangeText={value => {
                  textRef.current = value;
                  setInputText(value);
                }}
              />
              <TouchableOpacity>
                <FontAwesome onPress={() => Alert.alert('clip')} name="paperclip" size={hp(2.9)} color="black" style={{ marginRight: hp(2) }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <AntDesign onPress={() => Alert.alert('camera')} name="camerao" size={hp(2.9)} color="black" style={{ marginRight: hp(1) }} />
              </TouchableOpacity>
            </View>
            <View style={{ height: hp(5), aspectRatio: 1, backgroundColor: 'rgba(180,255,180,1)', borderRadius: 50, marginLeft: 5, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ height: hp(2.9), width: hp(2.9), justifyContent: 'center', alignItems: 'center' }}>
                <Animated.View style={{ position: 'absolute', transform: [{ scale: scaleSendIcon }] }} pointerEvents={inputText ? "auto" : "none"}>
                  <FontAwesome onPress={() => handleSendMessage()} name="send" size={hp(2.5)} color="black" />
                </Animated.View>
                <Animated.View style={{ position: 'absolute', transform: [{ scale: scaleMicIcon }] }} pointerEvents={!inputText ? "auto" : "none"}>
                  <FontAwesome onPress={() => handleSendAudio()} name="microphone" size={hp(2.9)} color="black" />
                </Animated.View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}