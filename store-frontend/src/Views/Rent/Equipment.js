import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import styles from 'store-frontend/src/Views/styles';
import { useNavigation } from '@react-navigation/native';
import { EquipmentController } from '../../Controllers/EquipmentController';
import { ListingsController } from '../../Controllers/ListingsController';
import { getEquipmentById } from '../../../config/firebase';

const Equipment = () => {
  const navigation = useNavigation();
  const [sportsEquipment, setSportsEquipment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSportsAndEquipment = async () => {
      setLoading(true);
      try {
        let sportsResponse = await ListingsController.getAllSports();
        if (sportsResponse.success) {
          const sports = sportsResponse.data;
          const increment = 3; // Number of sports to load each time
          for (let i = 0; i < sports.length; i += increment) {
            const sportsSubset = sports.slice(i, i + increment);
            const equipmentDataSubset = await Promise.all(sportsSubset.map(async sport => {
              let equipmentResponse = await EquipmentController.filterEquipmentBySport(sport);
              return equipmentResponse.success ? { sport, equipment: equipmentResponse.data } : null;
            }));
            // Filter out any null entries and update state incrementally
            setSportsEquipment(prevData => [...prevData, ...equipmentDataSubset.filter(entry => entry !== null)]);
          }
        } else {
          console.error("Error fetching sports:", sportsResponse.message);
        }
      } catch (error) {
        console.error("Error fetching sports or equipment: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSportsAndEquipment();
  }, []);
  
  

  const rent = () => {
    navigation.navigate('Login');
  };

  const renderEquipmentItem = ({ item }) => (
    <TouchableOpacity onPress={() => rent(item)}>
      <Text style = {styles.testStyle}>{item.title}</Text>
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

  // if (loading) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

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

export default Equipment;
