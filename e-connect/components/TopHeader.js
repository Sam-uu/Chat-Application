// e-connect/components/TopHeader.js
import {View, StyleSheet, Text, ImageBackground, Alert, TouchableOpacity} from 'react-native'
import React from 'react'
import {useAuth} from '../context/authContext';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {Feather} from '@expo/vector-icons';

export default function TopHeader() {

    return (
        <ImageBackground source={require("../assets/images/login2.jpg")} style={styles.shadow}>
            <View style={styles.container}>
                <View style={styles.grid}>
                    <View>
                        <Text style={styles.title}>e-connect</Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Feather onPress={() => Alert.alert('cameras')} name="camera" size={24} color="white"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    shadow: {
        height: hp(12),
        justifyContent: "flex-end",
        alignItems: "center"
    },
    container: {
        width: "100%",
        backgroundColor: "rgba(0, 50, 0, 0.6)",
        height: "100%",
        justifyContent: 'flex-end',
        alignItems: "center",
        borderBottomWidth: 3,
    },
    grid: {
        height: "45%",
        width: "95%",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center"
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        color: "white",
    },
});