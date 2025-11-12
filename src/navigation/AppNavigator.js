// src/navigation/AppNavigator.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainTabs from './MainTabs';

const Stack = createNativeStackNavigator();

// --- Authentication Stack (for Login/Register) ---
const AuthStack = () => (
  <Stack.Navigator 
    // CRITICAL FIX: headerShown MUST be the boolean 'false' (no quotes)
    screenOptions={{ headerShown: false }} 
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

// --- Main Application Stack (for Feed/Profile) ---
const AppStack = () => (
    <MainTabs />
);

// --- Root Navigator ---
const AppNavigator = () => {
  const { currentUser } = useAuth();
  
  if (currentUser === undefined) {
      return (
          <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#000" />
          </View>
      );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ headerShown: false }} 
      >
        {currentUser ? (
          <Stack.Screen name="App" component={AppStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default AppNavigator;