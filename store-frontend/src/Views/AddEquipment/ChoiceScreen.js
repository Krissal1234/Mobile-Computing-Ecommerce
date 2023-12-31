import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import styles from 'store-frontend/src/Views/styles';


const Stack = createStackNavigator();

const ChoiceScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddEquipment')}>
          <Text style={styles.buttonTitle}>Add Equipment Lease</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddPitch')}>
          <Text style={styles.buttonTitle}>Add Pitch Lease</Text>
      </TouchableOpacity>

    </View>
  );
};


export default ChoiceScreen;
