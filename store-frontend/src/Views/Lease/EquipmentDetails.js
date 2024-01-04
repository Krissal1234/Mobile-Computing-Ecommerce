import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button, Switch } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { Calendar, DateObject } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 
import styles from 'store-frontend/src/Views/styles';
import { SafeAreaView } from 'react-native-safe-area-context';



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

  const handleLeaseNow = () => {
    if (selectedStartDate && selectedEndDate) {
      alert(`Leasing Equipment from ${selectedStartDate.dateString} to ${selectedEndDate.dateString}`);
    } else {
      alert('Please select start and end dates');
    }
  };
  const handleDelete = () => {
    console.log('Delete');
// DO IMPLEMENTATION OF DELETE
  };

  return (
    <ScrollView style={styles.container}>
    
    <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={40} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <Icon name="trash" size={40} color="white" />
        </TouchableOpacity>
    </View>


      <Card style={styles.card}>
        <Image source={{ uri: equipment.imageReference }} style={styles.detailsImage} />
        <Text style={styles.title}>{equipment.title}</Text>
        <Text style={styles.description}>{equipment.description}</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.price}>Price: {equipment.price} Per Day</Text>
      </Card>



      <Card style={styles.card}>
        <Text style={styles.price}>Sport Category: {equipment.sportCategory}</Text>
      </Card>



      <Card style={styles.card}>
          <Text style={styles.price}>
            Available: {equipment.availableStatus ? 'Yes' : 'No'}
          </Text>
        </Card>


        <Card style={styles.card}>
          <Text style={styles.price}>Delivery Type: {equipment.deliveryType} </Text>
        </Card>

        {equipment.deliveryType === 'pickup' && (
          <Card style={styles.card}>
            <Text style={styles.subtitle}>Pickup Location:</Text>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: parseFloat(equipment.pickupLocation.latitude),
                longitude: parseFloat(equipment.pickupLocation.longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: parseFloat(equipment.pickupLocation.latitude),
                  longitude: parseFloat(equipment.pickupLocation.longitude),
                }}
                title="Pickup Location"
              />
            </MapView>
          </Card>
        )}


      <Card style={styles.card}>
        <Text style={styles.price}>Condition: {equipment.condition}</Text>
      </Card>



   
    
     

      <TouchableOpacity
          style={styles.button}
          onPress={handleLeaseNow}>
           <Icon name="pen" size={40} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
};


export default EquipmentDetails;
