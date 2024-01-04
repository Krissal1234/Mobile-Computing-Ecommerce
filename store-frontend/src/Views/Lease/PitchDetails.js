import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from 'store-frontend/src/Views/styles';
import MapView, { Marker } from 'react-native-maps';

const PitchDetails = ({ route }) => {
  const { pitch } = route.params;
  const [selectedDate, setSelectedDate] = useState(null);
  const [startHour, setStartHour] = useState(new Date());
  const [endHour, setEndHour] = useState(new Date());

  const navigation = useNavigation();

  const handleDateSelect = (day) => {
    setSelectedDate(day);
  };

  const handleLeaseNow = () => {
    if (selectedDate) {
      alert(`Leasing Pitch on ${selectedDate.dateString} from ${startHour.toLocaleTimeString()} to ${endHour.toLocaleTimeString()}`);
    } else {
      alert('Please select a date');
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
        <Image source={{ uri: pitch.imageReference}} style={styles.detailsImage} />
        <Text style={styles.title}>{pitch.title}</Text>
        <Text style={styles.description}>{pitch.description}</Text>
      </Card>


      
      <Card style={styles.card}>
        <Text style={styles.price}>Price: {pitch.price} Per Hour</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.price}>Sport Category: {pitch.sportCategory}</Text>
      </Card>

      <Card style={styles.card}>
          <Text style={styles.price}>
            Available: {pitch.availableStatus ? 'Yes' : 'No'}
          </Text>
        </Card>

      <Card style={styles.card}>

     
        <Text style={styles.subtitle}>Pitch Location:</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            llatitude: parseFloat(pitch.location.latitude),
            longitude: parseFloat(pitch.location.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: pitch.latitude, longitude: pitch.longitude }}
            title="Pitch Location"
          />
        </MapView>

      </Card>


     

      <TouchableOpacity
          style={styles.button}
          onPress={handleLeaseNow}>
          <Text style={styles.buttonTitle}>Lease Now</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default PitchDetails;
