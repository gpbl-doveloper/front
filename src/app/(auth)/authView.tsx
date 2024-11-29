import { MainLogo } from "@/src/components/Logos";
import { AuthTextInput } from "@/src/components/TextInputs";
import { useAuthStore } from "@/src/store/userStore";
import { SafeAreaView, Text, View } from "react-native";
import { StyleSheet } from "react-native";

export function AuthContainer({ children, title, logo }: any) {
  return (
    <SafeAreaView style={authStyles.container}>
      <View style={authStyles.paddingContainer}>
        {logo ? (
          <View style={authStyles.logoContainer}>
            <MainLogo width={280} height={100} />
          </View>
        ) : (
          <Text style={authStyles.title}>{title}</Text>
        )}
        {children}
      </View>
    </SafeAreaView>
  );
}

export function EmailPWTextInput() {
  const { email, setEmail, password, setPassword } = useAuthStore();
  return (
    <View style={authStyles.authFormContainer}>
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
    </View>
  );
}

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7E9",
    justifyContent: "center",
  },
  paddingContainer: {
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: -60,
    marginBottom: -40,
  },
  authFormContainer: {
    gap: 16,
  },
});
