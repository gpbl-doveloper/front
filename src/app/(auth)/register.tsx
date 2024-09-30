// register.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig"; // firebaseConfig에서 가져오기

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      Alert.alert("Registration Successful", `Welcome ${user.email}`);
    } catch (error) {
      const errorMessage = (error as Error).message;
      Alert.alert("Registration Failed", errorMessage);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl mb-5">Register</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        className="w-4/5 p-2 border border-gray-300 mb-3 rounded"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        className="w-4/5 p-2 border border-gray-300 mb-3 rounded"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        className="w-4/5 p-2 border border-gray-300 mb-5 rounded"
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
