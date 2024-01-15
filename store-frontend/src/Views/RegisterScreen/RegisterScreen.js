import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
  ActivityIndicator
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "store-frontend/src/Views/styles";
import LoginController from "../../Controllers/LoginController";
import { colors } from "store-frontend/src/Views/colors.js";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [loading,setLoading] = useState(false);

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,}$/;

  const onRegisterPress = async () => {
    setLoading(true);
    // Basic validation
    if (!email || !password || !passwordVerify) {
      console.log("Please fill in all fields");
      setErrorMessage("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (!passwordRegex.test(password)) {
      console.log(
        "Password must contain at least one uppercase letter, one number, one symbol, and be at least 9 characters long"
      );
      setErrorMessage(
        "Password must contain at least one uppercase letter, one number, one symbol, and be at least 9 characters long"
      );
      setLoading(false);
      return;
    }
    if (password !== passwordVerify) {
      console.log("Passwords do not match");
      setErrorMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    await LoginController.registerUser(
      email,
      username,
      password,
      passwordVerify
    )
      .then((result) => {
        if (result.success) {
          console.log("Registration successful:", result.message);
          setRegisterSuccess("Registration Successful!");
          setErrorMessage("");
          setLoading(false);
        } else {
          console.log("Registration failed:", result.message);
          setErrorMessage(result.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>

      {loading?(

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.white} />
        </View>

      ):(

      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardContainer}
        keyboardShouldPersistTaps="never"
        scrollEnabled={true}
        alwaysBounceVertical={true}
      >
        <Image
          style={styles.logo}
          source={require("store-frontend/assets/logo.png")}
        />
        {errorMessage !== "" && (
          <Text style={styles.errorMessage}>
            {errorMessage}
          </Text>
        )}
        {registerSuccess !== "" && (
          <Text
            style={{ color: "white", textAlign: "center", marginBottom: 10 }}
          >
            {registerSuccess}
          </Text>
        )}
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Register</Text>
        </TouchableOpacity>
        <SafeAreaView style={styles.footerView}>
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </SafeAreaView>
      </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  );
}
