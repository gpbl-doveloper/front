import React, { useState } from "react";
import { joinController } from "./joinController"; // Controller import
import { JoinFirebaseView } from "./joinFirebaseView";
import { JoinBackendView } from "./joinBackendView";
import { AuthContainer } from "../authContainer";

export default function JoinScreen() {
  const [token, setToken] = useState<string>("");
  const [firebaseSuccess, setFirebaseSuccess] = useState<boolean>(false);

  return (
    <AuthContainer title="Join">
      <JoinFirebaseView
        firebaseSuccess={firebaseSuccess}
        // Firebase check를 Controller에 위임
        onFirebaseCheck={(email: string, password: string) =>
          joinController.firebaseCheck(
            email,
            password,
            setToken,
            setFirebaseSuccess
          )
        }
      />
      {firebaseSuccess && (
        <JoinBackendView
          firebaseSuccess={firebaseSuccess}
          handleJoinToBackend={(username: string) =>
            joinController.backendJoin(token, username)
          }
        />
      )}
    </AuthContainer>
  );
}
