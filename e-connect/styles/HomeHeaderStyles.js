import { Platform, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ios = Platform.OS === 'ios';
const styles = StyleSheet.create({
    shadow: {
        position: 'absolute',
        height: hp(7),
        width: wp(93),
        top: ios ? hp(90) : hp(94),
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
    container: {
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 50, 0, 0.4)',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 2,
        height: '100%',
        width: '100%',
    },
    grid: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "85%",
    },
    image: {
        aspectRatio: 1,
        height: "100%",
        borderRadius: 50,
    },
    menu: {
        alignItems: 'flex-end',
        width: "90%",
    },
    menuOptions: {
        backgroundColor: 'rgb(50, 80, 50)',
        borderRadius: 10,
        width: wp(39), //width: 150
        marginTop: -55,
        marginLeft: 10,
    }
});

export default styles;