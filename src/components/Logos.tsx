import { View } from "react-native";
import PawsomeLogo from "@/assets/images/pawsome-logo.svg";
import PawsomeLogoSm from "@/assets/images/pawsome-logo-sm.svg";
import { StyleSheet } from "react-native";

type SizeProps = {
  width: number;
  height: number;
};

export function MainLogo({ width, height }: SizeProps) {
  return (
    <View style={logoStyles.container}>
      <PawsomeLogo width={width} height={height} />
    </View>
  );
}

export function SmallLogo({ width, height }: SizeProps) {
  return (
    <View style={logoStyles.container}>
      <PawsomeLogoSm width={width} height={height} />
    </View>
  );
}

export const logoStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
