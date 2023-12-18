import { View, Text, SafeAreaView,TouchableOpacity, ScrollView,Image } from 'react-native'
import React from 'react'
import styles from 'store-frontend/src/Views/styles';
import { useNavigation } from '@react-navigation/native';

const Equipment = () => {

    const navigation=useNavigation();

    const rent = () => {
        navigation.navigate('Login');
      };

  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.verticalScrollView}>

            <ScrollView horizontal contentContainerStyle={styles.horizontalScrollView}
                        showsHorizontalScrollIndicator={false}
            >
                <TouchableOpacity
                    onPress={rent}>
                    <Image source={require('store-frontend/assets/logo.png')} style={styles.itemImg} />
                </TouchableOpacity> 

                <TouchableOpacity
                    onPress={rent}>
                    <Image source={require('store-frontend/assets/logo.png')} style={styles.itemImg} />
                </TouchableOpacity> 

                <TouchableOpacity
                    onPress={rent}>
                    <Image source={require('store-frontend/assets/logo.png')} style={styles.itemImg} />
                </TouchableOpacity> 

                <TouchableOpacity
                    onPress={rent}>
                    <Image source={require('store-frontend/assets/logo.png')} style={styles.itemImg} />
                </TouchableOpacity> 

            </ScrollView>   

            <ScrollView horizontal contentContainerStyle={styles.horizontalScrollView}
                        showsHorizontalScrollIndicator={false}
            >
                <TouchableOpacity
                    onPress={rent}>
                    <Image source={require('store-frontend/assets/logo.png')} style={styles.itemImg} />
                </TouchableOpacity> 

                <TouchableOpacity
                    onPress={rent}>
                    <Image source={require('store-frontend/assets/logo.png')} style={styles.itemImg} />
                </TouchableOpacity> 

                <TouchableOpacity
                    onPress={rent}>
                    <Image source={require('store-frontend/assets/logo.png')} style={styles.itemImg} />
                </TouchableOpacity> 

                <TouchableOpacity
                    onPress={rent}>
                    <Image source={require('store-frontend/assets/logo.png')} style={styles.itemImg} />
                </TouchableOpacity> 

            </ScrollView> 

            <ScrollView horizontal contentContainerStyle={styles.horizontalScrollView}
                        showsHorizontalScrollIndicator={false}
            >
                <TouchableOpacity
                    onPress={rent}>
                    <Image source={require('store-frontend/assets/logo.png')} style={styles.itemImg} />
                </TouchableOpacity> 

                <TouchableOpacity
                    onPress={rent}>
                    <Image source={require('store-frontend/assets/logo.png')} style={styles.itemImg} />
                </TouchableOpacity> 

                <TouchableOpacity
                    onPress={rent}>
                    <Image source={require('store-frontend/assets/logo.png')} style={styles.itemImg} />
                </TouchableOpacity> 

                <TouchableOpacity
                    onPress={rent}>
                    <Image source={require('store-frontend/assets/logo.png')} style={styles.itemImg} />
                </TouchableOpacity> 

            </ScrollView> 

            <ScrollView horizontal contentContainerStyle={styles.horizontalScrollView}
                        showsHorizontalScrollIndicator={false}
            >
                <TouchableOpacity
                    onPress={rent}>
                    <Image source={require('store-frontend/assets/logo.png')} style={styles.itemImg} />
                </TouchableOpacity> 

                <TouchableOpacity
                    onPress={rent}>
                    <Image source={require('store-frontend/assets/logo.png')} style={styles.itemImg} />
                </TouchableOpacity> 

                <TouchableOpacity
                    onPress={rent}>
                    <Image source={require('store-frontend/assets/logo.png')} style={styles.itemImg} />
                </TouchableOpacity> 

                <TouchableOpacity
                    onPress={rent}>
                    <Image source={require('store-frontend/assets/logo.png')} style={styles.itemImg} />
                </TouchableOpacity> 

            </ScrollView> 

        </ScrollView>
    </View>
);
}

export default Equipment