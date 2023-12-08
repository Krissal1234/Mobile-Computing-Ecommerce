import React from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

const EquipmentList = ({ data, navigation }) => {
  const handleItemPress = (equipment) => {
    navigation.navigate('EquipmentDetails', { equipment });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
     <Text style={{ fontSize: 20,fontWeight: 'bold', marginBottom: 10, color: 'white', margin: 5 }}>Equipment Listings:</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item)}>
            <Card style={{ marginVertical: 5, margin: 5,borderWidth: 2, borderColor: '#A2383A', padding: 20 }}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: item.image }} style={{ width: 120, height: 80, borderRadius: 5, borderWidth: 2, borderColor: '#A2383A' ,  marginRight: 10 }} />
                <View>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
                  <Text>{item.description1}</Text>
                  <Text>{item.description2}</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default EquipmentList;
