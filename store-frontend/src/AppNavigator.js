import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Views/HomeScreen/home';
import LoginScreen from './Views/Login/LoginScreen';
import RentEquipment from './Views/Rent/equipment';
import LeaseEquipment from './Views/Lease/equipment';
import RegisterScreen from './Views/RegisterScreen/RegisterScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"  screenOptions={{
          headerShown: false, // This will hide the header for all screens
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RentEquipment" component={RentEquipment} />
        <Stack.Screen name="LeaseEquipment" component={LeaseEquipment} />
        <Stack.Screen name="Registration" component={RegisterScreen} />
        
        {/* Add more screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
