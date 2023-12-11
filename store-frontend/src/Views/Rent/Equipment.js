import { View, Text, SafeAreaView,TouchableOpacity } from 'react-native'
import React from 'react'
import styles from 'store-frontend/src/Views/styles';

const rent = () => {
  navigation.navigate('Login');
};

const Equipment = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={{ flex: 1}}>
            <TouchableOpacity
                style={styles.button}
                onPress={rent}>
                <Text style={styles.buttonTitle}>rent equipment page</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={rent}>
                <Text style={styles.buttonTitle}>rent equipment page</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={rent}>
                <Text style={styles.buttonTitle}>rent equipment page</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={rent}>
                <Text style={styles.buttonTitle}>rent equipment page</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={rent}>
                <Text style={styles.buttonTitle}>rent equipment page</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={rent}>
                <Text style={styles.buttonTitle}>rent equipment page</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={rent}>
                <Text style={styles.buttonTitle}>rent equipment page</Text>
            </TouchableOpacity>
            

        </View>
    </SafeAreaView>
);
}

export default Equipment