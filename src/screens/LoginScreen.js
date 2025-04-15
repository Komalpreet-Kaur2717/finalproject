import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet,Alert , Image} from "react-native";
import auth from '@react-native-firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Success', 'Signed in!');
      navigation.navigate('Home');
        } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/fanshawe-icon.png')}
        style={{ width: 200, height: 200 }}
      />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
      <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Don't have an account? Sign Up" onPress={() => navigation.navigate("SignUp")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // vertically center
    alignItems: 'center',      // horizontally center
    padding: 20,
    backgroundColor: '#fff',   // optional for contrast
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',     // ensures it scales well
    marginBottom: 30,
    alignSelf: 'center',       // extra safety for horizontal centering
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  signupLink: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
});


export default LoginScreen;