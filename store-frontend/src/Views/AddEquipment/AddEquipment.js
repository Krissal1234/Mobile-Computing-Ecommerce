import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Modal, FlatList } from 'react-native';
import { Card, Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EquipmentController } from '../../Controllers/EquipmentController';
import { UserContext } from '../../Contexts/UserContext';
import { useContext } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';

import addEquipmentStyles from './styles';



const AddEquipment = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [sportCategory, setSportCategory] = useState('');
  const [availableStatus, setAvailableStatus] = useState(null);
  const [deliveryType, setDeliveryType] = useState(null);
  const [images, setImages] = useState([]);
  const [pickup_location, setPickupLocation] = useState({ latitude: '', longitude: '' });
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isAvailableDropdownVisible, setIsAvailableDropdownVisible] = useState(false);
  const {user} = useContext(UserContext);
  const navigation = useNavigation();
  const [condition, setCondition] = useState('');
  const [isConditionDropdownVisible, setIsConditionDropdownVisible] = useState(false);


  


  useEffect(() => {
    console.log('Selected Images:', images);
  }, [images]);

  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 0, // Set to 0 for multiple image selection
      // Add other options as needed
    };
  
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedImages = response.assets.map(asset => ({
          uri: asset.uri,
          type: asset.type,
          name: asset.fileName
        }));
        setImages([...images, ...selectedImages]);
      }
    });
  };
  

  const handleAddEquipment = async () => {
    const newEquipment = {
      title,
      description,
      price,
      sportCategory,
      availableStatus,
      deliveryType,
      condition,
      images,
      pickupLocation: deliveryType === 'delivery' ? null : pickup_location,
    };

    console.log('New Equipment:', newEquipment);

   //This will input the equipment into the database.
    const response = await EquipmentController.PostEquipment(newEquipment,user); //TODO: find a way to use a laoding screen while you wait for this function to return (Communicate with the rest of UI team becuase it will be needed throughout the project)
    console.log(response.message);
     //TODO: Display a success message or error message based on what the above function returns (you can check what it returns by going into the function)
  };

  const deliveryOptions = ['pickup', 'delivery']; //TODO: show capitals in UI but pass it to the firebase function in lowercase to keep lowercase standard. 
  const availableOptions = ['Yes', 'No']; //TODO: Change this to yes or no for frontend, but then you will pass true or false to the firebase function
  const conditionOptions = ['New', 'Used', 'Refurbished'];

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleAvailableDropdown = () => {
    setIsAvailableDropdownVisible(!isAvailableDropdownVisible);
  };

  const handleSelectItem = (item) => {
    setDeliveryType(item);
    if (item === 'delivery') {
      setPickupLocation({ latitude: '', longitude: '' });
    }
    toggleDropdown();
  };

  const handleSelectAvailable = (item) => {
    setAvailableStatus(item);
    toggleAvailableDropdown();
  };

  const toggleConditionDropdown = () => {
    setIsConditionDropdownVisible(!isConditionDropdownVisible);
  };

  const handleSelectCondition = (item) => {
    setCondition(item); // Update the condition state with the selected item
    setIsConditionDropdownVisible(false); // Close the dropdown modal
  };
  
  

  return (
    <SafeAreaView style={addEquipmentStyles.container}>
      <ScrollView contentContainerStyle={addEquipmentStyles.scrollContainer}>
        <View style={addEquipmentStyles.container}>
          <Card style={addEquipmentStyles.card}>
            <TouchableOpacity onPress={handleChoosePhoto}>
              {images.length > 0 ? (
                images.map((image, index) => (
                  <Image key={index} source={{ uri: image.uri }} style={addEquipmentStyles.image} />
                ))
              ) : (
                <Text style={addEquipmentStyles.choosePhotoText}>Choose Equipment Photos</Text>
              )}
            </TouchableOpacity>

            {/* Equipment Title */}
            <Text style={addEquipmentStyles.label}>Equipment Title</Text>
            <TextInput
              style={addEquipmentStyles.input}
              placeholder="Enter Equipment Title"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />

            {/* Description */}
            <Text style={addEquipmentStyles.label}>Description</Text>
            <TextInput
              style={addEquipmentStyles.input}
              placeholder="Enter Description"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />

            {/* Price Per Day */}
            <Text style={addEquipmentStyles.label}>Price Per Hour</Text>
            <TextInput
              style={addEquipmentStyles.input}
              placeholder="Price per hour"
              //TODO: Check if the value inputted is an integer, and conver it to an integer
              value={price}
              onChangeText={(text) => setPrice(text)}
            />

            {/* Sport Category */}
            <Text style={addEquipmentStyles.label}>Sport Category</Text>
            <TextInput
              style={addEquipmentStyles.input}
              placeholder="Enter Sport Category"
              value={sportCategory}
              onChangeText={(text) => setSportCategory(text)}
            />

            {/* Available */}
            <Text style={addEquipmentStyles.label}>Available</Text>
            <View style={addEquipmentStyles.input}>
              <TouchableOpacity style={addEquipmentStyles.dropdownButton} onPress={toggleAvailableDropdown}>
                <Text style={addEquipmentStyles.dropdownButtonText}>
                  {availableStatus !== null ? availableStatus : 'Select Availability'}
                </Text>
              </TouchableOpacity>
              {/* Dropdown Modal */}
              <Modal transparent={true} visible={isAvailableDropdownVisible} animationType="slide">
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

        

            {/* Delivery Type */}
            <Text style={addEquipmentStyles.label}>Delivery Type</Text>
            <View style={addEquipmentStyles.input}>
              <TouchableOpacity style={addEquipmentStyles.dropdownButton} onPress={toggleDropdown}>
                <Text style={addEquipmentStyles.dropdownButtonText}>
                  {deliveryType !== null ? deliveryType : 'Select Delivery Type'}
                </Text>
              </TouchableOpacity>
              {/* Dropdown Modal */}
              <Modal transparent={true} visible={isDropdownVisible} animationType="slide">
                <TouchableOpacity
                  style={addEquipmentStyles.dropdownOverlay}
                  onPress={toggleDropdown}
                />
                <View style={addEquipmentStyles.dropdownContainer}>
                  <FlatList
                    data={deliveryOptions}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={addEquipmentStyles.dropdownItem}
                        onPress={() => handleSelectItem(item)}
                      >
                        <Text>{item}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                  />
                </View>
              </Modal>
            </View>

            {deliveryType !== 'delivery' && (
              // Render pickup location input only when not Delivery
              <View style={addEquipmentStyles.mapContainer}>
                <Text style={addEquipmentStyles.label}>Pick Up Location</Text>
                <TextInput
                  style={addEquipmentStyles.mapInput}
                  placeholder="Enter Latitude"
                  keyboardType="numeric"
                  value={pickup_location.latitude}
                  onChangeText={(text) => setPickupLocation({ ...pickup_location, latitude: text })}
                />
                <TextInput
                  style={addEquipmentStyles.mapInput}
                  placeholder="Enter Longitude"
                  keyboardType="numeric"
                  value={pickup_location.longitude}
                  onChangeText={(text) => setPickupLocation({ ...pickup_location, longitude: text })}
                />

                <MapView
                  style={addEquipmentStyles.map}
                  region={{
                    latitude: parseFloat(pickup_location.latitude) || 35.9375,
                    longitude: parseFloat(pickup_location.longitude) || 14.3754,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  onPress={(e) => {
                    const { latitude, longitude } = e.nativeEvent.coordinate;
                    setPickupLocation({ latitude: latitude.toString(), longitude: longitude.toString() });
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: parseFloat(pickup_location.latitude) || 35.9375,
                      longitude: parseFloat(pickup_location.longitude) || 14.3754,
                    }}
                    title="Selected Location"
                  />
                </MapView>
              </View>
            )}
            {/* Condition */}
      <Text style={addEquipmentStyles.label}>Condition</Text>
      <View style={addEquipmentStyles.input}>
        <TouchableOpacity style={addEquipmentStyles.dropdownButton} onPress={toggleConditionDropdown}>
          <Text style={addEquipmentStyles.dropdownButtonText}>
            {condition !== '' ? condition : 'Select Condition'}
          </Text>
        </TouchableOpacity>
        {/* Condition Dropdown Modal */}
        <Modal transparent={true} visible={isConditionDropdownVisible} animationType="slide">
          <TouchableOpacity
            style={addEquipmentStyles.dropdownOverlay}
            onPress={toggleConditionDropdown}
          />
          <View style={addEquipmentStyles.dropdownContainer}>
            <FlatList
              data={conditionOptions}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={addEquipmentStyles.dropdownItem}
                  onPress={() => handleSelectCondition(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </Modal>
      </View>

            <Button mode="contained" onPress={handleAddEquipment}>
              Add Equipment
            </Button>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



export default AddEquipment;
