// e-connect/app/(app)/chatRoom.js
import { View, Text, TextInput, TouchableOpacity, Animated, Alert, Keyboard } from 'react-native'
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
import { db, storage } from '../../firebaseConfig';
import * as DocumentPicker from 'expo-document-picker';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';
import base64 from 'react-native-base64';
import { BlurView } from 'expo-blur';

global.btoa = base64.encode;
global.atob = base64.decode;

const AnimatedFontAwesome = Animated.createAnimatedComponent(FontAwesome);

export default function ChatRoom() {
  const router = useRouter();
  const item = useLocalSearchParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef(null);
  //const [inputText, setInputText] = useState('');
  const textRef = useRef('');
  const inputRef = useRef(null);

  const scaleSendIcon = useRef(new Animated.Value(textRef.current ? 1 : 0)).current;
  const scaleMicIcon = useRef(new Animated.Value(textRef.current ? 0 : 1)).current;

  useEffect(() => {
    if (textRef.current) {
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
  }, [textRef.current]);

  useEffect(() => {
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

    const KeyboardIsVisible = Keyboard.addListener(
      'keyboardDidShow', updateScrollView
    ) 

    return () => {
      unsubscribe;
      KeyboardIsVisible.remove();
    }
  }, []);

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: false })
    }, 1);
  }

  const createRoomIfNotExists = async () => {
    let roomId = getRoomId(user?.userId, item?.userId);
    await setDoc(doc(db, 'rooms', roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date())
    });
  }

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    textRef.current = '';
    if(inputRef) {
      inputRef?.current?.clear();
    }
    if (!message) return;
    try{
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, 'rooms', roomId);
      const messagesRef = collection(docRef, 'messages');
      const newDoc = await addDoc(messagesRef, {
        userId: user?.userId,
        type: 'text',
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.firstName + ' ' + user?.lastName,
        createdAt: Timestamp.fromDate(new Date())
      });

      console.log('new message file id: ', newDoc.id);
    } catch (error) {
      Alert.alert('Message', error.message);
    }
  }

  console.log('messages: ', messages);

  const handleSendAudio = () => {
    Alert.alert('Audio', 'Audio sent')
  }

  /*
  const handleClip = async () => {
    let result = await DocumentPicker.getDocumentAsync();
    console.log('result: ', result);
  }*/
  const handleClip = async () => {
    let result = await DocumentPicker.getDocumentAsync();

    if (!result.canceled) {
      var path = '';
      try {
        // Upload the file to Firebase Storage
        if(result.assets[0].mimeType.includes('image')) {
          path = 'images/';
        } else if(result.assets[0].mimeType.includes('video')) {
          path = 'videos/';
        } else if(result.assets[0].mimeType.includes('audio')) {
          path = 'audios/';
        } else {
          path = 'files/';
        }

        const storageRef = ref(storage, path + result.assets[0].name);

        const data_url = await FileSystem.readAsStringAsync(result.assets[0].uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await uploadString(storageRef, `data:${result.assets[0].mimeType};base64,${data_url}`, 'data_url');

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(storageRef);
  
        // Prepare the message with the download URL
        const message = {
          userId: user?.userId,
          profileUrl: user?.profileUrl,
          senderName: user?.firstName + ' ' + user?.lastName,
          createdAt: Timestamp.fromDate(new Date()),
          url: downloadURL, // Include the download URL of the video
          storage: result.assets[0].size,
          type: result.assets[0].mimeType,
        };

        // Send the message to Firestore
        let roomId = getRoomId(user?.userId, item?.userId);
        const docRef = doc(db, 'rooms', roomId);
        const messagesRef = collection(docRef, 'messages');
        const newDoc = await addDoc(messagesRef, message);
  
        console.log('new message id: ', newDoc.id);
      } catch (error) {
        console.log('Error message: ', error.message);
        console.log('Error code: ', error.code);
        Alert.alert('Message', error.message);
      }
    }
  };


  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(0,30,0,0.5)' }}>
      <StatusBar style='dark' />
      <ChatRoomHeader user={item} router={router} />
      <View style={{ borderBottomWidth: 1 }} />
      <View style={{ flex: 1, justifyContent: 'space-between', overflow: 'visible' }}>
        <View style={{ flex: 1 }}>
          <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={ user } />
        </View>
        <View style={{ alignItems: 'center', width: '100%' }}>
          <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: hp(1)}}>
            <View style={{ flex: 1, backgroundColor: 'rgb(200, 220, 200)', borderRadius: 50, height: hp(5), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextInput
                style={{ flex: 1, paddingLeft: hp(1), paddingRight: hp(1) }}
                //value={inputText} useState
                ref={inputRef}
                placeholder='Message'
                placeholderTextColor='rgb(0,0,0)'
                fontSize={16}
                onChangeText={value => {
                  textRef.current = value;
                }}
              />
              <TouchableOpacity>
                <FontAwesome onPress={() => handleClip()} name="paperclip" size={hp(2.9)} color="black" style={{ marginRight: hp(2) }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <AntDesign onPress={() => Alert.alert('camera')} name="camerao" size={hp(2.9)} color="black" style={{ marginRight: hp(1) }} />
              </TouchableOpacity>
            </View>
            <View style={{ height: hp(5), aspectRatio: 1, backgroundColor: 'rgba(180,255,180,1)', borderRadius: 50, marginLeft: 5, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ height: hp(2.9), width: hp(2.9), justifyContent: 'center', alignItems: 'center' }}>
                <Animated.View style={{ position: 'absolute', transform: [{ scale: scaleSendIcon }] }} pointerEvents={textRef.current ? "auto" : "none"}>
                  <FontAwesome onPress={() => handleSendMessage()} name="send" size={hp(2.5)} color="black" />
                </Animated.View>
                <Animated.View style={{ position: 'absolute', transform: [{ scale: scaleMicIcon }] }} /*pointerEvents={!textRef.current ? "auto" : "none"}useState*/>
                  <FontAwesome onPress={() => /*handleSendAudio()*/ handleSendMessage()} name="microphone" size={hp(2.9)} color="black" />
                </Animated.View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}