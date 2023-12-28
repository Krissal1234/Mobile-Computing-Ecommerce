import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button, Switch } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 

const PitchDetails = ({ route }) => {
  const { pitch } = route.params;
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const navigation = useNavigation();

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
      alert(`Leasing Pitch from ${selectedStartDate.dateString} to ${selectedEndDate.dateString}`);
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
        <Image source={{ uri: pitch.image }} style={styles.image} />
        <Text style={styles.title}>{pitch.title}</Text>
        <Text style={styles.description}>{pitch.description1}</Text>
        <Text style={styles.description}>{pitch.description2}</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.price}>Price: {pitch.price} Per Day</Text>
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

      <Button mode="contained" onPress={handleLeaseNow}>
        Lease Now
      </Button>
    </ScrollView>
  );
};

const styles = {
  // ... same styles as before
};

export default PitchDetails;
