import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from 'store-frontend/src/Views/styles';
import LoginController from '../../Controllers/LoginController';
import {colors} from 'store-frontend/src/Views/colors.js'

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');

  const onFooterLinkPress = () => {
    navigation.navigate('Login');
  };

  const onRegisterPress = async () => {

    // Basic validation
    if (!email || !password || password !== passwordVerify) {
      console.log('Invalid registration data');
      return;
    }

    await LoginController.registerUser(email,username, password, passwordVerify)
      .then((result) => {
        if (result.success) {
          console.log('Registration successful:', result.message);
        } else {
          console.error('Registration failed:', result.message);
        }
      })
      .catch((error) => {
        console.error('Error during registration:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardContainer}
        keyboardShouldPersistTaps="never"
        scrollEnabled={true}
        alwaysBounceVertical={true}>
        <Image
          style={styles.logo}
          source={require('store-frontend/assets/logo.png')}
        />
          <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={colors.grey}
          onChangeText={(text) => setUsername(text)}
          value={username}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor={colors.grey}
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.grey}
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.grey}
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setPasswordVerify(text)}
          value={passwordVerify}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => onRegisterPress()}>
          <Text style={styles.buttonTitle}>Register</Text>
        </TouchableOpacity>
        <SafeAreaView style={styles.footerView}>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
