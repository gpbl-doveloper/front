import React from "react";
import { AuthPrompt } from "@/src/components/AuthPrompt";
import { AuthContainer } from "../authView";
import { LoginFormContainer } from "./loginView";
import { navigationController } from "../authController";

export default function LoginView() {
  return (
    <AuthContainer logo={true}>
      <LoginFormContainer />

      <AuthPrompt
        message="Don't have an account?"
        linkText="Sign Up"
        onPress={navigationController.goToJoin}
      />
    </AuthContainer>
  );
}
