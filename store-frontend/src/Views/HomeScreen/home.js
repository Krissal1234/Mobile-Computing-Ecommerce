import { Text, TouchableOpacity, SafeAreaView,Image } from 'react-native';
import styles from './styles';




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
                style={styles.logo} >    
            </Image>

            <TouchableOpacity
                style={styles.button}
                onPress={rent}>
                <Text style={styles.buttonTitle}>rent</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={lease}>
                <Text style={styles.buttonTitle}>lease</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}
