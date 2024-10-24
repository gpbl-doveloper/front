import React, { useState } from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { ButtonBigSize } from "@/src/components/Buttons";
import { AuthTextInput } from "@/src/components/TextInputs";
import { navigationController } from "./LoginController";
import { loginStyles } from "./loginStyles";
import { useUserStore } from "@/src/store/userStore";
import { loginByFirebase } from "./loginModel";
import { MainLogo } from "@/src/components/Logos";

export default function LoginView() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const setUser = useUserStore((state) => state.setUser);

  return (
    <LoginContianer>
      <LoginFormContainer
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />

      <SignUpPrompt onSignUp={navigationController.goToJoin} />
    </LoginContianer>
  );
}

function LoginContianer({ children }: any) {
  return (
    <SafeAreaView style={loginStyles.loginContainer}>
      <View style={loginStyles.loginContent}>
        {/* <Text style={loginStyles.title}>Hi, Welcome! 👋</Text> */}
        <View style={loginStyles.logoContainer}>
          <MainLogo width={200} height={60} />
        </View>
        {children}
      </View>
    </SafeAreaView>
  );
}
function LoginFormContainer({ email, setEmail, password, setPassword }: any) {
  return (
    <View style={loginStyles.loginFormContainer}>
      <AuthTextInput
        label="Email address"
        isPassword={false}
        text={email}
        setText={setEmail}
        placeholder="Your Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <AuthTextInput
        label="Password"
        isPassword={true}
        text={password}
        setText={setPassword}
        placeholder="Enter your password"
      />
      <LoginOptionsRow onForgotPassword={navigationController.goToJoin} />

      <ButtonBigSize
        text="Sign In"
        onPress={() => loginByFirebase({ email, password })}
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

interface SignUpPromptProps {
  onSignUp: () => void;
}

export const SignUpPrompt = ({ onSignUp }: SignUpPromptProps) => (
  <View style={loginStyles.signUpContainer}>
    <Text style={loginStyles.signUpText}>Don't have an account? </Text>
    <TouchableOpacity onPress={onSignUp}>
      <Text style={loginStyles.signUpLink}>Sign up</Text>
    </TouchableOpacity>
  </View>
);
