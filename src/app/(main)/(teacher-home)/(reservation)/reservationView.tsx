import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { ButtonCircleShape } from "@/src/components/Buttons";
import { DogForReservation } from "@/src/store/reservationStore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export function ReservationDate() {
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
    </View>
  );
}

// 예약 카드 컴포넌트
export function AppointmentCard({ item }: { item: DogForReservation }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: item.img }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.ageBreed}>
            {new Date().getFullYear() - new Date(item.bod).getFullYear()} years,{" "}
            {item.breed}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="medkit" size={20} color="#FF6B6B" />
        <Text style={styles.label}> Medicine</Text>
        <Text style={styles.value}>{item.medicine}</Text>
      </View>

      <ReservationDetails item={item} />

      <ReservationButtonContainer />
    </View>
  );
}

// 주인 정보 모음 컴포넌트
function ReservationDetails({ item }: { item: DogForReservation }) {
  return (
    <View>
      <InfoRow iconName="person" text={item.owner.name} />
      <InfoRow iconName="call" text={item.owner.phone} />
      <InfoRow iconName="mail" text={item.owner.email} />
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
  filteredData: DogForReservation[];
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
export function ReservationButtonContainer() {
  return (
    <View style={styles.buttonContainer}>
      <ButtonCircleShape
        text="Decline"
        buttonColor="whiteBlack"
        onPress={() => {}}
        width="40%"
      />
      <ButtonCircleShape
        text="Accept"
        buttonColor="black"
        onPress={() => {}}
        width="40%"
      />
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
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
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

  datePicker: {},
});
