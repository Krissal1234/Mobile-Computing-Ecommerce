import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from 'store-frontend/src/Views/styles';
import MapView, { Marker } from 'react-native-maps';



//import DateTimePicker from '@react-native-community/datetimepicker';

const PitchDetails = ({ route }) => {
  const { pitch } = route.params;
  const [selectedDate, setSelectedDate] = useState(null);
  const [startHour, setStartHour] = useState(new Date());
  const [endHour, setEndHour] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
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

  const onChangeStartHour = (event, selectedTime) => {
    const currentTime = selectedTime || startHour;
    setShowStartTimePicker(Platform.OS === 'ios');
    setStartHour(currentTime);
  };

  const onChangeEndHour = (event, selectedTime) => {
    const currentTime = selectedTime || endHour;
    setShowEndTimePicker(Platform.OS === 'ios');
    setEndHour(currentTime);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={40} color="#fff" />
      </TouchableOpacity>

      <Card style={styles.card}>
        <Image source={{ uri: pitch.imageReference}} style={styles.detailsImage} />
        <Text style={styles.title}>{pitch.title}</Text>
        <Text style={styles.description}>{pitch.description}</Text>
      </Card>

      <Card style={styles.card}>

     
        <Text style={styles.subtitle}>Pitch Location:</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: pitch.latitude,
            longitude: pitch.longitude,
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

      <Card style={styles.card}>
        <Text style={styles.price}>Price: {pitch.pricePerHour} Per Hour</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.dateTitle}>
          {selectedDate ? `Selected Date: ${selectedDate.dateString}` : 'Select Date'}
        </Text>

        <Calendar
          onDayPress={(day) => handleDateSelect(day)}
          markedDates={{
            [selectedDate?.dateString || '']: { selected: true, color: '#A2383A', textColor: 'white' },
          }}
          theme={{
            calendarBackground: '#fff',
            textSectionTitleColor: '#b6c1cd',
            todayTextColor: '#A2383A',
            dayTextColor: '#2d4150',
            arrowColor: 'orange',
          }}
        />

        <View style={styles.timePickerContainer}>
          <View style={styles.timePicker}>
            <Text style={styles.timeLabel}>Start Time</Text>
            <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.timeDisplay}>
              <Text>{startHour.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            {/*showStartTimePicker && (
              <DateTimePicker
                value={startHour}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChangeStartHour}
              />
            )*/}
          </View>

          <View style={styles.timePicker}>
            <Text style={styles.timeLabel}>End Time</Text>
            <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={styles.timeDisplay}>
              <Text>{endHour.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            {/*showEndTimePicker && (
              <DateTimePicker
                value={endHour}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChangeEndHour}
              />
            )*/}
          </View>
        </View>
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
