import { useAuthStore } from "@/src/store/userStore";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EmailPWTextInput } from "../authView";
import { ButtonBigSize } from "@/src/components/Buttons";
import { loginTasks } from "./loginModel";
import { navigationController } from "../authController";

export function LoginFormContainer() {
  const { email, password } = useAuthStore();
  return (
    <View style={loginStyles.loginFormContainer}>
      <EmailPWTextInput />
      <LoginOptionsRow onForgotPassword={navigationController.goToJoin} />

      <ButtonBigSize
        text="Sign In"
        onPress={() => loginTasks({ email, password })}
        buttonColor="purple"
        disabled={!email || !password}
      />
    </View>
  );
}

interface LoginOptionsRowProps {
  onForgotPassword: () => void;
}

export const LoginOptionsRow = ({ onForgotPassword }: LoginOptionsRowProps) => (
  <View style={loginStyles.loginOptionsContainer}>
    <TouchableOpacity onPress={onForgotPassword}>
      <Text style={loginStyles.forgotPassword}>Forgot password?</Text>
    </TouchableOpacity>
  </View>
);

export const loginStyles = StyleSheet.create({
  loginFormContainer: {
    gap: 16,
    paddingVertical: 10,
  },
  loginOptionsContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 6,
  },
  forgotPassword: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },
});
