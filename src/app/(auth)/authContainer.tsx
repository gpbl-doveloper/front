import { Text, View } from "react-native";
import { joinStyles } from "./(join)/joinStyles";

export function AuthContainer({ children, title }: any) {
  return (
    <View style={joinStyles.container}>
      <Text style={joinStyles.title}>{title}</Text>
      {children}
    </View>
  );
}
