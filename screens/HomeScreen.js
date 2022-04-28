import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, {  useLayoutEffect ,useEffect, useState} from 'react'
import CustomerListItem from '../Components/CustomerListItem'
import { TouchableOpacity } from 'react-native-web'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../firebase'
import { AntDesign } from '@expo/vector-icons';
import { getAuth, signOut } from "firebase/auth";
import { SimpleLineIcons } from '@expo/vector-icons';
import {  onSnapshot, query, QuerySnapshot } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore'

const HomeScreen = ({navigation}) => {
    const[chats,setChats] = useState([])

    useEffect(async()=>{
        const q = query(collection(db,"chats"))
        onSnapshot(q,(QuerySnapshot)=>{
            setChats(QuerySnapshot.docs.map(doc =>({id:doc.id, data:doc.data()})))
        })
    },[])

    

    console.log(chats)

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Signal",
            headerStyle:{backgroundColor:'#fff'},
            headerTitleStyle:{color:"black"},
            headerTintColor:"black",
            headerLeft:()=>(
                <View style={{marginLeft:20}}>
                    <TouchableOpacity onPress={()=>{signOut(auth).then(()=>{ console.log("signout"); navigation.replace('Login')})}}  activeOpacity={0.5}>
                        <Avatar rounded source={{uri: auth?.currentUser?.photoURL}}/>
                    </TouchableOpacity>
                </View>
            ),       
             headerRight:()=>(
                <View style={{marginRight:20, flexDirection:'row', justifyContent:'space-between',width:80 ,alignItems:'center'}}>
                    <TouchableOpacity activeOpacity={0.5}>
                    <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={()=>{navigation.navigate('AddChat')}}>
                    <SimpleLineIcons name="pencil" size={24} color="black"  />
                    </TouchableOpacity>
                </View>
            )

        })
    },[])


    const enterChat=(id,chatName)=>{
        navigation.navigate('Chat',{id,chatName})
    }



    
    return (
        <SafeAreaView>
            <ScrollView>
        {chats.map(({id,data:{chatName}})=>(<CustomerListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />))}
            {/* <CustomerListItem/> */}
            </ScrollView>

        </SafeAreaView>
    )
}

export default HomeScreen