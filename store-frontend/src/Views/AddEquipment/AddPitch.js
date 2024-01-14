import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { Card, Button } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "../../Contexts/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";
import { FacilitiesController } from "../../Controllers/FacilitiesController";
import { colors } from "../colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import downward_cevron from "../../../assets/downward_cevron.png";
import upward_cevron from "../../../assets/upward_cevron.png";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator } from "react-native";

import addEquipmentStyles from "./styles"; // Modify as needed for AddPitch

const AddPitch = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [availableStatus, setAvailableStatus] = useState("Yes");
  const [images, setImages] = useState([]);
  const navigation = useNavigation();
  const [pickupLocation, setPickupLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const [isAvailableDropdownVisible, setIsAvailableDropdownVisible] =
    useState(false);
  const { user, sportCategories } = useContext(UserContext);
  const availableOptions = ["Yes", "No"];
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState("");
  const [isSportsDropdownVisible, setIsSportsDropdownVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSportDropdownVisible, setIsSportDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectSport = (item) => {
    setSelectedSport(item);
    setIsSportsDropdownVisible(false);
  };

  const renderSportItem = ({ item }) => (
    <TouchableOpacity onPress={() => selectSport(item)}>
      <Text style={addEquipmentStyles.dropdownItem}>{item}</Text>
    </TouchableOpacity>
  );

  const handleSelectSport = (item) => {
    setSelectedSport(item);
    setIsSportDropdownVisible(false);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setSports(["No Filter", ...sportCategories]);
  }, [sportCategories]);

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
      const selectedUri = result.assets[0].uri;
      setImages([selectedUri]);
    }
  };

  const handleAddPitch = async () => {
    setLoading(true); // Start loading
    setErrorMessage("");
    setSuccessMessage("");

    if (
      !title ||
      !description ||
      !price ||
      !selectedSport ||
      !availableStatus ||
      images.length === 0
    ) {
      setErrorMessage("Please fill in all fields and select an image.");
      setLoading(false); // Stop loading in case of error
      return;
    }

    try {
      const parsedPrice = parseInt(price);
      const availableStatusBoolean = availableStatus === "Yes";
      const newPitch = {
        title,
        description,
        price: parsedPrice,
        sportCategory: selectedSport,
        availableStatus: availableStatusBoolean,
        imageReference: images[0],
        location: pickupLocation,
      };

      console.log("New Pitch:", newPitch);
      const response = await FacilitiesController.postFacility(newPitch, user);
      alert("Facility added successfully!");
      setSuccessMessage("Facility added successfully!"); // Notification if success
      navigation.goBack();


      console.log(response);
    } catch (error) {
      console.error("Error adding facility: ", error);
      setErrorMessage("Failed to add facility.");
    } finally {
      setLoading(false); // Stop loading after operation
    }
  };

  if (loading) {
    // Show loading indicator when submitting dasta
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  const toggleAvailableDropdown = () => {
    setIsAvailableDropdownVisible(!isAvailableDropdownVisible);
  };

  const handleSelectAvailable = (item) => {
    setAvailableStatus(item);
    toggleAvailableDropdown();
  };

  const toggleSportDropdown = () => {
    setIsSportDropdownVisible(!isSportDropdownVisible);
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      keyboardShouldPersistTaps="never"
    >
      <View style={styles.androidFooterFix}>
        {/* Back Button */}
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={40} color="white" />
        </TouchableOpacity>

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
              <Text style={styles.title}>Choose Facility Photo</Text>
            )}
          </TouchableOpacity>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.title}>Facility Title</Text>
          <TextInput
            style={styles.addEquipmentInput}
            placeholder="Enter Pitch Title"
            value={title}
            onChangeText={setTitle}
          />
        </Card>

        <Card style={styles.card}>
          <Text style={styles.title}>Description</Text>
          <TextInput
            style={styles.addEquipmentInput}
            placeholder="Enter Description"
            value={description}
            onChangeText={setDescription}
          />
        </Card>

        <Card style={styles.card}>
          <Text style={styles.title}>Price Per Hour</Text>
          <TextInput
            style={styles.addEquipmentInput}
            placeholder="Enter Price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
        </Card>

        <TouchableOpacity
          style={styles.card}
          onPress={toggleSportDropdown}
          activeOpacity={1}
        >
          {/* Sport Category Dropdown Button */}

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

        <Card style={styles.card}>
          <View style={addEquipmentStyles.mapContainer}>
            <Text style={styles.title}>Facility Location</Text>
            <MapView
              style={styles.map}
              region={{
                latitude: parseFloat(pickupLocation.latitude) || 35.9375,
                longitude: parseFloat(pickupLocation.longitude) || 14.3754,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onPress={(e) => {
                const { latitude, longitude } = e.nativeEvent.coordinate;
                setPickupLocation({
                  latitude: latitude.toString(),
                  longitude: longitude.toString(),
                });
              }}
            >
              {pickupLocation.latitude && pickupLocation.longitude && (
                <Marker
                  coordinate={{
                    latitude: parseFloat(pickupLocation.latitude),
                    longitude: parseFloat(pickupLocation.longitude),
                  }}
                  title="Pitch Location"
                />
              )}
            </MapView>
          </View>
        </Card>

        {errorMessage.length > 0 && (
          <Text style={addEquipmentStyles.errorMessage}>{errorMessage}</Text>
        )}

        {successMessage.length > 0 && (
          <Text style={addEquipmentStyles.successMessage}>
            {successMessage}
          </Text>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddPitch}>
            <Text style={styles.buttonTitle}>Add Facility</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddPitch;
