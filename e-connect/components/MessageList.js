// e-connect/components/MessageList.js
import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useRef } from 'react'
import MessageItem from './MessageItem'

export default function MessageList({ messages, currentUser }) {
  const scrollViewRef = useRef();

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={{paddingTop: 10, paddingBottom: 10}}
      showsVerticalScrollIndicator={false}
    >
      {
        messages.map((message, index) => {
          return (
            <MessageItem message={ message } key={ index } currentUser={ currentUser } />
          )
        })
      }
    </ScrollView>
  )
}