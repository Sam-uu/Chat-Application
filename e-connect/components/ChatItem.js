// e-connect/components/ChatItem.js
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from "../context/authContext";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { blurhash, getRoomId } from '../utils/common';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { BlurView } from 'expo-blur';
import * as Cellular from 'expo-cellular';

export default function ChatItem({ item, router, currentUser }) {

    const [lastMessage, setLastMessage] = useState(undefined);
    useEffect(() => {
        let roomId = getRoomId(currentUser?.userId, item?.userId);
        const docRef = doc(db, 'rooms', roomId);
        const messagesRef = collection(docRef, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'desc'));

        let unsubscribe = onSnapshot(q, (snapshot) => {
            let messages = snapshot.docs.map(doc => {
            return doc.data();
            });
            setLastMessage(messages[0]? messages[0]: null);
        });

        return unsubscribe;
    }, []);

    console.log('Last message: ', 'Receiver: ', item?.userId, lastMessage?.text, 'MessageId: ', lastMessage?.userId, 'CurrentUserId: ', currentUser?.userId);

    const openChatRoom = () => {
        router.push({ pathname: '/chatRoom', params: item });
    }

    const renderTime = () => {
        if (lastMessage) {
            const messageDate = new Date(lastMessage.createdAt.seconds * 1000);
            const currentDate = new Date();
            const yesterday = new Date(currentDate);
            yesterday.setDate(currentDate.getDate() - 1);
            if (
                messageDate.getDate() === currentDate.getDate() &&
                messageDate.getMonth() === currentDate.getMonth() &&
                messageDate.getFullYear() === currentDate.getFullYear()
            ) {
                const hours = messageDate.getHours().toString().padStart(2, '0');
                const minutes = messageDate.getMinutes().toString().padStart(2, '0');
                return `${hours}:${minutes}`;
            } else if (
                messageDate.getDate() === yesterday.getDate() &&
                messageDate.getMonth() === yesterday.getMonth() &&
                messageDate.getFullYear() === yesterday.getFullYear()
            ) {
                return 'Yesterday';
            } else {
                const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
                return messageDate.toLocaleDateString(undefined, options);
            }
        }
        return '';
    }

    const renderLastMessage = () => {
        if (typeof lastMessage === 'undefined') return 'Loading...';
        if (lastMessage) {
            if (currentUser?.userId == lastMessage?.userId) {
                return (
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>You: </Text>
                        <Text style={{ color: 'white' }}>{lastMessage.text}</Text>
                    </View>
                );
            }
            return lastMessage?.text;
        }
        return 'Say Hi 👋';
    }

    return (
        <TouchableOpacity onPress={openChatRoom} style={styles.container} activeOpacity={0.8}>
            
            <View>
                <Image
                    source={{ uri: item?.profileUrl }}
                    style={{ height: hp(7), aspectRatio: 1, borderRadius: 50 }}
                    placeholder={blurhash}
                    transition={500} />
            </View>
            <View style={{ marginLeft: 10, flex: 1 }}>
                <View style={{ justifyContent: "space-between" }}>
                    <Text style={{ color: "white", fontWeight: "bold", alignSelf: "flex-start" }}>{item?.firstName+' '+item?.lastName}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ color: "white" }}>{renderLastMessage()}</Text>
                </View>
            </View>
            <View>
                <Text style={{ color: "white", fontWeight: "bold" }}>{renderTime()}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "rgba(50, 50, 50, 0.7)",
        width: "98%",
        marginBottom: 6,
        borderRadius: 10,
        padding: 10
    }
})