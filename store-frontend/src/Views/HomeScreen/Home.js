// Home.js
import React, { useContext } from 'react';
import { TouchableOpacity, SafeAreaView, Text, Image } from 'react-native';
import styles from 'store-frontend/src/Views/styles';
import homeStyles from './styles';
import { UserContext } from '../../Contexts/UserContext';

export default function Home({ navigation }) {
  const { setAccountType } = useContext(UserContext);

  const handleRentClick = () => {
    setAccountType('Renter');
    navigation.navigate('RentEquipment');
  };

  const handleLeaseClick = () => {
    setAccountType('Leaser');
    navigation.navigate('LeaseEquipment');
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
