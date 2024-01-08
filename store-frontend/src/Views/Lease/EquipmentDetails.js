import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, Button,FlatList } from 'react-native';

import { Card } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import styles from 'store-frontend/src/Views/styles';
import { colors } from '../colors';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { EquipmentController } from '../../Controllers/EquipmentController';
import downward_cevron from '../../../assets/downward_cevron.png'
import upward_cevron from '../../../assets/upward_cevron.png'
import { Picker } from '@react-native-picker/picker';
import { UserContext } from "../../Contexts/UserContext";
import addEquipmentStyles from 'store-frontend/src/Views/AddEquipment/styles.js';



const EquipmentDetails = ({ route }) => {
  const navigation = useNavigation();
  const { equipment } = route.params;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableImage, setEditableImage] = useState(equipment.imageReference);
  const [editableTitle, setEditableTitle] = useState(equipment.title);
  const [editableDescription, setEditableDescription] = useState(equipment.description);
  const [editablePrice, setEditablePrice] = useState(equipment.price.toString());
  const [editableSportCategory, setEditableSportCategory] = useState(equipment.sportCategory);
  const [editableAvailable, setEditableAvailable] = useState(equipment.availableStatus.toString());
  const [editableDeliveryType, setEditableDeliveryType] = useState(equipment.deliveryType);
  const [selectedSport, setSelectedSport] = useState(equipment.sportCategory);
  const [isSportDropdownVisible, setIsSportDropdownVisible] = useState(false);
  const [sports, setSports] = useState([]);
  const { user, sportCategories } = useContext(UserContext);
  const [pickupLocation, setPickupLocation] = useState({ latitude: '', longitude: '' });
  const [editableCondition, setEditableCondition] = useState(equipment.condition);
  const [isConditionDropdownVisible, setIsConditionDropdownVisible] = useState(false);
  const conditionOptions = ['New', 'Used', 'Refurbished']; 
  const [isDeliveryTypeDropdownVisible, setIsDeliveryTypeDropdownVisible] = useState(false);
  const deliveryOptions = ['pickup', 'delivery']; //TODO: show capitals in UI but pass it to the firebase function in lowercase to keep lowercase standard. 
  const [isAvailableDropdownVisible, setIsAvailableDropdownVisible] = useState(false);
  const availableOptions = ["Yes", "No"];

  const initialAvailableValue = equipment.availableStatus ? "Yes" : "No";
  const [selectedAvailable, setSelectedAvailable] = useState(initialAvailableValue);

  useEffect(() => {
    setSports(["No Filter", ...sportCategories]);
    // Set initial pickup location
    if (equipment.location) {
      setPickupLocation({
        latitude: equipment.location.latitude,
        longitude: equipment.location.longitude,
      });
    }
  }, [sportCategories, equipment.location]); // Add equipment.location to dependency array


  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setEditableImage(result.uri);
    }
  };
  
  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setPickupLocation({ latitude, longitude });
  }
  
  const renderPickupLocation = () => {
    if (editableDeliveryType !== 'delivery') {
      return (
        <Card style={styles.card}>
          <Text style={styles.title}>Pick Up Location</Text>
          {isEditMode && (
            <>
              <TextInput
                style={styles.addEquipmentInput}
                placeholder="Enter Latitude"
                keyboardType="numeric"
                value={pickupLocation.latitude.toString()}
                onChangeText={handleLatitudeChange}
              />
              <TextInput
                style={styles.addEquipmentInput}
                placeholder="Enter Longitude"
                keyboardType="numeric"
                value={pickupLocation.longitude.toString()}
                onChangeText={handleLongitudeChange}
              />
              <MapView
                style={addEquipmentStyles.map}
                initialRegion={{
                  latitude: pickupLocation.latitude,
                  longitude: pickupLocation.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                onPress={handleMapPress}>
                <Marker coordinate={pickupLocation} />
              </MapView>
            </>
          )}
          {!isEditMode && (
            <MapView
              style={addEquipmentStyles.map}
              initialRegion={{
                latitude: pickupLocation.latitude,
                longitude: pickupLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker coordinate={pickupLocation} title="Pickup Location" />
            </MapView>
          )}
        </Card>
      );
    }
    return null;
  };

  const handleEdit = () => {
    
    if (isEditMode) {
     
      console.log('itemId:', equipment.id);
      const availableStatusBoolean = selectedAvailable === "Yes";

    const itemObject = {
      title: editableTitle,
      imageReference: editableImage,
      description: editableDescription,
      price: editablePrice,
      sportCategory: selectedSport,
      availableStatus: availableStatusBoolean,
      deliveryType: editableDeliveryType,
      condition: editableCondition,
      createdAt: equipment.createdAt,
      owner: equipment.owner,
      pickupLocation: pickupLocation, 
      type: equipment.type,
      id: equipment.id,
    };
    console.log('item:', itemObject);

    editEquipment(equipment.id,itemObject); 
  
    }
    setIsEditMode(!isEditMode); 
};

const editEquipment = async (equipmentId,equipmentItem) => {
  const response = await EquipmentController.editEquipment(equipmentId,equipmentItem);
  console.log(response.message);
  // Handle the response, navigate back, show message, etc.
};
  
const toggleSportDropdown = () => {
  setIsSportDropdownVisible(!isSportDropdownVisible);
};



  const handleCancel = () => {
    setEditableImage(equipment.imageReference);
    setEditableTitle(equipment.title);
    setEditableDescription(equipment.description);
    setEditablePrice(equipment.price.toString());
    setEditableSportCategory(equipment.sportCategory);
    setEditableAvailable(equipment.availableStatus.toString());
    setEditableDeliveryType(equipment.deliveryType);
    setEditableCondition(equipment.condition);
    setIsEditMode(false);
  };

  const handleDelete = () => {h
    console.log('Delete Equipment ID:', equipment.id);
    deleteEquipment(equipment.id); 
  };

  const deleteEquipment = async (equipmentId) => {
    const response = await EquipmentController.deleteEquipment(equipmentId);
    console.log(response.message);
    // Handle the response, navigate back, show message, etc.
  };

  const handleSportSelection = (itemValue) => {
    setSelectedSport(itemValue);
    setIsSportDropdownVisible(false);
  };

  const handleDeliveryTypeSelection = (itemValue) => {
    setEditableDeliveryType(itemValue);
    setIsDeliveryTypeDropdownVisible(false);
  };

  const handleConditionSelection = (itemValue) => {
    setEditableCondition(itemValue);
    setIsConditionDropdownVisible(false);
  };

  const toggleAvailableDropdown = () => {
    setIsAvailableDropdownVisible(!isAvailableDropdownVisible);
  };

  const handleAvailableSelection = (selectedValue) => {
    setSelectedAvailable(selectedValue);
    // Convert "Yes" or "No" back to boolean for editableAvailable
    setEditableAvailable(selectedValue === "Yes");
    setIsAvailableDropdownVisible(false);
  };

  const handleLatitudeChange = (text) => {
    setPickupLocation({ ...pickupLocation, latitude: parseFloat(text) });
  };

  const handleLongitudeChange = (text) => {
    setPickupLocation({ ...pickupLocation, longitude: parseFloat(text) });
  };



  return (
    <ScrollView style={styles.container}>

      {!isEditMode && (
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={40} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Icon name="trash" size={40} color="white" />
          </TouchableOpacity>
        </View>
      )}
       

       <Card style={styles.card}>
        <Image source={{ uri: editableImage }} style={styles.detailsImage} />

        {isEditMode && (
          <Button title="Change Image" onPress={selectImage} />
        )}
        {isEditMode ? (
          <TextInput
            value={editableTitle}
            onChangeText={setEditableTitle}
            style={styles.editableText}
          />
        ) : (
          <Text style={styles.title}>{editableTitle}</Text>
        )}

        {isEditMode ? (
          <TextInput
            value={editableDescription}
            onChangeText={setEditableDescription}
            style={styles.editableText}
          />
        ) : (
          <Text style={styles.description}>{editableDescription}</Text>
        )}

        
      </Card>

      <Card style={styles.card}>

      {isEditMode ? (
          <TextInput
            value={editablePrice}
            onChangeText={setEditablePrice}
            keyboardType="numeric"
            style={styles.editableText}
          />
        ) : (
          <Text style={styles.price}>Price: {editablePrice} Per Day</Text>
        )}
        </Card>


        {isEditMode ? (
            <TouchableOpacity 
            style={styles.card} 
            onPress={toggleSportDropdown}
            activeOpacity={1}
          >
            <Text style={styles.title}>Sport Category</Text>
            <View style={styles.timeContainer}>
              <Text style={addEquipmentStyles.dropdownButtonText}>
                {selectedSport || 'Select Sport Category'}
              </Text>
              <Image source={isSportDropdownVisible ? upward_cevron : downward_cevron} style={styles.cevron} />
            </View>
  
            {isSportDropdownVisible && (
              Platform.OS === 'android' ? (
                <FlatList
                  data={sports}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={addEquipmentStyles.dropdownItem}
                      onPress={() => handleSportSelection(item)}
                    >
                      <Text style={addEquipmentStyles.dropdownItemText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <Picker
                  selectedValue={selectedSport}
                  onValueChange={handleSportSelection}
                  style={addEquipmentStyles.picker}
                >
                  {sports.map((sport, index) => (
                    <Picker.Item label={sport} value={sport} key={index} />
                  ))}
                </Picker>
              )
            )}
          </TouchableOpacity>
        ) : (
          <Card style={styles.card}>
          <Text style={styles.price}>Sport Category: {editableSportCategory}</Text>
          </Card>
        )}

      
    {isEditMode ? (
        <TouchableOpacity 
          style={styles.card} 
          onPress={toggleAvailableDropdown}
          activeOpacity={1}
        >
          <Text style={styles.title}>Availability</Text>
          <View style={styles.timeContainer}>
            <Text style={addEquipmentStyles.dropdownButtonText}>
              {selectedAvailable || 'Select Availability'}
            </Text>
            <Image source={isAvailableDropdownVisible ? upward_cevron : downward_cevron} style={styles.cevron} />
          </View>

          {isAvailableDropdownVisible && (
            Platform.OS === 'android' ? (
              <FlatList
                data={availableOptions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={addEquipmentStyles.dropdownItem}
                    onPress={() => handleAvailableSelection(item)}
                  >
                    <Text style={addEquipmentStyles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Picker
                selectedValue={selectedAvailable}
                onValueChange={handleAvailableSelection}
                style={addEquipmentStyles.picker}
              >
                {availableOptions.map((option, index) => (
                  <Picker.Item label={option} value={option} key={index} />
                ))}
              </Picker>
            )
          )}
        </TouchableOpacity>
      ) : (
        <Card style={styles.card}>
          <Text style={styles.price}>Available: {editableAvailable ? 'Yes' : 'No'}</Text>
        </Card>
      )}

      
      {isEditMode ? (
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => setIsDeliveryTypeDropdownVisible(!isDeliveryTypeDropdownVisible)}
          activeOpacity={1}
        >
          <Text style={styles.title}>Delivery Type</Text>
          <View style={styles.timeContainer}>
            <Text style={addEquipmentStyles.dropdownButtonText}>
              {editableDeliveryType || 'Select Delivery Type'}
            </Text>
            <Image source={isDeliveryTypeDropdownVisible ? upward_cevron : downward_cevron} style={styles.cevron} />
          </View>

          {isDeliveryTypeDropdownVisible && (
            Platform.OS === 'android' ? (
              <FlatList
                data={deliveryOptions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={addEquipmentStyles.dropdownItem}
                    onPress={() => handleDeliveryTypeSelection(item)}
                  >
                    <Text style={addEquipmentStyles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Picker
                selectedValue={editableDeliveryType}
                onValueChange={handleDeliveryTypeSelection}
                style={addEquipmentStyles.picker}
              >
                {deliveryOptions.map((option, index) => (
                  <Picker.Item label={option} value={option} key={index} />
                ))}
              </Picker>
            )
          )}
        </TouchableOpacity>
      ) : (
        <Card style={styles.card}>
          <Text style={styles.price}>Delivery Type: {editableDeliveryType}</Text>
        </Card>
      )}
      
       {renderPickupLocation()}
     {isEditMode ? (
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => setIsConditionDropdownVisible(!isConditionDropdownVisible)}
          activeOpacity={1}
        >
          <Text style={styles.title}>Condition</Text>
          <View style={styles.timeContainer}>
            <Text style={addEquipmentStyles.dropdownButtonText}>
              {editableCondition || 'Select Condition'}
            </Text>
            <Image source={isConditionDropdownVisible ? upward_cevron : downward_cevron} style={styles.cevron} />
          </View>

          {isConditionDropdownVisible && (
            Platform.OS === 'android' ? (
              <FlatList
                data={conditionOptions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={addEquipmentStyles.dropdownItem}
                    onPress={() => handleConditionSelection(item)}
                  >
                    <Text style={addEquipmentStyles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Picker
                selectedValue={editableCondition}
                onValueChange={handleConditionSelection}
                style={addEquipmentStyles.picker}
              >
                {conditionOptions.map((option, index) => (
                  <Picker.Item label={option} value={option} key={index} />
                ))}
              </Picker>
            )
          )}
        </TouchableOpacity>
      ) : (
        <Card style={styles.card}>
          <Text style={styles.price}>Condition: {editableCondition}</Text>
        </Card>
      )}

      
      {isEditMode && (
        <View style={styles.editModeButtons}>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style = {styles.title}>Save</Text>
            <Icon name="check" size={40} color={colors.darkBlue} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.editButton} onPress={handleCancel}>
          <Text style = {styles.title}>Cancel</Text>
            <Icon name="times" size={40} color={colors.darkBlue} />
          </TouchableOpacity>
        </View>
      )}

    {!isEditMode && (
        <TouchableOpacity style={styles.card} onPress={() => setIsEditMode(true)}>          
          <View style={styles.timeContainer}>
            <Text style = {styles.title}>Edit </Text>
            <Icon name="edit" size={40} color={colors.darkBlue} />
         </View>             
        </TouchableOpacity>               
      )}
    </ScrollView>
  );
};

export default EquipmentDetails;
