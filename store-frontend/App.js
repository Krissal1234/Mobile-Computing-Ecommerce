

import "react-native-gesture-handler";
import React, { useState,useEffect, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {auth} from "./config/firebase.js"
import { decode, encode } from "base-64";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

// Navigation
import HomeScreen from './src/Views/HomeScreen/Home.js'
import LoginScreen from "./src/Views/Login/LoginScreen"
import { UserContext, UserProvider } from "./src/Contexts/UserContext";
import Core from './src/Views/Core';
import LeaseEquipment from './src/Views/Lease/EquipmentLease.js';
import RegisterScreen from "./src/Views/RegisterScreen/RegisterScreen";
import Equipment from "./src/Views/Rent/Equipment";
import Profile from './src/Views/Profile/profileCore.js'
import { LogBox } from "react-native";



import Test from "./src/Views/Rent/Equipment";

// const firebaseConfig = {
//   apiKey: "AIzaSyBpCJtHqad3BnKh9PKURBVHQp7I6ykFCO0",
//   authDomain: "sportyrental.firebaseapp.com",
//   projectId: "sportyrentals",
//   messagingSenderId: "79967591982 ",
//   appId: "1:79967591982:android:f7f82758c2bc30443c09bf",
// };
// useEffect(() => {
//   if (!firebase.apps.length) {
//firebase.functions().useEmulator('localhost', 5001);
// firebase.initializeApp(firebaseConfig);

//   }
// }, []);
import { Text, View, Button } from "react-native";
import * as Notifications from "expo-notifications";
import { StripeProvider } from "@stripe/stripe-react-native";

const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs();
  const [loading, setLoading] = useState(true);

  return (
    <StripeProvider publishableKey="pk_test_51LoBCWGC9MhpkKozMAo0UEkGa8FS5TEx8ExG6T702Z8HCA7BvkLRe9jvKHZn26XTJobo4eSgAhVcRQIdAJSJVYAk0077oMzWuL">

    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login"  
        screenOptions={{ headerShown: false, // This will hide the header for all screens
      }}>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Registration" component={RegisterScreen}/>
          <Stack.Screen name="Core" component={Core} />
          <Stack.Screen name="Equipment" component={Equipment} />
          <Stack.Screen name="Test" component={Test} />
          <Stack.Screen name="Profile" component={Profile} />

          
        </Stack.Navigator>
      </NavigationContainer>

      
    </UserProvider>
          </StripeProvider>
  );
}
