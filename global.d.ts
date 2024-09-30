// className 인식 못해서 VSC에서 에러 발생하는 오류 해결

import "react";

declare module "react" {
  interface Attributes {
    className?: string;
  }
}
