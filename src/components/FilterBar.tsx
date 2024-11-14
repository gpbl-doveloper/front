import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

interface StatusFilterProps<T extends string> {
  statusOptions: T[]; // 다양한 상태 옵션을 위한 제네릭 타입 T 사용
  onStatusChange: any;
}

export function StatusFilter<T extends string>({
  statusOptions,
  onStatusChange,
}: StatusFilterProps<T>) {
  const [currentStatus, setCurrentStatus] = useState<T>(statusOptions[0]);

  const handleStatusChange = (status: T) => {
    setCurrentStatus(status);
    onStatusChange(status);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {statusOptions.map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.button,
              currentStatus === status && styles.selectedButton,
            ]}
            onPress={() => handleStatusChange(status)}
          >
            <Text
              style={[
                styles.text,
                currentStatus === status && styles.selectedText,
              ]}
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: "#000",
  },
  text: {
    color: "#A3A3A3",
    fontWeight: "600",
    fontSize: 16,
  },
  selectedText: {
    color: "#FFF",
  },
});
