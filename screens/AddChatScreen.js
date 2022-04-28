import { View, Text,StyleSheet} from 'react-native'
import React, { useLayoutEffect,useState } from 'react'
import { Input,Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'; 
import { db } from '../firebase';
import { async } from '@firebase/util';
import { setDoc,doc, addDoc, collection } from 'firebase/firestore';
const AddChatScreen = ({navigation}) => {
    const [input,setInput]=useState('')
    const createChat= async()=>{
        try{
            const docRef=await addDoc(collection(db,"chats"),{
                chatName:input
            
            })
            navigation.goBack()
        }
        catch(e){
            console.log(e)
        }

    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Add a new Chat",
            headerBackTitle:"Chats"
        })
    },[navigation])
  return (
    <View style={styles.container}>
     
      <Input placeholder='Enter a chat Name' value={input} onChangeText={(text)=>{setInput(text)}} leftIcon={   <Ionicons name="ios-chatbubbles-outline" size={24} color="black" />} onSubmitEditing={createChat}/>
      <Button title="Create a chat" onPress={createChat}/>
    </View>
  )
}

export default AddChatScreen

const styles=StyleSheet.create({
container:{

}
})