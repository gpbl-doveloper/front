import "react";

// global.d.ts
import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  SignIn: undefined;
  "(main)": undefined;
  "(home)": undefined;
  "(teacher-home)": undefined;
  DogDetail: undefined;
  // 다른 화면들 추가 가능
  // 예: Home: { userId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

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

declare module "*.png" {
  const value: any;
  export default value;
}
declare module "react-native-snap-carousel" {
  import { Component } from "react";
  import { ViewStyle, StyleProp, FlatListProps } from "react-native";

  export interface CarouselProps<T> extends FlatListProps<T> {
    data: T[];
    renderItem: (item: { item: T; index: number }) => JSX.Element;
    sliderWidth: number;
    itemWidth: number;
    firstItem?: number;
    loop?: boolean;
    autoplay?: boolean;
    autoplayDelay?: number;
    autoplayInterval?: number;
    inactiveSlideScale?: number;
    inactiveSlideOpacity?: number;
    enableMomentum?: boolean;
    lockScrollWhileSnapping?: boolean;
    showsHorizontalScrollIndicator?: boolean;
    onSnapToItem?: (index: number) => void;
    containerCustomStyle?: StyleProp<ViewStyle>;
    contentContainerCustomStyle?: StyleProp<ViewStyle>;
    inactiveSlideShift?: number;
    scrollInterpolator?: (
      index: number,
      carouselProps: CarouselProps<T>
    ) => any;
    slideInterpolatedStyle?: (
      index: number,
      animatedValue: any,
      carouselProps: CarouselProps<T>
    ) => StyleProp<ViewStyle>;
    useScrollView?: boolean;
  }

  export default class Carousel<T = any> extends Component<CarouselProps<T>> {}
}
