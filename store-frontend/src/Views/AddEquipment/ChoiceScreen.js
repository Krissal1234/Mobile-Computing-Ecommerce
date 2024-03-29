import { React, useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "store-frontend/src/Views/styles";
import AddEquipment from "./AddEquipment.js"; 
import AddFacility from "./AddFacility.js"; 
import addEquipmentStyles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../colors";
import { Image,ActivityIndicator } from "react-native";
import { ListingsController } from "../../Controllers/ListingsController.js";
import { openAuthSessionAsync } from "expo-web-browser";
import setUpPayment from "../../../assets/setup_payment.png";
import { UserContext } from "../../Contexts/UserContext.js";
import { getUserFunc } from "../../../config/firebase.js";


const Stack = createStackNavigator();


const ChoosingScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [hasStripeAccount, setHasStripeAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    
    setButtonStyling();
    async function setButtonStyling(){
      let u = await getUserFunc({email: user.user.email});
              if(u.data.data.stripeAccountId){
                  setHasStripeAccount(true)
                } else {
                  setHasStripeAccount(false)
                }
    }
  }, [])
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  return (
    <View style={addEquipmentStyles.choiceScreenContainer}>
        {hasStripeAccount && <>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
                  navigation.navigate("Add Equipment")
            }}
            disabled={!hasStripeAccount}
          >
            <Image
            source={require('store-frontend/assets/equipment_fill_black.png')}
            style={styles.choiceImg} 
            />
          <Text style={styles.buttonTitle}>Add Equipment Listing</Text>
      </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              navigation.navigate("Add Facility")
            }}
          >
            <Image
              source={require("store-frontend/assets/pitch_fill_black.png")}
              style={styles.choiceImg}
            />
            <Text style={styles.buttonTitle}>Add Facility Listing</Text>
          </TouchableOpacity>
        </>}
        {!hasStripeAccount && <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => createPaymentAccount()}
          >
            <Image source={setUpPayment} style={styles.choiceImg} />
            <Text style={styles.buttonTitle}>Setup Payment Info</Text>
          </TouchableOpacity>
        </>}
    </View>
  );

  async function createPaymentAccount() {
    setLoading(true);
    setLoading(true);
    let paymentSheet = await ListingsController._getPaymentSheet(user.user.uid);
    console.log(paymentSheet);
    
    setUser((prev) => {
      return { ...prev, stripeAccountId: paymentSheet.data.accountId };
    });
    await openAuthSessionAsync(paymentSheet.data.accountLink);
    setLoading(false);

    let u = await getUserFunc({email: user.user.email});

              console.log("u.data.data")
              console.log("u.data.data")
              console.log("u.data.data")
              console.log("u.data.data")
              console.log(u.data.data)
              console.log("u.data.data")
              console.log("u.data.data")
              console.log("u.data.data")
              console.log("u.data.data")
              if(u.data.data.paymentAccountSetup){
                setHasStripeAccount(true);
              }
              else setHasStripeAccount(false)
    //Query stripe users for current user id, and save payment id in database
  }

  async function checkPayment() {
    let a = await ListingsController._getPaymentIdFromUserId();
    console.log(a);
    setUser((prev) => {
      return { ...prev, stripeAccountId: "fwfwef" };
    });
  }
};


const ChoiceScreen = () => {
  return (
    
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="ChoosingScreen">
        <Stack.Screen
          name="ChoosingScreen"
          component={ChoosingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add Equipment"
          component={AddEquipment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add Facility"
          component={AddFacility}
          options={{ headerShown: false }}
        />
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
