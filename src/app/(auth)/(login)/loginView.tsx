import {
  useAuthStore,
  useFirebaseAuth,
  useUserStore,
} from "@/src/store/userStore";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EmailPWTextInput } from "../authView";
import { ButtonBigSize } from "@/src/components/Buttons";
import { loginTasks } from "./loginModel";
import { authNavigationController } from "../../NavigationControllers";
import { useNavigation } from "@react-navigation/native";

export function LoginFormContainer() {
  const { email, password } = useAuthStore();
  const { goToJoin } = authNavigationController();
  const navigation = useNavigation();
  const { setUser } = useUserStore();
  const { setIdToken } = useFirebaseAuth();

  const handleLogin = async () => {
    try {
      // 로그인 API 호출
      const loginResult = await loginTasks({ email, password, setIdToken });
      setUser(loginResult.data.user);
      const { role } = loginResult.data.user;
      // 로그인 성공 시 페이지 이동
      if (role === "Parent" || role === "PARENT") {
        navigation.reset({
          index: 0,
          routes: [{ name: "(main)", params: { screen: "(home)" } }], //원래는(dogs)로이동
        });
      } else if (role === "Center" || role === "CENTER") {
        navigation.reset({
          index: 0,
          routes: [{ name: "(main)", params: { screen: "(teacher-home)" } }],
        });
      }
    } catch (error) {
      console.error("Sign Up Failed", error);
    }
  };
  return (
    <View style={loginStyles.loginFormContainer}>
      <EmailPWTextInput />
      <LoginOptionsRow onForgotPassword={goToJoin} />

      <ButtonBigSize
        text="Sign In"
        onPress={handleLogin}
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
