// e-connect/app/(app)/_layout.js
import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import HomeHeader from '../../components/HomeHeader'
import TopHeader from "../../components/TopHeader";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen 
        name='home'
        options={{
        header: () => (
            <View>
              <TopHeader/>
              <HomeHeader/>
            </View>
          )
        }}
      />
    </Stack>
  )
}