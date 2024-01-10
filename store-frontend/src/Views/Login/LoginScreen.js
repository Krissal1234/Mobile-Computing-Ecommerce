import React, { useState, useContext, useEffect } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "store-frontend/src/Views/styles";
import LoginController from "../../Controllers/LoginController";
import { colors } from "store-frontend/src/Views/colors.js";
import { UserContext } from "../../Contexts/UserContext";
import { ListingsController } from "../../Controllers/ListingsController";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const { setSportCategories } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  const onLoginPress = async () => {
    setLoading(true);
    console.log("clicked login");
    const login = await LoginController.loginUser(email, password);

    console.log(login.message);
    if (login.success) {
      //Setting uid global variable

      login.user.stripeAccountId = login.userData.data.stripeAccountId
      console.log(login)
      console.log(login)
      setUser(login.user);

      //Setting sport categories global variable to minimise overhead
      const response = await ListingsController.getAllSports();
      if (response.success) {
        setSportCategories(response.data);
      } else {
        console.log(response.message);
      }

      setLoading(false);
      navigation.navigate("Home");
    } else {
      setErrorMessage(login.message);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardContainer}
        keyboardShouldPersistTaps="never"
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.white} />
          </View>
        ) : (
          // Show the rest of the form only when not loading
          <>
            <Image
              style={styles.logo}
              source={require("store-frontend/assets/logo.png")}
            />

            {errorMessage !== "" && (
              <Text
                style={{ color: "red", textAlign: "center", marginBottom: 10 }}
              >
                {errorMessage}
              </Text>
            )}
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
              secureTextEntry
              placeholder="Password"
              placeholderTextColor={colors.grey}
              onChangeText={(text) => setPassword(text)}
              value={password}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => onLoginPress()}
            >
              <Text style={styles.buttonTitle}>Log in</Text>
            </TouchableOpacity>
            <SafeAreaView style={styles.footerView}>
              <Text style={styles.footerText}>
                Don't have an account?{" "}
                <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                  Sign up
                </Text>
              </Text>
            </SafeAreaView>
          </>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
