import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUser(currentUser);
      setDisplayName(currentUser.displayName || '');
    }
  }, []);

  const handleSave = () => {
    user.updateProfile({
      displayName: displayName,
    }).then(() => {
      alert('Profile updated successfully');
    }).catch(error => {
      alert('Error updating profile:', error.message);
    });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: user?.photoURL }} />
      <Text style={styles.title}>Profile</Text>
      <TextInput
        style={styles.input}
        value={displayName}
        onChangeText={setDisplayName}
        placeholder="Enter your display name"
      />
      <TouchableOpacity onPress={handleSave} style={styles.button}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.link}>
        <Text style={styles.linkText}>Go to Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.link}
      >
        <Text style={styles.linkText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  input: { width: '80%', padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, marginBottom: 20 },
  button: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5 },
  buttonText: { color: '#fff' },
  link: { marginTop: 20 },
  linkText: { color: '#2196F3' },
});

export default ProfileScreen;
