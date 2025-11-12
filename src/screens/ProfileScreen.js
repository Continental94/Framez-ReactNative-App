// src/screens/ProfileScreen.js
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = () => {
  const { currentUser, logout } = useAuth();
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Profile</Text>
      
      {currentUser && (
        <>
          <Text style={styles.infoText}>Email: {currentUser.email}</Text>
          <Text style={styles.infoText}>UID: {currentUser.uid}</Text>
        </>
      )}

      <View style={styles.logoutButton}>
        <Button 
          title="Logout" 
          onPress={logout} 
          color="#FF3B30" // Red color for logout button
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  logoutButton: {
    marginTop: 30,
    width: '80%',
  }
});

export default ProfileScreen;