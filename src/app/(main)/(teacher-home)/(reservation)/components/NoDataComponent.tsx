import { Text, View } from "react-native";
import reservationStyles from "../styles";
import { Ionicons } from "@expo/vector-icons";

export function NoDataComponent({ text }: { text: string }) {
  return (
    <View style={reservationStyles.noDataContainer}>
      <Ionicons name="paw" size={24} color="black" />
      <Text style={reservationStyles.noDataText}>No {text} reservations</Text>
    </View>
  );
}
