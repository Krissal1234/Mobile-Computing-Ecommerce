import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text , ActivityIndicator} from 'react-native';
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

        let equipmentResponse = await EquipmentController.getAllAvailableEquipment();
        
        if (equipmentResponse.success){
          console.log(equipmentResponse.data);
          categorizeEquipment(equipmentResponse.data);
        }


      } catch (error) {
        console.error("Error fetching sports or equipment: ", error);
      } finally {
        setLoading(false);
      }
    };

    const categorizeEquipment = (equipmentList) => {
      const categorizedData = equipmentList.reduce((acc, item) => {
        const { sportCategory } = item;
        if (!acc[sportCategory]) {
          acc[sportCategory] = [];
        }
        acc[sportCategory].push(item);
        return acc;
      }, {});

      setSportsEquipment(Object.entries(categorizedData).map(([sport, equipment]) => ({ sport, equipment })));
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
  if (loading) {
    // Display loading indicator when data is being loaded
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
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
