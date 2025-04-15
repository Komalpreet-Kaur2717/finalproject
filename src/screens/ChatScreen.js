import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore'; 
import auth from '@react-native-firebase/auth'; // Firebase auth import
import styles from '../styles/ChatScreenStyle';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing the MaterialIcons library

const ChatScreen = ({ navigation, route }) => {
  const [user, setUser] = useState(null); // Track the user state
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [showIcons, setShowIcons] = useState(false);
  const scrollRef = useRef();

  // Handle auth state
  useEffect(() => {
    const unsubscribeAuth = auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser); // Set the authenticated user
      } else {
        // Navigate to login screen if user is not authenticated
        Alert.alert('Error', 'You must be logged in to access the chat.');
        navigation.replace('Login');
      }
    });

    return unsubscribeAuth;
  }, [navigation]);

  // Send message to Firestore
  const sendMessage = async () => {
    Keyboard.dismiss();

    if (!input.trim()) return;

    await firestore()
      .collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .add({
        timestamp: firestore.FieldValue.serverTimestamp(),
        message: input,
        displayName: user?.displayName || 'Anonymous',
        email: user?.email,
      });

    setInput('');
  };

  // Fetch messages on component mount and listen for updates
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })));
      });

    return unsubscribe;
  }, [route]);

  // Emoji set
  const emojis = ['😊', '😂', '🔥', '👍', '❤️', '🥳', '😎', '😢'];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
              setShowIcons(false);
            }}
          >
            <ScrollView
              ref={scrollRef}
              contentContainerStyle={styles.scrollView}
              onContentSizeChange={() =>
                scrollRef.current.scrollToEnd({ animated: true })
              }
              keyboardShouldPersistTaps="handled"
            >
              {messages.map(({ id, data }) => {
                const isCurrentUser = data.email === user?.email;
                return (
                  <View
                    key={id}
                    style={[
                      styles.messageContainer,
                      isCurrentUser ? styles.currentUserAlign : styles.otherUserAlign,
                    ]}
                  >
                    <View
                      style={[
                        styles.messageBubble,
                        isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble,
                      ]}
                    >
                      <Text style={styles.messageText}>{data.message}</Text>
                    </View>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </TouchableWithoutFeedback>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Write Here"
              value={input}
              onChangeText={(text) => setInput(text)}
              onSubmitEditing={sendMessage}
              returnKeyType="send"
            />

            <TouchableOpacity
              onPress={() => setShowIcons(!showIcons)}
              activeOpacity={0.7}
              style={{ marginLeft: 10 }}
            >
              <Icon name="smile-o" type="font-awesome" color="#C8102E" size={24} />
            </TouchableOpacity>

            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Icon name="send" type="feather" color="#C8102E" size={24} />
            </TouchableOpacity>
          </View>

          {showIcons && (
            <View style={styles.iconSetContainer}>
              {emojis.map((emoji, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setInput((prev) => prev + emoji);
                    setShowIcons(false);
                  }}
                >
                  <Text style={styles.icon}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
