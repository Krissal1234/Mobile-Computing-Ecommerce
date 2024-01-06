import React, { useState, useEffect, useContext,useCallback } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text , ActivityIndicator,ScrollView} from 'react-native';
import styles from 'store-frontend/src/Views/styles';
import { EquipmentController } from '../../Controllers/EquipmentController';
import { ListingsController } from '../../Controllers/ListingsController';
import { createStackNavigator } from '@react-navigation/stack';
import EquipmentDetails from './EquipmentDetails';
import { UserContext } from '../../Contexts/UserContext';
import { useFocusEffect } from '@react-navigation/native';

const Stack = createStackNavigator();

const Equipment = ({ navigation }) => {
  const {sportFilter,setSportFilter} = useContext(UserContext);
  const [sportsEquipment, setSportsEquipment] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setSportFilter('Set Sport Filter');
    }, [])
  );

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
  }, [sportFilter]);

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

  // Filter and flatten the equipment for the selected sport
  const filteredEquipment = sportsEquipment
  .filter(({ sport }) => sport === sportFilter)
  .flatMap(({ equipment }) => equipment);

  return (
    sportFilter === 'Set Sport Filter' || sportFilter === 'No Filter' ? (
      // This block will render when sportFilter is 'Set Sport Filter' or 'No Filter'
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
    ) : (
    // Render only the equipment of the sport that matches the sportFilter
    <View style={styles.container}>
      {filteredEquipment.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.filteredScrollView}
          showsVerticalScrollIndicator={false}>
          {filteredEquipment.map((item, index) => renderEquipmentItem({item, index}))}
        </ScrollView>
      ) : (
        // Display no equipment message when there are no items

        <Text style={styles.noEquipmentText}>No Equipment Available</Text>

      )}
    </View>
    )
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
