import { Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import styles from 'store-frontend/src/Views/styles';
import React, { useEffect, useState,  useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FacilityList from './FacilityList';
import FacilityDetails from './FacilityDetails';
import { View, ActivityIndicator } from 'react-native';
import { UserContext } from '../../Contexts/UserContext';
import { FacilitiesController } from '../../Controllers/FacilitiesController';
import { ListingsController } from '../../Controllers/ListingsController';
import { colors } from '../colors';

const Stack = createStackNavigator();

const LeasingFacilities = ({ navigation }) => {
  return (
    <View style={styles1.container}>
      <FacilityList navigation={navigation} />
    </View>
  );
};

const FacilityLease = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="LeasingFacilities">
        <Stack.Screen name="Leasing Facilities" component={LeasingFacilities} options={{ headerShown: false }}/>
        <Stack.Screen name="FacilityDetails" component={FacilityDetails}  options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles1 = {
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#001633',
  },
}; 

export default FacilityLease;
