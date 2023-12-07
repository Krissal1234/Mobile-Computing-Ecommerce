import { Text, TouchableOpacity, SafeAreaView,Image } from 'react-native';
import styles from 'store-frontend/src/Views/styles';




export default function LeaseEquipment({ navigation }) {

    const rent = () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container}>


            <TouchableOpacity
                style={styles.button}
                onPress={rent}>
                <Text style={styles.buttonTitle}>lease equipment page</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}
