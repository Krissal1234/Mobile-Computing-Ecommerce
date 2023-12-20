// Home.js
import React, { useContext } from 'react';
import { TouchableOpacity, SafeAreaView, Text, Image } from 'react-native';
import styles from 'store-frontend/src/Views/styles';
import homeStyles from './styles';
import { UserContext } from '../../Contexts/UserContext';
import { RentingController } from '../../Controllers/RentingController';

export default function Home({ navigation }) {
  const { setAccountType } = useContext(UserContext);
  const {setShowFilter} = useContext(UserContext);
  const {user} = useContext(UserContext);

  const handleRentClick = async () => {
    // setAccountType('Renter');
    // setShowFilter(true);
    // navigation.navigate('Core');
      
    const equipmentData = {
      title: 'Boxing Gloves',
      sportCategory: 'Boxing',
      condition: 'New',
      price: 20,
      available_status: 'Available',
      deliveryType: 'pickup',
      description: 'High-quality leather boxing gloves',
      pickup_location: '123 Main St',
      images: ['image_url1', 'image_url2'],
      // other fields as needed
    };
    await RentingController.PostEquipment(equipmentData, user)
      .then((response) => {
        console.log(response);
        // handle successful response
      })
      .catch((error) => {
        console.error('Error posting equipment:', error);
        // handle error
      });
  };

  const handleLeaseClick = () => {
    setAccountType('Leaser');
    navigation.navigate('Core');
  };

  return (
    <SafeAreaView style={homeStyles.container}>
      <Image source={require('store-frontend/assets/logo.png')} style={homeStyles.logo} />

      <TouchableOpacity style={styles.button} onPress={handleRentClick}>
        <Text style={styles.buttonTitle}>Rent</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLeaseClick}>
        <Text style={styles.buttonTitle}>Lease</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
