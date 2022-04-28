import { View,StyleSheet, KeyboardAvoidingView } from "react-native-web"
import { Button, Image, Input,Text } from "react-native-elements"
import { useEffect, useLayoutEffect, useState } from "react"
import { auth } from "../firebase"
import {  createUserWithEmailAndPassword,updateProfile  } from "firebase/auth";



const RegisterScreen =({navigation})=>{ 
    const [name, setName]=useState("")
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [imageUrl, setImageUrl]=useState("")
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle:"Back to Login"
        })
    },[navigation])
    const register=()=>{
        createUserWithEmailAndPassword(auth,email,password)
        .then((currentUser)=>{
            console.log(currentUser)
            const user=currentUser.user
            updateProfile(user,{
                displayName:name,
                photoURL:imageUrl
            }).then(()=>console.log('updated')).catch((error)=>console.log('update failed',error))

            
        })
        .catch((error)=>{console.log(error)})
    }
    return (

   
<KeyboardAvoidingView style={styles.container} behavior="padding"> 
     <Image
                source={{ uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png" }}
                style={{ width: 100, height: 100 }}/>
    <Text h3 style={{marginBottom:50}}> Create a Signal Account</Text>
    <View style={styles.inputContainer}>
        <Input  placeholder=" Enter your Full Name" type='text' onChangeText={(text)=>setName(text)} value={name}/>
        <Input placeholder=" Enter your Email"  type='email' onChangeText={(text)=>setEmail(text)} value={email}/>
        <Input placeholder=" Enter your Password"  type='password'  secureTextEntry onChangeText={(text)=>setPassword(text)} value={password}/>
        <Input placeholder=" Enter your Image Url (Optional)"  type='text' onChangeText={(text)=>setImageUrl(text)} value={imageUrl} onSubmitEditing={register}/>

    </View>
    <Button  onPress={register} style={styles.buttonStyle} title='Register'/>

</KeyboardAvoidingView>

)}

export default RegisterScreen

const styles=StyleSheet.create({
    container: { flex: 1,justifyContent: 'center', alignItems : 'center', backgroundColor: 'white',  padding: 10 },
    inputContainer:{
        width:300 
    },
    buttonStyle:{
        marginTop: 40,
        width:200
    }

})