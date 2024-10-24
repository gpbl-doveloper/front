import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { joinStyles } from "./joinStyles";
import { Button } from "react-native";

export function JoinBackendView({ handleJoinToBackend, firebaseSuccess }: any) {
  const [username, setUsername] = useState("");

  return (
    <>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={[
          joinStyles.input,
          firebaseSuccess ? null : joinStyles.disabledInput,
        ]}
      />
      <Button
        title="Join!"
        onPress={() => handleJoinToBackend(username)}
        disabled={!firebaseSuccess}
      />
    </>
  );
}
