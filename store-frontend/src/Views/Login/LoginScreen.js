import React, { useState, useContext, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, SafeAreaView ,ActivityIndicator, View,Button} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from 'store-frontend/src/Views/styles';
import {auth, googleSignIn, googleProvider, googleOAuthProvider} from '../../../config/firebase'
import LoginController from '../../Controllers/LoginController';
import { colors } from 'store-frontend/src/Views/colors.js';
import { UserContext } from '../../Contexts/UserContext';
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EquipmentController } from '../../Controllers/EquipmentController';
import { ListingsController } from '../../Controllers/ListingsController';
//import { ANDROID_CLIENT_ID, IOS_CLIENT_ID,  } from "../../../../.env";


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UserContext);
  const {setSportCategories } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

     const config = {
      androidClientId: "79967591982-96u6h31ffjjq8fmc3ortj7tqjflc1dhk.apps.googleusercontent.com",
      iosClientId: "79967591982-kkuap9679v67qhrq4bl7h3mrjcsr6psd.apps.googleusercontent.com",
      webClientId: "79967591982-24q93ovcvnd73t91k0tn1ph96ve9nqat.apps.googleusercontent.com",
    };
  const [request, response, promptAsync] = Google.useAuthRequest(config);

  WebBrowser.maybeCompleteAuthSession();
  const onFooterLinkPress = () => {
    navigation.navigate('Registration');
  };
  const getUserInfo = async (token) => {
    //absent token
    if (!token) return;
    //present token
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      //store user information  in Asyncstorage
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error(
        "Failed to fetch user data:",
        response.status,
        response.statusText
      );
    }
  };
  const signInWithGoogle = async () => {

  googleSignIn(googleProvider)
  .then((result) => {
    /** @type {googleOAuthProvider} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // IdP data available in result.additionalUserInfo.profile.
      // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
    // try {
    //   // Attempt to retrieve user information from AsyncStorage
    //   const userJSON = await AsyncStorage.getItem("user");
  
    //   if (userJSON) {
    //     // If user information is found in AsyncStorage, parse it and set it in the state
    //     setUserInfo(JSON.parse(userJSON));
    //   } else if (response?.type === "success") {
    //     // If no user information is found and the response type is "success" (assuming response is defined),
    //     // call getUserInfo with the access token from the response
    //     getUserInfo(response.authentication.accessToken);
    //   }
    // } catch (error) {
    //   // Handle any errors that occur during AsyncStorage retrieval or other operations
    //   console.error("Error retrieving user data from AsyncStorage:", error);
    // }
  };
  
  //add it to a useEffect with response as a dependency 
  useEffect(() => {
    signInWithGoogle();
  }, [response]);

  const onLoginPress = async () => {
  setLoading(true);
    console.log('clicked login');
    const login = await LoginController.loginUser(email, password);
    //Setting sport categories global variable to minimise overhead

    const response = await ListingsController.getAllSports();

    if(response.success){
      setSportCategories(response.data);
    }else{
      console.log(response.message);
    }
    
    console.log(login.message);
    if (login.success) {
        //Setting uid global variable
      setUser(login.user);
      setLoading(false);
      navigation.navigate("Home");
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardContainer}
        keyboardShouldPersistTaps="never">
  
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
        ) : (
          // Show the rest of the form only when not loading
          <>
            <Image
              style={styles.logo}
              source={require('store-frontend/assets/logo.png')}
            />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor={colors.grey}
              onChangeText={(text) => setEmail(text)}
              value={email}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Password"
              placeholderTextColor={colors.grey}
              onChangeText={(text) => setPassword(text)}
              value={password}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => onLoginPress()}>
              <Text style={styles.buttonTitle}>Log in</Text>
            </TouchableOpacity>
            <SafeAreaView style={styles.footerView}>
              <Text style={styles.footerText}>
                Don't have an account?{' '}
                <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                  Sign up
                </Text>
              </Text>
              <Button title= "sign in with google" onPress={()=>{signInWithGoogle()}}/>
            </SafeAreaView>
          </>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}  