import { View, Text, Image } from "react-native";
import { CenterReservatedData } from "@/src/store/reservationStore";
import { Ionicons } from "@expo/vector-icons";
import { useFirebaseAuth } from "@/src/store/userStore";
import { handleReservationStatus } from "../reservationModel";
import reservationStyles from "../styles";
import { CallCancelButtonContainer } from "./CallCancelButtonContainer";
import { ReservationButtonContainer } from "./ButtonContainer";
import { ReservationDetails } from "./ReservationDetails";

// 예약 카드 컴포넌트
export function AppointmentCard({
  item,
  onRefresh,
}: {
  item: CenterReservatedData;
  onRefresh: () => Promise<void>;
}) {
  const { idToken } = useFirebaseAuth();

  const AcceptReservation = () =>
    handleReservationStatus("accept", item.id, idToken, onRefresh);
  const DeclineReservation = () =>
    handleReservationStatus("decline", item.id, idToken, onRefresh);

  return (
    <View style={reservationStyles.card}>
      <View style={reservationStyles.header}>
        <Image
          source={{ uri: item.dog.img }}
          style={reservationStyles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={reservationStyles.name}>{item.dog.name}</Text>
          <Text style={reservationStyles.ageBreed}>
            {new Date().getFullYear() - new Date(item.dog.bod).getFullYear()}{" "}
            years,
            {item.dog.breed}
          </Text>
        </View>
      </View>

      <View style={reservationStyles.infoRow}>
        <Ionicons name="medkit" size={20} color="#FF6B6B" />
        <Text style={reservationStyles.label}> Medicine</Text>
        <Text style={reservationStyles.value}>{item.dog.medication}</Text>
      </View>

      <ReservationDetails item={item} />

      {/* 하단 버튼.
        PENDING 상태일 시에는 수락/거절 보여주고,
        ACCEPTED/DECLINED 상태일 시에는 Call/Cancel 보여주기
      */}
      {item.status === "PENDING" ? (
        <ReservationButtonContainer
          AcceptReservation={AcceptReservation}
          DeclineReservation={DeclineReservation}
        />
      ) : item.status === "ACCEPTED" ? (
        <CallCancelButtonContainer CancelFunction={DeclineReservation} />
      ) : null}
    </View>
  );
}
