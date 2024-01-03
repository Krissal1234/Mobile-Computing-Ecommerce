import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button, Switch } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { Calendar, DateObject } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 
import styles from 'store-frontend/src/Views/styles';



const EquipmentDetails = ({ route }) => {
  const { equipment } = route.params;
  const [pickup, setPickup] = useState(true);
  const [pickupLocation, setPickupLocation] = useState({
    latitude: equipment.latitude,
    longitude: equipment.longitude,
  });
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(true); 
  const navigation = useNavigation();

  
  const togglePickup = () => {
    setPickup(!pickup);
  };

  const handleMapPress = (e) => {
    setPickupLocation(e.nativeEvent.coordinate);
  };

  const handleDateSelect = (day) => {
    if (!selectedStartDate || (day.timestamp < selectedStartDate.timestamp && !selectedEndDate)) {
      setSelectedStartDate(day);
      setSelectedEndDate(null);
    } else if (!selectedEndDate || day.timestamp > selectedEndDate.timestamp) {
      setSelectedEndDate(day);
    } else {
      setSelectedStartDate(day);
      setSelectedEndDate(null);
    }
  };

  const handleLeaseNow = () => {
    if (selectedStartDate && selectedEndDate) {
      alert(`Leasing Equipment from ${selectedStartDate.dateString} to ${selectedEndDate.dateString}`);
    } else {
      alert('Please select start and end dates');
    }
  };

  return (
    <ScrollView style={styles.container}>

    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={40} color="white" />
      </TouchableOpacity>

      <Card style={styles.card}>
        <Image source={{ uri: equipment.imageReference }} style={styles.detailsImage} />
        <Text style={styles.title}>{equipment.title}</Text>
        <Text style={styles.description}>{equipment.description}</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.price}>Price: {equipment.price} Per Day</Text>
      </Card>



      <Card style={styles.card}>
        <Text style={styles.price}>Sport Category: {equipment.price}</Text>
      </Card>



      <Card style={styles.card}>
        <Text style={styles.price}>Available: {equipment.price} Per Day</Text>
      </Card>


      <Card style={styles.card}>
        <Text style={styles.price}>Delivery Type: {equipment.price} Per Day</Text>
      </Card>


      <Card style={styles.card}>
        <Text style={styles.price}>Location: {equipment.price} Per Day</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.price}>Condition: {equipment.price} Per Day</Text>
      </Card>



   
    
     


      <TouchableOpacity
          style={styles.button}
          onPress={handleLeaseNow}>
          <Text style={styles.buttonTitle}>Lease Now</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};


export default EquipmentDetails;
