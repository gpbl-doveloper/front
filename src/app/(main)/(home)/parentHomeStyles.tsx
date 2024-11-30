import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export function ParentHomeContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollView style={parentHomeStyles.mainContainer}>{children}</ScrollView>
  );
}

export const parentHomeStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFF7E9",
    paddingTop: 10,
  },
});
