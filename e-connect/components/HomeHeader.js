// e-connect/components/HomeHeader.js
import { ImageBackground, View } from 'react-native'
import styles from '../styles/HomeHeaderStyles'
import React from 'react'
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';
import { useAuth } from '../context/authContext';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { MenuItem } from './CustomMenuItems'
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeHeader() {
  const { user, logout } = useAuth();

  const handleProfile = () => {

  }

  const handleLogout = async () => {
    await logout();
  }

  return (
    <ImageBackground source={require("../assets/images/login2.jpg")} style={styles.shadow}>
      <View style={[styles.container]}>
        <View style={styles.grid}>
          <MaterialIcons style={{ alignSelf: "flex-start", marginLeft: 5 }} name="chat-bubble-outline" size={hp(3.5)} color="black" />
        </View>
        <View style={styles.grid}>
          <MaterialIcons name="groups" size={hp(4)} color="black" />
        </View>
        <View style={styles.grid}>
          <Menu style={styles.menu}>
            <MenuTrigger>
              <Image
                style={styles.image}
                source={user?.profileUrl}
                placeholder={blurhash}
                transition={500}
              />
            </MenuTrigger>
            <MenuOptions customStyles={{ optionsContainer: styles.menuOptions }} >
              <MenuItem
                text="Profile"
                action={handleProfile}
                value={null}
                icon={<Feather name="user" size={hp(3)} color="white" />}
              />
              <Divider />
              <MenuItem
                text="Sign Out"
                action={handleLogout}
                value={null}
                icon={<MaterialIcons name="logout" size={hp(3)} color="white" />}
              />
            </MenuOptions>
          </Menu>
        </View>
      </View>
    </ImageBackground>
  )
}

const Divider = () => {
  return (
    <View style={{ backgroundColor: "white", height: 0.8, width: "92%", alignSelf: "center" }} />
  )
}