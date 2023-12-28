import React from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper'; // Import components from react-native-paper

const PitchList = ({ data, navigation }) => {
  const handleItemPress = (pitch) => {
    navigation.navigate('PitchDetails', { pitch });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: 'white', margin: 5 }}>
        Pitch Listings:
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item)}>
            <Card style={{ marginVertical: 5, margin: 5, borderWidth: 2, borderColor: '#A2383A' }}>
              <Card.Content style={{ flexDirection: 'row' }}>
                <Card.Cover source={{ uri: item.image }} style={{ width: 120, height: 80, borderRadius: 5, borderWidth: 2, borderColor: '#A2383A', marginRight: 10 }} />
                <View style={{ flex: 1 }}>
                  <Title style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Title>
                  <Paragraph style={{ marginBottom: 5 }}>{item.description1}</Paragraph>
                  <Paragraph>{item.description2}</Paragraph>
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
