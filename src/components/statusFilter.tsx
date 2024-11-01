import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { DogStatus } from "../app/(main)/(teacher-home)/(teacher-homepage)/teacherHomePageModel";

interface StatusFilterProps {
  selectedStatus: DogStatus;
  onStatusChange: (status: DogStatus) => void;
  statusOptions: DogStatus[];
}

export const StatusFilter: React.FC<StatusFilterProps> = ({
  selectedStatus,
  onStatusChange,
  statusOptions,
}) => (
  <View>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterContainer}
    >
      {statusOptions.map((status) => (
        <TouchableOpacity
          key={status}
          style={[
            styles.filterButton,
            selectedStatus === status && styles.selectedFilterButton,
          ]}
          onPress={() => onStatusChange(status)}
        >
          <Text
            style={[
              styles.filterText,
              selectedStatus === status && styles.selectedFilterText,
            ]}
          >
            {status}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
    height: 30,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#E5E5E5",
    height: 30,
  },
  selectedFilterButton: {
    backgroundColor: "#000",
    height: 30,
  },
  filterText: {
    color: "#A3A3A3",
  },
  selectedFilterText: {
    color: "#FFF",
  },
});
