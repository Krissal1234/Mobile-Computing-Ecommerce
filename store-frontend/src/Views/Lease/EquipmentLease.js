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