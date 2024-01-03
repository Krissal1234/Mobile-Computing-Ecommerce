import React, { useState, useEffect,useRef, useContext } from 'react';
import { View, Text, ActivityIndicator,Image,TouchableOpacity,ScrollView,Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { EquipmentController } from '../../Controllers/EquipmentController';
import styles from '../styles';
import { Calendar } from 'react-native-calendars';
import { colors } from '../colors';
import downward_cevron from '../../../assets/downward_cevron.png'
import upward_cevron from '../../../assets/upward_cevron.png'
import basket_outline_black from '../../../assets/basket_outline_black.png'
import { UserContext } from '../../Contexts/UserContext';


const EquipmentDetails = ({ route}) => {
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [startTimeDropdown, setStartTimeDropdown] = useState(false);
  const [endTimeDropdown, setEndTimeDropdown] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minDate, setMinDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedStartTime, setSelectedStartTime] = useState("12:00");
  const [selectedEndTime, setSelectedEndTime] = useState("13:00");
  const scrollViewRef = useRef();
  const calendarEnlarge = useRef(new Animated.Value(1)).current;
  const {user} = useContext(UserContext);
  function toggleStartTime (){
    if(startDate == ''){
      scrollToObject(250,calendarEnlarge)
    }else{
      setStartTimeDropdown(!startTimeDropdown)
    }
  }

  function toggleEndTime (){
    if(startDate == ''){
      scrollToObject(250,calendarEnlarge)
    }
    else{
      setEndTimeDropdown(!endTimeDropdown)
    }
  }

  function scrollToObject(yPosition,object){
    scrollViewRef.current.scrollTo({ y: yPosition, animated: true });
    animateEnlarge(object);
  };

  const animateEnlarge = (object) => {
    // Enlarge
    Animated.timing(object, {
      toValue: 1.07, // Enlarge scale to 1.1
      duration: 300,
      useNativeDriver: true, // Add this line
    }).start(() => {
      // Then shrink back down
      Animated.timing(object, {
        toValue: 1, // Back to original scale
        duration: 300,
        useNativeDriver: true, // Add this line
      }).start();
    });
  };

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

  const handleBuyNow = () => {
   
    const newOrder = {
      category : "equipment",
      itemId: route.params,
      pricePerHour: equipment.pricePerHour,
      rentalPeriod: {
        start: startDate,
        end: endDate,
      }
   //   deliveryType
    }

    
  }

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

  const times = [];
  for (let i = 6; i <= 24; i++) {
    times.push(`${i < 10 ? '0' + i : i}:00`); // array of times from "06:00" to "24:00"
  }

  const renderTimePicker = (timesArray, selectedTime, setSelectedTime) => {
    return (
      <Picker
        selectedValue={selectedTime}
        onValueChange={(itemValue) => setSelectedTime(itemValue)}
        style={styles.timeDropdown}
      >
        {timesArray.map((time, index) => (
          <Picker.Item label={time} value={time} key={index} />
        ))}
      </Picker>
    );
  };

  const deliveryType = equipment.deliveryType.charAt(0).toUpperCase() + equipment.deliveryType.slice(1);//sets delivery type with uppercase first letter
  const collectionType = deliveryType=='pickup' ? 'Drop-Off' : 'Retrieval';
  return (
    <ScrollView style = {styles.container} ref={scrollViewRef}>

      {/* Img,Title,Desc */}
      <View style = {styles.card}>
        <Image source = {{uri: equipment.imageReference}} style = {styles.detailsImage}></Image>
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

      {/* Condition Type */}
      <View style = {styles.card}>
        <Text style = {styles.title}>Condition : {equipment.condition}</Text>
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
      <Animated.View style={[styles.card, {transform: [{scale: calendarEnlarge}]}]}>

        <Calendar
          onDayPress={onDayPress}
          markedDates={getMarkedDates()}
          markingType={'period'}
          theme={styles.calendarTheme}
          minDate={minDate}
        />
      </Animated.View>

      {/* Start Time Section */}
      <TouchableOpacity style={styles.card} onPress={toggleStartTime} activeOpacity={1}>
        <View style={styles.timeContainer}>
          
          <Text style={styles.title}>{deliveryType} Time: {selectedStartTime}</Text>
          <Image source={startTimeDropdown ? upward_cevron : downward_cevron} style={styles.cevron} />
          
        </View>

        {startTimeDropdown && renderTimePicker(times, selectedStartTime, setSelectedStartTime)}

      </TouchableOpacity>

      {/* End Time*/}
      <TouchableOpacity style={styles.card} onPress={toggleEndTime} activeOpacity={1}>

        <View style={styles.timeContainer}>
          <Text style={styles.title}>{collectionType} Time: {selectedEndTime}</Text>
          <Image source={endTimeDropdown ? upward_cevron : downward_cevron} style={styles.cevron} />
        </View>

        {endTimeDropdown && renderTimePicker(times, selectedEndTime, setSelectedEndTime)}

      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={handleBuyNow}>
        <View style={styles.timeContainer}>
          <Text style={styles.titleBasket}>Buy Now</Text>
          <Image source={basket_outline_black} style={styles.basket} />
        </View>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default EquipmentDetails;
