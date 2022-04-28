import { View, Text, StyleSheet,KeyboardAvoidingView,TextInput,ScrollView,TouchableOpacity, Keyboard } from 'react-native'
import React, { useLayoutEffect,useState } from 'react'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../firebase'
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback } from 'react-native-web';
import { addDoc, collection, Timestamp,query,onSnapshot,orderBy } from 'firebase/firestore';



const ChatScreen = ({ navigation, route }) => {
    const [input, setInput]=useState('')
    const [messages, setMessages]=useState([])
    const sendMessage=async()=>{
        Keyboard.dismiss()
        try{
            await addDoc(collection(db,`chats/${route.params.id}/messages`),{
                timestamp: Timestamp.now(),
                message:input,
                displayName:auth.currentUser.displayName,
                email:auth.currentUser.email,
                photoURL:auth.currentUser.photoURL
              })
            setInput('')
        }
        catch(error){
            console.log(error)
        }

    }
   
   
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: 'left',
            headerTitle: () => (
                <View style={{ flexDirection: "row", alignItems: 'center', width: 100, justifyContent: 'space-between' }}>
                    <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    <>
                    <Text style={{ fontWeight: '700', textTransform: 'capitalize' }}>{route.params.chatName}</Text>
                    </>
                    
                </View>
            ),
            headerRight: () => (
                <View style={{ marginRight: 10, flexDirection: "row", alignItems: 'center', width: 70, justifyContent: 'space-between'}}>
                    <TouchableOpacity >
                    <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>

            )
        })


    }, [navigation])


    useLayoutEffect(()=>{

        const q = query(collection (db,`chats/${route.params.id}/messages`), orderBy('timestamp'))
        onSnapshot(q,(QuerySnapshot)=>{
            setMessages(QuerySnapshot.docs.map(doc=>({id:doc.id,data:doc.data()})))
        })
    },[])

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'white'}} >
            <KeyboardAvoidingView 
            //  behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container} keyboardVerticalOffset={90}>
          <TouchableWithoutFeedback>
        <>
        <ScrollView>   
            {
               
                messages.map(({id,data:{displayName,message,email,photoURL,timestamp}})=>(
                    email!==auth.currentUser.email ? (  
                         <View style={styles.receiver} key={id}>
                        <Avatar rounded size={24} source={{uri:photoURL}} containerStyle={{position: "absolute", bottom:-15,right:-5}}/>    
                        <Text style={styles.receiverText}>{message}</Text>
                        </View>
                        ) : (   <View style={styles.sender} key={id}>
                            <Avatar  rounded size={24}   source={{uri:auth.currentUser.photoURL}}  containerStyle={{position: "absolute", bottom:-15,left:-5}}/>  
                            <Text style={styles.senderText}>{message}</Text>
                            </View>
                            )
             
                
                
                
                
                ))
            }
            
        </ScrollView>
                <View style={styles.footer}>
                    <TextInput placeholder='Signal Message'style={styles.TextInput} onChangeText={(text)=>setInput(text)} value={input} onSubmitEditing={sendMessage}/>
                    <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                    <Ionicons name="ios-send" size={24} color="#2b68E6" />
                    </TouchableOpacity>
                </View>
        </>
          </TouchableWithoutFeedback>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container:{flex:1},
    footer:{
        flexDirection:'row',
        alignItems:'center',
       flex:1,
        padding:15
},
TextInput:{
    bottom:0,
    height:40,
    flex:1,
    marginRight:15,
    borderColor:'transparent',
    backgroundColor:'#ECECEC',
    padding:10,
    color:"grey",
    borderRadius:30,
},
sender:{
    
   
    flexDirection:'row',
    justifyContent:'flex-start',

    margin:15,
    position:'relative'
 
   },
senderText:{
    backgroundColor:'#2B68E6',
    padding:15,
    borderRadius:20,
}
,
receiver:{
    
   
    flexDirection:'row',
    justifyContent:'flex-end',

    margin:15,
    position:'relative'
 
   },
receiverText:{
    backgroundColor:'#ECECEC',
    padding:15,
    borderRadius:20,
},

})