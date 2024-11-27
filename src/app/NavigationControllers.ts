import { RootStackParamList } from "@/global";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationControllerProps = StackNavigationProp<RootStackParamList>;

export const authNavigationController = () => {
  const navigation = useNavigation<NavigationControllerProps>();

  return {
    goToJoin: () => navigation.navigate("SignUp"),
    goToFindPassword: () => navigation.navigate("SignUp"),
    goToSignIn: () => navigation.navigate("SignIn"),
    goToSelectDogs: () => navigation.navigate("SelectDog"),
  };
};

export const mainNavigationController = () => {
  const navigation = useNavigation<NavigationControllerProps>();

  return {
    goToHome: () => navigation.navigate("(home)"),
    goToTeacherHome: () => navigation.navigate("(teacher-home)")
  };
};

export const homeNavigationController = () => {
  const navigation = useNavigation<NavigationControllerProps>();

  return {
    goToMainPage: () => navigation.navigate("Home"),
  };
};
