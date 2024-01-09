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

const Stack = createStackNavigator();

const LeasingPitches = ({ navigation }) => {

  const [FacilitiesData, setFacilityData] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const { user } = useContext(UserContext);
  console.log("UserID: ", user.user.uid ); 
  const userId = user ? user.user.uid  : null; 

  useEffect(() => {
    const fetchAvailableFacilities = async () => {
      setLoading(true); 
      try {
        const response = await ListingsController.getAllFacilityUserListings(user.user.uid);
        if (response && response.success) {
          setFacilityData(response.data);
        }
      } catch (error) {
        console.error("Error fetching facilities:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchAvailableFacilities();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles1.container}>
      <PitchList data={FacilitiesData} navigation={navigation} />
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
