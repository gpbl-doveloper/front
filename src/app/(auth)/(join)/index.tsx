import React, { useState } from "react";
import { AuthPrompt } from "@/src/components/AuthPrompt";
import { CheckboxRow } from "@/src/components/CheckBox";
import { RadioButtons } from "@/src/components/RadioButtons";
import { JoinFormView, TwoSideButtons } from "./joinView";
import { AuthContainer } from "../authView";
import { useAuthStore } from "@/src/store/userStore";
import { authNavigationController } from "../../NavigationControllers";

export default function JoinView() {
  const [firebaseSuccess, setFirebaseSuccess] = useState<boolean>(false);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const { name, setName, phone, setPhone } = useAuthStore();
  const { goToSignIn } = authNavigationController();

  const roles = ["Parent", "Center"];

  return (
    <AuthContainer title="Create account">
      {/* 역할 선택 */}
      <RadioButtons roles={roles} />

      {/* 유저 정보 입력 View */}
      <JoinFormView
        firebaseSuccess={firebaseSuccess}
        username={name}
        setUsername={setName}
        phone={phone}
        setPhone={setPhone}
      />

      {/* 약관 동의 체크박스 */}
      <CheckboxRow
        message="I accept the terms and privacy policy"
        isChecked={acceptedTerms}
        setIsChecked={setAcceptedTerms}
      />

      {/* 회원가입 버튼, 처음엔 firebase 회원가입 체크, 성공시 백엔드 회원가입 */}
      <TwoSideButtons
        firebaseSuccess={firebaseSuccess}
        setFirebaseSuccess={setFirebaseSuccess}
        acceptedTerms={acceptedTerms}
      />

      {/* 로그인 링크 */}
      <AuthPrompt
        message="Already have an account?"
        linkText="Sign In"
        onPress={goToSignIn}
      />
    </AuthContainer>
  );
}
