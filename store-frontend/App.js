import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

import { StripeProvider } from '@stripe/stripe-react-native';
import Profile from './Pages/Profile';
import Checkout from './Pages/Checkout';

function App() {
  return (
    <View style={styles}>

    <StripeProvider
      publishableKey="pk_test_51LoBCWGC9MhpkKozMAo0UEkGa8FS5TEx8ExG6T702Z8HCA7BvkLRe9jvKHZn26XTJobo4eSgAhVcRQIdAJSJVYAk0077oMzWuL"
      >
        <View style={{paddingTop: 25, backgroundColor: "#2A3E57"}}>
      <Profile />
      {/* <Checkout /> */}
        </View>
    </StripeProvider>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A3E57',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;