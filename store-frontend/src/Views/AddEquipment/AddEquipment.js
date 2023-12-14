import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Card, Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const AddEquipment = () => {
  const [title, setTitle] = useState('');
  const [description1, setDescription1] = useState('');
  const [description2, setDescription2] = useState('');
  const [price, setPrice] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    console.log('Selected Image:', image);
  }, [image]);

  const handleChoosePhoto = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Select Equipment Image',
        cancelButtonTitle: 'Cancel',
        takePhotoButtonTitle: 'Take Photo',
        chooseFromLibraryButtonTitle: 'Choose from Library',
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          setImage(response);
        }
      }
    );
  };

  const handleAddEquipment = () => {
    const newEquipment = {
      title,
      description1,
      description2,
      price,
      pickupLocation: {
        latitude,
        longitude,
      },
      image,
    };

    console.log('New Equipment:', newEquipment);

    navigation.navigate('LeasingEquipment');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          {image ? (
            <Image source={{ uri: image.uri }} style={styles.image} />
          ) : (
            <Text style={styles.choosePhotoText}>Choose Equipment Photo</Text>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Equipment Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description 1"
          value={description1}
          onChangeText={(text) => setDescription1(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description 2"
          value={description2}
          onChangeText={(text) => setDescription2(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Price Per Day"
          value={price}
          onChangeText={(text) => setPrice(text)}
        />

        <View style={styles.mapContainer}>
          <Text style={styles.mapLabel}>Enter Pick Up Location:</Text>
          <TextInput
            style={styles.mapInput}
            placeholder="Latitude"
            keyboardType="numeric"
            value={latitude}
            onChangeText={(text) => setLatitude(text)}
          />
          <TextInput
            style={styles.mapInput}
            placeholder="Longitude"
            keyboardType="numeric"
            value={longitude}
            onChangeText={(text) => setLongitude(text)}
          />

          <MapView
            style={styles.map}
            region={{
              latitude: parseFloat(latitude) || 0,
              longitude: parseFloat(longitude) || 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={(e) => {
              setLatitude(e.nativeEvent.coordinate.latitude.toString());
              setLongitude(e.nativeEvent.coordinate.longitude.toString());
            }}
          >
            <Marker
              coordinate={{
                latitude: parseFloat(latitude) || 0,
                longitude: parseFloat(longitude) || 0,
              }}
              title="Selected Location"
            />
          </MapView>
        </View>
      </Card>

      <Button mode="contained" onPress={handleAddEquipment}>
        Add Equipment
      </Button>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#A2383A',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
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
  mapLabel: {
    marginBottom: 5,
    color: '#A2383A',
  },
  mapInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  map: {
    height: 200,
    marginTop: 10,
  },
};

export default AddEquipment;
