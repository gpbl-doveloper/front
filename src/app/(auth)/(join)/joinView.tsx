import { StyleSheet } from "react-native";
import { ButtonBigSize } from "@/src/components/Buttons";
import { useAuthStore } from "@/src/store/userStore";
import { joinController } from "./joinModel";
import { View } from "react-native";
import { AuthTextInput } from "@/src/components/TextInputs";
import { authStyles, EmailPWTextInput } from "../authView";

// 유저 정보 입력 View
export function JoinFormView({
  firebaseSuccess,
  username,
  setUsername,
  phone,
  setPhone,
}: any) {
  return (
    <View style={authStyles.authFormContainer}>
      <EmailPWTextInput />
      {firebaseSuccess ? (
        <>
          <AddInfos
            username={username}
            setUsername={setUsername}
            phone={phone}
            setPhone={setPhone}
          />
        </>
      ) : null}
    </View>
  );
}

export function AddInfos({ username, setUsername, phone, setPhone }: any) {
  return (
    <View style={authStyles.authFormContainer}>
      <AuthTextInput
        label="Username"
        isPassword={false}
        text={username}
        setText={setUsername}
        placeholder="Your Name"
      />
      <AuthTextInput
        label="Phone"
        isPassword={false}
        text={phone}
        setText={setPhone}
        placeholder="Your Phone"
      />
    </View>
  );
}

// 회원가입 버튼, 처음엔 firebase 회원가입 체크, 성공시 백엔드 회원가입
export function TwoSideButtons({
  firebaseSuccess,
  setFirebaseSuccess,
  acceptedTerms,
}: any) {
  const { email, password, token, setToken, name, phone } = useAuthStore();
  const data = { name: name, role: "Parent", phone: phone };
  return (
    <>
      {firebaseSuccess ? (
        // Sign Up By Backend
        <ButtonBigSize
          text="Sign Up"
          onPress={() => joinController.signUp(token, data)}
          buttonColor="purple"
          disabled={!email || !password || !name || !phone || !acceptedTerms}
        />
      ) : (
        // Check Email and Password By Firebase
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
