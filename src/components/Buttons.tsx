import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { StyleSheet } from "react-native";

type ButtonBigSizeProps = {
  buttonColor: string;
  onPress: (event: GestureResponderEvent) => void; // onPress 타입 정의
  text: string;
  disabled?: boolean;
};
type ButtonColorStyles = {
  [key: string]: {
    borderColor: string;
    backgroundColor: string;
    textColor: string;
  };
};

const buttonColors: ButtonColorStyles = {
  white: {
    borderColor: "#ddd",
    backgroundColor: "#fff",
    textColor: "#000", // 흰색 버튼에는 검정색 텍스트
  },
  purple: {
    borderColor: "#6B4EFF",
    backgroundColor: "#6B4EFF",
    textColor: "#fff", // 보라색 버튼에는 흰색 텍스트
  },
  gray: {
    backgroundColor: "#A8A8A8",
    borderColor: "#A8A8A8",
    textColor: "#fff", // 회색 버튼에는 흰색 텍스트
  },
  black: {
    backgroundColor: "#000",
    borderColor: "#000",
    textColor: "#fff", // 검정색 버튼에는 흰색 텍스트
  },
  whiteBlack: {
    backgroundColor: "#fff",
    borderColor: "#000",
    textColor: "#000", // 흰색 버튼에는 검정색 텍스트
  },
};

export function ButtonBigSize({
  text,
  buttonColor,
  onPress,
  disabled = false,
}: ButtonBigSizeProps) {
  const buttonColorStyle = buttonColors[buttonColor] || buttonColors["white"]; // 기본값은 white

  return (
    <TouchableOpacity
      style={[
        buttonsStyles.button,
        {
          backgroundColor: buttonColorStyle.backgroundColor,
          borderColor: buttonColorStyle.borderColor,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          buttonsStyles.buttonText,
          { color: buttonColorStyle.textColor },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

interface ButtonSmallSizeProps {
  text: string;
  buttonColor: keyof typeof buttonColors;
  onPress: () => void;
  disabled?: boolean;
  width?: "40%" | "100%"; // 너비 옵션 추가
}

export function ButtonCircleShape({
  text,
  buttonColor,
  onPress,
  disabled = false,
  width = "100%", // 기본값을 100%로 설정
}: ButtonSmallSizeProps) {
  const buttonColorStyle = buttonColors[buttonColor] || buttonColors["white"]; // 기본값은 white
  return (
    <TouchableOpacity
      style={[
        buttonsStyles.smallButton,
        {
          backgroundColor: buttonColorStyle.backgroundColor,
          borderColor: buttonColorStyle.borderColor,
          width: width, // width를 props에서 받아 적용
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          buttonsStyles.smallButtonText,
          { color: buttonColorStyle.textColor },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
export const buttonsStyles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },

  smallButton: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  smallButtonText: {
    fontWeight: "600",
    fontSize: 16,
  },
});
