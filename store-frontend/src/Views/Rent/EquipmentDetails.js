import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator,Image,TouchableOpacity,ScrollView } from 'react-native';
import { EquipmentController } from '../../Controllers/EquipmentController';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles';
import { Calendar } from 'react-native-calendars';
import { colors } from '../colors';
import downward_cevron from '../../../assets/downward_cevron.png'
import upward_cevron from '../../../assets/upward_cevron.png'

const EquipmentDetails = ({ route}) => {
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [startTimeExpanded, setStartTimeExpanded] = useState(false);
  const [endTimeExpanded, setEndTimeExpanded] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minDate, setMinDate] = useState(new Date().toISOString().split('T')[0]);

  function toggleStartTime (){
    if(checkOpen() || startTimeExpanded){setStartTimeExpanded(!startTimeExpanded)}
  }

  function toggleEndTime (){
    if(checkOpen() || endTimeExpanded){setEndTimeExpanded(!endTimeExpanded)}
  }

  function checkOpen(){
    return startTimeExpanded || endTimeExpanded ? false : true
  }

  const onDayPress = (day) => {
    if (!startDate) {
      setStartDate(day.dateString);
      setMinDate(day.dateString);  // Set minDate to the selected start date
    } else if (!endDate && day.dateString > startDate) {
      setEndDate(day.dateString);
    } else {
      resetStartEndDates();
    }
  };

  const resetStartEndDates = () => {
    setStartDate('');
    setEndDate('');
    setMinDate(new Date().toISOString().split('T')[0]); // Reset minDate to the current date
  };

  const getMarkedDates = () => {
    let markedDates = {};
    if (startDate) {
      markedDates[startDate] = { startingDay: true, color: colors.darkBlue, textColor: colors.white};
    }
    if (endDate) {
      markedDates[endDate] = { endingDay: true, color: colors.darkBlue, textColor: colors.white };
    }
    if (startDate && endDate) {
      let start = new Date(startDate);
      let end = new Date(endDate);
      for (let m = new Date(start); m <= end; m.setDate(m.getDate() + 1)) {
        const dateStr = m.toISOString().split('T')[0];
        if (markedDates[dateStr]) {
          markedDates[dateStr] = { ...markedDates[dateStr], color: colors.darkBlue, textColor: colors.white };
        } else {
          markedDates[dateStr] = { color: colors.darkBlue, textColor: colors.white };
        }
      }
    }
    return markedDates;
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
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

  const deliveryType = equipment.deliveryType.charAt(0).toUpperCase() + equipment.deliveryType.slice(1);//sets delivery type with uppercase first letter
  const collectionType = deliveryType=='pickup' ? 'Drop-Off' : 'Retrieval';
  return (
    <ScrollView style = {styles.container}>

      {/* Img,Title,Desc */}
      <View style = {styles.card}>
        <Image source = {{uri: equipment.image}} style = {styles.card}></Image>
        <Text style = {styles.title}>{equipment.title}</Text>
        <TouchableOpacity onPress={toggleExpanded} style={styles.descriptionContainer}>
          <Text
            numberOfLines={isExpanded ? null : 2} // null means no limit
            ellipsizeMode='tail'
            style={styles.description}
          >
          {equipment.description}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Price */}
      <View style = {styles.card}>
        <View style = {styles.priceContainer}>
          <Text style = {styles.title}>Price : </Text>
          <Text style = {styles.title}>£{equipment.price}</Text>
          <Text style = {styles.title}>Per Hour</Text>
        </View>
      </View>

      {/* Handover Type */}
      <View style = {styles.card}>
        <Text style = {styles.title}>Handover Type : {deliveryType}</Text>
      </View>

      {/* Calendar */}
      <View style = {styles.card}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={getMarkedDates()}
          markingType={'period'}
          theme={styles.calendarTheme}
          minDate={minDate}
        />
      </View>

      {/* Start Time*/}
      <TouchableOpacity style = {styles.card} onPress = {toggleStartTime}>

        <View style = {styles.timeContainer}>
          <Text style = {styles.title}>Set {deliveryType} Time</Text>
          {!startTimeExpanded && (
            <Image source ={downward_cevron} style ={styles.cevron}></Image>
          )}
          {startTimeExpanded && (
            <Image source ={upward_cevron} style ={styles.cevron}></Image>
          )}
        </View>

      </TouchableOpacity>

      {/* End Time*/}
      <TouchableOpacity style = {styles.card} onPress = {toggleEndTime}>

        <View style = {styles.timeContainer}>
          <Text style = {styles.title}>Set {collectionType} Time</Text>
          {!endTimeExpanded && (
            <Image source ={downward_cevron} style ={styles.cevron}></Image>
          )}
          {endTimeExpanded && (
            <Image source ={upward_cevron} style ={styles.cevron}></Image>
          )}
        </View>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default EquipmentDetails;
