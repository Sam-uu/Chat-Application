import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';

export default function ChatRoomHeader({ user, router }) {
    return (
        <Stack.Screen
            options={{
                title: user?.firstName + ' ' + user?.lastName,
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerStyle: {
                    height: hp(20),
                    backgroundColor: "rgba(200, 210, 200, 0.9)",
                },
                headerShadowVisible: false,
                headerLeft: () => (
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <AntDesign name="leftcircleo" size={hp(2.6)} color="black" />
                        </TouchableOpacity>
                        <View>
                            <Image
                                source={{ uri: user?.profileUrl }}
                                style={{ height: hp(4.5), aspectRatio: 1, borderRadius: 50, marginLeft: hp(1) }}
                                placeholder={blurhash}
                                transition={500} />
                        </View>
                    </View>
                ),
                headerRight: () => (
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Ionicons onPress={() => Alert.alert('video')} name="videocam-outline" size={24} color="black" style={{ marginRight: hp(2.5) }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons onPress={() => Alert.alert('call')} name="call-outline" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                )
            }}
        />
    )
}