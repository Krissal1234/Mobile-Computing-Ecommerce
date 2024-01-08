import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Modal, FlatList,Platform  } from 'react-native';
import { Card, Button } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EquipmentController } from '../../Controllers/EquipmentController';
import { UserContext } from '../../Contexts/UserContext';
import { useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import addEquipmentStyles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../styles';
import { colors } from '../colors';
import downward_cevron from '../../../assets/downward_cevron.png'
import upward_cevron from '../../../assets/upward_cevron.png'
import { Picker } from '@react-native-picker/picker';




const AddEquipment = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [availableStatus, setAvailableStatus] = useState(null);
  const [deliveryType, setDeliveryType] = useState(null);
  const [images, setImages] = useState([]);
  const [pickupLocation, setPickupLocation] = useState({ latitude: '', longitude: '' });
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isAvailableDropdownVisible, setIsAvailableDropdownVisible] = useState(false);
  const {user} = useContext(UserContext);
  const navigation = useNavigation();
  const [condition, setCondition] = useState('');
  const [isConditionDropdownVisible, setIsConditionDropdownVisible] = useState(false);
  const deliveryOptions = ['pickup', 'delivery']; //TODO: show capitals in UI but pass it to the firebase function in lowercase to keep lowercase standard. 
  const availableOptions = ['Yes', 'No']; 
  const conditionOptions = ['New', 'Used', 'Refurbished'];
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState('');
  const [isSportDropdownVisible, setIsSportDropdownVisible] = useState(false);
  const { sportCategories } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isDeliveryDropdownVisible, setIsDeliveryDropdownVisible] = useState(false);
  

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchSports = async () => {
      try {
        if (Array.isArray(sportCategories)) {
          setSports(["No Filter", ...sportCategories]);
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
  
    if (!result.canceled && result.assets) {
      const selectedUri = result.assets[0].uri; // Updated to use assets array
      console.log(selectedUri);
      setImages([selectedUri]);
    }
  };
  

  const handleAddEquipment = async () => {

    setErrorMessage('');
    setSuccessMessage('');


  if (!title || !description || !price || !selectedSport || !availableStatus || !deliveryType || !condition || images.length === 0) {
    setErrorMessage('Please fill in all fields and select an image.');
    return; 
  }
 
    var parsedPrice = parseInt(price);
    const newEquipment = {
      title,
      description,
      price: parsedPrice,
      sportCategory:  selectedSport,
      availableStatus,
      deliveryType,
      condition,
      imageReference: images[0],
      pickupLocation: deliveryType === 'delivery' ? null : pickupLocation,
    };
    console.log('New Equipment:', newEquipment);

   //This will input the equipment into the database.
    const response = await EquipmentController.PostEquipment(newEquipment,user); //TODO: find a way to use a laoding screen while you wait for this function to return (Communicate with the rest of UI team becuase it will be needed throughout the project)
    setSuccessMessage('Equipment added successfully!');

    console.log(response.message);
  };


  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleSportDropdown = () => {
    setIsSportDropdownVisible(!isSportDropdownVisible);
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
  

  const toggleDeliveryDropdown = () => {
    setIsDeliveryDropdownVisible(!isDeliveryDropdownVisible);
  };
  

  return (
   
      <KeyboardAwareScrollView
        style={styles.container}
        keyboardShouldPersistTaps="never">

          {/* Back Button */}
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Icon name="arrow-left" size={40} color="white" />
            </TouchableOpacity>


            <Card style={styles.card}>                          
          <TouchableOpacity onPress={handleChoosePhoto} style={addEquipmentStyles.photoButton}>
            <Icon name="camera" size={50} color={colors.darkBlue} />
            {images.length > 0 ? (
              images.map((image, index) => (
                <Image key={index} source={{ uri: image }} style={addEquipmentStyles.image} />
              ))
            ) : (
              <Text style={styles.title}>Choose Equipment Photo</Text>
            )}
          </TouchableOpacity>
        </Card>


         <Card style={styles.card}> 
            {/* Equipment Title */}
            <Text style={styles.title}>Equipment Title</Text>
            <TextInput
              style={styles.addEquipmentInput}
              placeholder="Enter Equipment Title"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
        </Card>

          <Card style={styles.card}>
            {/* Description */}
            <Text style={styles.title}>Description</Text>
            <TextInput
              style={styles.addEquipmentInput}
              placeholder="Enter Description"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            </Card>

            <Card style={styles.card}>
            {/* Price Per Day */}
            <Text style={styles.title}>Price Per Day</Text>
            <TextInput
              style={styles.addEquipmentInput}
              placeholder="Enter Price"
              keyboardType="numeric"
              value={price}
              onChangeText={(text) => setPrice(text)}
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
                  {selectedSport || 'Select Sport Category'}
                </Text>
                <Image source={isSportDropdownVisible ? upward_cevron : downward_cevron} style={styles.cevron} />
              </View>

              {/* Sport Category Dropdown List */}
              {isSportDropdownVisible && (
                Platform.OS === 'android' ? (
                  <FlatList
                    data={sports}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={addEquipmentStyles.dropdownItem}
                        onPress={() => {
                          setSelectedSport(item);
                          setIsSportDropdownVisible(false);
                        }}
                      >
                        <Text style={addEquipmentStyles.dropdownItemText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                ) : (
                  <Picker
                    selectedValue={selectedSport}
                    onValueChange={(itemValue, itemIndex) => setSelectedSport(itemValue)}
                    style={addEquipmentStyles.picker}
                  >
                    {sports.map((sport, index) => (
                      <Picker.Item label={sport} value={sport} key={index} />
                    ))}
                  </Picker>
                )
              )}
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
              {availableStatus ? availableStatus : 'Select Availability'}
            </Text>
            <Image source={isAvailableDropdownVisible ? upward_cevron : downward_cevron} style={styles.cevron} />
          </View>

          {/* Available Dropdown List */}
          {isAvailableDropdownVisible && (
            Platform.OS === 'android' ? (
              <FlatList
                data={availableOptions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={addEquipmentStyles.dropdownItem}
                    onPress={() => {
                      setAvailableStatus(item);
                      setIsAvailableDropdownVisible(false);
                    }}
                  >
                    <Text style={addEquipmentStyles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Picker
                selectedValue={availableStatus}
                onValueChange={(itemValue, itemIndex) => setAvailableStatus(itemValue)}
                style={addEquipmentStyles.picker}
              >
                {availableOptions.map((option, index) => (
                  <Picker.Item label={option} value={option} key={index} />
                ))}
              </Picker>
            )
          )}
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
              {deliveryType ? deliveryType : 'Select Delivery Type'}
            </Text>
            <Image source={isDeliveryDropdownVisible ? upward_cevron : downward_cevron} style={styles.cevron} />
          </View>

          {/* Delivery Type Dropdown List */}
          {isDeliveryDropdownVisible && (
            Platform.OS === 'android' ? (
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
                    <Text style={addEquipmentStyles.dropdownItemText}>{item}</Text>
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
            )
          )}
        </TouchableOpacity>
      
     
    

            {deliveryType !== 'delivery' && (
              // Render pickup location input only when not Delivery
              <Card style={styles.card}>
             <View style={addEquipmentStyles.mapContainer}>
                <Text style={styles.title}>Pick Up Location</Text>
                <TextInput
                  style={styles.addEquipmentInput}
                  placeholder="Enter Latitude"
                  keyboardType="numeric"
                  value={pickupLocation.latitude}
                  onChangeText={(text) => setPickupLocation({ ...pickupLocation, latitude: text })}
                />
                <TextInput
                  style={styles.addEquipmentInput}
                  placeholder="Enter Longitude"
                  keyboardType="numeric"
                  value={pickupLocation.longitude}
                  onChangeText={(text) => setPickupLocation({ ...pickupLocation, longitude: text })}
                />

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
                    setPickupLocation({ latitude: latitude.toString(), longitude: longitude.toString() });
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: parseFloat(pickupLocation.latitude) || 35.9375,
                      longitude: parseFloat(pickupLocation.longitude) || 14.3754,
                    }}
                    title="Selected Location"
                  />
                </MapView>
              </View>
              </Card>
            )}
            
          
            <TouchableOpacity 
            style={styles.card} 
            onPress={toggleConditionDropdown}
            activeOpacity={1}
          >
         
                    {/* Condition */}
            <Text style={styles.title}>Condition</Text>
            <View style={styles.timeContainer}>
              <Text style={addEquipmentStyles.dropdownButtonText}>
                {condition !== '' ? condition : 'Select Condition'}
              </Text>
              <Image source={isConditionDropdownVisible ? upward_cevron : downward_cevron} style={styles.cevron} />
          </View>

            {/* Condition Dropdown List */}
            {isConditionDropdownVisible && (
              Platform.OS === 'android' ? (
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
                      <Text style={addEquipmentStyles.dropdownItemText}>{item}</Text>
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
              )
            )}
            </TouchableOpacity>
 



      {errorMessage.length > 0 && (
        <Text style={addEquipmentStyles.errorMessage}>{errorMessage}</Text>
      )}

      {successMessage.length > 0 && (
        <Text style={addEquipmentStyles.successMessage}>{successMessage}</Text>
      )}

            <TouchableOpacity
              style={styles.button}
              onPress={handleAddEquipment}>
              <Text style={styles.buttonTitle}>Add Equipment</Text>
          </TouchableOpacity>
         
     
        </KeyboardAwareScrollView>
  );
};




export default AddEquipment;
