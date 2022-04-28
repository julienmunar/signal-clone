import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Image, Input } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native-web'
import { auth } from '../firebase'
import {  onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
const LoginScreen = ({navigation}) => {
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if (user){
                navigation.replace("Home")
            }
        })
    },[])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const SignIn = () => {
        signInWithEmailAndPassword(auth,email,password)
        .then((userloggedin)=>console.log('userLoggedIN',userloggedin))
        .catch((error)=>console.log('errorlogin',error))
        navigation.replace('Home')
    }


    return (
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
            <StatusBar style="light" />
            <Image
                source={{ uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png" }}
                style={{ width: 200, height: 200 }}

            />
            <View style={styles.inputContainer}>
                <Input placeholder='Email' autoFocus type="email" onChangeText={(text) => setEmail(text)}  value={email}/>
                <Input placeholder='Password' autoFocus secureTextEntry onChangeText={(text) => setPassword(text)}  value={password} type="password" />

            </View>

            <Button  style={styles.button} title="Login" onPress={SignIn} />
            <Button style={styles.button} type="outline" title="Register" onPress={()=>{navigation.navigate('Register')}} />

        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: { flex: 1,justifyContent: 'center', alignItems : 'center', backgroundColor: 'white',  padding: 10 },
    inputContainer: {
        width:300

    },
    button: {
        margin: 10,
        width: 200
    }

})