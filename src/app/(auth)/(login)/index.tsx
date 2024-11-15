import React from "react";
import { AuthPrompt } from "@/src/components/AuthPrompt";
import { AuthContainer } from "../authView";
import { LoginFormContainer } from "./loginView";
import { authNavigationController } from "../../NavigationControllers";

export default function LoginView() {
  const { goToJoin } = authNavigationController();
  return (
    <AuthContainer logo={true}>
      <LoginFormContainer />

      <AuthPrompt
        message="Don't have an account?"
        linkText="Sign Up"
        onPress={goToJoin}
      />
    </AuthContainer>
  );
}
