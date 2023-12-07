import { Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import styles from 'store-frontend/src/Views/styles';
import homeStyles from './styles';

export default function home({ navigation }) {

    const rent = () => {
        navigation.navigate('Login');
    };

    const lease = () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image  
                source={require('store-frontend/assets/logo.png')}
                style={homeStyles.logo}
            />

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

        </SafeAreaView>
    );
}
