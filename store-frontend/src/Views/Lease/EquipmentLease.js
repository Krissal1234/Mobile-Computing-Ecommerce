import { Text, TouchableOpacity, SafeAreaView,Image } from 'react-native';
import styles from 'store-frontend/src/Views/styles';
import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EquipmentList from './EquipmentList';
import EquipmentDetails from './EquipmentDetails';
import { View, ActivityIndicator } from 'react-native';
import { UserContext } from '../../Contexts/UserContext';
import { ListingsController } from '../../Controllers/ListingsController';
import { colors } from '../colors';

const Stack = createStackNavigator();

const LeasingEquipment = ({ navigation }) => {
  return (
    <View style={styles1.container}>
      <EquipmentList navigation={navigation} />
    </View>
  );
};




const EquipmentLease = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="LeasingEquipment">
        <Stack.Screen name="Leasing Equipment" component={LeasingEquipment} options={{ headerShown: false }}/>
        <Stack.Screen name="EquipmentDetails" component={EquipmentDetails}  options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles1 = {
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#001633', // Set your desired background color
  },
}; 

export default EquipmentLease;