import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from '../styles';
import profileTransparent from '../../../assets/profile.png';
import homeTransparent from '../../../assets/home_button.png';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

const Core = () => {
  const navigation = useNavigation();
  const [countdown, setCountdown] = useState(10);
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      // Timer has finished, get the user's location
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
        setShowMap(true);
      })();
    }

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleNavigation = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.coreContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleNavigation} style={styles.headerIcon}>
          <Image source={homeTransparent} style={styles.iconImage} />
        </TouchableOpacity>
      </View>

      {showMap ? (
        <View style={styles.card}>
          <Text style={styles.subtitle}>Your Location:</Text>
          {location ? (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title="Your Location"
              />
            </MapView>
          ) : (
            <Text>{errorMsg || "Loading location..."}</Text>
          )}
        </View>
      ) : (
        <TouchableOpacity onPress={handleNavigation} style={styles.countdownContainer}>
          <Text style={styles.sectionTitle}>Click Home in {countdown} seconds or I will find you...</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Core;
