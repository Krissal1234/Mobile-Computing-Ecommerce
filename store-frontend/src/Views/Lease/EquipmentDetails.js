import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, Button } from 'react-native';
import { Card } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import styles from 'store-frontend/src/Views/styles';
import { colors } from '../colors';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

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
  const [editableCondition, setEditableCondition] = useState(equipment.condition);

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
        // Log the updated values along with the equipment ID
        console.log('Saving changes for Equipment ID:', equipment.id);
        console.log('New Title:', editableTitle);
        console.log('New Image URI:', editableImage);

        console.log('New Description:', editableDescription);
        console.log('New Price:', editablePrice);
        console.log('New Sport Category:', editableSportCategory);
        console.log('New Available Status:', editableAvailable);
        console.log('New Delivery Type:', editableDeliveryType);
        console.log('New Condition:', editableCondition);

        // TODO: Implement the update logic here (e.g., updating the state, sending data to a server)
    }
    setIsEditMode(!isEditMode); 
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
  const handleDelete = () => {
    console.log('Delete Equipment ID:', equipment.id);
    // TODO: Implement delete logic here
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


      <Card style={styles.card}>
        {isEditMode ? (
          <TextInput
            value={editableSportCategory}
            onChangeText={setEditableSportCategory}
            style={styles.editableText}
          />
        ) : (
          <Text style={styles.price}>Sport Category: {editableSportCategory}</Text>
        )}
      </Card>

      <Card style={styles.card}>
        {isEditMode ? (
          <TextInput
            value={editableAvailable}
            onChangeText={setEditableAvailable}
            style={styles.editableText}
          />
        ) : (
          <Text style={styles.price}>Available: {editableAvailable === 'true' ? 'Yes' : 'No'}</Text>
        )}
      </Card>

      <Card style={styles.card}>
        {isEditMode ? (
          <TextInput
            value={editableDeliveryType}
            onChangeText={setEditableDeliveryType}
            style={styles.editableText}
          />
        ) : (
          <Text style={styles.price}>Delivery Type: {editableDeliveryType}</Text>
        )}
      </Card>

      <Card style={styles.card}>
        {isEditMode ? (
          <TextInput
            value={editableCondition}
            onChangeText={setEditableCondition}
            style={styles.editableText}
          />
        ) : (
          <Text style={styles.price}>Condition: {editableCondition}</Text>
        )}
      </Card>

      
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
