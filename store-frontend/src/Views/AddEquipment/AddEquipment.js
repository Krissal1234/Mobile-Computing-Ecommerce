import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Modal, FlatList } from 'react-native';
import { Card, Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddEquipment = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [sportCategory, setSportCategory] = useState('');
  const [available_status, setAvailableStatus] = useState(null);
  const [deliveryType, setDeliveryType] = useState(null);
  const [condition, setCondition] = useState('');
  const [images, setImages] = useState([]);
  const [pickup_location, setPickupLocation] = useState({ latitude: '', longitude: '' });
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isAvailableDropdownVisible, setIsAvailableDropdownVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    console.log('Selected Images:', images);
  }, [images]);

  const handleChoosePhoto = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Select Equipment Images',
        cancelButtonTitle: 'Cancel',
        takePhotoButtonTitle: 'Take Photo',
        chooseFromLibraryButtonTitle: 'Choose from Library',
        mediaType: 'photo',
        multiple: true,
      },
      (response) => {
        if (!response.didCancel && !response.error) {
          setImages([...images, response]);
        }
      }
    );
  };

  const handleAddEquipment = () => {
    const newEquipment = {
      title,
      description,
      price,
      sportCategory,
      available_status,
      deliveryType,
      condition,
      images,
      pickup_location: deliveryType === 'Delivery' ? null : pickup_location,
    };

    console.log('New Equipment:', newEquipment);

    // You can perform any further actions with the new equipment data here.
    navigation.navigate('LeasingEquipment');
  };

  const deliveryOptions = ['Null', 'Pickup', 'Delivery'];
  const availableOptions = ['True', 'False'];

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleAvailableDropdown = () => {
    setIsAvailableDropdownVisible(!isAvailableDropdownVisible);
  };

  const handleSelectItem = (item) => {
    setDeliveryType(item);
    if (item === 'Delivery') {
      setPickupLocation({ latitude: '', longitude: '' });
    }
    toggleDropdown();
  };

  const handleSelectAvailable = (item) => {
    setAvailableStatus(item);
    toggleAvailableDropdown();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Card style={styles.card}>
            <TouchableOpacity onPress={handleChoosePhoto}>
              {images.length > 0 ? (
                images.map((image, index) => (
                  <Image key={index} source={{ uri: image.uri }} style={styles.image} />
                ))
              ) : (
                <Text style={styles.choosePhotoText}>Choose Equipment Photos</Text>
              )}
            </TouchableOpacity>

            {/* Equipment Title */}
            <Text style={styles.label}>Equipment Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Equipment Title"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />

            {/* Description */}
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Description"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />

            {/* Price Per Day */}
            <Text style={styles.label}>Price Per Day</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Price Per Day"
              value={price}
              onChangeText={(text) => setPrice(text)}
            />

            {/* Sport Category */}
            <Text style={styles.label}>Sport Category</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Sport Category"
              value={sportCategory}
              onChangeText={(text) => setSportCategory(text)}
            />

            {/* Available */}
            <Text style={styles.label}>Available</Text>
            <View style={styles.input}>
              <TouchableOpacity style={styles.dropdownButton} onPress={toggleAvailableDropdown}>
                <Text style={styles.dropdownButtonText}>
                  {available_status !== null ? available_status : 'Select Availability'}
                </Text>
              </TouchableOpacity>
              {/* Dropdown Modal */}
              <Modal transparent={true} visible={isAvailableDropdownVisible} animationType="slide">
                <TouchableOpacity
                  style={styles.dropdownOverlay}
                  onPress={toggleAvailableDropdown}
                />
                <View style={styles.dropdownContainer}>
                  <FlatList
                    data={availableOptions}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dropdownItem}
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
            <Text style={styles.label}>Delivery Type</Text>
            <View style={styles.input}>
              <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
                <Text style={styles.dropdownButtonText}>
                  {deliveryType !== null ? deliveryType : 'Select Delivery Type'}
                </Text>
              </TouchableOpacity>
              {/* Dropdown Modal */}
              <Modal transparent={true} visible={isDropdownVisible} animationType="slide">
                <TouchableOpacity
                  style={styles.dropdownOverlay}
                  onPress={toggleDropdown}
                />
                <View style={styles.dropdownContainer}>
                  <FlatList
                    data={deliveryOptions}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dropdownItem}
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

            {deliveryType !== 'Delivery' && (
              // Render pickup location input only when not Delivery
              <View style={styles.mapContainer}>
                <Text style={styles.label}>Pick Up Location</Text>
                <TextInput
                  style={styles.mapInput}
                  placeholder="Enter Latitude"
                  keyboardType="numeric"
                  value={pickup_location.latitude}
                  onChangeText={(text) => setPickupLocation({ ...pickup_location, latitude: text })}
                />
                <TextInput
                  style={styles.mapInput}
                  placeholder="Enter Longitude"
                  keyboardType="numeric"
                  value={pickup_location.longitude}
                  onChangeText={(text) => setPickupLocation({ ...pickup_location, longitude: text })}
                />

                <MapView
                  style={styles.map}
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
            <Text style={styles.label}>Condition</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Condition"
              value={condition}
              onChangeText={(text) => setCondition(text)}
            />

            <Button mode="contained" onPress={handleAddEquipment}>
              Add Equipment
            </Button>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#A2383A',
  },
  label: {
    color: '#A2383A',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  choosePhotoText: {
    textAlign: 'center',
    color: '#A2383A',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mapContainer: {
    marginTop: 10,
  },
  mapInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  map: {
    height: 200,
    marginTop: 10,
  },
  dropdownButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
  },
  dropdownButtonText: {
    color: '#333',
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 140,
    right: 10,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 5,
    padding: 10,
  },
  dropdownItem: {
    padding: 10,
  },
};

export default AddEquipment;
