import "react";

// global.d.ts
import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  // 초기 화면
  index: undefined;
  // auth
  "(auth)": { screen: string };
  SignIn: undefined;
  SignUp: undefined;

  // home - parents
  "(home)": undefined;
  "(main)": { screen: string };
  SelectDogLayout: undefined;
  AddDog: undefined;
  AddCenterPage: undefined;
  PhotoSelector: undefined;

  // 공통
  Home: undefined;
  Reservation: undefined;
  Profile: undefined;

  // home - teacher
  "(teacher-home)": undefined;
  TeacherMain: undefined;
  Search: undefined;
  PhotoSelector: undefined;
  DogDetail: undefined;
  SelectDog: undefined;
};

export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "(auth)"
>;

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
