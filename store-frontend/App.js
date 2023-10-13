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
import * as firebase from 'firebase/app';

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen } from './src'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const firebaseConfig = {
  apiKey: 'AIzaSyBpCJtHqad3BnKh9PKURBVHQp7I6ykFCO0',
  authDomain: 'sportyrental.firebaseapp.com',
  projectId: 'sportyrentals',
  messagingSenderId: '79967591982 ',
  appId: '1:79967591982:android:f7f82758c2bc30443c09bf',
};
// useEffect(() => {
//   if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
//   }
// }, []);

const Stack = createStackNavigator();


export default function App() {



  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)



  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            {/* <Stack.Screen name="Registration" component={RegistrationScreen} /> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}