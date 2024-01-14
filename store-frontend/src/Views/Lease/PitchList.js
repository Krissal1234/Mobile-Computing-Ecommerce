import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper'; // Import components from react-native-paper
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from '../../Contexts/UserContext';
import { ListingsController } from '../../Controllers/ListingsController';
import styles from 'store-frontend/src/Views/styles';
import { colors } from '../colors'; 

const PitchList = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const fetchAllFacilities = async () => {
    setLoading(true); 
    try {
      const response = await ListingsController.getAllFacilityUserListings(user.user.uid);
      if (response && response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching equipment:", error);
    } finally {
      setLoading(false); 
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAllFacilities();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }
  
  
  
  const handleItemPress = (pitch) => {
    navigation.navigate('PitchDetails', { pitch });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: 'white', margin: 5 }}>
        Your Facility Listings:
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item)}>
            <Card style={{ marginVertical: 5, margin: 5, borderWidth: 2, borderColor: '#A2383A' }}>
              <Card.Content style={{ flexDirection: 'row' }}>
                <Card.Cover source={{ uri: item.imageReference }} style={{ width: 120, height: 80, borderRadius: 5, borderWidth: 2, borderColor: '#A2383A', marginRight: 10 }} />
                <View style={{ flex: 1 }}>
                  <Title style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Title>
                  <Paragraph style={{ marginBottom: 5 }}>{item.description}</Paragraph>
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PitchList;

