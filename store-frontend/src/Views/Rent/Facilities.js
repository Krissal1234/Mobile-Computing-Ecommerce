import React, { useState, useEffect, useContext,useCallback } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text , ActivityIndicator,ScrollView} from 'react-native';
import styles from 'store-frontend/src/Views/styles';
import { FacilitiesController } from '../../Controllers/FacilitiesController';
import { ListingsController } from '../../Controllers/ListingsController';
import { createStackNavigator } from '@react-navigation/stack';
import FacilitiesDetails from './FacilitiesDetails';
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from '../../Contexts/UserContext';
import {colors} from '../colors';

const Stack = createStackNavigator();

const Facilities = ({ navigation }) => {
  const {sportFilter,setSportFilter} = useContext(UserContext);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setSportFilter('Set Sport Filter');
    }, [])
  );

  useEffect(() => {
    const fetchSportsAndFacilities = async () => {
      setLoading(true);
      try {

        let facilitiesResponse = await FacilitiesController.getAllAvailableFacilities();
        
        if (facilitiesResponse.success){
          console.log(facilitiesResponse.data);
          categorizeFacilities(facilitiesResponse.data);
        }


      } catch (error) {
        console.error("Error fetching sports or facilities: ", error);
      } finally {
        setLoading(false);
      }
    };

    const categorizeFacilities = (facilitiesList) => {
      const categorizedData = facilitiesList.reduce((acc, item) => {
        const { sportCategory } = item;
        if (!acc[sportCategory]) {
          acc[sportCategory] = [];
        }
        acc[sportCategory].push(item);
        return acc;
      }, {});

      setFacilities(Object.entries(categorizedData).map(([sport, facilities]) => ({ sport, facilities })));
    };

    fetchSportsAndFacilities();
  }, []);

  const renderFacilitiesItem = ({ item }) => (
    
    <TouchableOpacity onPress={() => navigation.navigate('FacilitiesDetails', { facilitiesId: item.id })}>
      <Image source={{ uri: item.imageReference }} style={styles.itemPreview} />
    </TouchableOpacity>
  );

  const renderFacilitiesRow = ({ item }) => (
    <View style={styles.rowContainer}>
      <Text style={styles.sectionTitle}>{item.sport}</Text>
      <FlatList
        data={item.facilities}
        renderItem={renderFacilitiesItem}
        keyExtractor={(item, index) => `${item.sport}-${index}`}
        horizontal
        style={styles.horizontalFlatList}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
  if (loading) {
    // Display loading indicator when data is being loaded
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  // Filter and flatten the equipment for the selected sport
  const filteredFacilities = facilities
  .filter(({ sport }) => sport === sportFilter)
  .flatMap(({ facilities }) => facilities);

  return (
    sportFilter === 'Set Sport Filter' || sportFilter === 'All Sports' ? (
      // This block will render when sportFilter is 'Set Sport Filter' or 'No Filter'
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.verticalFlatList}
          data={facilities}
          renderItem={renderFacilitiesRow}
          keyExtractor={(item, index) => `sport-${index}`}
          horizontal={false}
          initialNumToRender={1}
        />
      </View>
    ) : (
    // Render only the equipment of the sport that matches the sportFilter
    <View style={styles.container}>
      {filteredFacilities.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.filteredScrollView}
          showsVerticalScrollIndicator={false}>
          {filteredFacilities.map((item, index) => renderFacilitiesItem({item, index}))}
        </ScrollView>
      ) : (
        // Display no equipment message when there are no items
        <Text style={styles.title}>No Facilities Available</Text>
      )}
    </View>
    )
  );
};

const FacilitiesStack = () => {
  return (
    <Stack.Navigator initialRouteName="Facilities"  
      screenOptions={{ headerShown: false,
      }}
    >
      <Stack.Screen name="Facilities" component={Facilities} />
      <Stack.Screen name="FacilitiesDetails" component={FacilitiesDetails} />
    </Stack.Navigator>
  );
};

export default FacilitiesStack;
