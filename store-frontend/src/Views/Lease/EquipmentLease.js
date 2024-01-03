import { Text, TouchableOpacity, SafeAreaView,Image } from 'react-native';
import styles from 'store-frontend/src/Views/styles';
import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EquipmentList from './EquipmentList';
import EquipmentDetails from './EquipmentDetails';
import { View } from 'react-native';
import { EquipmentController } from '../../Controllers/EquipmentController';

import { UserContext } from '../../Contexts/UserContext';
import { ListingsController } from '../../Controllers/ListingsController';




const Stack = createStackNavigator();

const dummyEquipmentData = [
  {
    id: 1,
    title: 'Basketball',
    images: 'https://images.unsplash.com/photo-1595861021888-e8192a7f774e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFza2V0JTIwYmFsbHxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Official size and weight',
    price: 15,
    latitude: 35.915457, // Latitude for pickup
    longitude: 14.429703, // Longitude for pickup, 
  },
  {
    id: 2,
    title: 'Tennis Racket',
    images: 'https://t3.ftcdn.net/jpg/01/15/85/04/360_F_115850472_ZpP6dpGlG5qFFQpIxeNQiBXSQ312TzKs.jpg',
    description: 'Graphite composite material',
    price: 25,
    latitude: 35.915457, // Latitude for pickup
    longitude: 14.429703, // Longitude for pickup, 
  },
  {
    id: 3,
    title: 'Running Shoes',
    images: 'https://media.istockphoto.com/id/623270836/photo/modern-sport-shoes.jpg?s=612x612&w=0&k=20&c=D7xOiyV3TMQgUuIqlVvutPo49gyMG9f5U82mcvuDc0Y=',
    description: 'Lightweight and breathable',
    price: 45,
    latitude: 35.915457, // Latitude for pickup
    longitude: 14.429703, // Longitude for pickup, 
  },
  
]; // SOON REMOVE




const LeasingEquipment = ({ navigation }) => {
  const [equipmentData, setEquipmentData] = useState([]); // Step 2: State for equipment data

  const { user } = useContext(UserContext);
  console.log("UserID: ", user.user.uid ); 
  const userId = user ? user.user.uid  : null; 


  useEffect(() => {
    const fetchAllEquipment = async () => {
      const response = await ListingsController.getAllEquipmentUserListings(userId);
      console.log("Available Equipment:", response);
      if (response && response.success) {
        setEquipmentData(response.data); // Step 3: Update state with fetched data
      }
    };

    fetchAllEquipment();
  }, []);



  return (
    <View style={styles1.container}>
      <EquipmentList data={equipmentData} navigation={navigation} />
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