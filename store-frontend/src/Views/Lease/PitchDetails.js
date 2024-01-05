import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, Button } from 'react-native';
import { Card } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import styles from 'store-frontend/src/Views/styles';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../colors';


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

  // Dummy function for image selection, replace with your actual image picker logic
  const selectImage = () => {
    const newImageUri = 'uri_of_the_newly_selected_image'; // Replace with actual URI
    setEditableImage(newImageUri);
  };

  const handleEdit = () => {
    if (isEditMode) {
      // TODO: Implement update logic here
      console.log('Updating pitch details...');
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

  const handleDelete = () => {
    console.log('Delete');
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
        {isEditMode ? (
          <Button title="Select Image" onPress={selectImage} />
        ) : (
          <Image source={{ uri: editableImage }} style={styles.detailsImage} />
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
      

      {/* Edit and Cancel Buttons */}
      {isEditMode && (
        <View style={styles.editModeButtons}>
          <TouchableOpacity style={styles.button} onPress={handleEdit}>
            <Icon name="check" size={40} color={colors.darkBlue}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleCancel}>
            <Icon name="times" size={40} color={colors.darkBlue} />
          </TouchableOpacity>
        </View>
      )}

      {!isEditMode && (
        <TouchableOpacity style={styles.button} onPress={() => setIsEditMode(true)}>
          <Icon name="edit" size={40} color={colors.darkBlue} />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default PitchDetails;
