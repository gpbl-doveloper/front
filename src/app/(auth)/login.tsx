// login.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig"; // firebaseConfig.js를 import
import useUserStore from "@/src/store/userStore";
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
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl mb-5">Login</Text>
      <TextInput
        className="w-4/5 p-2 border border-gray-500 mb-3 rounded"
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        className="w-4/5 p-2 border border-gray-500 mb-5 rounded"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
