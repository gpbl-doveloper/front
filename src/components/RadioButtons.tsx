import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../store/userStore";

interface RadioButtonsProps {
  roles: string[];
}
export function RadioButtons({ roles }: RadioButtonsProps) {
  const { role, setRole } = useAuthStore();

  return (
    <View style={styles.roleSelectionContainer}>
      {roles.map((keyRole) => (
        <TouchableOpacity
          key={keyRole}
          style={styles.roleButton}
          onPress={() => setRole(keyRole.toUpperCase())}
        >
          <Ionicons
            name={
              role.toUpperCase() === keyRole.toUpperCase()
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={20}
            color="black"
          />
          <Text style={styles.roleText}>{keyRole}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  roleSelectionContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 16,
    marginBottom: 20,
  },
  roleButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  roleText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#333",
  },
});
