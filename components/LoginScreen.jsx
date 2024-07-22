import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
// import { Link } from "expo-router";
// import { useOAuth } from "@clerk/clerk-expo";
// import * as Linking from "expo-linking"
// import Colors from '../utils/Colors'
// import { Colors } from 'react-native/Libraries/NewAppScreen'
loginImage=require("./../assets/images/home 1.png")
google=require("./../assets/images/Google.png")
import { Colors } from './../constants/Colors'

import * as WebBrowser from "expo-web-browser";
// import { Text, View, Button } from "react-native";
import { Link } from "expo-router";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking"

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    useWarmUpBrowser();

     const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({ redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" })});

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View style={[styles.loginContainer, styles.redBorder]}>
      <Image style={ styles.loginImage} source={loginImage}/>
      <View style={styles.loginFormat}>
        <View style={styles.centerContent}>
            {/* <Text style={[styles.shikha]}></Text> */}
        <Text style={[styles.shikha]}>WELCOME To SHIK.SHA</Text>
        <Text style={styles.courseText}>this is a ultimate course</Text>
        </View>
        <TouchableOpacity style={[styles.loginWithGoogle]} onPress={onPress} >
            <Image source={google}/>
            <Text style={styles.loginWithGoogleText}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
 const styles=StyleSheet.create({
   
    loginImage: {
        width: 250,
        height: 500,
        objectFit:"contain",
        // resizeMode: "contain",
        // width: 300,
        // height: 300,
        // marginBottom: 20,
        marginTop: 20,
    },
    loginFormat:{
        width: "100%",
        height: 500,
        backgroundColor:Colors.PRIMARY,
        marginTop: -120,

    },
    loginContainer:{
        display: "flex",
        flex:1,
        width:"100%",
        
        // height:"100%"
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:Colors.PRIMARY,
        // padding: 10,
        // marginBottom: 20,
        // marginTop: 20,

    },
    redBorder: {
        
        borderWidth: 2,
        borderColor: 'red',
        borderStyle: 'solid',
      },
      shikha:{
        color:Colors.WHITE,
        fontSize:25,
        // fontFamily:'outfit-bold',
        // fontWeight:"bold",
        textAlign:"center",
        margin: 10,
        // marginBottom: 100,
      },
      courseText:{
        color:Colors.WHITE,
        fontSize:20,
        // fontFamily:'outfit-light',
        // // fontWeight:"bold",
        // textAlign:"center",
        // margin: 10,
        // // marginBottom: 100,
        // // justifyContent:'center',
        // // alignItems:"center",
      },
      centerContent:{
        justifyContent:"center",
        alignItems:"center",
      },
      loginWithGoogle:{
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-around",
        alignItems:"center",
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        gap:10, 
        backgroundColor:Colors.WHITE,
        width:"65%",
        alignSelf:"center",
        borderRadius: 20
      },
      loginWithGoogleText:{
        color:Colors.PRIMARY,
        fontSize:15,
        // fontFamily:'outfit-bold',
        // fontWeight:"bold",
        // textAlign:"center",
        // margin: 10,
        // marginBottom: 100,
        // justifyContent:'center',
        // alignItems:"center",
      }
})

