import { View } from "react-native";
import PawsomeLogo from "@/assets/images/pawsome-logo.svg";
import { logoStyles } from "./LogosStyles";

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
