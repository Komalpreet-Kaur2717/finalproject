import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = () => {
    auth().signOut().then(() => {
      alert('Logged out successfully!');
    }).catch(error => {
      alert('Error logging out:', error.message);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={(value) => setIsDarkMode(value)}
        />
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  setting: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  settingText: { fontSize: 18 },
  logoutButton: { backgroundColor: '#f44336', padding: 10, borderRadius: 5, alignItems: 'center' },
  logoutButtonText: { color: '#fff' },
});

export default SettingsScreen;
