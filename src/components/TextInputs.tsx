import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

interface InputProps extends TextInputProps {
  label: string;
  isPassword?: boolean;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export function AuthTextInput({
  label,
  isPassword = false,
  text,
  setText,
  ...props
}: InputProps) {
  const [isTextVisible, setIsTextVisible] = useState(false);

  return (
    <View>
      <Text style={inputStyles.label}>{label}</Text>
      {isPassword ? (
        <View style={inputStyles.passwordContainer}>
          <TextInput
            style={[inputStyles.input, inputStyles.passwordInput]}
            value={text}
            onChangeText={(text) => {
              setText(text);
            }}
            secureTextEntry={!isTextVisible}
            {...props}
          />
          <TouchableOpacity
            style={inputStyles.passwordVisibilityButton}
            onPress={() => setIsTextVisible(!isTextVisible)}
          >
            {isTextVisible ? (
              <EyeOff size={20} color="#666" />
            ) : (
              <Eye size={20} color="#666" />
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <TextInput
          style={inputStyles.input}
          value={text}
          onChangeText={(text) => setText(text)}
          {...props}
        />
      )}
    </View>
  );
}

const inputStyles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
  },
  passwordVisibilityButton: {
    position: "absolute",
    right: 16,
  },
});
