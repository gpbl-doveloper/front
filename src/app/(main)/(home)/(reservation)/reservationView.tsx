import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Center } from "./(add-reservation)";
import { Reservation } from ".";
import { useSelectedCenterStore } from "@/src/store/centerStore";

export function BookedCard({
  reservation,
  buttonText,
}: {
  reservation: Reservation;
  buttonText: string;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.date}>{reservation.date.split("T")[0]}</Text>
          <Text style={styles.centerName}>{reservation.center.name}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>{reservation.center.phone}</Text>
          <Text style={styles.label}>{reservation.center.address}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.callButton}>
        <Text style={styles.callButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

// search 결과 카드 <- 나중에 이거 갖다버리고 하나의 Card로 통일하기
export function ReservationCard({ center }: { center: Center }) {
  const navigation = useNavigation();
  const { setCenterId } = useSelectedCenterStore();
  const handleReservation = () => {
    setCenterId(center.id);
    navigation.navigate("ChooseDate");
  };

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.centerName}>{center.name}</Text>
          <Text style={styles.label}>{center.description}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>{center.phone}</Text>
          <Text style={styles.label}>{center.address}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.callButton} onPress={handleReservation}>
        <Text style={styles.callButtonText}>RESERVE</Text>
      </TouchableOpacity>
    </View>
  );
}

export function NoCardComponent({ text }: { text: string }) {
  return (
    <View style={styles.noHistory}>
      <Text style={styles.noHistoryText}>No {text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 10,
    paddingVertical: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    margin: 10,
    borderBottomWidth: 0.33,
    borderBottomColor: "#55382A",
    gap: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 24,
  },
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 8,
  },
  centerName: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#555",
  },
  details: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
    flexDirection: "column",
    gap: 8,
  },
  label: {},
  callButton: {
    backgroundColor: "#5A4233",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "flex-end",
  },
  callButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  noHistory: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
  },
  noHistoryText: {
    fontSize: 16,
  },
});
