// e-connect/components/ChatList.js
import { View, Text, FlatList, Platform } from 'react-native'
import React from 'react'
import ChatItem from "./ChatItem";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from "expo-router";

const ios = Platform.OS === 'ios';
export default function ChatList({ users }) {
    const router = useRouter();

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={users}
                contentContainerStyle={[
                    users.length == 8 ? ios ? { flex: 0, paddingBottom: hp(10) } : { flex: 1} : {},
                    users.length < 8 ? { flex: 1 } : {},
                    users.length > 8 ? { paddingBottom: hp(11) } : {},
                    {
                        paddingTop: hp(1),
                        backgroundColor: "rgba(0, 30, 0, 0.3)"
                    }
                ]}
                keyExtractor={item => Math.random()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => <ChatItem item={item} router={router} index={index} />}
            >

            </FlatList>
        </View>
    )
}