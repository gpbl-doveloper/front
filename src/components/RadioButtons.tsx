import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RadioButtonsProps {
  roles: string[];
  selectedRole: string;
  onSelectRole: (role: string) => void;
}
export function RadioButtons({
  roles,
  selectedRole,
  onSelectRole,
}: RadioButtonsProps) {
  return (
    <View style={styles.roleSelectionContainer}>
      {roles.map((role) => (
        <TouchableOpacity
          key={role}
          style={styles.roleButton}
          onPress={() => onSelectRole(role)}
        >
          <Ionicons
            name={
              selectedRole === role ? "radio-button-on" : "radio-button-off"
            }
            size={20}
            color="black"
          />
          <Text style={styles.roleText}>{role}</Text>
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
