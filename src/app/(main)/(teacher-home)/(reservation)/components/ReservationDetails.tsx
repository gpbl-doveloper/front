import { CenterReservatedData } from "@/src/store/reservationStore";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import reservationStyles from "../styles";

// 주인 정보 모음 컴포넌트
export function ReservationDetails({ item }: { item: CenterReservatedData }) {
  return (
    <View>
      <InfoRow iconName="person" text={item.dog.owner.name} />
      <InfoRow iconName="call" text={item.dog.owner.phone} />
      <InfoRow iconName="mail" text={item.dog.owner.email} />
    </View>
  );
}

// 주인 정보 단일 컴포넌트
interface InfoRowProps {
  iconName: keyof typeof Ionicons.glyphMap; // 아이콘 이름
  text: string; // 표시할 텍스트
  iconColor?: string; // 아이콘 색상 (기본값은 검정)
}

function InfoRow({ iconName, text, iconColor = "black" }: InfoRowProps) {
  return (
    <View style={reservationStyles.infoRow}>
      <Ionicons name={iconName} size={20} color={iconColor} />
      <Text style={reservationStyles.value}>{text}</Text>
    </View>
  );
}
