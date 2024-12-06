import { Alert } from "react-native";

type AlertType = "success" | "error";

interface AlertConfig {
  onPress?: () => void;
  cancelable?: boolean;
  customButtons?: Array<{
    text: string;
    onPress?: () => void;
    style?: "default" | "cancel" | "destructive";
  }>;
}

export const showCustomAlert = (
  type: AlertType,
  message: string,
  config?: AlertConfig
) => {
  const titles = {
    success: "Success",
    error: "Error",
  };

  // 기본 OK 버튼
  const defaultButtons = [
    {
      text: "OK",
      onPress: config?.onPress || undefined,
    },
  ];

  Alert.alert(titles[type], message, config?.customButtons || defaultButtons, {
    cancelable: config?.cancelable,
  });
};
