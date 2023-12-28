import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
        <Icon name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <Card style={styles.card}>
        <Image source={{ uri: pitch.image }} style={styles.image} />
        <Text style={styles.title}>{pitch.title}</Text>
        <Text style={styles.description}>{pitch.description1}</Text>
        <Text style={styles.description}>{pitch.description2}</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.price}>Price: {pitch.price} Per Hour</Text>
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

      <Button mode="contained" onPress={handleLeaseNow} style={styles.leaseButton}>
        Lease Now
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#132945',
  },
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#A2383A',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  description: {
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  dateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  backButton: {
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  timePicker: {
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  timeDisplay: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#A2383A',
    borderRadius: 5,
  },
  leaseButton: {
    marginVertical: 10,
  },
});

export default PitchDetails;
