import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from 'store-frontend/src/Views/styles';
import LoginController from '../../Controllers/LoginController';
import {colors} from 'store-frontend/src/Views/colors.js'

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onLoginPress = async () => {
        console.log("clicked login");
       //await LoginController.registerUser(email, "krissal1234", password,password);
       await LoginController.loginUser(email, password);
      
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.keyboardContainer}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('store-frontend/assets/logo.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor={colors.grey}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    placeholder='Password'
                    placeholderTextColor={colors.grey}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <SafeAreaView style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </SafeAreaView>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}