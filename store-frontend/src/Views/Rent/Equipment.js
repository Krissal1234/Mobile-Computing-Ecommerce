import { View, Text, SafeAreaView,TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import styles from 'store-frontend/src/Views/styles';

const rent = () => {
  navigation.navigate('Login');
};

const Equipment = () => {
  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.verticalScrollView}>

            <ScrollView horizontal contentContainerStyle={styles.horizontalScrollView}
                        showsHorizontalScrollIndicator={false}
            >
                <TouchableOpacity
                    style={styles.itemPreview}
                    onPress={rent}>
                    <Text style={styles.buttonTitle}>rent equipment page</Text>
                </TouchableOpacity> 

                <TouchableOpacity
                    style={styles.itemPreview}
                    onPress={rent}>
                    <Text style={styles.buttonTitle}>rent equipment page</Text>
                </TouchableOpacity> 

                <TouchableOpacity
                    style={styles.itemPreview}
                    onPress={rent}>
                    <Text style={styles.buttonTitle}>rent equipment page</Text>
                </TouchableOpacity> 

            </ScrollView>   

            <ScrollView horizontal contentContainerStyle={styles.horizontalScrollView}
                        showsHorizontalScrollIndicator={false}
            >
                <TouchableOpacity
                    style={styles.itemPreview}
                    onPress={rent}>
                    <Text style={styles.buttonTitle}>rent equipment page</Text>
                </TouchableOpacity> 

                <TouchableOpacity
                    style={styles.itemPreview}
                    onPress={rent}>
                    <Text style={styles.buttonTitle}>rent equipment page</Text>
                </TouchableOpacity> 

                <TouchableOpacity
                    style={styles.itemPreview}
                    onPress={rent}>
                    <Text style={styles.buttonTitle}>rent equipment page</Text>
                </TouchableOpacity> 

            </ScrollView>  

            <ScrollView horizontal contentContainerStyle={styles.horizontalScrollView}
                        showsHorizontalScrollIndicator={false}
            >
                <TouchableOpacity
                    style={styles.itemPreview}
                    onPress={rent}>
                    <Text style={styles.buttonTitle}>rent equipment page</Text>
                </TouchableOpacity> 

                <TouchableOpacity
                    style={styles.itemPreview}
                    onPress={rent}>
                    <Text style={styles.buttonTitle}>rent equipment page</Text>
                </TouchableOpacity> 

                <TouchableOpacity
                    style={styles.itemPreview}
                    onPress={rent}>
                    <Text style={styles.buttonTitle}>rent equipment page</Text>
                </TouchableOpacity> 

            </ScrollView>   

        </ScrollView>
    </View>
);
}

export default Equipment