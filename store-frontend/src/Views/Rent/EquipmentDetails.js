// EquipmentDetail.js
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { EquipmentController } from '../../Controllers/EquipmentController';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles';

const EquipmentDetail = ({ route, navigation }) => {
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchEquipment = async () => {
      const { equipmentId } = route.params;
      setLoading(true);
      const response = await EquipmentController.getEquipmentById(equipmentId);
      if (response.success) {
        setEquipment(response.data);
      } else {
        console.error("Error fetching equipment:", response.message);
        // Handle error - perhaps navigate back or show a message
      }
      setLoading(false);
    };
    fetchEquipment();
  }, []);

  if (loading) {
    return <ActivityIndicator />; // or some loading screen
  }

  if (!equipment) {
    return (
      <View>
        <Text>No equipment found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style = {styles.container}>

      <View style = {styles.card}>
        <Text>{equipment.title}</Text>
      </View>

    </SafeAreaView>
  );
};

export default EquipmentDetail;
