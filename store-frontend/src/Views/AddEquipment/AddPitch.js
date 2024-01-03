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
import styles from "store-frontend/src/Views/styles";
import { useNavigation } from "@react-navigation/native";
import { FacilitiesController } from "../../Controllers/FacilitiesController";

import addEquipmentStyles from "./styles"; // Modify as needed for AddPitch

const AddPitch = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [availableStatus, setAvailableStatus] = useState(null);
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
  const [selectedSport, setSelectedSport] = useState('');
  const [isSportsDropdownVisible, setIsSportsDropdownVisible] = useState(false);


  const selectSport = (item) => {
    setSelectedSport(item);
    setIsSportsDropdownVisible(false);
  };
  
  const renderSportItem = ({ item }) => (
    <TouchableOpacity onPress={() => selectSport(item)}>
      <Text style={addEquipmentStyles.dropdownItem}>{item}</Text>
    </TouchableOpacity>
  );

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
    console.log("availablestatus", availableStatus);
    const parsedPrice = parseInt(price);
    const newPitch = {
      title,
      description,
      price: parsedPrice,
      sportCategory:  selectedSport,
      availableStatus,
      imageReference: images[0],
      location: pickupLocation,
    };

    console.log("New Pitch:", newPitch);
    const response = await FacilitiesController.postFacility(newPitch, user);
    console.log(response)
  };

  const toggleAvailableDropdown = () => {
    setIsAvailableDropdownVisible(!isAvailableDropdownVisible);
  };

  const handleSelectAvailable = (item) => {
    setAvailableStatus(item === "Yes");
    toggleAvailableDropdown();
  };

  return (
    <SafeAreaView style={addEquipmentStyles.container}>
      <ScrollView contentContainerStyle={addEquipmentStyles.scrollContainer}>
        {/* Back Button */}
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={40} color="white" />
        </TouchableOpacity>

        <Card style={addEquipmentStyles.card}>
          <TouchableOpacity onPress={handleChoosePhoto}>
            {images.length > 0 ? (
              images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={addEquipmentStyles.image}
                />
              ))
            ) : (
              <Text style={addEquipmentStyles.choosePhotoText}>
                Choose Pitch Photos
              </Text>
            )}
          </TouchableOpacity>

          <Text style={addEquipmentStyles.label}>Pitch Title</Text>
          <TextInput
            style={addEquipmentStyles.input}
            placeholder="Enter Pitch Title"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={addEquipmentStyles.label}>Description</Text>
          <TextInput
            style={addEquipmentStyles.input}
            placeholder="Enter Description"
            value={description}
            onChangeText={setDescription}
          />

          <Text style={addEquipmentStyles.label}>Price Per Hour</Text>
          <TextInput
            style={addEquipmentStyles.input}
            placeholder="Enter Price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
    {/* Sport Category Dropdown */}
    <Text style={addEquipmentStyles.label}>Sport Category</Text>
            <View style={addEquipmentStyles.input}>
            <TouchableOpacity 
              style={addEquipmentStyles.dropdownButton}
              onPress={() => setIsSportsDropdownVisible(true)}
            >
              <Text style={addEquipmentStyles.dropdownButtonText}>
                {selectedSport || 'Select Sport Category'}
              </Text>
            </TouchableOpacity>

            {/* Dropdown Modal for Sports */}
            <Modal
              transparent={true}
              visible={isSportsDropdownVisible}
              animationType="slide"
            >
              <TouchableOpacity
                style={addEquipmentStyles.dropdownOverlay}
                onPress={() => setIsSportsDropdownVisible(false)}
              />
              <View style={addEquipmentStyles.dropdownContainer}>
                <FlatList
                  data={sports}
                  renderItem={renderSportItem}
                  keyExtractor={(item) => item}
                />
              </View>
            </Modal>
            </View>
              

          <Text style={addEquipmentStyles.label}>Available</Text>
          <View style={addEquipmentStyles.input}>
            <TouchableOpacity
              style={addEquipmentStyles.dropdownButton}
              onPress={toggleAvailableDropdown}
            >
              <Text style={addEquipmentStyles.dropdownButtonText}>
                {availableStatus !== null
                  ? availableStatus
                    ? "Yes"
                    : "No"
                  : "Select Availability"}
              </Text>
            </TouchableOpacity>
            <Modal
              transparent={true}
              visible={isAvailableDropdownVisible}
              animationType="slide"
            >
              <TouchableOpacity
                style={addEquipmentStyles.dropdownOverlay}
                onPress={toggleAvailableDropdown}
              />
              <View style={addEquipmentStyles.dropdownContainer}>
                <FlatList
                  data={availableOptions}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={addEquipmentStyles.dropdownItem}
                      onPress={() => handleSelectAvailable(item)}
                    >
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item}
                />
              </View>
            </Modal>
          </View>

          <View style={addEquipmentStyles.mapContainer}>
            <Text style={addEquipmentStyles.label}>Pitch Location</Text>
            <MapView
              style={addEquipmentStyles.map}
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

          <TouchableOpacity style={styles.button} onPress={handleAddPitch}>
            <Text style={styles.buttonTitle}>Add Pitch</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPitch;
