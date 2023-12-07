import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Basket from './Basket/Basket';
import Bookings from './Bookings/Bookings';
import Equipment from './Equipment/Equipment';
import Pitches from './Pitches/Pitches';
import Icon from 'react-native-ico-material-design';
import AddEquipment from './AddEquipment/AddEquipment';
import { UserContext } from '../Contexts/UserContext';

const Tab = createBottomTabNavigator();

function RenterTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "settings-cogwheel-button";
  
            return <Icon name={iconName} color={color} />;
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {backgroundColor: "rgba(0, 22, 51, 1)"}
        })}
      >
        <Tab.Screen
          name="Basket"
          component={Basket}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Bookings"
          component={Bookings}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Equipment"
          component={Equipment}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Pitches"
          component={Pitches}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    );
  }
  
function LeaserTabs() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "settings-cogwheel-button";
            return <Icon name={iconName} color={color} />;
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {backgroundColor: "rgba(0, 22, 51, 1)"}
        })}
      >
        <Tab.Screen
          name="Add Equipment"
          component={AddEquipment}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Equipment"
          component={Equipment}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Pitches"
          component={Pitches}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Bookings"
          component={Bookings}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
  );
}

const Core = () => {

  const {user, setUser} = useContext(UserContext);
  return (
    <View style={{height: "100%", paddingTop: 30}}>

      <NavigationContainer independent={true}>
        {
          user && user.accountType === "Renter" ? <RenterTabs /> : <LeaserTabs />
        }
      </NavigationContainer>

    </View>
  )
}

export default Core

