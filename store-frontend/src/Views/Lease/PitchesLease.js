import { Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import styles from 'store-frontend/src/Views/styles';
import React, { useEffect, useState,  useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PitchList from './PitchList';
import PitchDetails from './PitchDetails';
import { View } from 'react-native';
import { UserContext } from '../../Contexts/UserContext';
import { FacilitiesController } from '../../Controllers/FacilitiesController';

const Stack = createStackNavigator();

const dummyPitchData = [
  {
    id: 1,
    title: 'Soccer Field',
    image: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8c29jY2VyJTIwZmllbGR8ZW58MHx8MHx8&ixlib=rb-1.2.1&q=80&w=1000',
    description1: 'Full-size soccer field',
    description2: 'High-quality turf, night lights available',
    price: 100,
    latitude: 35.915457, // Latitude for booking
    longitude: 14.429703, // Longitude for booking
  },
  {
    id: 2,
    title: 'Tennis Court',
    image: 'https://images.unsplash.com/photo-1564743669829-5947c4a7d3bb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVubmlzJTIwY291cnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&q=80&w=1000',
    description1: 'Clay court',
    description2: 'Well-maintained, with seating area',
    price: 50,
    latitude: 35.915457, // Latitude for booking
    longitude: 14.429703, // Longitude for booking
  },
  {
    id: 3,
    title: 'Basketball Court',
    image: 'https://images.unsplash.com/photo-1576168422835-4668c895a03d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFza2V0YmFsbCUyMGNvdXJ0fGVufDB8fDB8fA&ixlib=rb-1.2.1&q=80&w=1000',
    description1: 'Outdoor court with acrylic surface',
    description2: 'Includes night lighting and bleachers',
    price: 40,
    latitude: 35.915457, // Latitude for booking
    longitude: 14.429703, // Longitude for booking
  },
  // Add more dummy data as needed
];

const LeasingPitches = ({ navigation }) => {

  const [FacilitiesData, setFacilityData] = useState([]); // Step 2: State for equipment data

  const { user } = useContext(UserContext);
  console.log("UserID: ", user.user.uid ); 
  const userId = user ? user.user.uid  : null; 

  useEffect(() => {
    const fetchAvailableFacilities = async () => {
      const response = await FacilitiesController.getAllAvailableFacilities();
      console.log("Available Facilities:", response);
      if (response && response.success) {
        setFacilityData(response.data); // Step 3: Update state with fetched data
      }
    };

    fetchAvailableFacilities();
  }, []);

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
