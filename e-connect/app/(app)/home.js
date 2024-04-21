// e-connect/app/(app)/home.js
import { View, Text, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { StatusBar } from 'expo-status-bar'
import ChatList from "../../components/ChatList";
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from "../../firebaseConfig";

export default function Home() {

    const { logout, user } = useAuth();
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          if (user?.uid) {
            await getUsers();
          }
        };
      
        fetchData();
      }, []);

    const getUsers = async () => {
        const q = query(usersRef, where('userId', '!=', user?.uid));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach(doc => {
            data.push({...doc.data()});
        });
        setUsers(data);
    }

    return (
        <ImageBackground source={require("../../assets/images/blurred.jpg")} style={{ flex: 1 }}>
            <StatusBar style="light" />
            {
                users.length > 0 ? (
                    <ChatList users={users} />
                ) : (
                    <View></View>
                )
            }
        </ImageBackground>
    )
}