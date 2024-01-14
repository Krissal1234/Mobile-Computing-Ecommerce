import { Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import styles from 'store-frontend/src/Views/styles';
import React, { useEffect, useState,  useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PitchList from './PitchList';
import PitchDetails from './PitchDetails';
import { View, ActivityIndicator } from 'react-native';
import { UserContext } from '../../Contexts/UserContext';
import { FacilitiesController } from '../../Controllers/FacilitiesController';
import { ListingsController } from '../../Controllers/ListingsController';
import { colors } from '../colors';

const Stack = createStackNavigator();

const LeasingPitches = ({ navigation }) => {
  return (
    <View style={styles1.container}>
      <PitchList navigation={navigation} />
    </View>
  );
};

const PitchLease = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="LeasingPitches">
        <Stack.Screen name="Leasing Pitches" component={LeasingPitches} options={{ headerShown: false }}/>
        <Stack.Screen name="PitchDetails" component={PitchDetails}  options={{ headerShown: false }}/>
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

export default PitchLease;
