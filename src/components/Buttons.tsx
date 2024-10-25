import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";
import { buttonsStyles } from "./ButtonsStyles";

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
