import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const AddChatScreen = () => {
  const [chatName, setChatName] = useState('');
  const navigation = useNavigation();

  const createChat = async () => {
    if (chatName.trim()) {
      await firestore()
        .collection('chats')
        .add({
          chatName: chatName,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      setChatName('');
      navigation.goBack();  // Navigate back to HomeScreen after chat is created
    } else {
      alert('Please enter a chat name');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Chat</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter chat name"
        value={chatName}
        onChangeText={setChatName}
      />
      <TouchableOpacity onPress={createChat} style={styles.button}>
        <Text style={styles.buttonText}>Create Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, marginBottom: 20 },
  button: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff' },
});

export default AddChatScreen;
