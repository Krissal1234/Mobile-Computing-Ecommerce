import { View, Text, Button } from 'react-native'
import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../Constants';
import { openBrowserAsync } from 'expo-web-browser';
import StoreProfileCard from '../Components/StoreProfileCard';

const Profile = () => {
  return (
    <View style={{height: "100%"}}>
        <View style={{backgroundColor: "#132945", alignItems: "center", paddingVertical: 10}}>
            <Text style={{fontSize: 24, fontWeight: "bold", color: "white"}}>Your Store</Text>
        </View>
        <View style={{padding: 10}}>
            <StoreProfileCard buttonText="Update" title="Gzira United FC" description="Football club providing football pitches for rental and any equipment for football you need" imageSourceUri="https://sportsbooking.mt/wp-content/uploads/2023/01/New-Club-Logos-6-180x180.png" />
        </View>
        <View style={{padding: 10}}>
            <StoreProfileCard buttonText="Update" title="Location" description="24, Triq tas-Sliema, Gzira, Malta" imageSourceUri="https://img.freepik.com/free-vector/icon-3d-map-with-red-pin-location-tag_107791-15771.jpg?w=996&t=st=1696929241~exp=1696929841~hmac=da780966b74d96b3b6f1e5149e6558be2f7eccee0728c86483f3222a1f66cbce" />
        </View>
        <View style={{padding: 10}}>
            <StoreProfileCard buttonText="Set Up Now" title="Payment" description="In order to create listing on this app, you must set up a payment account" imageSourceUri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7n1jlYOx2NYbhRtXJ8QBzm1PS5vmktV5atdKYAdom2g&s" onPressFunction={testApi}/>
        </View>
        <View style={{padding: 10}}>
            <StoreProfileCard buttonText="View Listings" title="Listings" description="View, edit and add your equipment listed for rent on our app" imageSourceUri="https://img.freepik.com/free-photo/hand-holding-writing-checklist-application-form-document-clipboard-white-background-3d-illustration_56104-1551.jpg?w=826&t=st=1696929151~exp=1696929751~hmac=1e0dd9b14da2fc29f94deedc0ca3debef0c9f45c7b4a726dfee1a28349500fed" />
        </View>
    </View>
  )
}

async function testApi() {
    try{
        console.log(BASE_URL)
        const response = await axios.post(`${BASE_URL}/account`);
        openBrowserAsync(response.data.url);
    }
    catch(err)
    {
        console.log(err)
        //pk_test_51LoBCWGC9MhpkKozMAo0UEkGa8FS5TEx8ExG6T702Z8HCA7BvkLRe9jvKHZn26XTJobo4eSgAhVcRQIdAJSJVYAk0077oMzWuL
    }
}

export default Profile