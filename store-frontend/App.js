// import { StatusBar } from 'expo-status-bar';
// import { Button, StyleSheet, Text, View } from 'react-native';

// import { StripeProvider } from '@stripe/stripe-react-native';
// import Profile from './Pages/Profile';
// import Checkout from './Pages/Checkout';

// function App() {
//   return (
//     <View style={styles}>

//     <StripeProvider
//       publishableKey="pk_test_51LoBCWGC9MhpkKozMAo0UEkGa8FS5TEx8ExG6T702Z8HCA7BvkLRe9jvKHZn26XTJobo4eSgAhVcRQIdAJSJVYAk0077oMzWuL"
//       >
//         <View style={{paddingTop: 25, backgroundColor: "#2A3E57"}}>
//       <Profile />
//       {/* <Checkout /> */}
//         </View>
//     </StripeProvider>
//       </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#2A3E57',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default App;
// import firebase from 'firebase/app';

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

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
   
   useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("user logged in "); 
        setUser(authUser);
        // navigate, if user is already logged in.
      } else {
        console.log("user not logged int");
        setUser(null);
      }
    });
     
     return () => unsubscribe();
    }, []); 
  
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login"  
        screenOptions={{ headerShown: false, // This will hide the header for all screens
        }}>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Registration" component={RegisterScreen}/>
          <Stack.Screen name="Core" component={Core} />

          <Stack.Screen name="Test" component={Test} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
