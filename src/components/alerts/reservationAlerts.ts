import { Alert } from "react-native";

// 알림 처리 함수
const showReservationAlert = (
  type: "success" | "error",
  action: "accept" | "decline"
) => {
  const messages = {
    success: `Reservation ${action}ed successfully`,
    error: `Failed to ${action} reservation`,
  };

  Alert.alert(type === "success" ? "Success" : "Error", messages[type]);
};

export default showReservationAlert;