import {React, useEffect} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from 'store-frontend/src/Views/styles';
import AddEquipment from './AddEquipment.js'; // Your AddEquipment screen
import AddPitch from './AddPitch.js'; // Your AddPitch screen
import addEquipmentStyles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { colors } from '../colors';
import { Image } from 'react-native';
import { ListingsController } from '../../Controllers/ListingsController.js';
import { openBrowserAsync } from 'expo-web-browser';


const Stack = createStackNavigator();

const ChoosingScreen = ({ navigation }) => {

  useEffect(() => {
    console.log("Hello")
  }, [])
  return (
    <View style={addEquipmentStyles.choiceScreenContainer}>
      <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Add Equipment')}>
            <Image
            source={require('store-frontend/assets/equipment_fill_black.png')}
            style={{ width: 75, height: 70 }} 
            />
          <Text style={styles.buttonTitle}>Add Equipment Listing</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Add Pitch')}>
          <Image
            source={require('store-frontend/assets/pitch_fill_black.png')}
            style={{ width: 75, height: 50 }} 
            />
          <Text style={styles.buttonTitle}>Add Facility Listing</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.button}
          onPress={() => checkPayment()}>
          <Image
            source={require('store-frontend/assets/pitch_fill_black.png')}
            style={{ width: 75, height: 50 }} 
            />
          <Text style={styles.buttonTitle}>Setup Payment Info</Text>
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

async function createPaymentAccount() {
  let paymentSheet = await ListingsController._getPaymentSheet()
  console.log(paymentSheet)
  let result = await openBrowserAsync(paymentSheet.data.accountLink)
  
  //Query stripe users for current user id, and save payment id in database
}

async function checkPayment(){
  let a = await ListingsController._getPaymentIdFromUserId();
  console.log(a)
}

export default ChoiceScreen;
