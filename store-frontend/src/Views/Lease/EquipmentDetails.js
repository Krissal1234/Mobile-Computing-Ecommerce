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
        <Image source={{ uri: equipment.image }} style={styles.detailsImage} />
        <Text style={styles.title}>{equipment.title}</Text>
        <Text style={styles.description}>{equipment.description1}</Text>
        <Text style={styles.description}>{equipment.description2}</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.price}>Price: {equipment.price} Per Day</Text>
      </Card>



      <Card style={styles.card}>
        <Text style={styles.dateTitle}>
          {selectedStartDate && selectedEndDate
            ? `${selectedStartDate.dateString} to ${selectedEndDate.dateString}`
            : 'Select Date Range'}
        </Text>

        <Calendar
          onDayPress={(day) => handleDateSelect(day)}
          markedDates={{
            [selectedStartDate?.dateString || '']: {
              selected: true,
              startingDay: true,
              color: '#A2383A',
              textColor: 'white',
            },
            [selectedEndDate?.dateString || '']: {
              selected: true,
              endingDay: true,
              color: '#A2383A',
              textColor: 'white',
            },
          }}
        />
      </Card>


      
    <Card style={styles.card}>
      <Text style={styles.subtitle}>Choose Pickup or Delivery:</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Delivery</Text>
        <Switch value={pickup} onValueChange={togglePickup} />
        <Text style={styles.switchText}>Pickup</Text>
      </View>

      {pickup ? (
        <View>
          <Text style={styles.subtitle}>Pickup Location:</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: equipment.latitude,
              longitude: equipment.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
              
            }}
          >
            <Marker coordinate={pickupLocation} title="Pickup Location" />
          </MapView>
          <Text style={styles.subtitle}>Pinpoint Pickup Location:</Text>
          <TextInput
            style={styles.detailsinput}
            placeholder="Enter pickup address"
            value={`${pickupLocation.latitude}, ${pickupLocation.longitude}`}
            editable={false} // Make the input non-editable for pickup
          />
        </View>
      ) : (
        <View>
          <Text style={styles.subtitle}>Delivery Location:</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: equipment.latitude,
              longitude: equipment.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress} // Allow the user to pick a location for delivery
          >
            <Marker coordinate={pickupLocation} title="Delivery Location" />
          </MapView>
          <Text style={styles.subtitle}>Pinpoint Delivery Location:</Text>
          <TextInput
            style={styles.detailsinput}
            placeholder="Enter delivery address"
            value={`${pickupLocation.latitude}, ${pickupLocation.longitude}`}
            editable={false} // Make the input non-editable for delivery
          />
        </View>
      )}
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
