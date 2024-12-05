import { ButtonCircleShape } from "@/src/components/Buttons";
import { View } from "react-native";
import reservationStyles from "../styles";

// Accepted 상태일 때 보여주는 컴포넌트
export function CallCancelButtonContainer({
    CallFunction = () => Promise.resolve(),
    CancelFunction,
  }: {
    CallFunction?: () => Promise<void>;
    CancelFunction: () => Promise<void>;
  }) {
    return (
      <View style={reservationStyles.buttonContainer}>
        <ButtonCircleShape
          text="Call"
          buttonColor="whiteBlack"
          onPress={CallFunction}
          width="40%"
        />
        <ButtonCircleShape
          text="Cancel"
          buttonColor="brown"
          onPress={CancelFunction}
          width="40%"
        />
      </View>
    );
  }
  