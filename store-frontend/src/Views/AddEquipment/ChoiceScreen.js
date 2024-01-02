import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from 'store-frontend/src/Views/styles';
import AddEquipment from './AddEquipment.js'; // Your AddEquipment screen
import AddPitch from './AddPitch.js'; // Your AddPitch screen

const Stack = createStackNavigator();

const ChoosingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Add Equipment')}>
          <Text style={styles.buttonTitle}>Add Equipment Lease</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Add Pitch')}>
          <Text style={styles.buttonTitle}>Add Pitch Lease</Text>
      </TouchableOpacity>
    </View>
  );
};

const ChoiceScreen = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="ChoosingScreen">
        <Stack.Screen name="ChoosingScreen" component={ChoosingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Add Equipment" component={AddEquipment} options={{ headerShown: false }}/>
        <Stack.Screen name="Add Pitch" component={AddPitch} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ChoiceScreen;