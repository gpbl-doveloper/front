import "react";

declare module "react" {
  interface Attributes {
    className?: string;
  }
}
declare module "*.svg" {
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
