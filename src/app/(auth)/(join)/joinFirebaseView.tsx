import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { joinStyles } from "./joinStyles";
import { Button } from "react-native";

export function JoinFirebaseView({ firebaseSuccess, onFirebaseCheck }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={[
          joinStyles.input,
          firebaseSuccess ? joinStyles.disabledInput : null,
        ]}
        keyboardType="email-address"
        editable={!firebaseSuccess}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={[
          joinStyles.input,
          firebaseSuccess ? joinStyles.disabledInput : null,
        ]}
        editable={!firebaseSuccess}
        secureTextEntry
      />
      <Button
        title="Check"
        onPress={() => {
          onFirebaseCheck(email, password);
        }}
        disabled={firebaseSuccess}
      />
    </>
  );
}
