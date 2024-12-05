import { ButtonCircleShape } from "@/src/components/Buttons";
import { Alert, View } from "react-native";
import reservationStyles from "../styles";

// 예약 버튼 컴포넌트
export function ReservationButtonContainer({
  AcceptReservation,
  DeclineReservation,
}: {
  AcceptReservation: () => Promise<void>;
  DeclineReservation: () => Promise<void>;
}) {
  const handleAccept = () => {
    Alert.alert("Are you sure?", "It can't be undone.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Accept",
        onPress: AcceptReservation,
      },
    ]);
  };

  const handleDecline = () => {
    Alert.alert("Are you sure?", "Decline this reservation?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Decline",
        style: "destructive",
        onPress: DeclineReservation,
      },
    ]);
  };

  return (
    <View style={reservationStyles.buttonContainer}>
      <ButtonCircleShape
        text="Decline"
        buttonColor="whiteBlack"
        onPress={handleDecline}
        width="40%"
      />
      <ButtonCircleShape
        text="Accept"
        buttonColor="brown"
        onPress={handleAccept}
        width="40%"
      />
    </View>
  );
}
