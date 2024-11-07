import { StyleSheet, View } from "react-native";

export function TeacherHomeContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <View style={teacherHomeStyles.mainContainer}>{children}</View>;
}

export const teacherHomeStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 10,
  },
});
