import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Modal,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import { FacilitiesController } from "../../Controllers/FacilitiesController";
import { OrderController } from "../../Controllers/OrderController";
import styles from "../styles";
import { Calendar } from "react-native-calendars";
import { colors } from "../colors";
import downward_cevron from "../../../assets/downward_cevron.png";
import upward_cevron from "../../../assets/upward_cevron.png";
import basket_outline_black from "../../../assets/basket_outline_black.png";
import { UserContext } from "../../Contexts/UserContext";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { ListingsController } from "../../Controllers/ListingsController";
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // Show an alert box when a notification is received
    shouldPlaySound: true, // Play a sound when a notification is received
    shouldSetBadge: false, // Do not update the app icon badge when a notification is received
  }),
});

const FacilitiesDetails = ({ route }) => {
  //Start Up
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [facilities, setFacilities] = useState(null);

  //Expand description
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

  // Location functions
  const [location, setLocation] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null); //for order (use deliveryLocation.longitude or .latitude)

  // Dates
  const [startDate, setStartDate] = useState(""); //for order (ISO / YYYY-MM-DD)
  const [endDate, setEndDate] = useState(""); //for order (ISO / YYYY-MM-DD) (isn't null, uses '')
  const [minDate, setMinDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Adding 1 day to the current date
    return tomorrow.toISOString().split("T")[0];
  });

  //Scroll and Enlarge

  // Time
  const [startTimeDropdown, setStartTimeDropdown] = useState(false);
  const [endTimeDropdown, setEndTimeDropdown] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState("12:00"); //for order
  const [selectedEndTime, setSelectedEndTime] = useState("13:00"); //for order

  const [isModalVisible, setModalVisible] = useState(false);

  const [notification, setNotification] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const scrollViewRef = useRef();
  const calendarEnlarge = useRef(new Animated.Value(1)).current;
  const { user } = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState(null);
  const serviceFee = 2;
  let totalPrice = 0;

  // Start up functions

  useEffect(() => {
    const fetchFacilities = async () => {
      const { facilitiesId } = route.params;
      setLoading(true);
      const response = await FacilitiesController.getFacilityById(facilitiesId);
      console.log("facilities:", response);
      if (response.success) {
        setFacilities(response.data);
      } else {
        console.error("Error fetching facilities:", response.message);
        // Handle error - perhaps navigate back or show a message
      }
      setLoading(false);
    };
    fetchFacilities();
  }, []);

  useEffect(() => {
    // Registers for push notifications and stores the token
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // Sets up listeners for notification events
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification); // Updates state when a notification is received
      }
    );

    // Cleans up listeners on component unmount
    return () => {
      subscription.remove();
      console.log("subs: " + subscription + " removed ");
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  if (!facilities) {
    return (
      <View>
        <Text>No facilities found.</Text>
      </View>
    );
  }

  // ---------------------------------------------------------------------------------------------------------------------

  // Expand description

  const toggleDetailsExpanded = () => {
    setIsDetailsExpanded(!isDetailsExpanded);
  };

  // ---------------------------------------------------------------------------------------------------------------------

  //Dates functions

  const onDayPress = (day) => {
    if (!startDate) {
      setStartDate(day.dateString);
      setMinDate(day.dateString); // Set minDate to the selected start date
    } else if (!endDate && day.dateString > startDate) {
      setEndDate(day.dateString);
    } else {
      resetStartEndDates();
    }
  };

  const resetStartEndDates = () => {
    setSelectedStartTime("12:00");
    setSelectedEndTime("13:00");
    setStartDate("");
    setEndDate("");
    setMinDate(new Date().toISOString().split("T")[0]); // Reset minDate to the current date
  };

  const getMarkedDates = () => {
    let markedDates = {};
    if (startDate) {
      markedDates[startDate] = {
        startingDay: true,
        color: colors.darkBlue,
        textColor: colors.white,
      };
    }
    if (endDate) {
      markedDates[endDate] = {
        endingDay: true,
        color: colors.darkBlue,
        textColor: colors.white,
      };
    }
    if (startDate && endDate) {
      let start = new Date(startDate);
      let end = new Date(endDate);
      for (let m = new Date(start); m <= end; m.setDate(m.getDate() + 1)) {
        const dateStr = m.toISOString().split("T")[0];
        if (markedDates[dateStr]) {
          markedDates[dateStr] = {
            ...markedDates[dateStr],
            color: colors.darkBlue,
            textColor: colors.white,
          };
        } else {
          markedDates[dateStr] = {
            color: colors.darkBlue,
            textColor: colors.white,
          };
        }
      }
    }
    calculateTotalPrice();
    return markedDates;
  };

  // ---------------------------------------------------------------------------------------------------------------------

  //Scroll and Zoom functions

  function scrollToObject(yPosition, object) {
    scrollViewRef.current.scrollTo({ y: yPosition, animated: true });
    animateEnlarge(object);
  }

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

  // ---------------------------------------------------------------------------------------------------------------------

  // Time Functions
  function formatDateTimeModal(dateString, timeString) {
    const date = new Date(`${dateString}T${timeString}`);
    return `${date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })} at ${date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}`;
  }
  function toggleStartTime() {
    if (startDate == "") {
      scrollToObject(850, calendarEnlarge);
    } else {
      setStartTimeDropdown(!startTimeDropdown);
    }
  }

  function toggleEndTime() {
    if (startDate == "") {
      scrollToObject(850, calendarEnlarge);
    } else {
      setEndTimeDropdown(!endTimeDropdown);
    }
  }

  function handleStartTimeSet(time) {
    if (time < selectedEndTime || endDate != "") {
      setSelectedStartTime(time);
    } else {
      setSelectedStartTime(time);
      // Parse the selected time
      let [hours, minutes] = time.split(":").map(Number);
      let date = new Date();
      date.setHours(hours, minutes);

      // Add one hour
      date.setHours(date.getHours() + 1);

      // Format the new time back into "HH:00" format
      let newHours = date.getHours();
      let formattedNewTime = `${newHours < 10 ? "0" + newHours : newHours}:00`;
      if (formattedNewTime == "00:00") {
        formattedNewTime = "24:00";
      }
      setSelectedEndTime(formattedNewTime);
    }
  }

  function handleEndTimeSet(time) {
    if (selectedStartTime < time || endDate != "") {
      setSelectedEndTime(time);
    } else {
      setSelectedEndTime(time);
      // Parse the selected time
      let [hours, minutes] = time.split(":").map(Number);
      let date = new Date();
      date.setHours(hours, minutes);

      // minus one hour
      date.setHours(date.getHours() - 1);

      // Format the new time back into "HH:00" format
      let newHours = date.getHours();
      let formattedNewTime = `${newHours < 10 ? "0" + newHours : newHours}:00`;
      setSelectedStartTime(formattedNewTime);
    }
  }

  const startTimes = [];
  for (let i = 6; i <= 23; i++) {
    startTimes.push(`${i < 10 ? "0" + i : i}:00`); // array of times from "06:00" to "24:00"
  }

  const endTimes = [];
  for (let i = 7; i <= 24; i++) {
    endTimes.push(`${i < 10 ? "0" + i : i}:00`); // array of times from "06:00" to "24:00"
  }

  const renderStartTimePicker = (timesArray, selectedTime) => {
    // Android: Use FlatList
    if (Platform.OS === "android") {
      return (
        <FlatList
          data={timesArray}
          nestedScrollEnabled={true}
          style={styles.timeDropdown}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.timeItem}
              onPress={() => {
                handleStartTimeSet(item);
                calculateTotalPrice();
              }}
            >
              <Text style={styles.timeItemText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      );
    } else {
      // iOS: Use Picker
      return (
        <Picker
          selectedValue={selectedTime}
          onValueChange={(itemValue) => handleStartTimeSet(itemValue)}
          mode="dropdown"
          style={styles.timeDropdown}
        >
          {timesArray.map((time, index) => (
            <Picker.Item label={time} value={time} key={index} />
          ))}
        </Picker>
      );
    }
  };

  const renderEndTimePicker = (timesArray, selectedTime, setSelectedTime) => {
    // Android: Use FlatList
    if (Platform.OS === "android") {
      return (
        <FlatList
          data={timesArray}
          nestedScrollEnabled={true}
          style={styles.timeDropdown}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.timeItem}
              onPress={() => {
                handleEndTimeSet(item);
                calculateTotalPrice();
              }}
            >
              <Text style={styles.timeItemText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      );
    } else {
      // iOS: Use Picker
      return (
        <Picker
          selectedValue={selectedTime}
          onValueChange={(itemValue) => handleEndTimeSet(itemValue)}
          mode="dropdown"
          style={styles.timeDropdown}
        >
          {timesArray.map((time, index) => (
            <Picker.Item label={time} value={time} key={index} />
          ))}
        </Picker>
      );
    }
  };

  // ---------------------------------------------------------------------------------------------------------------------

  // Set Price Functions

  function calculateTotalPrice() {
    if (startDate && selectedStartTime && selectedEndTime && facilities.price) {
      totalPrice = 0;
      totalPrice = calculateHoursDifference() * facilities.price + serviceFee;
    }
  }

  function calculateHoursDifference() {
    let startDateTime;
    let endDateTime;
    if (endDate != "") {
      startDateTime = parseDateTime(startDate, selectedStartTime);
      endDateTime = parseDateTime(endDate, selectedEndTime);
    } else {
      startDateTime = parseDateTime(startDate, selectedStartTime);
      endDateTime = parseDateTime(startDate, selectedEndTime);
    }

    const difference = endDateTime - startDateTime;
    return Math.round(difference / (1000 * 60 * 60)); // Convert milliseconds to hours
  }

  function parseDateTime(date, time) {
    return new Date(`${date}T${time}`);
  }

  // ---------------------------------------------------------------------------------------------------------------------

  // Buy now functions

  const handleBuyNow = async () => {
    console.log("Buy Now Pressed");
    setLoading(true);
    //Used if user only decides to rent for one day
    var finalEndDate = '';
    if (!endDate){
      finalEndDate = startDate;
    }else{
      finalEndDate = endDate;
    }
    const { facilitiesId } = route.params;

    const _order = {
      rentalPeriod: {
        start: {
          startDate: startDate,
          startTime: selectedStartTime,
        },
        end: {
          endDate: finalEndDate,
          endTime: selectedEndTime,
        },
      },
      item: facilities,
      totalPrice,
      itemId: facilitiesId
    };

    console.log("ORDER ID:", _order.itemId);

    let _response = await ListingsController._createPaymentSheet(_order);
    console.log(_response)

    
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
        order
      } = _response.data;

           await initPaymentSheet({
        merchantDisplayName: "Sporty Rentals",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        }
      });

      const { error } = await presentPaymentSheet();

      if(!error){
        console.log("payment successful");
        const response = await OrderController.createOrder(order, user);
        if(response.success){
          console.log("order response", response.message);
          setLoading(false);
          return true;
        } else {
          setLoading(false);
          return false;
        } 
      } else {
        setLoading(false);
        return false;
      }
  };

  // ---------------------------------------------------------------------------------------------------------------------

  // Notifications functions

  async function scheduleLocalNotification() {
    const notificationContent = {
      title: "Item Rent Request: " + facilities.title,
      body: "Your request has been received and the owner will be in contact shortly",
      data: {
        startDate: startDate,
        endDate: endDate,
        startTime: selectedStartTime,
        endTime: selectedEndTime,
        totalPrice: facilities.price,
      },
    };

    console.log("Notification Content:", notificationContent);
    console.log("Local notification scheduled");

    await Notifications.scheduleNotificationAsync({
      content: notificationContent,
      trigger: { seconds: 1 }, // Shows the notification after a delay of 2 seconds
    });

    console.log("Local notification should have been received");
    return true;
  }

  const openModal = async () => {
    const success = await handleBuyNow();
    if (success) {
      await scheduleLocalNotification();
      setModalVisible(true);
    } else {
      console.error("Error creating order");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      // Configures notification behavior for Android
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      // Check the current permissions status
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // If we don't have permission, we ask for it
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }

      // Get the push token
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  const isBuyNowEnabled = () => {
    return (
      startDate && selectedStartTime && selectedEndTime && totalPrice
    );
  };

  // ---------------------------------------------------------------------------------------------------------------------

  return (
    <ScrollView style={styles.container} ref={scrollViewRef}>
      <View style={styles.androidFooterFix}>
        {/*Back Button  */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-left" size={40} color="white" />
          </TouchableOpacity>
        </View>

        {/* Img,Title,Desc */}
        <View style={styles.card}>
          <Image
            source={{ uri: facilities.imageReference }}
            style={styles.detailsImage}
          ></Image>
          <Text style={styles.title}>{facilities.title}</Text>
          <TouchableOpacity
            onPress={toggleDetailsExpanded}
            style={styles.descriptionContainer}
          >
            <Text
              numberOfLines={isDetailsExpanded ? null : 2} // null means no limit
              ellipsizeMode="tail"
              style={styles.description}
            >
              {facilities.description}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Price Per Hour */}
        <View style={styles.card}>
          <View style={styles.priceContainer}>
            <Text style={styles.title}>Price : </Text>
            <Text style={styles.title}>£{facilities.price}</Text>
            <Text style={styles.title}>Per Hour</Text>
          </View>
        </View>

        {/* Location */}
        {/* Show location */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>Location:</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: parseFloat(facilities.location.latitude),
              longitude: parseFloat(facilities.location.longitude),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: parseFloat(facilities.location.latitude),
                longitude: parseFloat(facilities.location.longitude),
              }}
              title="Pickup Location"
            />
          </MapView>
        </View>

        {/*  */}

        {/* Calendar */}
        <Animated.View
          style={[styles.card, { transform: [{ scale: calendarEnlarge }] }]}
        >
          <Text style={styles.title}>Select Dates:</Text>
          <Calendar
            onDayPress={onDayPress}
            markedDates={getMarkedDates()}
            markingType={"period"}
            theme={styles.calendarTheme}
            minDate={minDate}
          />
        </Animated.View>

        {/* Start Time Section */}
        <TouchableOpacity
          style={styles.card}
          onPress={toggleStartTime}
          activeOpacity={1}
        >
          <View style={styles.timeContainer}>
            <Text style={styles.title}>Start Time: {selectedStartTime}</Text>
            <Image
              source={startTimeDropdown ? upward_cevron : downward_cevron}
              style={styles.cevron}
            />
          </View>

          {startTimeDropdown &&
            renderStartTimePicker(startTimes, selectedStartTime)}
        </TouchableOpacity>

        {/* End Time*/}
        <TouchableOpacity
          style={styles.card}
          onPress={toggleEndTime}
          activeOpacity={1}
        >
          <View style={styles.timeContainer}>
            <Text style={styles.title}>End Time: {selectedEndTime}</Text>
            <Image
              source={endTimeDropdown ? upward_cevron : downward_cevron}
              style={styles.cevron}
            />
          </View>

          {endTimeDropdown && renderEndTimePicker(endTimes, selectedEndTime)}
        </TouchableOpacity>

        {/* Service fee */}
        <View style={styles.card}>
          <View style={styles.priceContainer}>
            <Text style={styles.title}>Service Fee : </Text>
            <Text style={styles.title}>£{serviceFee}</Text>
          </View>
        </View>

        {/* Total Price */}
        <View style={styles.card}>
          {totalPrice != null && totalPrice != 0 ? (
            <View style={styles.priceContainer}>
              <Text style={styles.title}>Total Price : </Text>
              <Text style={styles.title}>£{totalPrice}</Text>
            </View>
          ) : (
            <View style={styles.priceContainer}>
              <Text style={styles.title}>Set Date And Time For Price</Text>
            </View>
          )}
        </View>

        {/* Buy Now */}
        <TouchableOpacity onPress={isBuyNowEnabled() ? openModal : null}
        style={[
          styles.card,
          isBuyNowEnabled() ? styles.enabledButton : styles.disabledButton,
        ]}>
          <View style={styles.timeContainer}>
            <Text style={styles.title}>Buy Now</Text>
            <Image source={basket_outline_black} style={styles.basket} />
          </View>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Order Confirmed!</Text>
              <Text>{facilities.title}</Text>
              <Text>
                {"Arrival"}:{" "}
                {formatDateTimeModal(startDate, selectedStartTime)}
              </Text>
              <Text>
                {"Vacate"}:{" "}
                {formatDateTimeModal(!endDate ? startDate : endDate, selectedEndTime)}
              </Text>
              <Text>Total Price: £{totalPrice}</Text>
              <TouchableOpacity
                onPress={closeModal}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default FacilitiesDetails;
