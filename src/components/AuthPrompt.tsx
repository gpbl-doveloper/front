import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AuthPromptProps {
  message: string; // Gray Text
  linkText: string; // Highlighted Text
  onPress: () => void;
}

export const AuthPrompt = ({ message, linkText, onPress }: AuthPromptProps) => (
  <View style={authStyles.signUpContainer}>
    <Text style={authStyles.signUpText}>{message}</Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={authStyles.signUpLink}>{linkText}</Text>
    </TouchableOpacity>
  </View>
);

const authStyles = StyleSheet.create({
  signUpContainer: {
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    color: "#666",
    fontSize: 14,
  },
  signUpLink: {
    color: "#6B4EFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
