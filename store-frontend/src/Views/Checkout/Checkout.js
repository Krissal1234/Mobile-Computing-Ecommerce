import { View, Text, Button, Alert, Image } from 'react-native'
import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../Constants'
import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native'

const Checkout = () => {

    useEffect(() => {
        initializePaymentSheet();
    }, [])

  return (
    <View style={{height: "100%", padding: 20, justifyContent: "center"}}>
        <View style={{backgroundColor: "white", alignItems: "center", justifyContent: "center", padding: 20, borderRadius: 10}}>
        <Image source={{uri: "https://sportsbooking.mt/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-06-at-10.18.47.jpeg"}} style={{width: 300, height: 150}}/>
      <Text style={{fontWeight: "bold", marginVertical: 5}}>Football Pitch</Text>
      <Text>5 a side football pitch with high high quality turf and goal posts</Text>
        </View>

        <View style={{backgroundColor: "white",alignItems: "center", marginVertical: 10, padding: 20, borderRadius: 10}}>
            <Text style={{alignItems: "center"}}>Price: €10.00 Per Hour</Text>
        </View>
      <Button title='Buy now' onPress={() => openPaymentSheet()}/>
    </View>
  )
}

async function fetchPaymentSheetParams ()
{
    let res = await axios.post(`${BASE_URL}/payment-sheet/1`)
    console.log(res.data);
    return res.data;
}

async function initializePaymentSheet(){
    const {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    } = await fetchPaymentSheetParams ();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Sports Malta",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      }
    });
  };

  async function openPaymentSheet() {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

export default Checkout