import { StyleSheet } from "react-native";
import { ButtonBigSize } from "@/src/components/Buttons";
import { useAuthStore } from "@/src/store/userStore";
import { joinController } from "./joinController";
import { View } from "react-native";
import { AuthTextInput } from "@/src/components/TextInputs";
import { authStyles, EmailPWTextInput } from "../authView";

// 유저 정보 입력 View
export function JoinFormView({ firebaseSuccess, username, setUsername }: any) {
  return (
    <View style={authStyles.authFormContainer}>
      <EmailPWTextInput />
      {firebaseSuccess ? (
        <AddInfos username={username} setUsername={setUsername} />
      ) : null}
    </View>
  );
}

export function AddInfos({ username, setUsername }: any) {
  return (
    <View style={authStyles.authFormContainer}>
      <AuthTextInput
        label="Username"
        isPassword={false}
        text={username}
        setText={setUsername}
        placeholder="Your Name"
      />
    </View>
  );
}

// 회원가입 버튼, 처음엔 firebase 회원가입 체크, 성공시 백엔드 회원가입
export function TwoSideButtons({
  firebaseSuccess,
  setFirebaseSuccess,
  username,
  acceptedTerms,
}: any) {
  const { email, password, token, setToken } = useAuthStore();
  return (
    <>
      {firebaseSuccess ? (
        <ButtonBigSize
          text="Sign Up"
          onPress={() => joinController.backendJoin(token, username)}
          buttonColor="purple"
          disabled={!email || !password || !username || !acceptedTerms}
        />
      ) : (
        <ButtonBigSize
          text="Check Email and Password"
          onPress={() =>
            joinController.firebaseCheck(
              { email, password },
              setToken,
              setFirebaseSuccess
            )
          }
          buttonColor="purple"
          disabled={!email || !password || !acceptedTerms}
        />
      )}
    </>
  );
}

export const joinStyles = StyleSheet.create({
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#6B4EFF",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    color: "#666",
  },
  loginLink: {
    color: "#6B4EFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
