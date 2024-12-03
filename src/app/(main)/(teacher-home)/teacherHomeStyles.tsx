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
    backgroundColor: "#FFF7E9",
    paddingHorizontal: 20,
    paddingTop: 36,
    paddingBottom: 104,
  },
});
