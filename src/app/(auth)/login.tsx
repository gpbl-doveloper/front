// login.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig"; // firebaseConfig.js를 import
import { useUserStore } from "@/src/store/userStore";
import { Href, router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = async () => {
    if (!email) {
      Alert.alert("Email is required", "Please enter a valid email address");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      setUser({ email: user.email, name: "Guest" }); // Zustand 스토어에 사용자 정보 저장

      Alert.alert("Login Successful", `Welcome ${user.email}`);
      router.push("/(main)/home" as Href);
    } catch (error) {
      const errorMessage = (error as Error).message;
      Alert.alert("Login Failed", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 8,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 8,
  },
});
