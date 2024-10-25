import { StyleSheet, Text, View } from "react-native";
import { Checkbox } from "expo-checkbox";

interface CheckboxRowProps {
  message: string;
  isChecked: boolean;
  setIsChecked: any;
}
export const CheckboxRow = ({
  message,
  isChecked,
  setIsChecked,
}: CheckboxRowProps) => (
  <View style={checkboxStyles.checkboxContainer}>
    <Checkbox
      value={isChecked}
      onValueChange={() => setIsChecked(!isChecked)}
    />
    <Text style={checkboxStyles.checkboxText}>{message}</Text>
  </View>
);

export const checkboxStyles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
});
