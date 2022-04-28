import { View, Text } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import React, { useLayoutEffect,useState,useEffect} from 'react'
import {collection, addDoc, Timestamp, query, orderBy, onSnapshot, QuerySnapshot} from 'firebase/firestore'
import { db } from '../firebase'
const CustomerListItem = ({chatName, id,enterChat}) => {
  const test=[{test:'est'},{test2:'eee'}]
  console.log(test[0])
  const [chatMessages, setChatMessages]=useState([])
  useLayoutEffect(()=>{

    const q = query(collection (db,`chats/${id}/messages`), orderBy('timestamp','desc'))
    onSnapshot(q,(QuerySnapshot)=>{
        setChatMessages(QuerySnapshot.docs.map(doc=>({id:doc.id,data:doc.data()})))
    })
},[])
  console.log('chat',chatMessages[0]?.data?.displayName)
  return (
    <ListItem id={id} onPress={()=>{enterChat(id,chatName)}}>
      <Avatar rounded  source={{ uri: chatMessages[0]?.data?.photoURL || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"}}
      />
          <ListItem.Content>
            <ListItem.Title style={{fontWeight:700}}> {chatName}</ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">{chatMessages[0]?.data?.displayName}:{chatMessages[0]?.data?.message}</ListItem.Subtitle>
        </ListItem.Content>
        
    </ListItem>

  )
}

export default CustomerListItem