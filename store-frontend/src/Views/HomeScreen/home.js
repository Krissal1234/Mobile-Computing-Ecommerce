import React, { useState } from 'react';
import { Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import styles from 'store-frontend/src/Views/styles';
import homeStyles from './styles';

export default function home({ navigation }) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const rent = () => {
        navigation.navigate('Login');
    };

    const lease = () => {
        navigation.navigate('Login');
    };

    const handleImageLoaded = () => {
        setIsImageLoaded(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image  
                source={require('store-frontend/assets/logo.png')}
                style={homeStyles.logo}
                onLoad={handleImageLoaded} // This will call handleImageLoaded when the image is loaded
            />
            {isImageLoaded && ( // This will render the buttons only after the image is loaded
                <>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={rent}>
                        <Text style={styles.buttonTitle}>Rent</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={lease}>
                        <Text style={styles.buttonTitle}>Lease</Text>
                    </TouchableOpacity>
                </>
            )}
        </SafeAreaView>
    );
}
