import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, Button } from 'react-native';
import { Card } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import styles from 'store-frontend/src/Views/styles';
import addEquipmentStyles from 'store-frontend/src/Views/AddEquipment/styles.js';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../colors';
import * as ImagePicker from 'expo-image-picker';
import { FacilitiesController } from '../../Controllers/FacilitiesController';
import downward_cevron from '../../../assets/downward_cevron.png'
import upward_cevron from '../../../assets/upward_cevron.png'
import { Picker } from '@react-native-picker/picker';
import { UserContext } from "../../Contexts/UserContext";


const PitchDetails = ({ route }) => {
  const { pitch } = route.params;
  const navigation = useNavigation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableImage, setEditableImage] = useState(pitch.imageReference);
  const [editableTitle, setEditableTitle] = useState(pitch.title);
  const [editableDescription, setEditableDescription] = useState(pitch.description);
  const [editablePrice, setEditablePrice] = useState(pitch.price.toString());
  const [editableSportCategory, setEditableSportCategory] = useState(pitch.sportCategory);
  const [editableAvailable, setEditableAvailable] = useState(pitch.availableStatus.toString());
  const [isSportDropdownVisible, setIsSportDropdownVisible] = useState(false);
  const [sports, setSports] = useState([]);
  const { user, sportCategories } = useContext(UserContext);
  const [selectedSport, setSelectedSport] = useState(pitch.sportCategory);
  const [isAvailableDropdownVisible, setIsAvailableDropdownVisible] = useState(false);
  const availableOptions = ["Yes", "No"];
  const initialAvailableValue = pitch.availableStatus ? "Yes" : "No";
  const [selectedAvailable, setSelectedAvailable] = useState(initialAvailableValue);
  useEffect(() => {
    setSports(["No Filter", ...sportCategories]);
  }, [sportCategories]);

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
  const handleEdit = () => {
    if (isEditMode) {
      // TODO: Implement update logic here
      console.log('facilityId:', pitch.id);
      const availableStatusBoolean = selectedAvailable === "Yes";

      const facilityObject = {
          title: editableTitle,
          imageReference: editableImage,
          description: editableDescription,
          price: editablePrice,
          sportCategory: selectedSport,
          availableStatus: availableStatusBoolean,
          createdAt: pitch.createdAt,
          id: pitch.id,
          location: pitch.location, //still to arrange
          owner: pitch.owner,
          type: pitch.type,

      };
      console.log('facility:', facilityObject);
      editFacility(pitch.id,facilityObject);

    }
    setIsEditMode(!isEditMode);
  };

  const handleCancel = () => {
    setEditableImage(pitch.imageReference);
    setEditableTitle(pitch.title);
    setEditableDescription(pitch.description);
    setEditablePrice(pitch.price.toString());
    setEditableSportCategory(pitch.sportCategory);
    setEditableAvailable(pitch.availableStatus.toString());
    setIsEditMode(false);
  };

  const handleSportSelection = (itemValue) => {
    setSelectedSport(itemValue);
    setIsSportDropdownVisible(false);
  };

  const handleDelete = () => {
    console.log('Delete Pitch ID:', pitch.id);
    deleteFacility(pitch.id);
  };

  const toggleSportDropdown = () => {
    setIsSportDropdownVisible(!isSportDropdownVisible);
  };

    const deleteFacility = async (facilityId) => {
      const response = await FacilitiesController.deleteFacility(facilityId);
      console.log(response);
      // Handle the response, navigate back, show message, etc.
    };

    const editFacility = async (facilityId,facilityItem) => {
      const response = await FacilitiesController.editFacility(facilityId,facilityItem);
      console.log(response.message);
      // Handle the response, navigate back, show message, etc.
    };

    const toggleAvailableDropdown = () => {
      setIsAvailableDropdownVisible(!isAvailableDropdownVisible);
    };
  
    const handleAvailableSelection = (selectedValue) => {
      setSelectedAvailable(selectedValue);
      setEditableAvailable(selectedValue === "Yes");
      setIsAvailableDropdownVisible(false);
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
          <Text style={styles.price}>Price: {editablePrice} Per Hour</Text>
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
      

      {isEditMode && (
        <View style={styles.editModeButtons}>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style = {styles.title}>Save</Text>
            <Icon name="check" size={40} color={colors.darkBlue}/>
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

export default PitchDetails;
