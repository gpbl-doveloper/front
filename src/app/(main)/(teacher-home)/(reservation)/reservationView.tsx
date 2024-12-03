import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ButtonCircleShape } from "@/src/components/Buttons";
import { CenterReservatedData } from "@/src/store/reservationStore";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useFirebaseAuth } from "@/src/store/userStore";
import {
  acceptReservationAPI,
  declineReservationAPI,
} from "./reservationModel";
import { Alert } from "react-native"; // Alert import 추가

export function ReservationDate({ children }: { children?: React.ReactNode }) {
  const [date, setDate] = useState(new Date()); // 기본 날짜를 오늘 날짜로 설정

  const onChange = (event: any, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate); // 선택한 날짜로 설정
    }
  };

  // 날짜 포맷
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <View style={styles.dateContainer}>
      {/* 날짜 선택 버튼 */}
      <TouchableOpacity style={styles.dateButton}>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </TouchableOpacity>

      {/* DateTimePicker */}
      <RNDateTimePicker
        value={date}
        mode="date"
        display="calendar"
        onChange={onChange}
        style={styles.datePicker}
      />
      {children}
    </View>
  );
}

// 예약 카드 컴포넌트
export function AppointmentCard({ item }: { item: CenterReservatedData }) {
  const { idToken } = useFirebaseAuth();
  const AcceptReservation = async () => {
    const result = await acceptReservationAPI(idToken, item.id);
  };

  const DeclineReservation = async () => {
    const result = await declineReservationAPI(idToken, item.id);
    // 성공하면 뭐 새로고침하든 뭘 하든 해줘야될듯
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: item.dog.img }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.dog.name}</Text>
          <Text style={styles.ageBreed}>
            {new Date().getFullYear() - new Date(item.dog.bod).getFullYear()}{" "}
            years,
            {item.dog.breed}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="medkit" size={20} color="#FF6B6B" />
        <Text style={styles.label}> Medicine</Text>
        <Text style={styles.value}>{item.dog.medication}</Text>
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

// 주인 정보 모음 컴포넌트
function ReservationDetails({ item }: { item: CenterReservatedData }) {
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
    <View style={styles.infoRow}>
      <Ionicons name={iconName} size={20} color={iconColor} />
      <Text style={styles.value}>{text}</Text>
    </View>
  );
}

// 예약 리스트 컴포넌트
export function ReservationList({
  filteredData,
}: {
  filteredData: CenterReservatedData[];
}) {
  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <AppointmentCard item={item} />}
      contentContainerStyle={styles.listContent}
    />
  );
}

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
    <View style={styles.buttonContainer}>
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
// Accepted 상태일 때 보여주는 컴포넌트
export function CallCancelButtonContainer({
  CallFunction = () => Promise.resolve(),
  CancelFunction,
}: {
  CallFunction?: () => Promise<void>;
  CancelFunction: () => Promise<void>;
}) {
  return (
    <View style={styles.buttonContainer}>
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

export function NoDataComponent({ text }: { text: string }) {
  return (
    <View style={styles.noDataContainer}>
      <Ionicons name="paw" size={24} color="black" />
      <Text style={styles.noDataText}>No {text} reservations</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  dateButton: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },

  dateContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 36,
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    gap: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ageBreed: {
    color: "#888",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    marginLeft: 4,
  },
  value: {
    fontSize: 16,
    color: "#666",
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  declineButton: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  declineButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  acceptButton: {
    backgroundColor: "#333",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  acceptButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  noDataText: {
    fontSize: 20,
  },
  datePicker: {},
});
