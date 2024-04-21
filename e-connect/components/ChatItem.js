// e-connect/components/ChatItem.js
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useAuth } from "../context/authContext";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { blurhash } from '../utils/common';

export default function ChatItem({ item, router }) {

    const openChatRoom = () => {
        router.push({ pathname: '/chatRoom', params: item });
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
                    <Text style={{ color: "white" }}>Wesh!</Text>
                </View>
            </View>
            <View>
                <Text style={{ color: "white", fontWeight: "bold" }}>20:45</Text>
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