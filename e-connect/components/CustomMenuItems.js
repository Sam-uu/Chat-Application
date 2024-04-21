import { View, Text, StyleSheet } from 'react-native'
import {  MenuOption, } from 'react-native-popup-menu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export const MenuItem = ({text, action, value, icon}) => {
    return (
        <MenuOption onSelect={() => action(value)} >
            <View style={styles.menu}>
                <Text style={styles.text}> {text} </Text>
                {icon}
            </View>
        </MenuOption>
    )
}

const styles = StyleSheet.create({
    menu: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    text: {
      color: 'white',  
    },
});