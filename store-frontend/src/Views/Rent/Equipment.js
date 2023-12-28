import React from 'react';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from 'store-frontend/src/Views/styles';
import { useNavigation } from '@react-navigation/native';

const Equipment = () => {
  const navigation = useNavigation();

  const rent = () => {
    navigation.navigate('Login');
  };

  // Assuming this is your 2D data array
  // Each sub-array represents a row of items
  const data = new Array(4).fill(
    new Array(3).fill({ image: require('store-frontend/assets/logo.png'), onPress: rent })
  );

  // Render each item in the horizontal FlatList
  const renderHorizontalItem = ({ item }) => (
    <TouchableOpacity onPress={item.onPress}>
      <Image source={item.image} style={styles.itemImg} />
    </TouchableOpacity>
  );

  // Render each horizontal FlatList
  const renderRow = ({ item }) => (
    <FlatList
      data={item}
      renderItem={renderHorizontalItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      style={styles.horizontalFlatList}
      showsHorizontalScrollIndicator={false}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.verticalFlatList}
        data={data}
        renderItem={renderRow}
        keyExtractor={(item, index) => `row-${index}`}
        horizontal={false}
      />
    </View>
  );
};

export default Equipment;
