import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  FlatList,
  Platform,
} from "react-native";
import { Card } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { EquipmentController } from "../../Controllers/EquipmentController";
import { UserContext } from "../../Contexts/UserContext";
import { useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import addEquipmentStyles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../styles";
import { colors } from "../colors";
import downward_cevron from "../../../assets/downward_cevron.png";
import upward_cevron from "../../../assets/upward_cevron.png";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator } from "react-native";
import * as Location from 'expo-location';

const AddEquipment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [availableStatus, setAvailableStatus] = useState("Yes");
  const [deliveryType, setDeliveryType] = useState(null);
  const [images, setImages] = useState([]);
  const [pickupLocation, setPickupLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const [isAvailableDropdownVisible, setIsAvailableDropdownVisible] =
    useState(false);
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [condition, setCondition] = useState("");
  const [isConditionDropdownVisible, setIsConditionDropdownVisible] =
    useState(false);
  const deliveryOptions = ["pickup", "delivery"]; //TODO: show capitals in UI but pass it to the firebase function in lowercase to keep lowercase standard.
  const availableOptions = ["Yes", "No"];
  const conditionOptions = ["New", "Used", "Refurbished"];
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState("");
  const [isSportDropdownVisible, setIsSportDropdownVisible] = useState(false);
  const { sportCategories } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDeliveryDropdownVisible, setIsDeliveryDropdownVisible] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchSports = async () => {
      try {
        if (Array.isArray(sportCategories)) {
          setSports(sportCategories);
        } else {
          console.log("Unexpected response structure:", sportCategories);
          // Handle the case where the response is not as expected
          setSports(["No Category"]);
        }
      } catch (error) {
        console.error("Error fetching sports:", error);
        setSports(["No Categoires"]); // Set a default or empty array in case of error
      }
    };

    fetchSports();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords); // Initialize deliveryLocation with the user's current location
    })();
  }, []);

  const selectSport = (item) => {
    setSelectedSport(item);
    setIsSportsDropdownVisible(false);
  };

  const renderSportItem = ({ item }) => (
    <TouchableOpacity onPress={() => selectSport(item)}>
      <Text style={addEquipmentStyles.dropdownItem}>{item}</Text>
    </TouchableOpacity>
  );

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const selectedUri = result.assets[0].uri; // Updated to use assets array
      console.log(selectedUri);
      setImages([selectedUri]);
    }
  };

  const handleMapPress = (e) => {
    setLocation(e.nativeEvent.coordinate);
  };

  const handleAddEquipment = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (
      !title ||
      !description ||
      !price ||
      !selectedSport ||
      !availableStatus ||
      !deliveryType ||
      !condition ||
      images.length === 0
    ) {
      setErrorMessage("Please fill in all fields and select an image.");
      setLoading(false);
      return;
    }

    try {
      var parsedPrice = parseInt(price);
      const availableStatusBoolean = availableStatus === "Yes";
      const newEquipment = {
        title,
        description,
        price: parsedPrice,
        sportCategory: selectedSport,
        availableStatus: availableStatusBoolean,
        deliveryType,
        condition,
        imageReference: images[0],
        pickupLocation: deliveryType === "delivery" ? null : pickupLocation,
      };
      console.log("New Equipment:", newEquipment);

      const response = await EquipmentController.PostEquipment(
        newEquipment,
        user
      );
      alert("Equipment added successfully!");
      setSuccessMessage("Equipment added successfully!");
      //Notification
      console.log(response.message);
    } catch (error) {
      console.error("Error adding equipment: ", error);
      setErrorMessage("Failed to add equipment.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  const toggleSportDropdown = () => {
    setIsSportDropdownVisible(!isSportDropdownVisible);
  
    // If the dropdown is being opened and no sport is selected, set the first sport as the selected one
    if (!isSportDropdownVisible && selectedSport === "" && sports.length > 0) {
      setSelectedSport(sports[0]);
    }
  };
  

  const toggleAvailableDropdown = () => {
    setIsAvailableDropdownVisible(!isAvailableDropdownVisible);
  
    // If the dropdown is being opened and no option is selected, set the first option as the selected one
    if (!isAvailableDropdownVisible && availableStatus === "" && availableOptions.length > 0) {
      setAvailableStatus(availableOptions[0]);
    }
  };
  

  const handleSelectAvailable = (item) => {
    setAvailableStatus(item);
  };

  const toggleConditionDropdown = () => {
    setIsConditionDropdownVisible(!isConditionDropdownVisible);
  
    // If the dropdown is being opened and no option is selected, set the first option as the selected one
    if (!isConditionDropdownVisible && condition === "" && conditionOptions.length > 0) {
      setCondition(conditionOptions[0]);
    }
  };
  

  const handleSelectSport = (item) => {
    setSelectedSport(item);
  };

  const toggleDeliveryDropdown = () => {
    setIsDeliveryDropdownVisible(!isDeliveryDropdownVisible);
  
    // If the dropdown is being opened and no option is selected, set the first option as the selected one
    if (!isDeliveryDropdownVisible && deliveryType === null && deliveryOptions.length > 0) {
      setDeliveryType(deliveryOptions[0]);
    }
  };
  

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      keyboardShouldPersistTaps="never"
    >
      <View style={styles.androidFooterFix}>
        {/* Back Button */}
        <View style={styles.buttonRow}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={40} color="white" />
        </TouchableOpacity>
        </View>

        {/* Choose Photo */}
        <Card style={styles.card}>
          <TouchableOpacity
            onPress={handleChoosePhoto}
            style={addEquipmentStyles.photoButton}
          >
            <Icon name="camera" size={50} color={colors.darkBlue} />
            {images.length > 0 ? (
              images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={addEquipmentStyles.image}
                />
              ))
            ) : (
              <Text style={styles.title}>Choose Equipment Photo</Text>
            )}
          </TouchableOpacity>
        </Card>

        {/* Equipment Title */}
        <Card style={styles.card}>
          
          <Text style={styles.title}>Equipment Title</Text>
          <TextInput
            style={styles.addEquipmentInput}
            placeholder="Enter Equipment Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </Card>

        {/* Description */}
        <Card style={styles.card}>
          
          <Text style={styles.title}>Description</Text>
          <TextInput
            style={styles.addEquipmentInput}
            placeholder="Enter Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </Card>

        {/* Price Per Hour */}
        <Card style={styles.card}>
          
          <Text style={styles.title}>Price Per Hour</Text>
          <TextInput
            style={styles.addEquipmentInput}
            placeholder="Enter Price"
            keyboardType="numeric"
            value={price}
            onChangeText={(text) => setPrice(text)}
          />
        </Card>

        {/* Sport Category Dropdown Button */}
        <TouchableOpacity
          style={styles.card}
          onPress={toggleSportDropdown}
          activeOpacity={1}
        >
          
          <Text style={styles.title}>Sport Category</Text>
          <View style={styles.timeContainer}>
            <Text style={addEquipmentStyles.dropdownButtonText}>
              {selectedSport || "Select Sport Category"}
            </Text>
            <Image
              source={isSportDropdownVisible ? upward_cevron : downward_cevron}
              style={styles.cevron}
            />
          </View>

          {/* Sport Category Dropdown List */}
          {isSportDropdownVisible &&
            (Platform.OS === "android" ? (
              <FlatList
                data={sports}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={addEquipmentStyles.dropdownItem}
                    onPress={() => handleSelectSport(item)}
                  >
                    <Text style={addEquipmentStyles.dropdownItemText}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Picker
                selectedValue={selectedSport}
                onValueChange={(itemValue, itemIndex) =>
                  handleSelectSport(itemValue)
                }
                style={addEquipmentStyles.picker}
              >
                {sports.map((sport, index) => (
                  <Picker.Item label={sport} value={sport} key={index} />
                ))}
              </Picker>
            ))}
        </TouchableOpacity>

        {/* Available */}
        <TouchableOpacity
          style={styles.card}
          onPress={toggleAvailableDropdown}
          activeOpacity={1}
        >
          <Text style={styles.title}>Availability</Text>
          <View style={styles.timeContainer}>
            <Text style={addEquipmentStyles.dropdownButtonText}>
              {availableStatus ? availableStatus : "Select Availability"}
            </Text>
            <Image
              source={
                isAvailableDropdownVisible ? upward_cevron : downward_cevron
              }
              style={styles.cevron}
            />
          </View>

          {/* Available Dropdown List */}
          {isAvailableDropdownVisible &&
            (Platform.OS === "android" ? (
              <FlatList
                data={availableOptions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={addEquipmentStyles.dropdownItem}
                    onPress={() => {
                      handleSelectAvailable(item);
                    }}
                  >
                    <Text style={addEquipmentStyles.dropdownItemText}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Picker
                selectedValue={availableStatus}
                onValueChange={(itemValue, itemIndex) =>
                  handleSelectAvailable(itemValue)
                }
                style={addEquipmentStyles.picker}
              >
                {availableOptions.map((option, index) => (
                  <Picker.Item label={option} value={option} key={index} />
                ))}
              </Picker>
            ))}
        </TouchableOpacity>

        {/* Delivery Type */}
        <TouchableOpacity
          style={styles.card}
          onPress={toggleDeliveryDropdown}
          activeOpacity={1}
        >
          <Text style={styles.title}>Delivery Type</Text>
          <View style={styles.timeContainer}>
            <Text style={addEquipmentStyles.dropdownButtonText}>
              {deliveryType || "Select Delivery Type"}
            </Text>
            <Image
              source={
                isDeliveryDropdownVisible ? upward_cevron : downward_cevron
              }
              style={styles.cevron}
            />
          </View>

          {/* Delivery Type Dropdown List */}
          {isDeliveryDropdownVisible &&
            (Platform.OS === "android" ? (
              <FlatList
                data={deliveryOptions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={addEquipmentStyles.dropdownItem}
                    onPress={() => {
                      setDeliveryType(item);
                      setIsDeliveryDropdownVisible(false);
                    }}
                  >
                    <Text style={addEquipmentStyles.dropdownItemText}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Picker
                selectedValue={deliveryType}
                onValueChange={(itemValue, itemIndex) => {
                  setDeliveryType(itemValue);
                  setIsDeliveryDropdownVisible(false);
                }}
                style={addEquipmentStyles.picker}
              >
                {deliveryOptions.map((option, index) => (
                  <Picker.Item label={option} value={option} key={index} />
                ))}
              </Picker>
            ))}
        </TouchableOpacity>

        {/* Pickup Location */}
        {deliveryType !== "delivery" && (
          // Render pickup location input only when not Delivery
          <View style={styles.card}>
            <Text style={styles.subtitle}>Pickup Location:</Text>
            {location ? (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                onPress={handleMapPress} // Set new delivery location on map press
              >
                {location && (
                  <Marker
                    coordinate={{
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }}
                    title="Delivery Location"
                  />
                )}
              </MapView>
            ) : (
              <Text>{errorMsg || "Loading..."}</Text>
            )}
          </View>
        )}

        {/* Condition */}
        <TouchableOpacity
          style={styles.card}
          onPress={toggleConditionDropdown}
          activeOpacity={1}
        >
          
          <Text style={styles.title}>Condition</Text>
          <View style={styles.timeContainer}>
            <Text style={addEquipmentStyles.dropdownButtonText}>
              {condition !== "" ? condition : "Select Condition"}
            </Text>
            <Image
              source={
                isConditionDropdownVisible ? upward_cevron : downward_cevron
              }
              style={styles.cevron}
            />
          </View>

          {/* Condition Dropdown List */}
          {isConditionDropdownVisible &&
            (Platform.OS === "android" ? (
              <FlatList
                data={conditionOptions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={addEquipmentStyles.dropdownItem}
                    onPress={() => {
                      setCondition(item);
                      setIsConditionDropdownVisible(false);
                    }}
                  >
                    <Text style={addEquipmentStyles.dropdownItemText}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Picker
                selectedValue={condition}
                onValueChange={(itemValue, itemIndex) => {
                  setCondition(itemValue);
                  setIsConditionDropdownVisible(false);
                }}
                style={addEquipmentStyles.picker}
              >
                {conditionOptions.map((option, index) => (
                  <Picker.Item label={option} value={option} key={index} />
                ))}
              </Picker>
            ))}
        </TouchableOpacity>

        {errorMessage.length > 0 && (
          <Text style={addEquipmentStyles.errorMessage}>{errorMessage}</Text>
        )}

        {successMessage.length > 0 && (
          <Text style={addEquipmentStyles.successMessage}>
            {successMessage}
          </Text>
        )}

        <TouchableOpacity style={styles.card} onPress={handleAddEquipment}>
          <Text style={styles.title}>Add Equipment</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddEquipment;
