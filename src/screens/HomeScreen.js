import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Icon from "react-native-vector-icons/MaterialIcons"; // Importing Material Icons for delete icon

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle auth state
  useEffect(() => {
    const unsubscribeAuth = auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        // Navigate to Login if not logged in
        navigation.replace("Login");
      }
      setLoading(false);
    });

    return unsubscribeAuth;
  }, [navigation]);

  // Listen for chats
  useEffect(() => {
    const unsubscribeChats = firestore()
      .collection("chats")
      .onSnapshot((snapshot) => {
        setChats(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
      });

    return unsubscribeChats;
  }, []);

  // Handle logout
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => auth().signOut(),
      },
    ]);
  };

  // Handle chat search
  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  // Filter chats based on search query
  const filteredChats = chats.filter((chat) =>
    chat.data.chatName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle delete chat
  const handleDelete = (chatId) => {
    Alert.alert("Delete", "Are you sure you want to delete this chat?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          firestore().collection("chats").doc(chatId).delete();
        },
      },
    ]);
  };

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome back {user?.displayName || "User"}!
      </Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search chats"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Buttons Row: Add Chat & Profile */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddChat")}
        >
          <Text style={styles.buttonText}>➕ Add Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.buttonText}>👤 Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.chatItem}>
            <TouchableOpacity
              style={styles.chatTextContainer}
              onPress={() =>
                navigation.navigate("Chat", {
                  id: item.id,
                  chatName: item.data.chatName,
                })
              }
            >
              <Text style={styles.chatText}>{item.data.chatName}</Text>
            </TouchableOpacity>

            {/* Delete Icon */}
            <TouchableOpacity
              style={styles.deleteIcon}
              onPress={() => handleDelete(item.id)}
            >
              <Icon name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>🚪 Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 10 },
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  logoutButton: {
    backgroundColor: "#f44336",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  chatItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 8,
  },
  chatTextContainer: {
    flex: 1,
  },
  chatText: {
    fontSize: 16,
  },
  deleteIcon: {
    paddingLeft: 10,
  },
});

export default HomeScreen;
