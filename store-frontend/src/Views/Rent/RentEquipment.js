import { Text, TouchableOpacity, SafeAreaView,Image,View } from 'react-native';
import styles from 'store-frontend/src/Views/styles';
import Core from '../Core'




export default function RentEquipment ({ navigation }) {

    const rent = () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={rent}>
                    <Text style={styles.buttonTitle}>rent equipment page</Text>
                </TouchableOpacity>
                
            </View>

            <Core />
        </SafeAreaView>
    );
}
