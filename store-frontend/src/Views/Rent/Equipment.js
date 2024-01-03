import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import styles from 'store-frontend/src/Views/styles';
import { EquipmentController } from '../../Controllers/EquipmentController';
import { ListingsController } from '../../Controllers/ListingsController';
import { createStackNavigator } from '@react-navigation/stack';
import EquipmentDetails from './EquipmentDetails';

const Stack = createStackNavigator();

const Equipment = ({ navigation }) => {
  const [sportsEquipment, setSportsEquipment] = useState([]);
  const [loadedSports, setLoadedSports] = useState(new Set()); // Keep track of loaded sports
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSportsAndEquipment = async () => {
      setLoading(true);
      try {
        let sportsResponse = await ListingsController.getAllSports();
        if (sportsResponse.success) {
          const sports = sportsResponse.data;
          await loadEquipmentForSports(sports);
        } else {
          console.error("Error fetching sports:", sportsResponse.message);
        }
      } catch (error) {
        console.error("Error fetching sports or equipment: ", error);
      } finally {
        setLoading(false);
      }
    };

    const loadEquipmentForSports = async (sports) => {
      for (let sport of sports) {
        if (loadedSports.has(sport) || sportsEquipment.length >= 3) break; // Stop if already loaded 3 sports with equipment

        const equipmentResponse = await EquipmentController.filterEquipmentBySport(sport);
        if (equipmentResponse.success && equipmentResponse.data.length > 0) {
          setLoadedSports(prev => new Set(prev.add(sport))); // Add sport to loaded sports
          setSportsEquipment(prevData => [...prevData, { sport, equipment: equipmentResponse.data }]);
        }
      }
    };

    fetchSportsAndEquipment();
  }, []);

  const renderEquipmentItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('EquipmentDetails', { equipmentId: item.id })}>
      <Image source={{ uri: item.imageReference }} style={styles.itemPreview} />
    </TouchableOpacity>
  );

  const renderEquipmentRow = ({ item }) => (
    <View style={styles.rowContainer}>
      <Text style={styles.rowTitle}>{item.sport}</Text>
      <FlatList
        data={item.equipment}
        renderItem={renderEquipmentItem}
        keyExtractor={(item, index) => `${item.sport}-${index}`}
        horizontal
        style={styles.horizontalFlatList}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.verticalFlatList}
        data={sportsEquipment}
        renderItem={renderEquipmentRow}
        keyExtractor={(item, index) => `sport-${index}`}
        horizontal={false}
        initialNumToRender={1}
      />
    </View>
  );
};

const EquipmentStack = () => {
  return (
    <Stack.Navigator initialRouteName="Equipment"  
      screenOptions={{ headerShown: false,
      }}
    >
      <Stack.Screen name="Equipment" component={Equipment} />
      <Stack.Screen name="EquipmentDetails" component={EquipmentDetails} />
    </Stack.Navigator>
  );
};

export default EquipmentStack;
