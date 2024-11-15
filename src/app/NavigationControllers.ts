import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// 네비게이션 스택의 타입 정의
type RootStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
};

type NavigationControllerProps = StackNavigationProp<RootStackParamList>;

export const authNavigationController = () => {
  const navigation = useNavigation<NavigationControllerProps>();

  return {
    goToJoin: () => navigation.navigate("SignUp"),
    goToFindPassword: () => navigation.navigate("SignUp"),
    goToSignIn: () => navigation.navigate("SignIn"),
  };
};