import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Icon, ListItem, Avatar } from '@rneui/themed';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CustomListItem = ({ id, chatName, enterChat }) => {
  const deleteChat = async () => {
    Alert.alert(
      "Delete Chat",
      `Are you sure you want to delete "${chatName}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "chats", id));
            } catch (error) {
              alert("Failed to delete chat.");
            }
          },
        },
      ]
    );
  };

  return (
    <ListItem bottomDivider onPress={() => enterChat(id, chatName)}>
      <Icon name="message-circle" type="feather" color="#C8102E" />
      <ListItem.Content>
        <ListItem.Title style={styles.chatName}>{chatName}</ListItem.Title>
      </ListItem.Content>
      <TouchableOpacity onPress={deleteChat}>
        <Icon name="trash" type="feather" color="red" />
      </TouchableOpacity>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  chatName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomListItem;
